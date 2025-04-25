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

<Header headerText={'froots'} />

<main>
	{@render children()}
</main>

<Footer footerText={'Ohjelmistoprojekti 1 by Team 2'} />
