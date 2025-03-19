<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';

	let { data } = $props();
	let futureDate: Date | undefined = $state(data.nextBirthday);
</script>

<div class="m-4 w-full p-2">
	<p>
		Welcome to our Secret Santa Banta Birthday website! This will serve as the hub for the
		exchanges. Ask me (Sim) for your username and password, and keep it safe because I haven't built
		in a way to reset your passwords yet. Once you sign in, the login button will be replaced by an
		avatar where you can access all of the pages. You can secretly chat with your santa and
		recipient, create a wishlist, and find details on our exchanges. <br /><br /> This site is still
		actively being worked on, so if you have any fun feature ideas, hmu! I want this to be a collaborative
		sibling website that we can keep building on.
	</p>

	{#if futureDate}
		<h2 class="m-4 flex justify-center text-2xl">Your birthday countdown!</h2>
		<div class="flex justify-center bg-primary">
			<Countdown {futureDate} />
		</div>
	{:else if data.user}
		<!-- STODO: fun birthday message -->
		<p class="m-4 flex justify-center text-2xl">Happy Birthday 🎂</p>
	{/if}
</div>
