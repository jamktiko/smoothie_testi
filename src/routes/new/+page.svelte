<script lang="ts">
	// ----------------------- IMPORTIT ---------------------------

	import type { Smoothie } from '$lib/types/smoothie';
	import type { NutritionInfo } from '$lib/types/nutritionInfo';
	import { luoSmoothieKortti } from '$lib/modules/luoSmoothieKortti';
	import { ingredientFormatointi } from '$lib/modules/ingredientFormatointi';
	import Notes from '$lib/components/Notes.svelte';
	import { goto } from '$app/navigation';
	import { fade, blur, slide } from 'svelte/transition';

	// universal reactivity muuttujat
	import { smoothies as globalSmoothies } from '$lib/globals/globalSmoothies.svelte';
	import { ingredients as globalIngredients } from '$lib/globals/globalIngredients.svelte';
	import { amountNumbers as globalAmountNumbers } from '$lib/globals/globalAmountNumbers.svelte';
	import { smoothieTime as globalSmoothieTime } from '$lib/globals/globalSmoothieTime.svelte';

	// ----------------------- FUNKTIOT ---------------------------

	// funktio, joka navigoi etusivulle
	function homePage() {
		goto('/');
	}

	// funktio, joka lisää ainesosan uuteen smoothieen
	function add() {
		if (uudenSmoothienIngredients.includes(selected)) {
			ingredientJoListassaError = true;
			setTimeout(() => {
				ingredientJoListassaError = false;
			}, 1250);
			throw new Error('Ainesosa on jo lisätty!');
		}
		if (selected.length > 0 && amount > 0) {
			uudenSmoothienIngredients.push(`${selected}`);
			uudenSmoothienIngredientsAmounts.push(amount);
		} else {
			throw new Error('Valitse ensin ainesosa ja määrä!');
		}
	}

	// funktio, joka poistaa ainesosan uudesta smoothiesta
	function remove(ingredient: string, index: number) {
		uudenSmoothienIngredients = uudenSmoothienIngredients.filter((item) => item !== ingredient);
		uudenSmoothienIngredientsAmounts.splice(index, 1);
	}

	// luo uuden smoothien ja uuden smoothieKortin ja lisää kummatkin globaleihin taulukoihin + poistuu takaisin etusivulle
	function createSmoothie() {
		const maxId = globalSmoothies
			.get()
			.reduce((max, smoothie) => (smoothie.id > max ? smoothie.id : max), -1);
		const newSmoothie: Smoothie = {
			id: maxId + 1,
			name: uudenSmoothienNimi,
			ingredients: uudenSmoothienIngredients,
			ingredientsAmount: uudenSmoothienIngredientsAmounts,
			pic: '/images/default-faded-leaf.jpg',
			preparationTimeMinutes: uudenSmoothienValmistusaika,
			notes: uudenSmoothienNotet
		};

		luoSmoothieKortti(newSmoothie, true);
		globalSmoothies.get().unshift(newSmoothie);
		// päivitetään localStoragen muuttuja smoothiesLS
		localStorage.setItem('smoothiesLS', JSON.stringify(globalSmoothies.get()));
		homePage();
	}

	// hakee ainesosat ja laskee niiden yhteenlasketut ravintoarvot ja palauttaa ne
	function haeAineksetJaLaskeRavintoarvot(
		uudenSmoothienIngredients: string[],
		uudenSmoothienIngredientsAmounts: number[]
	) {
		const ravintoarvotYht: NutritionInfo = {
			calories: 0,
			carbohydrates: 0,
			protein: 0,
			fat: 0,
			sugar: 0
		};

		if (uudenSmoothienIngredients.length > 0 && uudenSmoothienIngredientsAmounts.length > 0) {
			for (let i = 0; i < uudenSmoothienIngredients.length; i++) {
				const loytynytIngredient = globalIngredients.get().find((ingredient) => {
					return ingredient.name === uudenSmoothienIngredients[i];
				});

				ravintoarvotYht.calories +=
					loytynytIngredient?.nutritions.calories * uudenSmoothienIngredientsAmounts[i];
				ravintoarvotYht.carbohydrates +=
					loytynytIngredient?.nutritions.carbohydrates * uudenSmoothienIngredientsAmounts[i];
				ravintoarvotYht.protein +=
					loytynytIngredient?.nutritions.protein * uudenSmoothienIngredientsAmounts[i];
				ravintoarvotYht.fat +=
					loytynytIngredient?.nutritions.fat * uudenSmoothienIngredientsAmounts[i];
				ravintoarvotYht.sugar +=
					loytynytIngredient?.nutritions.sugar * uudenSmoothienIngredientsAmounts[i];
			}
		}

		return ravintoarvotYht;
	}

	// effect joka ottaa add-napin disablen pois päältä kun kaikki on kunnossa
	$effect(() => {
		if (kunnollinenAdd) {
			addDisabled = false;
		}
	});

	// ----------------------- MUUTTUJAT --------------------------

	// tällä hetkellä valittu ainesosa
	let selected = $state(' ');
	// tällä hetkellä valitun ainesosan määrä
	let amount: number = $state(0);
	// disabled napin tila
	let addDisabled = $state(true);

	// uuden smoothien muuttujat:
	let uudenSmoothienNimi = $state('');
	let uudenSmoothienValmistusaika: number = $state(NaN);
	let uudenSmoothienIngredients: string[] = $state([]);
	let uudenSmoothienIngredientsAmounts: number[] = $state([]);
	let uudenSmoothienRavintoarvot: NutritionInfo = $derived.by(() => {
		return haeAineksetJaLaskeRavintoarvot(
			uudenSmoothienIngredients,
			uudenSmoothienIngredientsAmounts
		);
	});
	let uudenSmoothienNotet = $state('');

	// -------------------- VIRHEENTARKISTUS -----------------------

	// tarkistaa onko ainesosa jo lisätty (ei sallita samaa ainesosaa kahdesti)
	let ingredientJoListassaError = $state(false);

	// tarkistaa onko nimikentässä käyty
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

	// nimikentän vaihtuvat tyylit (error / normal)
	let nimiKenttaStyle = $derived(
		visitedNimiKentta && !kunnollinenNimi
			? 'laila-medium h-9 w-full resize-none rounded-xl border-1 bg-rose-50 px-2 py-4 text-rose-700'
			: 'laila-medium h-9 w-full resize-none rounded-xl border-1 bg-white px-2 py-4 text-black'
	);

	// nimikentän vaihtuvat placeholderit (error / normal)
	let nimiKenttaPlaceholder = $derived(
		visitedNimiKentta && !kunnollinenNimi ? 'Please insert name!' : 'Name of smoothie'
	);

	// ------------------------- DEBUG ----------------------------

	// $effect(() => {
	// 	// koska inspect ei tarpeeksi, debuggausta varten
	// 	console.log(`Calories: ${uudenSmoothienRavintoarvot.calories.toFixed(1)} kcal`);
	// 	console.log(`Carbohydrates: ${uudenSmoothienRavintoarvot.carbohydrates.toFixed(1)} g`);
	// 	console.log(`Protein: ${uudenSmoothienRavintoarvot.protein.toFixed(1)} g`);
	// 	console.log(`Fat: ${uudenSmoothienRavintoarvot.fat.toFixed(1)} g`);
	// 	console.log(`Sugar: ${uudenSmoothienRavintoarvot.sugar.toFixed(1)} g`);
	// });
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
	// $inspect(ingredientJoListassaError);
</script>

<!-- ----------------------- HTML --------------------------- -->

<!-- Footer Fix Div -->
<div class="h-auto min-h-screen">
	<!-- Outer Div -->
	<div
		class="bg-opacity-0 m-0.5 mt-5 flex h-auto flex-wrap justify-center"
		in:blur={{ duration: 500 }}
		out:blur={{ duration: 300 }}
	>
		<!-- if data hasn't loaded yet, shows loading spinner -->
		{#if globalIngredients.get().length > 0}
			<!-- New Smoothie Card -->
			<div
				class="relative mb-5 flex w-full max-w-xl flex-col overflow-hidden rounded-xl border-2 bg-rose-100 shadow-lg shadow-slate-300"
				in:blur={{ duration: 500 }}
				out:blur={{ duration: 300 }}
			>
				<!-- Image -->
				<div class="relative">
					<img
						src="/images/default-faded-leaf.jpg"
						alt="Default"
						class="max-h-60 w-full rounded-xl border-b-2 object-cover"
					/>
				</div>

				<!-- Content-->
				<div class="flex-1 flex-col overflow-y-auto p-4">
					<!-- Title and Timer -->
					<div
						class="items-start justify-between [@media(min-width:400px)]:flex-row [@media(min-width:400px)]:items-center"
					>
						<!-- Name of Smoothie input -->
						<div class="bg mb-1 flex items-center gap-2">
							<input
								bind:value={uudenSmoothienNimi}
								maxlength={15}
								onblur={() => {
									visitedNimiKentta = true;
								}}
								placeholder={nimiKenttaPlaceholder}
								type="text"
								class={nimiKenttaStyle}
								name="new smoothies name"
							/>
						</div>

						<!-- Preparation time (minutes) input -->
						<select
							bind:value={uudenSmoothienValmistusaika}
							class="laila-light my-1 w-full rounded-xl border-1 bg-white p-1 pl-3 text-slate-600"
							name="Smoothie preparation time"
						>
							<option value={NaN} disabled selected hidden>Preparation time</option>
							{#each globalSmoothieTime as a}
								<option value={a}>{a} min</option>
							{/each}
						</select>
					</div>

					<!-- Ingredients -->
					<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
						<h2 class="text-md laila-medium">Ingredients</h2>
						<ul in:slide={{ duration: 500 }} class="laila-regular px-1 py-1 text-sm text-slate-600">
							{#each uudenSmoothienIngredients as ingredient, index (ingredient)}
								<li
									class="flex flex-row items-center pr-2"
									in:slide={{ duration: 300 }}
									out:slide={{ duration: 300 }}
								>
									{ingredientFormatointi(uudenSmoothienIngredientsAmounts[index])}
									{ingredient}
									<button
										onclick={() => remove(ingredient, index)}
										class="laila-regular my-1 ml-auto cursor-pointer rounded-xl border-1 bg-slate-50 px-2 py-0.5 hover:bg-slate-100 hover:text-black"
										>Remove</button
									>
								</li>
							{/each}

							<!-- Dropdowns at bottom of list -->
							<li class="justify-left mt-3 flex w-full flex-col gap-2 pr-2">
								<div class="flex flex-col gap-2 sm:grid sm:grid-cols-2">
									<!-- Amount of ingredient dropdown -->
									<button
										class="w-fill laila-regular flex cursor-pointer flex-row items-center rounded-xl border-1 px-3 py-0.5 hover:outline-1"
									>
										<select
											name="Ingredients amount"
											class="w-full focus:outline-none"
											bind:value={amount}
										>
											<option value={0} disabled selected hidden>Amount</option>
											{#each globalAmountNumbers.get() as a}
												<option value={a}>{a}</option>
											{/each}
										</select>
									</button>
									<!-- Choose ingredient dropdown -->
									<button
										class="w-fill laila-regular flex cursor-pointer flex-row items-center rounded-xl border-1 px-3 py-0.5 hover:outline-1"
									>
										<select
											name="Smoothie ingredient"
											class="w-full focus:outline-none"
											bind:value={selected}
										>
											<option value={' '} disabled selected hidden>Choose ingredient</option>
											{#each globalIngredients.get() as ingredient}
												<option value={ingredient.name}>{ingredient.name}</option>
											{/each}
										</select>
									</button>
								</div>
								<!-- virheteksti joka näytetään jos ingredient on jo taulukossa ja painetaan Add -->
								{#if ingredientJoListassaError}
									<span out:slide={{ duration: 400, delay: 2000 }}>
										<p
											class="laila-regular text-sm text-red-500"
											out:fade={{ duration: 2000 }}
											in:slide={{ duration: 400 }}
										>
											Ingredient already added!
										</p></span
									>
								{/if}
								<!-- Add button -->
								<button
									class="laila-regular hover:laila-medium cursor-pointer rounded-xl border-1 bg-orange-200 px-5 py-1 text-black hover:bg-orange-300 hover:outline-1"
									onclick={add}
									disabled={addDisabled}>Add</button
								>
							</li>
						</ul>
					</div>

					<!-- Nutritional Information -->
					<div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
						<h2 class="text-md laila-medium">Nutritional Information</h2>
						<ul class="laila-regular py-1 text-sm text-gray-600">
							<li>Calories: {uudenSmoothienRavintoarvot.calories.toFixed(1)} kcal</li>
							<li>Carbohydrates: {uudenSmoothienRavintoarvot.carbohydrates.toFixed(1)} g</li>
							<li>Protein: {uudenSmoothienRavintoarvot.protein.toFixed(1)} g</li>
							<li>Fat: {uudenSmoothienRavintoarvot.fat.toFixed(1)} g</li>
							<li>Sugar: {uudenSmoothienRavintoarvot.sugar.toFixed(1)} g</li>
						</ul>
					</div>

					<!-- Notes -->
					<div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
						<h2 class="text-md laila-medium">Notes</h2>
						<Notes
							placeholder={'Add some notes about this recipe'}
							bind:taytto={uudenSmoothienNotet}
							ellipsisWrapOn={true}
							name={'smoothie notes'}
						/>
					</div>

					<!-- buttons below  -->
					<div class="mt-2 flex flex-row items-center justify-center gap-5">
						<!-- Cancel button -->
						<button
							onclick={homePage}
							class="laila-regular hover:laila-medium w-full cursor-pointer rounded-xl border-1 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100 hover:text-black hover:outline-1"
							>Cancel</button
						>
						<!-- Create button -->
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
			<!-- loading spinner -->
			<div class="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		{/if}
		<!-- end of Outer Div -->
	</div>
	<!-- end of Footer Fix Div -->
</div>

<!-- ---------------------- STYLES -------------------------- -->

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
		background-color: rgb(227, 226, 226);
		color: darkgray;
		cursor: not-allowed;
	}

	button:disabled:hover {
		font-weight: 400;
		outline-width: 0px;
	}
</style>
