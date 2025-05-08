<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<footer class="laila-regular flex items-center justify-center border-t-2 bg-rose-100 p-3">
	{@render children()}
</footer>
