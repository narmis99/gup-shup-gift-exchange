<!-- This route controls the display the user sees when interacting with the two chats. -->
<script lang="ts">
	import Chat from '$lib/components/Chat.svelte';

	let { data } = $props();

	let activeTab: string = $state('');
	let error: string = $state('');
	let openChat: boolean = $state(false);
	let chatData: object = $state({});

	async function handleOpenChat(purpose: string) {
		openChat = false;
		let isUserSanta: boolean = false;

		switch (purpose) {
			case 'santa':
				isUserSanta = false;
				break;
			case 'recipient':
				isUserSanta = true;
				break;
			default:
				console.error('Error finding chat');
				error = 'Error finding chat';
				return;
		}

		let response = await fetch('/retrieve-messages', {
			method: 'POST',
			body: JSON.stringify({ isUserSanta }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const result = await response.json();

		if (result.error) {
			error = result.error;
			return;
		}

		openChat = true;
		activeTab = purpose;
		chatData = {
			userId: data.user?.userId,
			messages: result.chat.messages,
			chatId: result.chat.id
		};
	}
</script>

<div class="mt-4 flex w-full flex-col bg-base-200">
	<div class="w-full">
		<div role="tablist" class="tabs-boxed tabs p-2">
			<button
				role="tab"
				class="tab m-1 content-center text-lg hover:bg-gray-400"
				class:tab-active={activeTab === 'santa'}
				onclick={() => handleOpenChat('santa')}>Chat with your Santa 🎅🏾</button
			>
			<button
				role="tab"
				class="tab m-1 content-center text-lg hover:bg-gray-400"
				class:tab-active={activeTab === 'recipient'}
				onclick={() => handleOpenChat('recipient')}>Chat with your recipient 🎁</button
			>
		</div>
	</div>

	{#if openChat}
		<div class="mx-4 rounded-md border-2 border-neutral bg-base-100 p-4">
			<div class="h-[75vh] flex-grow content-end overflow-auto">
				<Chat data={chatData} refreshChat={() => handleOpenChat(activeTab)} />
			</div>
		</div>
	{/if}

	{#if error}
		<div class="toast toast-center toast-top">
			<div class="alert alert-error">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>{error}</span>
			</div>
		</div>
	{/if}
</div>
