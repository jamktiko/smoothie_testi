<script lang="ts">
	import Notes from './Notes.svelte';
	import Button from './Button.svelte';
	import type { Smoothie } from '$lib/types/smoothie';
	import type { Fruit } from '$lib/types/fruit';
	import type { NutritionInfo } from './types/nutritionInfo';

	import Modal from './Modal.svelte';
	interface Props {
		smoothie: Smoothie;
		fetchFruitsFunction: () => void;
	}
	let { smoothie, fetchFruitsFunction } = $props();
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
</script>

<div class="card">
	<img src="smoothie_placeholder.jpg" alt="placeholder kuva" />
	<h1>{smoothie.name}</h1>
	<h2>Ingredients</h2>
	<p>{smoothie.ingredients}</p>
	<h2>Nutritional Information</h2>
	<Notes placeholder={'lisää muistiinpanoja'} bind:taytto={teksti} />
	<Button buttonText={smoothie.name} buttonFunction={avaaModal} />
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
