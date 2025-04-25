<script lang="ts">
	interface Props {
		placeholder: string;
	}

	let { placeholder }: Props = $props();
</script>

<input type="text" {placeholder} class="searchbar" />

<style>
	input.searchbar {
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		font-size: 16px;
	}
</style>
