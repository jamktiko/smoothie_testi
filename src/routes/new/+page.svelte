<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Fruit } from '$lib/types/fruit';
	function homePage() {
		goto('/');
	}

	import { onMount } from 'svelte';
	let fruits: Fruit[] = $state([]);

	// Hakee hedelmät fruits.json tiedostosta
	onMount(async () => {
		const response = await fetch('/data/fruits.json');
		fruits = await response.json();
	});

	// Valitut asiat tallennetaan tähän
	let selected: string[] = $state([]);
	$inspect(selected);
	// Funktio valinnan käsittelemiseen
</script>

<button id="homepage" onclick={homePage}>Home</button>
<h1>Add new recipe</h1>
<h2>Valitse hedelmiä:</h2>
<select bind:value={selected}>
	{#each fruits as fruit}
		<option value={fruit.name}>{fruit.name}</option>
	{/each}
</select>
<p>{selected}</p>

<style>
	#homepage {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		background-color: #767676;
		color: white;
		font-family: 'Laila', sans-serif;
		font-size: 1.5rem;
		font-weight: 700;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		margin: 0;
		cursor: pointer;
		z-index: 100;
	}
</style>
