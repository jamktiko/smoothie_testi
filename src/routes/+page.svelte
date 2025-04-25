<script lang="ts">
	import type { Smoothie } from '$lib/types/smoothie';
	import type { Fruit } from '$lib/types/fruit';
	import type { NutritionInfo } from '$lib/types/nutritionInfo';
	import Button from '$lib/Button.svelte';
	import { onMount } from 'svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	let smoothies: Smoothie[] = $state([]);
	onMount(async () => {
		try {
			const response = await fetch('/data/smoothies.json');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			smoothies = await response.json();
		} catch (error) {
			console.error('Fetch error:', error);
		}
	});
	$inspect(smoothies);
</script>

<div class="temp-container">
	<!-- header -->
	<Header headerText={'froots'} />

	{#each smoothies as smoothie (smoothie.name)}
		<div>
			<p>Smoothien nimi: {smoothie.name}</p>
			<p>Ainekset: {smoothie.ingredients.join(', ')}</p>
		</div>
	{:else}
		<div>Loading...</div>
	{/each}

	<Button buttonText="testipainike" buttonFunction={() => {}} buttonActive={true} />

	<!-- footer -->
	<Footer footerText={'Ohjelmistoprojekti 1 by Team 2'} />
</div>

<style>
	.temp-container {
		padding: 1em 0em 1em 0em;
	}
</style>
