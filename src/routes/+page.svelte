<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<!-- src/routes/+page.svelte -->
<script>
	let requestResult = $props();
	// export let isLoggedIn;
</script>

<!-- <form method="POST">
	<label class="max-w form-control w-full p-2">
		<input
			id="username_input"
			type="text"
			name="username"
			placeholder="username"
			required
			class="max-w input input-bordered w-full"
		/>
	</label>
	<label class="max-w form-control w-full p-2">
		<input
			id="passkey_input"
			type="password"
			name="passkey"
			placeholder="passkey"
			required
			class="max-w input input-bordered w-full"
		/>
	</label>
	<button type="submit" class="btn">Login</button>
</form> -->

{#if requestResult.isLoggedIn}
	<h2>Congrats you're logged in!</h2>
{:else}
	<!-- <h2>{requestResult.message}</h2> -->
	<h2>Sucks to suck, maybe you should log in</h2>
{/if}
