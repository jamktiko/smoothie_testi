<script lang="ts">
	// ----------------------- IMPORTIT ---------------------------
	import { goto } from '$app/navigation';
	import { smoothies as globalSmoothies } from '$lib/globalSmoothies.svelte';
	import { smoothieKortit as globalSmoothieKortit } from '$lib/globalSmoothieKortit.svelte';
	import { fruits as globalFruits } from '$lib/globalFruits.svelte';
	import Notes from '$lib/Notes.svelte';

	function homePage() {
		goto('/');
	}

	// Valitut asiat tallennetaan tähän
	let selected: string[] = $state([]);

	let uudenSmoothienNimi = $state('');
	let uudenSmoothienValmistusaika = $state(1);
	const valmistusajatMin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

	$inspect(uudenSmoothienNimi);
	// $inspect(selected);
	// $inspect(globalFruits.get());
	$inspect(selected);
	$inspect(globalFruits.get());
	let amount: number = $state(0);
	const amounts = [0.5, 1, 2, 3, 4, 5];
	let lista: string[] = $state([]);
	function add() {
		if (selected.length > 0) {
			lista.push(`${amount} ${selected}`);
		}
	}
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
					<input
						bind:value={uudenSmoothienNimi}
						placeholder="Recipe name"
						type="text"
						class="laila-medium my-1 w-full rounded-xl border-1 bg-white p-1 pl-3 text-2xl text-slate-600"
					/>
				</div>

				<!-- <select
					placeholder="Prep time (minutes)"
					bind:value={uudenSmoothienValmistusaika}
					class="my-1 w-45 rounded-xl border-1 bg-white p-1 pl-3 text-slate-600"
				>
					<option value="" disabled selected hidden>Valitse määrä</option>
					{#each valmistusajatMin as a}
						<option value={a}>{a}</option>
					{/each}
				</select> -->

				<input
					class="my-1 w-45 rounded-xl border-1 bg-white p-1 pl-3 text-slate-600"
					type="number"
					min="0"
					max="60"
					placeholder="Prep time (minutes)"
				/>
				<!-- <p class="my-1 rounded-xl border-1 bg-white p-1 pl-3 text-slate-600">Prep time</p> -->
			</div>

			<!-- Ingredients -->
			<div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
				<h2 class="text-md laila-medium">Ingredients</h2>
				<ul class="laila-regular py-1 text-sm text-gray-600">
					{#each lista as item}
						<li>{item}</li>
					{/each}

					<li class="flex flex-row items-center gap-10">
						<p>{lista}</p>
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
						>
							<select bind:value={amount}>
								<option value="" disabled selected hidden>Valitse määrä</option>
								{#each amounts as a}
									<option value={a}>{a}</option>
								{/each}
							</select>
						</button>
						<button
							class="flex flex-row items-center justify-center rounded-xl border-1 px-10 py-0.5"
						>
							<select bind:value={selected}>
								{#each globalFruits.get() as fruit}
									<option value={fruit.name}>{fruit.name}</option>
								{/each}
							</select>
						</button>
						<button
							class="rounded-xl border-1 bg-orange-200 px-10 py-1 text-black hover:bg-orange-300"
							onclick={add}>Add</button
						>
					</li>
				</ul>
			</div>

			<!-- Notes -->
			<div class="my-1 rounded-xl border-1 bg-white p-2 pl-3">
				<h2 class="text-md laila-medium">Notes</h2>
				<Notes placeholder={'Add notes'} taytto={''} ellipsisWrapOn={true} />
			</div>
			<!-- <div class="my-2 rounded-xl border-1 bg-white p-2 pl-3">
				<h2 class="text-md laila-medium">Notes</h2>
				<p class="laila-regular text-sm text-slate-600">Add some notes about this recipe</p>
			</div> -->

			<!-- buttons below  -->
			<div class="mt-2 flex flex-row items-center justify-center gap-15">
				<button
					onclick={homePage}
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
