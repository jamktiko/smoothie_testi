<script lang="ts">
	// ----------------------- IMPORTIT ---------------------------

	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import Notes from './Notes.svelte';
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';
	import { scale, blur } from 'svelte/transition';
	import { ingredientFormatointi } from '../modules/ingredientFormatointi';

	// ------------------------ PROPSIT ---------------------------

	interface Props {
		smoothieKortti: SmoothieKortti;
	}

	let { smoothieKortti }: Props = $props();

	// ----------------------- FUNKTIOT ---------------------------

	// avaa smoothie reseptin modal ikkunan (toggle) ja käy päivittämässä smoothiekortin ja smoothien propertyjä kun suljetaan
	function toggleModal() {
		if (modalAuki) {
			smoothieKortti.notes = notesTeksti;
			smoothieKortti.smoothie.notes = notesTeksti;
		}
		modalAuki = !modalAuki;
	}

	// effect, jos modal on auki, niin scroll bar menee piiloon
	$effect(() => {
		if (modalAuki) {
			originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = originalOverflow;
		}
	});

	// ----------------------- MUUTTUJAT --------------------------

	// notes kentän arvo
	let notesTeksti = $state(smoothieKortti.notes);

	// onko modal auki vai ei
	let modalAuki = $state(false);

	// muuttaa scrollbaring piiloon kun modal on auki
	let originalOverflow = $state('');

	// ------------------------- DEBUG ----------------------------

	// $inspect(smoothieKortti.ID);
	// $inspect(smoothieKortti.smoothie.name);
	// $inspect(smoothieKortti.ainesosat);
	// $inspect(smoothieKortti.ravintoarvot);
	// $inspect(smoothieKortti.ravintoarvotYht);
	// $inspect(smoothieKortti.pic);
	// $inspect(smoothieKortti.ainesosatMaara);
	// $inspect(notesTeksti);
	// $inspect(smoothieKortti.notes);
</script>

<!-- ----------------------- HTML --------------------------- -->

<!-- SmoothieKortti -->

<div
	class="relative flex max-h-fit w-full flex-col overflow-hidden rounded-xl border-2 bg-rose-100 shadow-lg shadow-slate-300 hover:bg-orange-200 sm:max-h-full sm:w-[47%] sm:transform sm:transition-transform sm:duration-300 sm:hover:scale-103 lg:w-[31%]"
	in:blur={{ duration: 500 }}
	out:blur={{ duration: 300 }}
>
	<!-- SmoothieKortin sisältö -->
	<button
		class="absolute hidden h-full w-full cursor-pointer
			  sm:block"
		onclick={toggleModal}
		aria-label="modal-button"
	></button>
	<!-- Image -->
	<img
		src={smoothieKortti.pic}
		alt={smoothieKortti.smoothie.name}
		class="h-48 w-full rounded-b-xl border-b-2 object-cover sm:h-60"
	/>
	<!-- Nämä menee piiloon mobiilissa -->
	<div class="hidden flex-1 flex-col overflow-y-auto p-4 sm:flex">
		<div class="flex flex-col items-start justify-between md:flex-row md:items-center">
			<!-- Smoothien nimi -->
			<h1 class="laila-medium text-2xl">{smoothieKortti.smoothie.name}</h1>
			<div class="flex items-end text-slate-600">
				<!-- Smoothien valmistusaika -->
				<span class="laila-regular mr-1 pt-1">{smoothieKortti.valmistusAika} min</span>
				<span class="material-symbols-outlined">timer</span>
			</div>
		</div>

		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<!-- Smoothien ainesosat -->
			<h2 class="text-md laila-medium">Ingredients</h2>
			<ul class="list-disc columns-2 space-y-0 py-1.5 pl-5 text-sm">
				{#each smoothieKortti.ainesosat as ainesosa, index}
					<li class="laila-regular text-gray-600">
						{ingredientFormatointi(smoothieKortti.hedelmatMaara[index])}
						{ainesosa}
					</li>
				{/each}
			</ul>
		</div>

		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<!-- Nutritional Information -->
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
		<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Notes</h2>
			<Notes
				placeholder={'No notes yet'}
				bind:taytto={notesTeksti}
				ellipsisWrapOn={true}
				name={'smoothie notes'}
			/>
		</div>
	</div>
	<!-- Tähän loppuu SmoothieKortin sisältö -->

	<!-- modalin avaava button (vain mobile layout) -->
	<Button buttonText={smoothieKortti.smoothie.name} buttonFunction={toggleModal} />
</div>

<!-- MODAL -->

{#if modalAuki}
	<Modal {toggleModal}>
		<div>
			<!-- Card (open) -->
			<!-- Animaatio modaliin, duration vaihtaa nopeutta -->
			<div
				class=" fixed top-[10px] left-1/2 z-[100] flex max-h-[97dvh] w-1/2 -translate-x-1/2 flex-col justify-center overflow-y-auto rounded-xl border-2 bg-rose-100 shadow-lg shadow-slate-900
				[@media(max-width:640px)]:top-0
				[@media(max-width:640px)]:max-h-[100dvh]
				[@media(max-width:640px)]:w-screen"
				in:scale={{ duration: 400 }}
				out:scale={{ duration: 400 }}
			>
				<!-- Image -->
				<div class="relative">
					<img
						src={smoothieKortti.pic}
						alt={smoothieKortti.smoothie.name}
						class="max-h-70 w-full rounded-b-xl border-b-2 object-cover"
					/>

					<button
						onclick={toggleModal}
						class="absolute top-3 left-3 block cursor-pointer rounded-lg border-2 bg-slate-200 leading-none hover:bg-slate-600 hover:text-white"
					>
						<span class="material-symbols-outlined icon-heavy">close</span>
					</button>
				</div>

				<!-- Content (desktop only text, no button) -->
				<div class=" flex-1 flex-col overflow-y-auto p-4">
					<!-- Title and Timer -->
					<div class="flex flex-col items-start justify-between md:flex-row md:items-center">
						<div class="flex items-center gap-2">
							<!-- Back button -->
							<!-- <button
								onclick={toggleModal}
								class="material-symbols-outlined transform cursor-pointer pb-1 transition-transform duration-200 hover:scale-125"
								>arrow_back_ios</button
							> -->
							<!-- Smoothien nimi -->
							<h1 class="laila-medium text-2xl">{smoothieKortti.smoothie.name}</h1>
						</div>
						<!-- Smoothien valmistusaika -->
						<div class="ml-1 flex items-center gap-1 text-slate-600">
							<span class="laila-regular pt-1">{smoothieKortti.valmistusAika} min</span>
							<span class="material-symbols-outlined">timer</span>
						</div>
					</div>

					<!-- Ingredients -->
					<div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
						<h2 class="text-md laila-medium">Ingredients</h2>
						<ul class="laila-regular list-disc py-1 pl-3.5 text-sm text-gray-600">
							{#each smoothieKortti.ainesosat as ainesosa, index}
								<li>
									{ingredientFormatointi(smoothieKortti.hedelmatMaara[index])}
									{ainesosa}
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
						<Notes
							placeholder={'Add some notes about this recipe'}
							bind:taytto={notesTeksti}
							name={'Smoothie notes'}
						/>
					</div>
				</div>
			</div>
		</div>
	</Modal>
{/if}
