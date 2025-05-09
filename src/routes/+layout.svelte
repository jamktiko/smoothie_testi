<script lang="ts">
	// ----------------------- IMPORTIT ---------------------------

	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { luoSmoothieKortti } from '$lib/luoSmoothieKortti';
	import '../app.css';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	// universal reactivity muuttujat
	import { ingredients as globalIngredients } from '$lib/globalIngredients.svelte';
	import { smoothies as globalSmoothies } from '$lib/globalSmoothies.svelte';

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

	// hakee ainesosat ingredients.json tiedostosta taulukkoon asynkronisesti
	async function haeAinesosat() {
		return fetch('/data/ingredients.json')
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
	<Footer>
		<span class="items-center justify-center sm:text-left">Froots Smoothie App - 2025</span>
		<span class="items-center justify-center sm:text-right"
			>J. Fengari - L. Makkonen - J. Rahikainen - T. Sairi</span
		>
	</Footer>
</div>
