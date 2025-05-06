<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import type { Snippet } from 'svelte';
	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import type { NutritionInfo } from '$lib/types/nutritionInfo';

	let { children }: { children: Snippet } = $props();
	import '../app.css';

	import { onMount } from 'svelte';

	// universal reactivity muuttujat
	import { fruits as globalFruits } from '$lib/globalFruits.svelte';
	import { smoothies as globalSmoothies } from '$lib/globalSmoothies.svelte';
	import { smoothieKortit as globalSmoothieKortit } from '$lib/globalSmoothieKortit.svelte';

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
</script>

<div
	class="min-h-screen bg-white/75 bg-[url('/testbg-2.jpg')] bg-cover bg-center bg-no-repeat bg-blend-lighten"
>
	<Header />
	{@render children()}
	<Footer footerText={'Ohjelmistoprojekti 1 by Team 2'} />
</div>
