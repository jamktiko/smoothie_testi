<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<footer
	class="laila-regular flex flex-col items-center justify-center border-t-2 bg-rose-100 p-3 text-sm sm:flex sm:flex-row sm:justify-between"
>
	{@render children()}
</footer>
