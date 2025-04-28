<script lang="ts">
	interface Props {
		placeholder: string;
	}

	let { placeholder }: Props = $props();
</script>

<div class="relative mx-5 mt-6 flex h-10 w-110 flex-row rounded-xl border-2 p-1.5 pl-4 sm:w-145">
	<input type="text" {placeholder} class="laila-regular w-full pt-0.5 text-slate-600" />
</div>

<!-- <style>
	input.searchbar {
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		font-size: 16px;
	}
</style> -->
