<script lang="ts">
	import type { SmoothieKortti } from '$lib/types/smoothieKortti';

	import Notes from './Notes.svelte';
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';

	interface Props {
		smoothieKortti: SmoothieKortti;
	}
	let { smoothieKortti } = $props();

	// notes kentän arvo
	let teksti = $state('');

	// avaa smoothie reseptin
	let modalAuki = $state(false);
	function avaaModal() {
		modalAuki = !modalAuki;
	}

	$inspect(smoothieKortti.ID);
	$inspect(smoothieKortti.smoothie.name);
	$inspect(smoothieKortti.hedelmat);
	$inspect(smoothieKortti.ravintoarvot);
	$inspect(smoothieKortti.ravintoarvotYht);
	$inspect(smoothieKortti.pic);
</script>

<!-- Kortti -->
<div
	class="relative flex w-full flex-col overflow-hidden rounded-xl border-2 bg-rose-50 shadow-lg shadow-slate-300 sm:h-165 sm:w-[47%] lg:w-[31%]"
	onclick={avaaModal}
>
	<!-- Kortin sisältö -->
	<img
		src={smoothieKortti.pic}
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
			{#each smoothieKortti.hedelmat as hedelma (hedelma)}
				<p class="laila-regular py-1 text-sm text-gray-600">{hedelma}</p>
			{/each}
			<!-- <p class="laila-regular py-1 text-sm text-gray-600">{smoothie.ingredients}</p> -->
		</div>
		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Nutritional Information</h2>
			<p class="laila-regular py-1 text-sm text-gray-600">
				Calories: {smoothieKortti.ravintoarvotYht.calories.toFixed(1)}
			</p>
			<p class="laila-regular py-1 text-sm text-gray-600">
				Carbohydrates: {smoothieKortti.ravintoarvotYht.carbohydrates.toFixed(1)}
			</p>
			<p class="laila-regular py-1 text-sm text-gray-600">
				Protein: {smoothieKortti.ravintoarvotYht.protein.toFixed(1)}
			</p>
			<p class="laila-regular py-1 text-sm text-gray-600">
				Fat: {smoothieKortti.ravintoarvotYht.fat.toFixed(1)}
			</p>
			<p class="laila-regular py-1 text-sm text-gray-600">
				Sugar: {smoothieKortti.ravintoarvotYht.sugar.toFixed(1)}
			</p>
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
			<Button buttonText={smoothieKortti.smoothie.name} buttonFunction={avaaModal} />
			<span class="material-symbols-outlined ml-2">arrow_forward_ios</span>
		</button>
	</div>
</div>

{#if modalAuki}
	<Modal>
		{#snippet header()}
			<h1>{smoothieKortti.smoothie.name}</h1>
		{/snippet}
		<h2>Ingredients</h2>

		{#each smoothieKortti.hedelmat as hedelma (hedelma)}
			<p>{hedelma}</p>
		{/each}
		<h2>Nutritional Information</h2>
		<p>Calories: {smoothieKortti.ravintoarvotYht.calories.toFixed(1)}</p>
		<p>Carbohydrates: {smoothieKortti.ravintoarvotYht.carbohydrates.toFixed(1)}</p>
		<p>Protein: {smoothieKortti.ravintoarvotYht.protein.toFixed(1)}</p>
		<p>Fat: {smoothieKortti.ravintoarvotYht.fat.toFixed(1)}</p>
		<p>Sugar: {smoothieKortti.ravintoarvotYht.sugar.toFixed(1)}</p>

		{#snippet footer()}
			<h1>Notes</h1>
			<p>{teksti}</p>
			<Button buttonText="Sulje" buttonFunction={avaaModal} />
		{/snippet}
	</Modal>
{/if}
