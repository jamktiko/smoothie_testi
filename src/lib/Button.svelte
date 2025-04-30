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
<!-- <style>
	.generic_button {
		all: unset;
		display: block;
		color: white;
		padding: 0.4em;
		border-radius: 0.3em;
		margin: 0.5em 0 0.5em 0;
		width: fit-content;
		cursor: pointer;
		/* font-size: medium; */
		transition-duration: 0.1s;
		background-color: #ff5400;
	}
	.generic_button:hover {
		background-color: #804629;
	}
	.generic_button:disabled {
		background-color: rgba(0, 0, 0, 0.1);
		color: rgba(126, 126, 126, 0.251);
		cursor: not-allowed;
	}
</style> -->
