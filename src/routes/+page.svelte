<script lang="ts">
	import type { Smoothie } from '$lib/types/smoothie';
	import type { Fruit } from '$lib/types/fruit';
	import type { NutritionInfo } from '$lib/types/nutritionInfo';
	import '../app.css';
	import Button from '$lib/Button.svelte';
	import { onMount } from 'svelte';
	import Searchbar from '$lib/Searchbar.svelte';
	import SmoothieCard from '$lib/SmoothieCard.svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	let smoothies: Smoothie[] = $state([]);
	let fruits: Fruit[] = $state([]);
	let tamanSmoothienHedelmat: Fruit[] = $state([]);
	let tamanSmoothienRavintoarvot: NutritionInfo[] = $state([]);

	onMount(async () => {
		try {
			const response = await fetch('/data/smoothies.json');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			smoothies = await response.json();
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
				fruits = data;
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
			const hedelma = fruits.find((x) => {
				x.name === smoothie.ingredients[i];
			});
			if (hedelma) {
				tamanSmoothienHedelmat.push(hedelma);
			}
		}
	}

	$inspect(smoothies);
	$inspect(fruits);
	$inspect(tamanSmoothienHedelmat);

	// haeTamanSmoothienHedelmat(smoothie);
</script>

<Header headerText={'froots'} />

<Searchbar placeholder={'Hae smoothieita'} />
<div class="temp-container">
	<!-- header -->

	{#each smoothies as smoothie (smoothie.id)}
		<SmoothieCard {smoothie} />
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
