<script lang="ts">
	import type { Smoothie } from '$lib/types/smoothie';
	import type { NutritionInfo } from './types/nutritionInfo';
	interface Props {
		smoothie: Smoothie;
		ravintoarvot?: NutritionInfo;
		tapahtuma?: () => void;
	}
	let { smoothie, ravintoarvot = null, tapahtuma = null } = $props();
</script>

<div class="card">
	<img src="smoothie_placeholder.jpg" alt="placeholder kuva" />
	<h2>{smoothie.name}</h2>

	<p>{smoothie}</p>
	<p>Ravintoarvot</p>

	<button onclick={tapahtuma}>Resepti</button>
</div>

<style>
	.card {
		background-color: #f9f9f9;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 16px;
		margin: 16px;
	}

	h2 {
		font-size: 1.5em;
		margin-bottom: 8px;
	}

	p {
		font-size: 1em;
		color: #555;
	}
	img {
		height: 200px;
		border-radius: 8px;
	}
</style>
