<script lang="ts">
	// ----------------------- IMPORTIT ---------------------------

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { luoSmoothieKortti } from '$lib/modules/luoSmoothieKortti';
	import '../app.css';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	// universal reactivity muuttujat
	import { ingredients as globalIngredients } from '$lib/globals/globalIngredients.svelte';
	import { smoothies as globalSmoothies } from '$lib/globals/globalSmoothies.svelte';

	// ------------------------ PROPSIT ---------------------------

	// interface propseille
	interface Props {
		children: Snippet;
	}

	// propsit
	let { children }: Props = $props();

	// ----------------------- FUNKTIOT ---------------------------

	// suoritetaan heti sivun lataamisen jälkeen
	onMount(async () => {
		globalIngredients.set(await haeAinesosat());

		// joko fetchataan smoothiet smoothies.json tiedostosta tai ladataan ne localStoragesta
		// riippuen siitä onko localStorage tyhjä vai ei (palauttaa null jos tyhjä)
		try {
			const ls = localStorage.getItem('smoothiesLS');
			if (ls !== null) {
				const smoothiesData = JSON.parse(ls);
				globalSmoothies.set(smoothiesData);
			} else {
				globalSmoothies.set(await haeSmoothiet());
				// päivitetään localStoragen muuttuja smoothiesLS
				localStorage.setItem('smoothiesLS', JSON.stringify(globalSmoothies.get()));
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error(error);
			}
		}

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

	// hakee ainesosat ingredients.json tiedostosta taulukkoon asynkronisesti
	async function haeAinesosat() {
		return fetch('/data/ingredients.json')
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Virhe haettaessa ainesosia!');
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

	// luo kaikki smoothieKortit smoothieista ja ainesosista
	const luoSmoothieKortit = () => {
		globalSmoothies.get().forEach((smoothie) => {
			luoSmoothieKortti(smoothie);
		});
	};
</script>

<!-- ----------------------- HTML --------------------------- -->
<div
	class="bg-white/75 bg-[url('/images/testbg-2.jpg')] bg-auto bg-top bg-repeat-y bg-blend-lighten"
>
	<Header />
	{@render children()}
	<div class="mt-15">
		<Footer>
			<span class="items-center justify-center sm:text-left"
				>Froots App - 2025 - Data from <a
					href="https://www.fruityvice.com/"
					class="hover:laila-medium text-blue-900 hover:text-blue-700">FruityVice API</a
				>
				-
				<a
					href="https://github.com/jamktiko/smoothie_testi"
					class="hover:laila-medium text-blue-900 hover:text-blue-700">GitHub</a
				></span
			>
			<span class="items-center justify-center sm:ml-2 sm:text-right">
				J. Fengari - L. Makkonen - J. Rahikainen - T. Sairi</span
			>
		</Footer>
	</div>
</div>
