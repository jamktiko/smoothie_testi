<script lang="ts">
	interface Props {
		headerText: string;
	}

	let { headerText }: Props = $props();
</script>

<header class="flex h-30 items-center justify-center rounded-xl border-b-2 bg-rose-50">
	<h1 class="text-5xl">{headerText}</h1>
</header>

<!-- <style>
	header {
		background-color: rgb(183, 183, 183);
		/* display: flex; */
		padding: 0.4em;
	}
</style> -->
