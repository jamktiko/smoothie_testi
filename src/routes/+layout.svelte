<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import type { Snippet } from 'svelte';
	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import type { NutritionInfo } from '$lib/types/nutritionInfo';
	import { luoSmoothieKortti } from '$lib/luoSmoothieKortti';
	import { globalLocalStorage2 as globalLocalStorage } from '$lib/globalLocalStorage.svelte';

	let { children }: { children: Snippet } = $props();
	import '../app.css';

	import { onMount } from 'svelte';

	// universal reactivity muuttujat
	import { fruits as globalFruits } from '$lib/globalFruits.svelte';
	import { smoothies as globalSmoothies } from '$lib/globalSmoothies.svelte';
	import { smoothieKortit as globalSmoothieKortit } from '$lib/globalSmoothieKortit.svelte';
	import type { Smoothie } from '$lib/types/smoothie';

	async function haeLocalStorage() {
		let loydetytSmoothiet: Smoothie[] = [];
		for (
			let i = globalSmoothies.get()[globalSmoothies.get().length - 1].id + 1;
			i < localStorage.length;
			i++
		) {
			const localStorageData = localStorage.getItem(i.toString());
			if (localStorageData) {
				const smoothieData = JSON.parse(localStorageData);
				loydetytSmoothiet.push(smoothieData);
			}
		}
		return loydetytSmoothiet;
	}

	// suoritetaan heti sivun lataamisen jälkeen
	onMount(async () => {
		globalFruits.set(await haeHedelmat());
		globalSmoothies.set(await haeSmoothiet());
		globalLocalStorage.set(await haeLocalStorage());

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

	// luo kaikki smoothieKortit smoothieista ja hedelmistä
	const luoSmoothieKortit = () => {
		globalSmoothies.get().forEach((smoothie) => {
			luoSmoothieKortti(smoothie);
		});
	};
</script>

<div class="bg-white/75 bg-[url('/testbg-2.jpg')] bg-auto bg-top bg-repeat-y bg-blend-lighten">
	<Header />
	{@render children()}
	<div class="mt-15">
		<Footer>
			<span class="items-center justify-center sm:text-left">Froots Smoothie App - 2025</span>
			<span class="items-center justify-center sm:text-right"
				>J. Fengari - L. Makkonen - J. Rahikainen - T. Sairi</span
			>
		</Footer>
	</div>
</div>
