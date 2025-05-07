<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
	import '../app.css';
</script>

<div class="bg-white/75 bg-[url('/testbg-2.jpg')] bg-auto bg-top bg-repeat-y bg-blend-lighten">
	<Header />
	{@render children()}
	<Footer footerText={'Ohjelmistoprojekti 1 by Team 2'} />
</div>
