<script lang="ts">
	interface Props {
		headerText?: string;
	}

	let { headerText }: Props = $props();
</script>

<header class="flex justify-center">
	<img src="logo-v-1.png" alt="logo" />
</header>

<!-- <style>
	header {
		background-color: rgb(183, 183, 183);
		/* display: flex; */
		padding: 0.4em;
	}
</style> -->

<style>
	img {
		width: 300px;
	}
</style>
