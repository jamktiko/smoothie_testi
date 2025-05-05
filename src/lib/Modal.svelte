<script lang="ts">
	import type { Snippet } from 'svelte';
	import { scale } from 'svelte/transition';
	interface Props {
		header?: Snippet;
		children: Snippet;
		footer?: Snippet;
		avaaModal: () => void;
	}
	let { header, children, footer, avaaModal }: Props = $props();
</script>

<button
	class="backdrop fixed top-0 left-0 z-10 h-screen w-full bg-black/75"
	onclick={avaaModal}
	aria-label="backdrop"
></button>

<div class="modal">
	<!-- <header>
		{@render header()}
	</header> -->

	{@render children()}
	<!-- <footer>
		{@render footer()}
	</footer> -->
</div>

<style>
	.modal {
		position: absolute;
	}
</style>
