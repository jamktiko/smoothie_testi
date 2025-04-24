<script lang="ts">
	// propsit
	// import { page } from '$app/stores';

	let { text, logo }: { text: string; logo: string } = $props();
</script>

<header>
	{#if logo}
		<img src={logo} alt="" height="75%" />
	{/if}

	<h1>{text}</h1>
	<nav>
		<a href="/">Etusivu</a> /
		<a href="/resepti">Uusi tuote</a>
	</nav>
</header>

<style>
	header {
		background-color: var(--main-color);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		color: var(--sec-color);
		height: 6em;
		text-shadow: 2px 2px 2px rgba(230, 230, 230, 0.5);
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
	}

	h1 {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		margin: 0;
		text-transform: uppercase;
	}

	nav {
		position: absolute;
		right: 2em;
		top: 1.5em;
		font-size: 1.25rem;
	}

	a {
		color: var(--sec-color);
		text-decoration: none;
	}

	img {
		margin: 1rem;
	}
</style>
