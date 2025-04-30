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

<!-- Kortti -->

<!-- Siirä	onclick={avaaModal} tämä takaisin alempaan diviin -->

<div
	class="relative flex w-full flex-col overflow-hidden rounded-xl border-2 bg-rose-50 shadow-lg shadow-slate-300 sm:h-165 sm:w-[47%] lg:w-[31%]"
>
	<!-- Kortin sisältö -->
	<img
		src="smoothie_placeholder.jpg"
		alt={smoothieKortti.smoothie.name}
		class="h-48 w-full rounded-xl border-b-2 object-cover sm:h-60"
	/>
	<!-- Nämä menee piiloon mobiilissa -->
	<div class="hidden flex-1 flex-col overflow-y-auto p-4 sm:flex">
		<div class="mb-2 flex items-center justify-between">
			<h1 class="laila-medium text-2xl">{smoothieKortti.smoothie.name}</h1>
			<div class="flex items-center gap-1 text-slate-600">
				<span class="laila-regular pt-1">3 min</span>
				<span class="material-symbols-outlined">timer</span>
			</div>
		</div>

		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Ingredients</h2>
			<ul class="space-y-0 text-sm">
				{#each smoothieKortti.hedelmat as hedelma (hedelma)}
					<li class="laila-regular text-gray-600">{hedelma}</li>
				{/each}
			</ul>
		</div>

		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Nutritional Information</h2>
			<ul class="laila-regular py-1 text-sm text-gray-600">
				<li>Calories: {smoothieKortti.ravintoarvotYht.calories}</li>
				<li>Carbohydrates: {smoothieKortti.ravintoarvotYht.carbohydrates}</li>
				<li>Protein: {smoothieKortti.ravintoarvotYht.protein}</li>
				<li>Fat: {smoothieKortti.ravintoarvotYht.fat}</li>
				<li>Sugar: {smoothieKortti.ravintoarvotYht.sugar}</li>
			</ul>
		</div>
		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Notes</h2>
			<Notes placeholder={'lisää muistiinpanoja'} bind:taytto={teksti} />
		</div>
	</div>
	<!-- Tähän loppuu kortin sisältö -->

	<Button buttonText={smoothieKortti.smoothie.name} buttonFunction={avaaModal} />
</div>

{#if modalAuki}
	<Button buttonText="testipainike" buttonFunction={() => {}} buttonActive={true} />
	<Modal>
		{#snippet header()}
			<h1>{smoothieKortti.smoothie.name}</h1>
		{/snippet}
		<h2>Ingredients</h2>

		{#each smoothieKortti.hedelmat as hedelma (hedelma)}
			<p>{hedelma}</p>
		{/each}
		<h2>Nutritional Information</h2>
		<p>Calories: {smoothieKortti.ravintoarvotYht.calories}</p>
		<p>Carbohydrates: {smoothieKortti.ravintoarvotYht.carbohydrates}</p>
		<p>Protein: {smoothieKortti.ravintoarvotYht.protein}</p>
		<p>Fat: {smoothieKortti.ravintoarvotYht.fat}</p>
		<p>Sugar: {smoothieKortti.ravintoarvotYht.sugar}</p>

		{#snippet footer()}
			<h1>Notes</h1>
			<p>{teksti}</p>
			<Button buttonText="Sulje" buttonFunction={avaaModal} />
		{/snippet}
	</Modal>
{/if}

<!-- <style>
	.card {
		/* display: revert; */
		/* all: unset; */
		/* display: block; */
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
</style> -->
