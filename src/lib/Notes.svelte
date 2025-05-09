<script lang="ts">
	let {
		taytto = $bindable(),
		placeholder,
		ellipsisWrapOn = false
	}: {
		taytto: string;
		placeholder: string;
		ellipsisWrapOn?: boolean;
	} = $props();
</script>

{#if ellipsisWrapOn}
	<textarea
		class="laila-regular h-6 w-11/12 resize-none overflow-hidden py-1 text-sm text-ellipsis whitespace-nowrap text-gray-600"
		bind:value={taytto}
		{placeholder}
	></textarea>
{:else}
	<textarea
		class="laila-regular w-full resize-none py-1 text-sm text-gray-600"
		bind:value={taytto}
		{placeholder}
	></textarea>
{/if}
