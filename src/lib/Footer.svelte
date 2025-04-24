<script lang="ts">
	interface Props {
		placeholder: string;
	}

	let { placeholder }: Props = $props();
</script>

<footer>
	<span>{placeholder}</span>
</footer>

<style>
	footer {
		background-color: rgb(183, 183, 183);
		/* display: flex; */
		padding: 0.4em;
	}
</style>
