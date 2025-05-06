<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
	import '../app.css';

	import { onMount } from 'svelte';
</script>

<Header />
{@render children()}
<Footer footerText={'Ohjelmistoprojekti 1 by Team 2'} />
