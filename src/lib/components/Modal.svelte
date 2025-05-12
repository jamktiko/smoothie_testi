<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		header?: Snippet;
		children: Snippet;
		footer?: Snippet;
		toggleModal: () => void;
	}

	let { header, children, footer, toggleModal: toggleModal }: Props = $props();
</script>

<!-- backdrop -->
<button
	class="backdrop fixed top-0 left-0 z-10 h-screen w-full bg-black/75"
	onclick={toggleModal}
	aria-label="backdrop"
></button>

<!-- modal itse -->
<div class="modal">
	{#if header}
		<header>
			{@render header()}
		</header>
	{/if}

	{@render children()}

	{#if footer}
		<footer>
			{@render footer()}
		</footer>
	{/if}
</div>

<style>
	/* fiksaus siihen että kortit liikkuu kun modal aukeaa */
	.modal {
		position: absolute;
	}
</style>
