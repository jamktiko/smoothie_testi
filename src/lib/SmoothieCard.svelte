<script lang="ts">
	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import Notes from './Notes.svelte';
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';
	import { fade, scale, slide, blur } from 'svelte/transition';

	interface Props {
		smoothieKortti: SmoothieKortti;
	}
	let { smoothieKortti } = $props();

	// notes kentän arvo
	let teksti = $state('');

	let modalAuki = $state(false);

	// avaa smoothie reseptin
	function avaaModal() {
		modalAuki = !modalAuki;
	}

	// tämä funktio testaa onko hedelmien määrä kokonaisluku vai desimaaliluku ja palauttaa vastaavan ½, ¼ tai ¾
	function hedelmaMaaranFormatointi(hedelmanMaara: number) {
		if (hedelmanMaara < 1) {
			return hedelmanMaara % 1 === 0
				? hedelmanMaara.toString()
				: hedelmanMaara % 0.75 === 0
					? `¾`
					: hedelmanMaara % 0.5 === 0
						? `½`
						: hedelmanMaara % 0.25 === 0
							? `¼`
							: null;
		} else {
			return hedelmanMaara % 1 === 0
				? hedelmanMaara.toString()
				: hedelmanMaara % 1 === 0.75
					? `${Math.floor(hedelmanMaara)}¾`
					: hedelmanMaara % 1 === 0.5
						? `${Math.floor(hedelmanMaara)}½`
						: hedelmanMaara % 1 === 0.25
							? `${Math.floor(hedelmanMaara)}¼`
							: null;
		}
	}

	// $inspect(smoothieKortti.ID);
	// $inspect(smoothieKortti.smoothie.name);
	// $inspect(smoothieKortti.hedelmat);
	// $inspect(smoothieKortti.ravintoarvot);
	// $inspect(smoothieKortti.ravintoarvotYht);
	// $inspect(smoothieKortti.pic);
	// $inspect(smoothieKortti.hedelmatMaara);
</script>

<!-- Kortti -->

<!-- Siirä	onclick={avaaModal} tämä takaisin alempaan diviin -->

<div
	class="relative flex w-full flex-col overflow-hidden rounded-xl border-2 bg-rose-100 shadow-lg shadow-slate-300 hover:bg-orange-200 sm:h-165 sm:w-[47%] lg:w-[31%]"
	in:blur={{ duration: 500 }}
	out:blur={{ duration: 300 }}
>
	<!-- Kortin sisältö -->
	<button
		class="absolute hidden h-full w-full cursor-pointer sm:block"
		onclick={avaaModal}
		aria-label="modal-button"
	></button>
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
				<span class="laila-regular pt-1">{smoothieKortti.valmistusAika} min</span>
				<span class="material-symbols-outlined">timer</span>
			</div>
		</div>

		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Ingredients</h2>
			<ul class="list-disc space-y-0 pl-5 text-sm">
				{#each smoothieKortti.hedelmat as hedelma, index}
					<li class="laila-regular text-gray-600">
						{hedelmaMaaranFormatointi(smoothieKortti.hedelmatMaara[index])}
						{hedelma}
					</li>
				{/each}
			</ul>
		</div>

		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Nutritional Information</h2>
			<ul class="laila-regular py-1 text-sm text-gray-600">
				<li>Calories: {smoothieKortti.ravintoarvotYht.calories.toFixed(1)} kcal</li>
				<li>Carbohydrates: {smoothieKortti.ravintoarvotYht.carbohydrates.toFixed(1)} g</li>
				<li>Protein: {smoothieKortti.ravintoarvotYht.protein.toFixed(1)} g</li>
				<li>Fat: {smoothieKortti.ravintoarvotYht.fat.toFixed(1)} g</li>
				<li>Sugar: {smoothieKortti.ravintoarvotYht.sugar.toFixed(1)} g</li>
			</ul>
		</div>
		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Notes</h2>
			<Notes placeholder={'Add notes'} bind:taytto={teksti} />
		</div>
	</div>
	<!-- Tähän loppuu kortin sisältö -->

	<Button buttonText={smoothieKortti.smoothie.name} buttonFunction={avaaModal} />
</div>

<!-- MY CODE IS HERE -->

{#if modalAuki}
	<Modal {avaaModal}>
		<div>
			<!-- Card (open) -->
			<!-- Animaatio modaliin, duration vaihtaa nopeutta -->
			<div
				class=" fixed top-[10px] left-1/2 z-100 flex max-h-[97vh] w-1/2 -translate-x-1/2 flex-col justify-center overflow-hidden overflow-y-auto rounded-xl border-2 bg-rose-100 shadow-lg shadow-slate-900
				[@media(max-width:600px)]:top-0
				[@media(max-width:600px)]:max-h-screen
				[@media(max-width:600px)]:w-screen"
				in:scale={{ duration: 400 }}
				out:scale={{ duration: 500 }}
			>
				<!-- Image -->
				<div class="relative">
					<img
						src={smoothieKortti.pic}
						alt={smoothieKortti.smoothie.name}
						class="max-h-70 w-full rounded-xl border-b-2 object-cover"
					/>
				</div>

				<!-- Content (desktop only text, no button) -->
				<div class=" flex-1 flex-col overflow-y-auto p-4">
					<!-- Title and Timer -->
					<div
						class="flex flex-col items-start justify-between [@media(min-width:600px)]:flex-row [@media(min-width:600px)]:items-center"
					>
						<div class="flex items-center gap-2">
							<button onclick={avaaModal} class="material-symbols-outlined pb-1"
								>arrow_back_ios</button
							>
							<h1 class="laila-medium text-2xl">{smoothieKortti.smoothie.name}</h1>
						</div>
						<div class="ml-8 flex items-center gap-1 text-slate-600">
							<span class="laila-regular pt-1">{smoothieKortti.valmistusAika} min</span>
							<span class="material-symbols-outlined">timer</span>
						</div>
					</div>

					<!-- Ingredients -->
					<div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
						<h2 class="text-md laila-medium">Ingredients</h2>
						<ul class="laila-regular list-disc py-1 pl-3 text-sm text-gray-600">
							{#each smoothieKortti.hedelmat as hedelma, index}
								<li>
									{hedelmaMaaranFormatointi(smoothieKortti.hedelmatMaara[index])}
									{hedelma}
								</li>
							{/each}
						</ul>
					</div>

					<!-- Nutritional Information -->
					<div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
						<h2 class="text-md laila-medium">Nutritional Information</h2>
						<ul class="laila-regular py-1 text-sm text-gray-600">
							<li>Calories: {smoothieKortti.ravintoarvotYht.calories.toFixed(1)} kcal</li>
							<li>Carbohydrates: {smoothieKortti.ravintoarvotYht.carbohydrates.toFixed(1)} g</li>
							<li>Protein: {smoothieKortti.ravintoarvotYht.protein.toFixed(1)} g</li>
							<li>Fat: {smoothieKortti.ravintoarvotYht.fat.toFixed(1)} g</li>
							<li>Sugar: {smoothieKortti.ravintoarvotYht.sugar.toFixed(1)} g</li>
						</ul>
					</div>

					<!-- Notes -->
					<div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
						<h2 class="text-md laila-medium">Notes</h2>
						<Notes placeholder={'Add notes'} bind:taytto={teksti} />
					</div>
				</div>
			</div>
			<!-- </div> -->
		</div>
	</Modal>
{/if}
