<!-- This route controls the display the user sees when interacting with the two chats. -->
<script lang="ts">
	import Chat from '$lib/components/Chat.svelte';

	let { data, form } = $props();
	console.log('data in my-chats page.svelte: ' + JSON.stringify(data));

	let activeTab = $state('');
	let openChat = $state(false);
	let isDrawerOpen = $state(false);
	let chatData: object = $state({});

	async function handleOpenChat(purpose: string) {
		openChat = false;
		console.log('1');
		let isUserSanta: boolean = false;
		console.log('2');
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
		console.log('3');

		let response = await fetch('/retrieve-messages', {
			method: 'POST',
			body: JSON.stringify({ isUserSanta }),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('4');

		const result = await response.json();
		console.log('5');
		// STODO: add result validation
		chatData = { userId: data.user?.userId, messages: result.chat.messages };
		console.log('6');
		openChat = true;
		console.log('7');
		activeTab = purpose;
		console.log('8');
		// isDrawerOpen = false;
	}
</script>

<div class="mt-8 flex w-full flex-col bg-base-200">
	<div class="w-full">
		<div role="tablist" class="tabs-boxed tabs p-2">
			<button
				role="tab"
				class="tab content-center p-2 text-lg"
				class:tab-active={activeTab === 'santa'}
				onclick={() => handleOpenChat('santa')}>Chat with your Santa 🎅🏾</button
			>
			<button
				role="tab"
				class="tab tab-active content-center p-2 text-lg"
				class:tab-active={activeTab === 'recipient'}
				onclick={() => handleOpenChat('recipient')}>Chat with your recipient 🎁</button
			>
		</div>
	</div>
	{#if openChat}
		<div class="m-4 flex-grow content-end rounded-md border-2 border-neutral bg-base-100 p-4">
			<Chat {...chatData} />
		</div>
	{/if}
</div>

<!-- <div class="mt-4 flex w-full">
	<div class="drawer bg-primary lg:drawer-open">
		<input bind:checked={isDrawerOpen} id="chat-drawer" type="checkbox" class="drawer-toggle" />
		<label for="chat-drawer" class="btn btn-primary drawer-button lg:hidden">Choose chat</label>
		<div class="drawer-content m-4 content-end rounded-md border-2 border-neutral bg-base-100 p-4">
			{#if openChat}
				<Chat {...chatData} />
			{/if}
		</div>

		<div role="tablist" class="tabs tabs-boxed drawer-side h-full rounded-tr-lg">
			<label for="chat-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu h-full w-80 bg-base-200 p-4 text-base-content">
				<li role="tab">
					<button class="tab tab-active text-lg" onclick={() => handleOpenChat('santa')}
						>Chat with your Santa 🎅🏾</button
					>
				</li>
				<li role="tab">
					<button class="tab text-lg" onclick={() => handleOpenChat('recipient')}
						>Chat with your recipient 🎁</button
					>
				</li>
			</ul>
		</div>
	</div>
</div> -->
