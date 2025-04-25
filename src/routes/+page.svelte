<script lang="ts">
	import SmoothieCard from '$lib/Card.svelte';
	import Button from '$lib/Button.svelte';
	import { onMount } from 'svelte';
	import Searchbar from '$lib/Searchbar.svelte';
	interface NutritionInfo {
		calories: number;
		fat: number;
		sugar: number;
		carbohydrates: number;
		protein: number;
	}

	interface Fruit {
		name: string;
		id: number;
		family: string;
		order: string;
		genus: string;
		nutritions: NutritionInfo;
	}

	interface Smoothie {
		id: number;
		name: string;
		ingredients: string[];
	}

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

<Searchbar placeholder={'Hae smoothieita'} />
<div class="temp-container">
	{#each smoothies as smoothie (smoothie.name)}
		<SmoothieCard nimi={smoothie.name} resepti={smoothie.ingredients.join(', ')} />
	{:else}
		<div>Loading...</div>
	{/each}

	<Button buttonText="testipainike" buttonFunction={() => {}} buttonActive={true} />
</div>

<style>
	.temp-container {
		padding: 1em 0em 1em 0em;
	}
</style>
