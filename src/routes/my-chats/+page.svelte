<script lang="ts">
	import Chat from '$lib/components/Chat.svelte';

	let openChat = false;
	function handleOpenChat() {
		openChat = true;
	}
</script>

<div class="mt-4">
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="m-8 drawer-content content-end">
			<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
			<div class="">
				{#if openChat}
					<Chat />
				{/if}
			</div>
		</div>
		<div class="drawer-side rounded-tr-lg">
			<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
				<li><button class="text-lg" onclick={handleOpenChat}>Chat with your Santa 🎅🏾</button></li>
				<li><button class="text-lg">Chat with your recipient 🎁</button></li>
			</ul>
		</div>
	</div>
</div>
