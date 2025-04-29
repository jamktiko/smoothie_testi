<script lang="ts">
	import type { Smoothie } from '$lib/types/smoothie';
	import type { Fruit } from '$lib/types/fruit';
	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import type { NutritionInfo } from '$lib/types/nutritionInfo';
	import '../app.css';
	import Button from '$lib/Button.svelte';
	import Searchbar from '$lib/Searchbar.svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import SmoothieCard from '$lib/SmoothieCard.svelte';

	// suoritetaan heti sivun lataamisen jälkeen
	onMount(async () => {
		fruits = await haeHedelmat();
		smoothies = await haeSmoothiet();
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
		smoothies.forEach((smoothie) => {
			let uusiSmoothieKortti: SmoothieKortti = {
				ID: smoothie.id,
				smoothie: smoothie,
				hedelmat: [],
				ravintoarvot: [],
				ravintoarvotYht: {
					calories: 0,
					carbohydrates: 0,
					protein: 0,
					fat: 0,
					sugar: 0
				}
			};

			for (let i = 0; i < smoothie.ingredients.length; i++) {
				const ingredient = smoothie.ingredients[i];
				console.log(`ingredient: (${ingredient})`);

				fruits.forEach((fruit) => {
					if (fruit.name === ingredient) {
						uusiSmoothieKortti.hedelmat.push(fruit.name);
						uusiSmoothieKortti.ravintoarvot.push(fruit.nutritions);
					}
				});
			}
			uusiSmoothieKortti.ravintoarvotYht = laskeRavintoarvotYhteensa(
				uusiSmoothieKortti.ravintoarvot
			);
			smoothieKortitTaulukko.push(uusiSmoothieKortti);
		});
	};

	// laskee smoothienKortin ravintoarvojen yhteenlasketut arvot
	const laskeRavintoarvotYhteensa = (ravintoarvot: NutritionInfo[]) => {
		let yhteensa = {
			calories: 0,
			carbohydrates: 0,
			protein: 0,
			fat: 0,
			sugar: 0
		};
		for (let i = 0; i < ravintoarvot.length; i++) {
			yhteensa.calories += ravintoarvot[i].calories;
			yhteensa.carbohydrates += ravintoarvot[i].carbohydrates;
			yhteensa.protein += ravintoarvot[i].protein;
			yhteensa.fat += ravintoarvot[i].fat;
			yhteensa.sugar += ravintoarvot[i].sugar;
		}
		return yhteensa;
	};

	let smoothieKortitTaulukko: SmoothieKortti[] = $state([]);
	let smoothies: Smoothie[] = $state([]);
	let fruits: Fruit[] = $state([]);

	$inspect(smoothies);
	$inspect(fruits);
</script>

<!-- header -->
<Header headerText={'froots'} />

<Searchbar placeholder={'Hae smoothieita'} />
<div class="temp-container">
	{#each smoothieKortitTaulukko as smoothieKortti (smoothieKortti.ID)}
		<SmoothieCard {smoothieKortti} />
	{:else}
		<div>Loading...</div>
	{/each}

	<!-- footer -->
	<Footer footerText={'Ohjelmistoprojekti 1 by Team 2'} />
</div>

<style>
	.temp-container {
		padding: 1em 0em 1em 0em;
	}
</style>
