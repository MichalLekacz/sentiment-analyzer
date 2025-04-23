<script lang="ts">
	import { scale } from 'svelte/transition';
	import { CheckCircle } from 'lucide-svelte';
	import ModalResult from '$lib/components/ModalResult.svelte';
	import { validateInput } from '$lib/validation/input';
	import { analyzeSentiment } from '$lib/api/sentiment';
	import type { Analysis } from '$lib/types/analysis';

	let text = '';
	let error: string | null = null;
	let loading = false;
	let result: Analysis | null = null;
	let showModal = false;

	async function handleAnalyze() {
		const validationError = validateInput(text);
		if (validationError) {
			error = validationError;
			return;
		}

		loading = true;
		error = null;
		result = null;

		try {
			result = await analyzeSentiment(text, import.meta.env.VITE_HUGGINGFACE_TOKEN);
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
			handleAnalyze();
		}
	}
</script>

<div class="header-logo">
	<img src="/logo.png" alt="SentiLyzer logo" class="logo-img" />
</div>
<div class="container">
	<h2>Sentiment Analysis</h2>

	<div class="input-wrapper">
		<div class="textarea-inner">
			<textarea
				bind:value={text}
				maxlength="500"
				placeholder="Enter text to analyze sentiment..."
				on:keydown={handleKeydown}
			></textarea>
			<div class="bottom-bar">
				<div class="example-buttons">
					<button on:click={() => (text = 'The company reported excellent earnings this quarter.')}
						>✅ Positive</button
					>
					<button on:click={() => (text = 'The stock has remained stable over the last month.')}
						>⚖️ Neutral</button
					>
					<button on:click={() => (text = 'The market is crashing, and investors are panicking.')}
						>❌ Negative</button
					>
				</div>
				<button class="inline-button" on:click={handleAnalyze} disabled={loading}>
					{#if loading}
						...
					{:else}
						➤
					{/if}
				</button>
			</div>
		</div>
	</div>

	{#if error}
		<div class="error">{error}</div>
	{/if}

	{#if result}
		<div class="result" transition:scale={{ duration: 250, start: 0.95 }}>
			<div class="result-header">
				<CheckCircle class="icon" />
				<span class="label">
					Sentiment:
					<strong class={result.label}>{result.label}</strong>
				</span>
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

<style lang="scss">
	.container {
		width: 100%;
		max-width: 600px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		box-sizing: border-box;
		align-items: center;
		text-align: center;
		@media (max-width: 600px) {
			padding: 1rem;
		}
	}

	.logo-img {
		width: 200px;
		height: auto;
		margin-bottom: 2rem;
		user-select: none;
		@media (max-width: 600px) {
			width: 140px;
			margin-bottom: 1rem;
		}
	}

	h2 {
		font-size: 1.5rem;

		@media (max-width: 600px) {
			font-size: 1.2rem;
		}
	}

	.input-wrapper {
		width: 100%;
		max-width: 600px;

		.textarea-inner {
			background: #1a1a1a;
			border-radius: 0.75rem;
			border: 1px solid var(--color-border);
			display: flex;
			flex-direction: column;
			overflow: hidden;

			textarea {
				width: 100%;
				height: 120px;
				background: transparent;
				border: none;
				color: var(--color-text);
				resize: none;
				outline: none;
				font-size: 1rem;
				font-family: inherit;
				padding: 1.2rem;
			}

			@media (max-width: 600px) {
				height: 200px;
				font-size: 0.9rem;
			}

			textarea:focus {
				outline: none;
			}

			.bottom-bar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0.5rem 1rem;
				border-top: 1px solid var(--color-border);

				@media (max-width: 600px) {
					flex-direction: row;
					align-items: stretch;
					gap: 0.5rem;
				}

				.example-buttons {
					display: flex;
					gap: 0.5rem;

					@media (max-width: 600px) {
						justify-content: center;
						flex-wrap: wrap;
					}

					button {
						background: #2a2a2a;
						border: 1px solid var(--color-border);
						color: var(--color-text);
						padding: 0.4rem 0.75rem;
						border-radius: 0.5rem;
						font-size: 0.85rem;
						cursor: pointer;

						@media (max-width: 600px) {
							padding: 0.3rem 0.5rem;
							font-size: 0.8rem;
						}

						&:hover {
							background: #333;
						}
					}
				}

				.inline-button {
					background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
					border: none;
					color: white;
					padding: 0.5rem 0.75rem;
					border-radius: 0.5rem;
					font-size: 1rem;
					cursor: pointer;

					@media (max-width: 600px) {
						align-self: center;
					}

					&:hover {
						transform: translateY(-1px);
						box-shadow: 0 4px 8px rgba(127, 90, 240, 0.3);
					}

					&:disabled {
						background: #555;
						cursor: not-allowed;
					}
				}
			}
		}
	}

	.result {
		background-color: #1e1e1e;
		padding: 1rem 1.25rem;
		border-radius: 0.75rem;
		border: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		@media (max-width: 600px) {
			max-width: 90%;
			font-size: 0.9rem;
		}
	}

	.label {
		font-weight: 500;

		strong {
			&.POSITIVE {
				color: var(--color-accent);
			}
			&.NEGATIVE {
				color: var(--color-negative);
			}
			&.NEUTRAL {
				color: var(--color-neutral);
			}
		}
	}
</style>
