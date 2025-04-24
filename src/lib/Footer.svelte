<script lang="ts">
	interface Props {
		name: string;
		company: string;
		year: number;
	}

	// propsit
	let { name, company, year }: Props = $props();
</script>

<footer>
	{name} - Copyright by {company}, {year}
</footer>

<style>
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		background-color: var(--main-color);
		color: var(--sec-color);
		height: 2.5em;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		text-shadow: 2px 2px 1px rgba(200, 200, 200, 0.38);
	}
</style>
