<script lang="ts">
	import type { Snippet } from 'svelte';
	import { scale } from 'svelte/transition';
	interface Props {
		header: Snippet;
		children: Snippet;
		footer: Snippet;
	}
	let { header, children, footer }: Props = $props();
</script>

<div class="backdrop"></div>

<div class="modal" in:scale={{ duration: 300 }} out:scale={{ duration: 300 }}>
	<header>
		{@render header()}
	</header>

	{@render children()}
	<footer>
		{@render footer()}
	</footer>
</div>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.75);
		z-index: 10;
	}

	.modal {
		padding: 3rem;
		position: fixed;
		top: 0;
		width: 50%;
		height: 50%;
		background: white;
		border-radius: 5px;
		z-index: 100;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	}
</style>
