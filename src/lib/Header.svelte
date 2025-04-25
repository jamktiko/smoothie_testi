<script lang="ts">
	interface Props {
		headerText: string;
	}

	let { headerText }: Props = $props();
</script>

<header>
	<h1>{headerText}</h1>
</header>

<style>
	header {
		background-color: rgb(183, 183, 183);
		/* display: flex; */
		padding: 0.4em;
	}
</style>
