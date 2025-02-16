<script lang="ts">
	import Chat from '$lib/components/Chat.svelte';

	let openChat = $state(false);
	let isDrawerOpen = $state(false);

	// function handleOpenChat(context: string) {
	// 	switch (context) {
	// 		case 'santa':
	// 			console.log('opening santa...');
	// 			break;
	// 		case 'recipient':
	// 			console.log('opening recipient...');
	// 			break;
	// 	}

	// 	openChat = true;
	// 	isDrawerOpen = false;
	// }
</script>

<!-- <div class="grid w-full grid-cols-2 gap-4">
	<div class="m-4">
		<h2>Chat</h2>
		<div class="p-4 border-2 border-neutral rounded-md bg-primary">
			<Chat />
		</div>
	</div>
	<div class="m-4 p-4 border-2 border-neutral rounded-md bg-accent">
		<Chat />
	</div>
</div> -->

<div class="mt-4 flex w-full">
	<div class="drawer lg:drawer-open bg-primary">
		<input bind:checked={isDrawerOpen} id="chat-drawer" type="checkbox" class="drawer-toggle" />
		<label for="chat-drawer" class="btn btn-primary drawer-button lg:hidden">Choose chat</label>
		<div class="drawer-content m-4 content-end border-2 border-neutral rounded-md bg-base-100 p-4">
			{#if openChat}
				<Chat />
			{/if}
		</div>

		<div class="h-full drawer-side rounded-tr-lg">
			<label for="chat-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu h-full w-80 bg-base-200 p-4 text-base-content">
				<li>
					<button
						class="text-lg"
						onclick={() => {
							openChat = true;
							isDrawerOpen = false;
						}}>Chat with your Santa 🎅🏾</button
					>
				</li>
				<li><button class="text-lg">Chat with your recipient 🎁</button></li>
			</ul>
		</div>
	</div>
</div>
