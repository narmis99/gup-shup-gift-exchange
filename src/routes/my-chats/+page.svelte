<script lang="ts">
	import Chat from '$lib/components/Chat.svelte';

	let { data, form } = $props();
	console.log('data in page.svelte: ' + JSON.stringify(data));

	let openChat = $state(false);
	let isDrawerOpen = $state(false);
	let isUserSanta = $state();

	function handleOpenChat(purpose: string) {
		switch (purpose) {
			case 'santa':
				isUserSanta = false;
				console.log('santa');
				break;
			case 'recipient':
				isUserSanta = true;
				console.log('recipient');
				break;
			default:
				console.log('STODO: throw error');
				break;
		}

		openChat = true;
		// isDrawerOpen = false;
	}
</script>

<div class="mt-4 flex w-full">
	<div class="drawer bg-primary lg:drawer-open">
		<input bind:checked={isDrawerOpen} id="chat-drawer" type="checkbox" class="drawer-toggle" />
		<label for="chat-drawer" class="btn btn-primary drawer-button lg:hidden">Choose chat</label>
		<div class="drawer-content m-4 content-end rounded-md border-2 border-neutral bg-base-100 p-4">
			{#if openChat}
				<!-- STODO: handle switching between chats -->
				<Chat isUserSanta={isUserSanta} />
				<!-- <Chat senderId={data?.user?.userId} data={data.chats[0]} /> -->
			{/if}
		</div>

		<div class="drawer-side h-full rounded-tr-lg">
			<label for="chat-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu h-full w-80 bg-base-200 p-4 text-base-content">
				<li>
					<button class="text-lg" onclick={() => handleOpenChat('santa')}
						>Chat with your Santa 🎅🏾</button
					>
				</li>
				<li>
					<button class="text-lg" onclick={() => handleOpenChat('recipient')}
						>Chat with your recipient 🎁</button
					>
				</li>
			</ul>
		</div>
	</div>
</div>

<!-- <div class="m-4 md:flex">
	<ul class="mb-4 flex basis-1/4 flex-col space-y-4 font-medium md:mb-0 md:me-4">
		<li>
			<a
				href="#"
				class="btn w-full bg-base-200"
			>
				Chat with your Santa 🎅🏾
			</a>
		</li>
		<li>
			<a
				href="#"
				class="inline-flex w-full items-center rounded-lg bg-gray-50 px-4 py-3 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				<svg
					class="me-2 h-4 w-4 text-gray-500 dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 18 18"
					><path
						d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
					/></svg
				>
				Dashboard
			</a>
		</li>
	</ul>
	<div
		class="text-medium w-full rounded-lg bg-gray-50 p-6 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
	>
		<h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">Profile Tab</h3>
		<p class="">
			This is some placeholder content the Profile tab's associated content, clicking another tab
			will toggle the visibility of this one for the next.
		</p>
		<p>The tab JavaScript swaps classes to control the content visibility and styling.</p>
	</div>
</div> -->
