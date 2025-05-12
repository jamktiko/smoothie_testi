<script lang="ts">
	interface Props {
		taytto: string;
		placeholder: string;
		ellipsisWrapOn?: boolean;
		name: string;
	}

	let { taytto = $bindable(), placeholder, ellipsisWrapOn = false, name }: Props = $props();
</script>

<!-- ellipsisWrapOn = tuleeko ... kun liikaa tekstiä -->
{#if ellipsisWrapOn}
	<textarea
		class="laila-regular h-6 w-11/12 resize-none overflow-hidden py-1 text-sm text-ellipsis whitespace-nowrap text-gray-600"
		bind:value={taytto}
		{name}
		{placeholder}
	></textarea>
	<!-- normaali versio -->
{:else}
	<textarea
		class="laila-regular w-full resize-none py-1 text-sm text-gray-600"
		bind:value={taytto}
		{placeholder}
		{name}
	></textarea>
{/if}
