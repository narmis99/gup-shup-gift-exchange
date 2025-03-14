<!-- This route controls the display the user sees when interacting with the two chats. -->
<script lang="ts">
	import Chat from '$lib/components/Chat.svelte';

	let { data } = $props();

	let activeTab = $state('');
	let openChat = $state(false);
	let chatData: object = $state({});

	async function reloadChat() {
		await handleOpenChat(activeTab);
	}

	async function handleOpenChat(purpose: string) {
		openChat = false;
		let isUserSanta: boolean = false;

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

		let response = await fetch('/retrieve-messages', {
			method: 'POST',
			body: JSON.stringify({ isUserSanta }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const result = await response.json();
		console.log('result.chat: ' + JSON.stringify(result.chat));
		// STODO: add result validation
		chatData = {
			userId: data.user?.userId,
			messages: result.chat.messages,
			chatId: result.chat.id
		};
		openChat = true;
		activeTab = purpose;
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
			<Chat data={chatData} refreshChat={() => handleOpenChat(activeTab)} />
		</div>
	{/if}
</div>
