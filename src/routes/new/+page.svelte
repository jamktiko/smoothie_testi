<script lang="ts">
	import { goto } from '$app/navigation';
	function homePage() {
		goto('/');
	}
</script>

<button onclick={homePage}>Home</button>
<h1>Add new recipe</h1>
