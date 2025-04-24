<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const appInfo = {
		name: 'Tiko-kauppa',
		company: 'Tikon koodarit',
		year: new Date().getFullYear()
	};
</script>

<Header text={appInfo.name} logo="jamk_tunnus_valkoinen.png" />

<main>
	{@render children()}
</main>

<Footer {...appInfo} />
