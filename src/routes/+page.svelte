<script lang="ts">
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

	let hedelmat: Fruit[] = $state([]);
	onMount(async () => {
		try {
			const response = await fetch('/data/fruits.json');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			hedelmat = await response.json();
		} catch (error) {
			console.error('Fetch error:', error);
		}
	});
	$inspect(hedelmat);
</script>

{#each hedelmat as fruit (fruit.name)}
	<div>{fruit.name}</div>
{:else}
	<div>Loading...</div>
{/each}
