<!-- Button.svelte -->
<script lang="ts">
	interface Props {
		buttonText: string;
		buttonActive?: boolean;
		buttonFunction: () => void;
	}

	let { buttonText, buttonActive = true, buttonFunction }: Props = $props();
</script>

<div class="absolute right-4 bottom-4 sm:hidden">
	<button
		class="hover:laila-medium laila-regular flex cursor-pointer items-center rounded-3xl border-2 border-black bg-orange-200 px-4 py-2 text-black transition hover:bg-orange-300 hover:outline-1"
		onclick={buttonFunction}
		disabled={!buttonActive}
		>{buttonText}
		<span class="material-symbols-outlined ml-2">arrow_forward_ios</span></button
	>
</div>
