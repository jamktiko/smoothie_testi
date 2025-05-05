<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Fruit } from '$lib/types/fruit';
	function homePage() {
		goto('/');
	}

	import { onMount } from 'svelte';
	let fruits: Fruit[] = $state([]);

	// Hakee hedelmät fruits.json tiedostosta
	onMount(async () => {
		const response = await fetch('/data/fruits.json');
		fruits = await response.json();
	});

	// Valitut asiat tallennetaan tähän
	let selected = $state(new Set());

	// Funktio valinnan käsittelemiseen
	function toggle(item: string) {
		if (selected.has(item)) {
			selected.delete(item);
		} else {
			selected.add(item);
		}
		// Luo uusi Set, jotta Svelte reagoi muutokseen
		selected = new Set(selected);
	}
</script>

<button onclick={homePage}>Home</button>
<h1>Add new recipe</h1>
<h2>Valitse hedelmiä:</h2>
{#each fruits as item}
	<label>
		<input type="checkbox" checked={selected.has(item.name)} onchange={() => toggle(item.name)} />
		{item.name}
	</label><br />
{/each}

<p>Valitut: {Array.from(selected).join(', ')}</p>
