<script lang="ts">
	interface Props {
		footerText: string;
	}

	let { footerText }: Props = $props();
</script>

<footer class="flex items-center justify-center border-t-2 bg-rose-100 p-3">
	<span>{footerText}</span>
</footer>
