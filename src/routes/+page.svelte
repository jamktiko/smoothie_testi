<script lang="ts">
	import Button from '$lib/Button_v2.svelte';
	import { onMount } from 'svelte';
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

{#each smoothies as smoothie (smoothie.name)}
	<div>
		<p>Smoothien nimi: {smoothie.name}</p>
		<p>Ainekset: {smoothie.ingredients.join(', ')}</p>
	</div>
{:else}
	<div>Loading...</div>
{/each}

<Button buttonText="testipainike" buttonFunction={() => {}} buttonActive={true} />
