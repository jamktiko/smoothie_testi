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

<!-- Kortti -->
<div
	class="relative flex w-full flex-col overflow-hidden rounded-xl border-2 bg-rose-50 shadow-lg shadow-slate-300 sm:h-165 sm:w-[47%] lg:w-[31%]"
>
	<!-- Kortin sisältö -->
	<img
		src="smoothie_placeholder.jpg"
		alt="placeholder kuva"
		class="h-48 w-full rounded-xl border-b-2 object-cover sm:h-60"
	/>
	<!-- Nämä menee piiloon mobiilissa -->
	<div class="hidden flex-1 flex-col overflow-y-auto p-4 sm:flex">
		<div class="mb-2 flex items-center justify-between">
			<h1 class="laila-medium text-2xl">{smoothie.name}</h1>
			<div class="flex items-center gap-1 text-slate-600">
				<span class="laila-regular pt-1">3 min</span>
				<span class="material-symbols-outlined">timer</span>
			</div>
		</div>
		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Ingredients</h2>
			<p class="laila-regular py-1 text-sm text-gray-600">{smoothie.ingredients}</p>
		</div>
		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Nutritional Information</h2>
			<p class="laila-regular py-1 text-sm text-gray-600">Nut info</p>
		</div>
		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Notes</h2>
			<Notes placeholder={'lisää muistiinpanoja'} bind:taytto={teksti} />
		</div>
	</div>
	<!-- Tähän loppuu kortin sisältö -->
	<div class="absolute right-4 bottom-4 sm:hidden">
		<!-- Nappi -->
		<button
			class="laila-semibold flex items-center rounded-3xl border-2 border-rose-700 bg-rose-100 px-4 py-2 text-rose-700 transition hover:bg-rose-200"
		>
			<Button buttonText={smoothie.name} buttonFunction={avaaModal} />
			<span class="material-symbols-outlined ml-2">arrow_forward_ios</span>
		</button>
	</div>
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

<!-- <style>
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
</style> -->
