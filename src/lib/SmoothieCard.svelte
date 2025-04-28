<script lang="ts">
	import Notes from './Notes.svelte';
	import Button from './Button.svelte';
	import type { Smoothie } from '$lib/types/smoothie';
	import type { Fruit } from '$lib/types/fruit';
	import type { NutritionInfo } from './types/nutritionInfo';
	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import { onMount } from 'svelte';

	import Modal from './Modal.svelte';

	// importataan globaalit muuttujat smoothieille ja hedelmille
	import { globalSmoothies } from '$lib/globalSmoothies.svelte';
	import { globalFruits } from '$lib/globalFruits.svelte';

	interface Props {
		smoothieKortti: SmoothieKortti;
	}
	let { smoothieKortti } = $props();
	let tamanSmoothienHedelmat: Fruit[] = $state([]);
	let tamanSmoothienRavintoarvot: NutritionInfo[] = $state([]);

	// avaa notes tekstikentän
	let noteskentta = $state(false);
	function avaanoteskentta() {
		noteskentta = !noteskentta;
	}

	// avaa smoothie reseptin
	let modalauki = $state(false);
	function avaaSmoothieResepti() {
		modalauki = !modalauki;
	}

	function haeTamanSmoothienHedelmat(smoothie: Smoothie) {
		console.log('nyt ollaan haetamansmoothien funktion sisällä');
		console.log('nyt ollaan haetamansmoothien funktion sisällä2');
		for (let i = 0; i < smoothie.ingredients.length; i++) {
			console.log(`${smoothie.name} - ${smoothie.ingredients[i]}`);
			globalFruits.get().forEach((fruit) => {
				console.log(fruit.name);
				console.log('test2');
			});

			// console.log(`Hedelma: ${hedelmaIndex}`);
			// if (hedelma) {
			// tamanSmoothienHedelmat.push(hedelma);
			// }
		}
	}

	onMount(() => {
		// haeTamanSmoothienHedelmat(smoothie);
	});

	// $inspect(tamanSmoothienHedelmat);
	// $inspect(globalSmoothies.get());
	// $inspect(globalFruits.get());
	// $inspect(tamanSmoothienRavintoarvot);
	$inspect(smoothieKortti.ID);
	$inspect(smoothieKortti.smoothie.name);
	$inspect(smoothieKortti.hedelmat);
	$inspect(smoothieKortti.ravintoarvot);
</script>

<div class="card">
	<img src="smoothie_placeholder.jpg" alt="placeholder kuva" />
	<h2>{smoothieKortti.smoothie.name}</h2>
	<h3>Ingredients</h3>
	<p>{smoothieKortti.smoothie.ingredient}</p>
	<h3>Nutritional Information</h3>
	<p>{smoothieKortti.ID}</p>
	<p>{smoothieKortti.ravintoarvot}</p>
	<h3>Notes</h3>
	{#if noteskentta}
		<Notes placeholder="Add your notes" />
	{/if}
	<Button buttonText="Add Note" buttonFunction={avaanoteskentta} />
	<Button buttonText="Resepti" buttonFunction={avaaSmoothieResepti} />
</div>

<style>
	.card {
		background-color: #f9f9f9;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 16px;
		margin: 16px;
	}

	h2 {
		font-size: 1.5em;
		margin-bottom: 8px;
	}

	p {
		font-size: 1em;
		color: #555;
	}
	img {
		height: 200px;
		border-radius: 8px;
	}
</style>
