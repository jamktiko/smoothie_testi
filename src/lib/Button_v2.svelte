<!-- Button_v2.svelte -->
<script lang="ts">
	interface Props {
		buttonText: string;
		buttonActive?: boolean;
		buttonFunction: () => void;
	}

	let { buttonText, buttonActive = true, buttonFunction }: Props = $props();
</script>

<button class="generic_button" onclick={buttonFunction} disabled={!buttonActive}
	>{buttonText}</button
>

<style>
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
</style>
