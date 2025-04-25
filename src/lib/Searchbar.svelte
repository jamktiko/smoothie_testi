<script lang="ts">
	interface Props {
		placeholder: string;
	}

	let { placeholder }: Props = $props();
</script>

<input type="text" {placeholder} class="searchbar" />
