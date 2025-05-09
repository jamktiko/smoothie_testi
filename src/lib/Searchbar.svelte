<script lang="ts">
	interface Props {
		placeholder: string;
		value: string;
	}

	let { placeholder, value = $bindable() }: Props = $props();
</script>

<div
	class="relative mx-5 mt-6 flex h-10 w-110 flex-row rounded-xl border-2 bg-white p-1.5 pl-4 sm:w-165"
>
	<input
		type="text"
		{placeholder}
		bind:value
		class="laila-regular w-full pt-0.5 text-slate-600 focus:outline-none"
	/>
	<span class="material-symbols-outlined absolute right-3 text-slate-600">search</span>
</div>
