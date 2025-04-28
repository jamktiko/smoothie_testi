<script lang="ts">
	import type { Smoothie } from '$lib/types/smoothie';
	import type { Fruit } from '$lib/types/fruit';
	import type { NutritionInfo } from '$lib/types/nutritionInfo';
	import '../app.css';
	import Button from '$lib/Button.svelte';
	import Searchbar from '$lib/Searchbar.svelte';
	import SmoothieCard from '$lib/SmoothieCard.svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';

	// globaalit muuttujat smoothieille ja hedelmille
	import { globalSmoothies } from '$lib/globalSmoothies.svelte';
	import { globalFruits } from '$lib/globalFruits.svelte';

	onMount(async () => {
		try {
			const response = await fetch('/data/smoothies.json');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			globalSmoothies.set(await response.json());
		} catch (error) {
			console.error('Fetch error:', error);
		}
		haeHedelmat();
	});

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

	function haeTamanSmoothienHedelmat(smoothie: Smoothie) {
		for (let i = 0; i < smoothie.ingredients.length; i++) {
			console.log(smoothie.ingredients[i]);
			const hedelma = globalFruits.get().find((x) => {
				x.name === smoothie.ingredients[i];
			});
			if (hedelma) {
				// tamanSmoothienHedelmat.push(hedelma);
			}
		}
	}

	$inspect(globalSmoothies);
	$inspect(globalFruits);
	// $inspect(tamanSmoothienHedelmat);

	// haeTamanSmoothienHedelmat(smoothie);
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Honk&family=Kalnia+Glaze:wght@100..700&family=Laila:wght@300;400;500;600;700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merienda:wght@300..900&family=Nabla&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
	rel="stylesheet"
/>

<span class=""></span>

<Header headerText={'froots'} />
<nav class="flex items-center justify-center">
	<Searchbar placeholder={'Hae smoothieita'} />
</nav>

<div class="temp-container">
	<!-- header -->

	<div class="m-7 flex flex-wrap justify-center gap-7">
		{#each globalSmoothies.get() as smoothie (smoothie.id)}
			<SmoothieCard {smoothie} fetchFruitsFunction={haeTamanSmoothienHedelmat} />
		{:else}
			<div>Loading...</div>
		{/each}
	</div>

	<!-- footer -->
	<Footer footerText={'Ohjelmistoprojekti 1 by Team 2'} />
</div>

<style>
	.temp-container {
		padding: 1em 0em 1em 0em;
	}
</style>
