<script lang="ts">
	let {
		taytto = $bindable(),
		placeholder
	}: {
		taytto: string;
		placeholder: string;
	} = $props();
</script>

<textarea class="resize-none" bind:value={taytto} {placeholder}></textarea>

<!-- <style>
	textarea {
		width: 100%;
		padding: 5px;
		border-radius: 5px;
		border: 1px solid #ccc;
		font-size: 1rem;
	}
</style> -->
