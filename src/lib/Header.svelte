<script lang="ts">
	import { goto } from '$app/navigation';
	function homePage() {
		goto('/');
	}
</script>

<header class="flex h-30 items-center justify-center rounded-xl border-b-2 bg-rose-100">
	<img
		src="logo-v-2.png"
		alt="logo"
		class="w-64 cursor-pointer p-3 transition-transform duration-200 hover:scale-110"
		onclick={homePage}
	/>
</header>
