<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
	import '../app.css';
</script>

<div
	class="min-h-screen bg-white/75 bg-[url('/testbg-2.jpg')] bg-cover bg-center bg-no-repeat bg-blend-lighten"
>
	<Header />
	{@render children()}
	<Footer footerText={'Ohjelmistoprojekti 1 by Team 2'} />
</div>
