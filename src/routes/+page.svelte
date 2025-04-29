<script lang="ts">
	import type { Smoothie } from '$lib/types/smoothie';
	import type { Fruit } from '$lib/types/fruit';
	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import '../app.css';
	import Button from '$lib/Button.svelte';
	import Searchbar from '$lib/Searchbar.svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import SmoothieCard from '$lib/SmoothieCard.svelte';

	onMount(async () => {
		await haeHedelmat();
		await haeSmoothiet();
		luoSmoothieKortit();
	});

	// hakee smoothiet smoothies.json tiedostosta taulukkoon asynkronisesti
	async function haeSmoothiet() {
		try {
			const response = await fetch('/data/smoothies.json');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			smoothies = await response.json();
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

	const luoSmoothieKortit = () => {
		smoothies.forEach((smoothie) => {
			let temp: SmoothieKortti = {
				ID: smoothie.id,
				smoothie: smoothie,
				hedelmat: [],
				ravintoarvot: []
			};

			for (let i = 0; i < smoothie.ingredients.length; i++) {
				const ingredient = smoothie.ingredients[i];
				console.log(`ingredient: (${ingredient})`);
				// tämä alempi on se ongelma
				fruits.forEach((fruit) => {
					// console.log(`fruit name: (${fruit.name})`);
					// console.log(`ingredient: (${ingredient})`);
					// console.log(`onko true vai false: (${fruit.name === ingredient})`);
					if (fruit.name === ingredient) {
						temp.hedelmat.push(fruit.name);
						temp.ravintoarvot.push(fruit.nutritions);
					}
				});
			}
			smoothieKortitTaulukko.push(temp);
		});
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

	<Button buttonText="testipainike" buttonFunction={() => {}} buttonActive={true} />

	<!-- footer -->
	<Footer footerText={'Ohjelmistoprojekti 1 by Team 2'} />
</div>

<style>
	.temp-container {
		padding: 1em 0em 1em 0em;
	}
</style>
