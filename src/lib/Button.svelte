<!-- Button.svelte -->
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
