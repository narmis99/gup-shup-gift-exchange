<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<!-- src/routes/+page.svelte -->
<script>
	let { data } = $props();
	let isLoggedIn = $derived(data.user);
</script>

<h2>Home page</h2>