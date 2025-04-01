<!-- This route controls the display the user sees when interacting with the two chats. -->
<script lang="ts">
	import Chat from '$lib/components/Chat.svelte';
	import Toast from '$lib/components/Toast.svelte';

	let { data } = $props();

	let activeTab: string = $state('');
	let errorMessage: string = $state('');
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
				errorMessage = 'Error finding chat';
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
			errorMessage = result.error;
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

<div class="m-4 flex w-full flex-col">
	<div class="tabs tabs-lift border-primary h-[80vh]">
		<input
			type="radio"
			name="chat_tabs"
			class="tab"
			class:tab-active={activeTab === 'santa'}
			aria-label="Chat with your Santa 🎅🏾"
			onclick={() => handleOpenChat('santa')}
		/>
		<div class="tab-content bg-base-100 border-base-300 p-6">
			{#if openChat}
				<div class="bg-base-100 border-primary h-[75vh] rounded-md border border-4 pb-4">
					<div class="h-full grow content-end overflow-auto">
						<Chat data={chatData} refreshChat={() => handleOpenChat(activeTab)} />
					</div>
				</div>
			{/if}
		</div>

		<input
			type="radio"
			name="chat_tabs"
			class="tab"
			class:tab-active={activeTab === 'recipient'}
			aria-label="Chat with your recipient 🎁"
			onclick={() => handleOpenChat('recipient')}
		/>
		<div class="tab-content bg-base-100 border-base-300 p-6">
			{#if openChat}
				<div class="bg-base-100 border-primary h-[75vh] rounded-md border border-4 pb-4">
					<div class="h-full grow content-end overflow-auto">
						<Chat data={chatData} refreshChat={() => handleOpenChat(activeTab)} />
					</div>
				</div>
			{/if}
		</div>
	</div>

	{#if errorMessage}
		<Toast message={errorMessage} />
	{:else if !activeTab}
		<div class="toast toast-center toast-top">
			<div role="alert" class="alert bg-base-100">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-primary h-6 w-6 shrink-0"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				<span class="pr-2">Select a tab below to start chatting</span>
			</div>
		</div>
	{/if}
</div>
