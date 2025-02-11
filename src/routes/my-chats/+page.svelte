<script lang="ts">
	import Chat from '$lib/components/Chat.svelte';

	let openChat = $state(false);
	let isDrawerOpen = $state(false);

	function handleOpenChat() {
		console.log('opening chat...');
		openChat = true;
		isDrawerOpen = false;
	}
</script>

<!-- <div class="mt-4"> -->
<div class="mt-4 flex min-h-0 flex-1 overflow-hidden">
	<div class="drawer lg:drawer-open">
		<input bind:checked={isDrawerOpen} id="chat-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content m-8 flex flex-1 flex-col content-end">
			<label for="chat-drawer" class="btn btn-primary drawer-button lg:hidden">Choose chat</label>
			{#if openChat}
				<Chat />
			{/if}
		</div>
		<div class="drawer-side rounded-tr-lg">
			<label for="chat-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu w-80 h-full bg-base-200 p-4 text-base-content">
				<!-- <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content"> -->
				<li><button class="text-lg" onclick={handleOpenChat}>Chat with your Santa 🎅🏾</button></li>
				<li><button class="text-lg">Chat with your recipient 🎁</button></li>
			</ul>
		</div>
	</div>
</div>