<script lang="ts">
	// ----------------------- IMPORTIT ---------------------------
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Fruit } from '$lib/types/fruit';

	// ----------------------- MUUTTUJAT --------------------------
	//hedelmien määrät, null tarkoittaa että ei ole valittu mitään
	type Amount = 1 | 2 | 3 | 4 | 5 | null;
	//Valittu määrä tallennetaan tähän
	let amount: Amount = $state(null);

	let fruits: Fruit[] = $state([]);
	// Valittu hedelmä tallennetaan tähän
	let selected: string = $state('');
	// ----------------------- FUNKTIOT ---------------------------
	//button mikä vie etusivulle
	function homePage() {
		goto('/');
	}
	// Hakee hedelmät fruits.json tiedostosta
	onMount(async () => {
		const response = await fetch('/data/fruits.json');
		fruits = await response.json();
	});
</script>

<h1>Add new recipe</h1>
<div>
	<!-- Tästä valitaan raaka-aineen määrä -->
	<select bind:value={amount}>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
	</select>
	<!-- Tästä valitaan raaka-aine -->
	<select bind:value={selected}>
		{#each fruits as fruit}
			<option value={fruit.name}>{fruit.name}</option>
		{/each}
	</select>

	<p>{amount} {selected}</p>

	<button id="homepage" onclick={homePage}>Home</button>
</div>

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
