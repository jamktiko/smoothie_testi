<script lang="ts">
	// ----------------------- IMPORTIT ---------------------------

	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import type { NutritionInfo } from '$lib/types/nutritionInfo';

	import Searchbar from '$lib/Searchbar.svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import SmoothieCard from '$lib/SmoothieCard.svelte';

	// universal reactivity muuttujat
	import { fruits as globalFruits } from '$lib/globalFruits.svelte';
	import { smoothies as globalSmoothies } from '$lib/globalSmoothies.svelte';
	import { smoothieKortit as globalSmoothieKortit } from '$lib/globalSmoothieKortit.svelte';

	import { onMount } from 'svelte';
	import '../app.css';
	import Button from '$lib/Button.svelte';
	import { goto } from '$app/navigation';

	// ----------------------- FUNKTIOT ---------------------------

	// suoritetaan heti sivun lataamisen jälkeen
	onMount(async () => {
		globalFruits.set(await haeHedelmat());
		globalSmoothies.set(await haeSmoothiet());
		luoSmoothieKortit();
	});

	// hakee smoothiet smoothies.json tiedostosta taulukkoon asynkronisesti
	async function haeSmoothiet() {
		try {
			const response = await fetch('/data/smoothies.json');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return await response.json();
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}

	// hakee hedelmät fruits.json tiedostosta taulukkoon asynkronisesti
	async function haeHedelmat() {
		return fetch('/data/fruits.json')
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Virhe haettaessa hedelmiä');
				}
			})
			.then((data) => {
				return data;
			})
			.catch((error) => {
				if (error instanceof Error) {
					console.error(error.message);
				} else {
					console.error(error);
				}
			});
	}

	// luo smoothieKortit smoothieista ja hedelmistä
	const luoSmoothieKortit = () => {
		globalSmoothies.get().forEach((smoothie) => {
			let uusiSmoothieKortti: SmoothieKortti = {
				ID: smoothie.id,
				smoothie: smoothie,
				hedelmat: [],
				hedelmatMaara: smoothie.ingredientsAmount,
				ravintoarvot: [],
				ravintoarvotYht: {
					calories: 0,
					carbohydrates: 0,
					protein: 0,
					fat: 0,
					sugar: 0
				},
				pic: smoothie.pic,
				valmistusAika: smoothie.preparationTimeMinutes
			};

			for (let i = 0; i < smoothie.ingredients.length; i++) {
				const ingredient = smoothie.ingredients[i];

				const loytynytIngredient = globalFruits.get().find((fruit) => {
					return fruit.name === ingredient;
				});

				uusiSmoothieKortti.hedelmat.push(loytynytIngredient?.name);
				uusiSmoothieKortti.ravintoarvot.push(loytynytIngredient?.nutritions);
			}
			uusiSmoothieKortti.ravintoarvotYht = laskeRavintoarvotYhteensa(
				uusiSmoothieKortti.ravintoarvot,
				uusiSmoothieKortti.hedelmatMaara
			);
			globalSmoothieKortit.get().push(uusiSmoothieKortti);
		});
	};

	// laskee smoothienKortin ravintoarvojen yhteenlasketut arvot
	const laskeRavintoarvotYhteensa = (ravintoarvot: NutritionInfo[], maara: number[]) => {
		let yhteensa = {
			calories: 0,
			carbohydrates: 0,
			protein: 0,
			fat: 0,
			sugar: 0
		};
		for (let i = 0; i < ravintoarvot.length; i++) {
			for (let j = 0; j < maara[i]; j++) {
				yhteensa.calories += ravintoarvot[i].calories;
				yhteensa.carbohydrates += ravintoarvot[i].carbohydrates;
				yhteensa.protein += ravintoarvot[i].protein;
				yhteensa.fat += ravintoarvot[i].fat;
				yhteensa.sugar += ravintoarvot[i].sugar;
			}
		}
		return yhteensa;
	};

	// filtteröi smoothieKortit searchBarin valuen mukaan
	const filteroiSmoothieKortteja = () => {
		valitutSmoothieKortit = globalSmoothieKortit.get().filter((smoothieKortti) => {
			return smoothieKortti.smoothie.name.toLowerCase().includes(searchBarinArvo.toLowerCase());
		});
	};

	$effect(() => {
		filteroiSmoothieKortteja();
	});

	function newSmoothie() {
		goto('../new');
	}

	// ----------------------- MUUTTUJAT --------------------------

	// let smoothieKortitTaulukko: SmoothieKortti[] = $state([]);
	// let smoothies: Smoothie[] = $state([]);
	// let fruits: Fruit[] = $state([]);

	// searchBariin liittyvät muuttujat
	let searchBarinArvo: string = $state('');
	let valitutSmoothieKortit: SmoothieKortti[] = $state([]);

	// ------------------------- DEBUG ----------------------------

	// $inspect(smoothies);
	// $inspect(fruits);
	// $inspect(searchBarinArvo);
	// $inspect(globalFruits.get());
	// $inspect(globalSmoothies.get());
	// $inspect(globalSmoothieKortit.get());
	// $inspect(isSmallScreen);
	// $inspect(outerWidth);
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
<button id="newsmoothiepage" onclick={newSmoothie}>Add recipe</button>

<nav class="flex items-center justify-center">
	<Searchbar placeholder={'Search smoothies'} bind:value={searchBarinArvo} />
</nav>

<div class="m-7 flex flex-wrap justify-center gap-7">
	{#each valitutSmoothieKortit as smoothieKortti (smoothieKortti.ID)}
		<SmoothieCard {smoothieKortti} />
	{:else}
		<div class="flex flex-col text-center items-center">
			<img
				src="https://media.tenor.com/JKqs7cUyi9gAAAAj/rick-astley-dance.gif"
				alt="Get rick rolled xDDDDD"
				class="w-2/3 h-2/3"
			/>
			<p class="w-1/1 laila-medium-italic text-slate-600 italic">
				<span class="material-symbols-outlined">music_note</span> Never gonna give you results...
				<span class="material-symbols-outlined">music_note</span>
			</p>
			<p class="w-1/1 laila-medium">
				Either the site isn't loading or the search did not produce any results
			</p>
		</div>

		<!-- temporary loading spinner || use this if gif not ok
	<div class="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div> 
-->
	{/each}
</div>

<!-- footer -->

<!-- <style>
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
</style> -->

<style>
	#newsmoothiepage {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		background-color: #767676;
		color: white;
		font-family: 'Laila', sans-serif;
		font-size: 1.5rem;
		font-weight: 700;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		margin: 0;
		cursor: pointer;
		z-index: 100;
	}
</style>
