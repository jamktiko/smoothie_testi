<script lang="ts">
	interface Props {
		footerText: string;
	}

	let { footerText }: Props = $props();
</script>

<footer>
	<span>{footerText}</span>
</footer>

<style>
	footer {
		background-color: rgb(183, 183, 183);
		/* display: flex; */
		padding: 0.4em;
	}
</style>
