<script lang="ts">
	// ----------------------- IMPORTIT ---------------------------

	import type { SmoothieKortti } from '$lib/types/smoothieKortti';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import SmoothieCard from '$lib/components/SmoothieCard.svelte';
	import { goto } from '$app/navigation';
	import { blur } from 'svelte/transition';
	import '../app.css';

	// universal reactivity muuttujat
	import { smoothieKortit as globalSmoothieKortit } from '$lib/globals/globalSmoothieKortit.svelte';

	// ----------------------- FUNKTIOT ---------------------------

	// filtteröi smoothieKortit searchBarin valuen mukaan
	const filteroiSmoothieKortteja = () => {
		// rickroll easter egg
		if (searchBarinArvo.toLowerCase() === 'RickRoll :D'.toLowerCase()) {
			rickRollVisible = true;
		} else {
			rickRollVisible = false;
			valitutSmoothieKortit = globalSmoothieKortit.get().filter((smoothieKortti) => {
				return smoothieKortti.smoothie.name.toLowerCase().includes(searchBarinArvo.toLowerCase());
			});
		}
	};

	// searchBarin arvon muuttuessa kutsuu filteroiSmoothieKortteja funktiota
	$effect(() => {
		filteroiSmoothieKortteja();
	});

	// funktio, joka navigoi uuteen smoothie-sivuun
	function newSmoothie() {
		goto('../new');
	}

	// määrää mäkyykö loading-spinneri vai ei
	$effect(() => {
		if (valitutSmoothieKortit.length === 0) {
			setTimeout(() => {
				spinnerNakyy = false;
			}, 1000);
		} else {
			spinnerNakyy = true;
		}
	});

	// ----------------------- MUUTTUJAT --------------------------

	// searchBariin liittyvät muuttujat
	let searchBarinArvo: string = $state('');
	let valitutSmoothieKortit: SmoothieKortti[] = $state([]);
	let rickRollVisible: boolean = $state(false);
	let spinnerNakyy: boolean = $state(true);

	// ------------------------- DEBUG ----------------------------

	// $inspect(smoothies);
	// $inspect(fruits);
	// $inspect(searchBarinArvo);
	// $inspect(globalFruits.get());
	// $inspect(globalSmoothies.get());
	// $inspect(globalSmoothieKortit.get());
	// $inspect(isSmallScreen);
	// $inspect(outerWidth);
	// $inspect(globalSmoothieKortit.get());
</script>

<!-- ----------------------- HTML --------------------------- -->

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

<!-- searchbar -->
<nav class="flex flex-wrap items-center justify-center gap-4 sm:justify-around sm:px-6">
	<Searchbar name={'Searchbar'} placeholder={'Search smoothies'} bind:value={searchBarinArvo} />
</nav>

<!-- outer div -->
<div class="flex items-center justify-between px-10 pt-5">
	<h1 class="laila-medium ml-1 hidden text-3xl sm:block">Recipes</h1>
	<div class="ml-3 hidden w-full border-1 border-slate-600 sm:block"></div>
	<button
		id="newsmoothiepage"
		class="laila-medium just fixed right-10 bottom-12 z-5 mt-5 transform
			cursor-pointer rounded-xl border-3 bg-green-300 px-4 py-1 text-2xl shadow-md ring-2
				ring-green-400 ring-offset-2 backdrop-blur-2xl transition-transform
				duration-300 hover:scale-105
			  hover:bg-orange-300 hover:ring-orange-400 hover:outline-1
				sm:w-20 sm:py-1.5 sm:text-lg sm:shadow-none"
		onclick={newSmoothie}
		in:blur={{ duration: 500 }}
	>
		<div class="flex items-center justify-center">
			<span class="material-symbols-outlined icon-heavy icon-large p-1">add</span>
		</div>
	</button>
</div>
<div class="h-screen">
	<div class="m-7 flex flex-wrap justify-center gap-7">
		<!-- rickroll easter egg -->
		{#if rickRollVisible}
			<div class="flex flex-col items-center text-center">
				<img
					src="https://media.tenor.com/JKqs7cUyi9gAAAAj/rick-astley-dance.gif"
					alt="Get rick rolled :D"
					class="h-[320px] w-[280px]"
				/>
				<p class="laila-medium-italic w-1/1 text-slate-600 italic">
					<span class="material-symbols-outlined">music_note</span> Never gonna give you up, never
					gonna let you down...
					<span class="material-symbols-outlined">music_note</span>
				</p>
			</div>
			<!-- smoothiekortit -->
		{:else if valitutSmoothieKortit.length > 0}
			{#each valitutSmoothieKortit as smoothieKortti (smoothieKortti.ID)}
				<SmoothieCard {smoothieKortti} />
			{/each}
		{:else}
			<!-- loading spinner -->
			{#if spinnerNakyy}
				<div class="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			{:else}
				<p class="laila-medium text-2xl">No smoothies found</p>
			{/if}
		{/if}
		<!-- end of outer div -->
	</div>
</div>

<!-- ---------------------- STYLES -------------------------- -->

<style>
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
</style>
