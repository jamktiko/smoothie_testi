<script lang="ts">
	// ----------------------- IMPORTIT ---------------------------

	import { goto } from '$app/navigation';
	import { smoothies as globalSmoothies } from '$lib/globalSmoothies.svelte';
	import {
		smoothieKortit as globalSmoothieKortit,
		smoothieKortit
	} from '$lib/globalSmoothieKortit.svelte';
	import { fruits as globalFruits } from '$lib/globalFruits.svelte';
	import { amountNumbers as globalAmountNumbers } from '$lib/globalAmountNumbers.svelte';
	import type { Fruit } from '$lib/types/fruit';
	import { ingredientFormatointi } from '$lib/ingredientFormatointi';
	import Notes from '$lib/Notes.svelte';
	import SmoothieCard from '$lib/SmoothieCard.svelte';
	import { blur } from 'svelte/transition';
	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import type { Smoothie } from '$lib/types/smoothie';
	import type { NutritionInfo } from '$lib/types/nutritionInfo';
	import { luoSmoothieKortti } from '$lib/luoSmoothieKortti';
	import { SmoothieTime } from '$lib/globalSmoothietime.svelte';

	// ----------------------- FUNKTIOT ---------------------------

	function homePage() {
		goto('/');
	}

	function add() {
		if (selected.length > 0 && amount > 0) {
			uudenSmoothienIngredients.push(`${selected}`);
			uudenSmoothienIngredientsAmounts.push(amount);
		} else {
			throw new Error('Valitse ensin hedelmä ja määrä!');
		}
	}

	function remove(index: number) {
		uudenSmoothienIngredients.splice(index, 1);
		uudenSmoothienIngredientsAmounts.splice(index, 1);
	}

	function createSmoothie() {
		// console.log('newSmoothie: ', newSmoothie);
		const newSmoothie: Smoothie = {
			id: globalSmoothies.get()[globalSmoothies.get().length - 1].id + 1,
			name: uudenSmoothienNimi,
			ingredients: uudenSmoothienIngredients,
			ingredientsAmount: uudenSmoothienIngredientsAmounts,
			pic: 'https://cdn.pixabay.com/photo/2018/03/16/04/54/healthy-3230225_1280.jpg',
			preparationTimeMinutes: uudenSmoothienValmistusaika,
			notes: uudenSmoothienNotet
		};
		luoSmoothieKortti(newSmoothie, true);
		// const newSmoothieCard: SmoothieKortti = {
		// 	ID: newSmoothie.id,
		// 	smoothie: newSmoothie,
		// 	hedelmat: newSmoothie.ingredients,
		// 	hedelmatMaara: newSmoothie.ingredientsAmount,
		// 	ravintoarvot: [],
		// 	ravintoarvotYht: {
		// 		calories: 0,
		// 		carbohydrates: 0,
		// 		protein: 0,
		// 		fat: 0,
		// 		sugar: 0
		// 	},
		// 	pic: newSmoothie.pic,
		// 	valmistusAika: newSmoothie.preparationTimeMinutes,
		// 	notes: newSmoothie.notes
		// };

		// console.log('newSmoothieCard: ', newSmoothieCard);

		globalSmoothies.get().push(newSmoothie);
		// globalSmoothieKortit.get().push(newSmoothieCard);
		homePage();
	}

	$effect(() => {
		if (kunnollinenAdd) {
			addDisabled = false;
		}
	});
	// ----------------------- MUUTTUJAT --------------------------

	let selected = $state(' ');
	let amount: number = $state(0);
	let addDisabled = $state(true);
	let uudenSmoothienNimi = $state('');
	let uudenSmoothienValmistusaika: number = $state(NaN);
	let uudenSmoothienIngredients: string[] = $state([]);
	let uudenSmoothienIngredientsAmounts: number[] = $state([]);
	let uudenSmoothienNotet = $state('');

	// ------------------- VIRHEENTARKISTUS ----------------------

	let visitedNimiKentta = $state(false);

	let kunnollinenNimi = $derived(uudenSmoothienNimi.length > 0 && visitedNimiKentta ? true : false);
	let kunnollinenValmistusaika = $derived(isNaN(uudenSmoothienValmistusaika) ? false : true);
	let kunnollisetIngredients = $derived(uudenSmoothienIngredients.length > 0 ? true : false);

	let oikeanlaisetSmoothienTiedot = $derived(
		kunnollinenNimi && kunnollinenValmistusaika && kunnollisetIngredients
	);

	let kunnollinenAmount = $derived(amount > 0 ? true : false);
	let kunnollinenIngredient = $derived(selected.length > 1 ? true : false);
	let kunnollinenAdd = $derived(kunnollinenAmount && kunnollinenIngredient);

	let nimiKenttaStyle = $derived(
		visitedNimiKentta && !kunnollinenNimi
			? 'laila-medium h-9 w-full resize-none rounded-xl border-1 bg-rose-100 px-2 py-4 text-rose-700'
			: 'laila-medium h-9 w-full resize-none rounded-xl border-1 bg-white px-2 py-4 text-black'
	);

	let nimiKenttaPlaceholder = $derived(
		visitedNimiKentta && !kunnollinenNimi ? 'Please insert name!' : 'Name of smoothie'
	);
	// ------------------------- DEBUG ----------------------------

	// $inspect(visitedNimiKentta);
	// $inspect(kunnollisetIngredients);
	// $inspect(kunnollinenNimi);
	// $inspect(kunnollinenValmistusaika);
	// $inspect(globalAmountNumbers.get());
	// $inspect(uudenSmoothienNimi);
	// $inspect(uudenSmoothienValmistusaika);
	// $inspect(uudenSmoothienNotet);
	// $inspect(selected);
	// $inspect(ingredientsAmountTaulukko);
	// $inspect(uudenSmoothienIngredients);
	// $inspect(uudenSmoothienIngredientsAmounts);
	// $inspect(amount);
	// $inspect(globalFruits.get());
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
	href="https://fonts.googleapis.com/css2?family=Honk&family=Kalnia+Glaze:wght@100..700&family=Laila:wght@300;400;500;600;700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merienda:wght@300..900&family=Nabla&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
	rel="stylesheet"
/>

<!-- Outer Div -->

<div
	class="bg-opacity-0 m-0.5 mt-5 flex flex-wrap justify-center"
	in:blur={{ duration: 500 }}
	out:blur={{ duration: 300 }}
>
	{#if globalFruits.get().length > 0}
		<!-- Add Card -->
		<div
			class="relative mb-5 flex w-full max-w-xl flex-col overflow-hidden rounded-xl border-2 bg-rose-100 shadow-lg shadow-slate-300"
			in:blur={{ duration: 500 }}
			out:blur={{ duration: 300 }}
		>
			<!-- Image -->
			<div class="relative">
				<img
					src="https://cdn.pixabay.com/photo/2018/03/16/04/54/healthy-3230225_1280.jpg"
					alt="Green Smoothie"
					class="max-h-60 w-full rounded-xl border-b-2 object-cover"
				/>
			</div>

			<!-- Content-->
			<div class="flex-1 flex-col overflow-y-auto p-4">
				<!-- Title and Timer -->
				<div
					class="items-start justify-between [@media(min-width:400px)]:flex-row [@media(min-width:400px)]:items-center"
				>
					<!-- Name of Smoothie -->
					<div class="bg mb-1 flex items-center gap-2">
						<input
							bind:value={uudenSmoothienNimi}
							onblur={() => {
								visitedNimiKentta = true;
							}}
							placeholder={nimiKenttaPlaceholder}
							type="text"
							class={nimiKenttaStyle}
						/>
					</div>

					<!-- color: #eb0000; -->

					<!-- <select
				placeholder="Prep time (minutes)"
				bind:value={uudenSmoothienValmistusaika}
				class="my-1 w-45 rounded-xl border-1 bg-white p-1 pl-3 text-slate-600"
			>
				<option value="" disabled selected hidden>Valitse määrä</option>
				{#each valmistusajatMin as a}
					<option value={a}>{a}</option>
				{/each}
			</select> -->

					<!-- <input
						class="laila-light my-1 w-full rounded-xl border-1 bg-white p-1 pl-3 text-slate-600"
						type="number"
						min="1"
						max="60"
						placeholder="Prep time (minutes)"
						bind:value={uudenSmoothienValmistusaika}
					/> -->

					<!-- Preparation time (minutes) -->
					<select
						bind:value={uudenSmoothienValmistusaika}
						class="laila-light my-1 w-full rounded-xl border-1 bg-white p-1 pl-3 text-slate-600"
					>
						<option value={NaN} disabled selected hidden>Preparation time</option>
						{#each SmoothieTime as a}
							<option value={a}>{a} min</option>
						{/each}
					</select>
				</div>

				<!-- Ingredients -->
				<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
					<h2 class="text-md laila-medium">Ingredients</h2>
					<ul class="laila-regular px-1 py-1 text-sm text-slate-600">
						{#each uudenSmoothienIngredients as ingredient, index}
							<li class="flex flex-row items-center pr-2">
								{ingredientFormatointi(uudenSmoothienIngredientsAmounts[index])}
								{ingredient}
								<button
									onclick={() => remove(index)}
									class="laila-regular my-1 ml-auto cursor-pointer rounded-xl border-1 bg-slate-50 px-2 py-0.5 hover:bg-slate-100 hover:text-black"
									>Remove</button
								>
							</li>
						{/each}

						<!-- Dropdowns at bottom of list -->
						<li class="justify-left mt-3 flex w-full flex-col gap-2 pr-2">
							<div class="flex flex-col gap-2 sm:grid sm:grid-cols-2">
								<button
									class="w-fill laila-regular flex cursor-pointer flex-row items-center rounded-xl border-1 px-3 py-0.5 hover:outline-1"
								>
									<select class="w-full focus:outline-none" bind:value={amount}>
										<option value={0} disabled selected hidden>Amount</option>
										{#each globalAmountNumbers.get() as a}
											<option value={a}>{a}</option>
										{/each}
									</select>
								</button>
								<button
									class="w-fill laila-regular flex cursor-pointer flex-row items-center rounded-xl border-1 px-3 py-0.5 hover:outline-1"
								>
									<select class="w-full focus:outline-none" bind:value={selected}>
										<option value={' '} disabled selected hidden>Choose ingredient</option>
										{#each globalFruits.get() as fruit}
											<option value={fruit.name}>{fruit.name}</option>
										{/each}
									</select>
								</button>
							</div>
							<button
								class="laila-regular hover:laila-medium cursor-pointer rounded-xl border-1 bg-orange-200 px-5 py-1 text-black hover:bg-orange-300 hover:outline-1"
								onclick={add}
								disabled={addDisabled}>Add</button
							>
						</li>
					</ul>
				</div>

				<!-- Notes -->
				<div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
					<h2 class="text-md laila-medium">Notes</h2>
					<Notes
						placeholder={'Add some notes about this recipe'}
						bind:taytto={uudenSmoothienNotet}
						ellipsisWrapOn={true}
					/>
				</div>
				<!-- <div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
			<h2 class="text-md laila-medium">Notes</h2>
			<p class="laila-regular text-sm text-slate-600">Add some notes about this recipe</p>
		</div> -->

				<!-- buttons below  -->
				<div class="mt-2 flex flex-row items-center justify-center gap-5">
					<button
						onclick={homePage}
						class="laila-regular hover:laila-medium w-full cursor-pointer rounded-xl border-1 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100 hover:text-black hover:outline-1"
						>Cancel</button
					>
					<button
						disabled={!oikeanlaisetSmoothienTiedot}
						onclick={createSmoothie}
						class="laila-regular hover:laila-medium w-full cursor-pointer rounded-xl border-1 bg-orange-200 p-2 hover:bg-orange-300 hover:outline-1"
						>Create</button
					>
				</div>
			</div>
		</div>
	{:else}
		<!-- temporary loading spinner -->
		<div class="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	{/if}

	<!-- end of Outer Div -->
</div>

<style>
	/* loading spinner styles */
	.lds-ring {
		/* change color here */
		color: #f47e60;
	}
	.lds-ring,
	.lds-ring div {
		box-sizing: border-box;
	}
	.lds-ring {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 8px solid currentColor;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: currentColor transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	button:disabled {
		background-color: #00000020;
		color: darkgray;
		cursor: not-allowed;
	}

	button:disabled:hover {
		/* border-width: unset; */
		outline-width: 0px;
	}
</style>
