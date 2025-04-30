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
		class="flex items-center rounded-3xl border-2 border-rose-700 bg-rose-100 px-4 py-2 text-rose-700 transition hover:bg-rose-200"
		onclick={buttonFunction}
		disabled={!buttonActive}
		>{buttonText}
		<span class="material-symbols-outlined ml-2">arrow_forward_ios</span></button
	>
</div>
