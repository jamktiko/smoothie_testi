<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<Header placeholder={'placeholder'} />

<main>
	{@render children()}
</main>

<Footer placeholder={'placeholder'} />
