<script lang="ts">
	export let label: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
	export let onClose: () => void;

	const descriptions = {
		POSITIVE: {
			icon: '✅',
			text: 'The text conveys positive emotions and tone.',
			tip: 'Great job! Use more uplifting words like “awesome”, “great”, “highly recommend”.'
		},
		NEUTRAL: {
			icon: '⚖️',
			text: 'The text has a neutral tone — no strong emotions detected.',
			tip: 'Try adding more personality! You could strengthen the positive or negative tone.'
		},
		NEGATIVE: {
			icon: '❌',
			text: 'The text expresses negative sentiment.',
			tip: 'Want to sound more friendly? Try using more positive words and softer phrasing. '
		}
	};
</script>

<div class="overlay">
	<div class="modal">
		<div class="header">
			<span>{descriptions[label].icon}</span>
			{label.charAt(0) + label.slice(1).toLowerCase()}
		</div>
		<div class="desc">{descriptions[label].text}</div>
		<div class="tip">{descriptions[label].tip}</div>
		<button class="close-btn" on:click={onClose}>Close</button>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.modal {
		background: #1a1a1a;
		color: #f0f0f0;
		padding: 2rem;
		border-radius: 1rem;
		max-width: 400px;
		width: 90%;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
		animation: fadeIn 0.3s ease;
	}

	.header {
		font-size: 1.5rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.desc {
		font-size: 1rem;
		margin-bottom: 1rem;
		color: #ccc;
	}

	.tip {
		font-size: 0.95rem;
		color: #aaa;
		font-style: italic;
		margin-bottom: 1.5rem;
	}

	.close-btn {
		background: linear-gradient(135deg, #7f5af0, #2cb67d);
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		color: white;
		cursor: pointer;
		font-weight: 600;
		transition: background 0.3s;
	}

	@keyframes fadeIn {
		from {
			transform: scale(0.95);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
