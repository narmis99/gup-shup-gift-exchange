<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<!-- src/routes/+page.svelte -->
<script>
	export let isLoggedIn;
</script>

{#if isLoggedIn}
<h2>Congrats you're logged in!</h2>
{:else}
<h2>Sucks to suck, maybe you should log in</h2>
{/if}
