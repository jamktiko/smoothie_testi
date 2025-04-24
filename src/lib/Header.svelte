<script lang="ts">
	interface Props {
		placeholder: string;
	}

	let { placeholder }: Props = $props();
</script>

<header>
	<h1>{placeholder}</h1>
	<br />
	<nav>
		<a href="/">Home Page</a> /
		<a href="/resepti">Recipe Page</a>
	</nav>
</header>

<style>
	header {
		background-color: rgb(183, 183, 183);
		/* display: flex; */
		padding: 0.4em;
	}
</style>
