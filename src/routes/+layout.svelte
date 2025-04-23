<script lang="ts">
	import '../styles/global.scss'; // Globalne zmienne SCSS
</script>

<slot />

<style lang="scss">
	:global(body) {
		margin: 0;
		padding: 0;
		background: linear-gradient(to bottom right, var(--color-bg), #1e1e1e, #202020);
		font-family: 'Inter', system-ui, sans-serif;
		color: var(--color-text);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
