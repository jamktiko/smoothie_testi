<script lang="ts">
	let {
		taytto = $bindable(),
		placeholder
	}: {
		taytto: string;
		placeholder: string;
	} = $props();
</script>

<textarea class="w-full resize-none" on:click|stopPropagation bind:value={taytto} {placeholder}
></textarea>
