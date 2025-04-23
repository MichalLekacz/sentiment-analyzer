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
	let showLimitWarning = false;

	$: showLimitWarning = text.length >= 500;

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

<div class="container">
	<div class="header-logo">
		<img src="/logo.png" alt="SentiLyzer logo" class="logo-img" />
	</div>
	<h2>Financial Sentiment Analysis</h2>
	<div class="input-wrapper">
		<div class="textarea-inner">
			<textarea
				bind:value={text}
				maxlength="500"
				placeholder="Enter text to analyze sentiment..."
				on:keydown={handleKeydown}
			></textarea>

			{#if showLimitWarning}
				<div class="text-limit-warning">You’ve reached the 500 character limit.</div>
			{/if}

			<div class="bottom-bar">
				<div class="example-buttons">
					<button on:click={() => (text = 'The company reported excellent earnings this quarter.')}>
						✅ <span>Positive</span>
					</button>
					<button
						on:click={() =>
							(text =
								'The financial report of the XYZ company for the first quarter of 2025 showed revenues of $250 million.')}
					>
						⚖️ <span>Neutral</span>
					</button>
					<button on:click={() => (text = 'The market is crashing, and investors are panicking.')}>
						❌ <span>Negative</span>
					</button>
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
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	.container {
		width: 100%;
		max-width: 600px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: stretch;
		justify-content: center;
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

	.input-wrapper {
		margin: 0 auto;
		width: 100%;

		.textarea-inner {
			width: 100%;
			background: #1a1a1a;
			border-radius: 0.75rem;
			border: 1px solid var(--color-border);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: stretch;
			overflow: hidden;

			textarea {
				width: 100%;
				height: 160px;
				background: transparent;
				border: none;
				color: var(--color-text);
				resize: none;
				outline: none;
				font-size: 1rem;
				font-family: inherit;
				padding: 1.2rem;
				overflow-y: auto;
				box-sizing: border-box;
				white-space: pre-wrap;
				word-wrap: break-word;

				&::-webkit-scrollbar {
					width: 8px;
				}
				&::-webkit-scrollbar-track {
					background: #1e1e1e;
					border-radius: 4px;
				}
				&::-webkit-scrollbar-thumb {
					background: #555;
					border-radius: 4px;
				}
			}

			textarea:focus {
				outline: none;
				box-shadow: 0 0 0 2px var(--color-primary);
			}

			.text-limit-warning {
				color: var(--color-negative);
				font-size: 0.85rem;
				text-align: left;
			}

			.bottom-bar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0.5rem 0.5rem;
				border-top: 1px solid var(--color-border);

				.example-buttons {
					display: flex;
					gap: 0.5rem;

					button {
						background: #2a2a2a;
						border: 1px solid var(--color-border);
						color: var(--color-text);
						padding: 0.4rem 0.75rem;
						border-radius: 0.5rem;
						font-size: 0.85rem;
						cursor: pointer;
						display: flex;
						align-items: center;
						gap: 0.3rem;

						&:hover {
							background: #333;
						}

						@media (max-width: 420px) {
							span {
								display: none;
							}
							padding: 0.4rem 0.5rem;
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
		align-items: center;
		gap: 0.2rem;
	}

	.result-header {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.confidence {
		display: flex;
		align-items: flext-start;
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
