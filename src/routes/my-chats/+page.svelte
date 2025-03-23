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
				error = 'Error finding chat';
				console.error(error);
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
			console.error(JSON.stringify(result.error));
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
		<div class="tab-content border-base-300 p-6">
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
		<div class="tab-content border-base-300 p-6">
			{#if openChat}
				<div class="bg-base-100 border-primary h-[75vh] rounded-md border border-4 pb-4">
					<div class="h-full grow content-end overflow-auto">
						<Chat data={chatData} refreshChat={() => handleOpenChat(activeTab)} />
					</div>
				</div>
			{/if}
		</div>
	</div>

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
	{:else if !activeTab}
		<div class="toast toast-center toast-top">
			<div role="alert" class="alert alert-info alert-soft">
				<span>Select a tab below to start chatting</span>
			</div>
		</div>
	{/if}
</div>
