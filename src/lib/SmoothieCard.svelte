<script lang="ts">
	import Notes from './Notes.svelte';
	import Button from './Button.svelte';
	import type { Smoothie } from '$lib/types/smoothie';
	import type { Fruit } from '$lib/types/fruit';
	import type { NutritionInfo } from './types/nutritionInfo';
	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import { onMount } from 'svelte';

	import Modal from './Modal.svelte';

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
	let teksti = $state('');
	let muistiinpanoja: string[] = $state([]);

	// avaa smoothie reseptin
	let modalAuki = $state(false);
	function avaaModal() {
		modalAuki = !modalAuki;
	}

	function tulostaNutritionInfo() {
		smoothieKortti.ravintoarvot.forEach((ravintoarvo: NutritionInfo) => {});
	}

	// function haeTamanSmoothienHedelmat(smoothie: Smoothie) {
	// 	console.log('nyt ollaan haetamansmoothien funktion sisällä');
	// 	console.log('nyt ollaan haetamansmoothien funktion sisällä2');
	// 	for (let i = 0; i < smoothie.ingredients.length; i++) {
	// 		console.log(`${smoothie.name} - ${smoothie.ingredients[i]}`);
	// 		globalFruits.get().forEach((fruit) => {
	// 			console.log(fruit.name);
	// 			console.log('test2');
	// 		});

	// 		// console.log(`Hedelma: ${hedelmaIndex}`);
	// 		// if (hedelma) {
	// 		// tamanSmoothienHedelmat.push(hedelma);
	// 		// }
	// 	}
	// }

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
	$inspect(smoothieKortti.ravintoarvotYht);
</script>

<div class="card">
	<img src="smoothie_placeholder.jpg" alt={smoothieKortti.smoothie.name} />
	<h2>{smoothieKortti.smoothie.name}</h2>
	<h3>Ingredients</h3>
	{#each smoothieKortti.hedelmat as hedelma (hedelma)}
		<p>{hedelma}</p>
	{/each}
	<h3>Nutritional Information</h3>
	<p>Calories: {smoothieKortti.ravintoarvotYht.calories}</p>
	<p>Carbohydrates: {smoothieKortti.ravintoarvotYht.carbohydrates}</p>
	<p>Protein: {smoothieKortti.ravintoarvotYht.protein}</p>
	<p>Fat: {smoothieKortti.ravintoarvotYht.fat}</p>
	<p>Sugar: {smoothieKortti.ravintoarvotYht.sugar}</p>

	<h3>Notes</h3>
	{#if noteskentta}
		<Notes placeholder="Add your notes" />
	{/if}
	<Button buttonText="Add Note" buttonFunction={avaanoteskentta} />
	<Button buttonText="Resepti" buttonFunction={avaaSmoothieResepti} />
</div>

{#if modalAuki}
	<Button buttonText="testipainike" buttonFunction={() => {}} buttonActive={true} />
	<Modal>
		{#snippet header()}
			<h1>{smoothie.name}</h1>
		{/snippet}
		<h2>Ingredients</h2>
		<p>{smoothie.ingredients}</p>
		<h2>Nutritional Information</h2>
		{#snippet footer()}
			<h1>Notes</h1>
			<p>{teksti}</p>
			<Button buttonText="Sulje" buttonFunction={avaaModal} />
		{/snippet}
	</Modal>
{/if}

<style>
	.card {
		background-color: #f9f9f9;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 16px;
		margin: 16px;
	}
	.card h1 {
		font-size: 1.5em;
		margin-bottom: 8px;
	}
	.card h2 {
		font-size: 1.2em;
		margin-bottom: 4px;
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
