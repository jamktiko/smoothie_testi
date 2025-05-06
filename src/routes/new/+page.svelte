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
	let selected: string[] = $state([]);
	$inspect(selected);
	// Funktio valinnan käsittelemiseen
</script>

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

<body>
	<div class="bg-opacity-0 m-0.5 flex flex-wrap justify-center">
		<!-- Add Card -->
		<div
			class="relative flex w-full max-w-xl flex-col overflow-hidden rounded-xl border-2 bg-rose-100 shadow-lg shadow-slate-300"
		>
			<!-- Image -->
			<div class="relative">
				<img
					src="https://cdn.pixabay.com/photo/2018/03/16/04/54/healthy-3230225_1280.jpg"
					alt="Green Smoothie"
					class="max-h-60 w-full rounded-xl border-b-2 object-cover"
				/>
			</div>

			<!-- Content-->
			<div class=" flex-1 flex-col overflow-y-auto p-4">
				<!-- Title and Timer -->
				<div
					class="items-start justify-between [@media(min-width:400px)]:flex-row [@media(min-width:400px)]:items-center"
				>
					<div class="flex items-center gap-2">
						<h1
							class="laila-medium my-1 w-full rounded-xl border-1 bg-white p-1 pl-3 text-2xl text-slate-600"
						>
							Recipe Name
						</h1>
					</div>
					<p class="my-1 rounded-xl border-1 bg-white p-1 pl-3 text-slate-600">Prep time</p>
				</div>

				<!-- Ingredients -->
				<div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
					<h2 class="text-md laila-medium">Ingredients</h2>
					<ul class="laila-regular py-1 text-sm text-gray-600">
						<!-- Already added items -->
						<li class="flex flex-row items-center gap-10">
							<p>• 2 cups strawberries</p>
							<button
								class="rounded-xl border-1 bg-slate-50 px-2 py-0.5 hover:bg-slate-100 hover:text-black"
								>remove</button
							>
						</li>
						<li class="flex flex-row items-center">
							<p>• 1/2 cup of milk</p>
							<button
								class="rounded-xl border-1 bg-slate-50 px-2 py-0.5 hover:bg-slate-100 hover:text-black"
								>remove</button
							>
						</li>

						<!-- Buttons at bottom of list -->
						<li class="mt-3 flex flex-row items-center justify-center gap-10">
							<button
								class="flex flex-row items-center justify-center rounded-xl border-1 px-2 py-0.5"
								><p>Amount</p>
								<span class="material-symbols-outlined">arrow_drop_down</span></button
							>
							<button
								class="flex flex-row items-center justify-center rounded-xl border-1 px-10 py-0.5"
								><p>Add ingredient</p>
								<span class="material-symbols-outlined">arrow_drop_down</span></button
							>
							<button
								class="rounded-xl border-1 bg-orange-200 px-10 py-1 text-black hover:bg-orange-300"
								>Add</button
							>
						</li>
					</ul>
				</div>

				<!-- Notes -->
				<div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
					<h2 class="text-md laila-medium">Notes</h2>
					<p class="laila-regular text-sm text-slate-600">Add some notes about this recipe</p>
				</div>

				<!-- buttons below  -->
				<div class="mt-2 flex flex-row items-center justify-center gap-15">
					<button
						class="rounded-xl border-1 bg-slate-50 p-2 px-20 text-slate-600 hover:bg-slate-100 hover:text-black"
						>Cancel</button
					>
					<button class="rounded-xl border-1 bg-orange-200 p-2 px-20 hover:bg-orange-300"
						>Create</button
					>
				</div>
			</div>
		</div>
	</div>
</body>

<button id="homepage" onclick={homePage}>Home</button>
<h1>Add new recipe</h1>
<h2>Valitse hedelmiä:</h2>
<select bind:value={selected}>
	{#each fruits as fruit}
		<option value={fruit.name}>{fruit.name}</option>
	{/each}
</select>
<p>{selected}</p>

<style>
	#homepage {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		background-color: #767676;
		color: white;
		font-family: 'Laila', sans-serif;
		font-size: 1.5rem;
		font-weight: 700;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		margin: 0;
		cursor: pointer;
		z-index: 100;
	}
</style>
