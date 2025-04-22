<script lang="ts">
    import { scale } from 'svelte/transition';
    import { CheckCircle } from 'lucide-svelte';
    import ModalResult from '$lib/components/ModalResult.svelte';
    import axios from 'axios';
  
    type Analysis = {
      text: string;
      label: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
      score: number;
    };
  
    let text = '';
    let error: string | null = null;
    let loading = false;
    let result: Analysis | null = null;
    let showModal = false;
  
    function validateInput(): boolean {
      if (!text.trim()) {
        error = 'Text field cannot be empty.';
        return false;
      }
      if (text.length > 500) {
        error = 'Maximum character limit is 500.';
        return false;
      }
      error = null;
      return true;
    }
  
    async function analyzeSentiment() {
      if (!validateInput()) return;
  
      loading = true;
      result = null;
      error = null;
  
      try {
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
          { inputs: text },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
  
        const data = response.data;
  
        if (!Array.isArray(data) || !Array.isArray(data[0])) {
          throw new Error('Invalid response from API');
        }
  
        const [best] = [...data[0]].sort((a, b) => b.score - a.score);
  
        result = {
          text,
          label: best.label.toUpperCase() as Analysis['label'],
          score: best.score
        };
  
        showModal = true;
      } catch (e: any) {
        console.error(e);
        error = 'Failed to connect to HuggingFace API 😢';
      } finally {
        loading = false;
      }
    }
  
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        analyzeSentiment();
      }
    }
  </script>
  
  <style lang="scss">
    :global(body) {
      margin: 0;
      padding: 0;
      background: linear-gradient(to bottom right, #181818, #1e1e1e, #202020);
      font-family: 'Inter', system-ui, sans-serif;
      color: #f0f0f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  
    .container {
      width: 100%;
      max-width: 600px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      box-sizing: border-box;
    }
  
    .logo-img {
      width: 180px;
      height: auto;
      margin-bottom: 1rem;
      user-select: none;
    }
  
    .input-wrapper {
      position: relative;
  
      textarea {
        width: 100%;
        box-sizing: border-box;
        height: 160px;
        padding: 1rem 3.5rem 1rem 1rem;
        font-size: 1rem;
        background: #1a1a1a;
        border: none;
        border-radius: 0.75rem;
        color: #f0f0f0;
        resize: none;
        outline: 1px solid #2a2a2a;
        transition: outline 0.2s ease-in-out;
  
        &:hover {
          outline: 1px solid #313131;
        }
        &:focus {
          outline: 1.5px solid #7f5af0;
        }
      }
  
      .inline-button {
        position: absolute;
        bottom: 0.75rem;
        right: 0.75rem;
        background: linear-gradient(135deg, #7f5af0, #2cb67d);
        border: none;
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
  
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(127, 90, 240, 0.2);
        }
  
        &:disabled {
          background: #555;
          cursor: not-allowed;
        }
      }
    }
  
    .error {
      color: #ef4444;
      font-size: 0.9rem;
    }
  
    .result {
      margin-top: 1.5rem;
      font-size: 1rem;
      background-color: #1e1e1e;
      padding: 1rem 1.25rem;
      border-radius: 0.75rem;
      border: 1px solid #2a2a2a;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
  
      .result-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
  
        .icon {
          color: #22c55e;
          width: 1.25rem;
          height: 1.25rem;
        }
  
        .label {
          font-weight: 500;
          color: #22c55e;
  
          strong {
            color: #2cb67d;
          }
        }
  
        .label.NEGATIVE {
          color: #ef4444;
  
          strong {
            color: #f87171;
          }
        }
      }
  
      .confidence {
        font-size: 0.95rem;
        color: #aaa;
      }
    }
  </style>
  
  <div class="header-logo">
    <img src="/logo.png" alt="SentiLyzer logo" class="logo-img" />
  </div>
  <div class="container">
    <h2>Sentiment Analysis</h2>
  
    <div class="input-wrapper">
      <textarea
        bind:value={text}
        maxlength="500"
        placeholder="Enter text to analyze sentiment..."
        on:keydown={handleKeydown}
      ></textarea>
      <button class="inline-button" on:click={analyzeSentiment} disabled={loading}>
        {#if loading}
          ...
        {:else}
          ➤
        {/if}
      </button>
    </div>
  
    {#if error}
      <div class="error">{error}</div>
    {/if}
  
    {#if result}
      <div class="result" transition:scale={{ duration: 250, start: 0.95 }}>
        <div class="result-header">
          <CheckCircle class="icon" />
          <span class="label {result.label}">Sentiment: <strong>{result.label}</strong></span>
        </div>
        <div class="confidence">
          Confidence: {(result.score * 100).toFixed(1)}%
        </div>
      </div>
    {/if}
  
    {#if showModal && result}
      <ModalResult label={result.label} onClose={() => (showModal = false)} />
    {/if}
  </div>
  