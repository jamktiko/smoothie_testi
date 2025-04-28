<script lang="ts">
	import type { Smoothie } from '$lib/types/smoothie';
	import type { Fruit } from '$lib/types/fruit';
	import type { NutritionInfo } from '$lib/types/nutritionInfo';
	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import '../app.css';
	import Button from '$lib/Button.svelte';
	import Searchbar from '$lib/Searchbar.svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import SmoothieCard from '$lib/SmoothieCard.svelte';

	// importataan globaalit muuttujat smoothieille ja hedelmille
	import { globalSmoothies } from '$lib/globalSmoothies.svelte';
	import { globalFruits } from '$lib/globalFruits.svelte';

	onMount(async () => {
		await haeSmoothiet();
		await haeHedelmat();
		luoSmoothieKortit();
	});

	// hakee smoothiet smoothies.json tiedostosta taulukkoon asynkronisesti
	async function haeSmoothiet() {
		try {
			const response = await fetch('/data/smoothies.json');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			globalSmoothies.set(await response.json());
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}

	// hakee hedelmät fruits.json tiedostosta taulukkoon asynkronisesti
	async function haeHedelmat() {
		fetch('/data/fruits.json')
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Virhe haettaessa hedelmiä');
				}
			})
			.then((data) => {
				globalFruits.set(data);
			})
			.catch((error) => {
				if (error instanceof Error) {
					console.error(error.message);
				} else {
					console.error(error);
				}
			});
	}

	const luoSmoothieKortit = () => {
		globalSmoothies.get().forEach((smoothie) => {
			let temp: SmoothieKortti = $state({
				ID: smoothie.id,
				smoothie: smoothie,
				hedelmat: [],
				ravintoarvot: []
			});

			for (let i = 0; i < smoothie.ingredients.length; i++) {
				const ingredient = smoothie.ingredients[i];
				console.log(`ingredient: (${ingredient})`);
				// tämä alempi on se ongelma
				globalFruits.get().forEach((fruit) => {
					console.log(`fruit name: (${fruit.name})`);
					console.log(`ingredient: (${ingredient})`);
					console.log(`onko true vai false: (${fruit.name === ingredient})`);
					fruit.name === ingredient ? temp.hedelmat.push(fruit) : null;
				});
			}
			smoothieKortitTaulukko.push(temp);
		});
	};

	let smoothieKortitTaulukko: SmoothieKortti[] = $state([]);

	// $inspect(globalSmoothies.get());
	// $inspect(globalFruits.get());
	// $inspect(smoothieKortitTaulukko);
	// $inspect(tamanSmoothienHedelmat);

	// haeTamanSmoothienHedelmat(smoothie);
</script>

<Header headerText={'froots'} />

<Searchbar placeholder={'Hae smoothieita'} />
<div class="temp-container">
	<!-- header -->

	{#each smoothieKortitTaulukko as smoothieKortti (smoothieKortti.ID)}
		<SmoothieCard {smoothieKortti} />
	{:else}
		<div>Loading...</div>
	{/each}

	<Button buttonText="testipainike" buttonFunction={() => {}} buttonActive={true} />

	<!-- footer -->
	<Footer footerText={'Ohjelmistoprojekti 1 by Team 2'} />
</div>

<style>
	.temp-container {
		padding: 1em 0em 1em 0em;
	}
</style>
