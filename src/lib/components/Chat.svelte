<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	let isUserSanta = $props();
	// let _senderId,
	// 	chatData = $props();
	// const messages = chatData.data.messages;
	const getMessages = async () => {
		await fetch(`/retrieve-messages`, {
			method: 'GET',
			body: JSON.stringify({ isUserSanta }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	let messages;
	onMount(async () => {
		messages = await getMessages();
	});

	console.log('messages: ' + JSON.stringify(messages));

	// console.log('data in chat: ' + JSON.stringify(chatData.data.messages));
</script>

<div class="m-4 columns-1">
	{#snippet chatBubble(content: string, senderId: number)}
		<!-- {#if senderId == _senderId}
			<div class="chat chat-start">
				<div class="avatar chat-image">
					<div class="w-10 rounded-full">
						<img alt="Tailwind CSS chat bubble component" src="src/lib/images/santa-avatar.png" />
					</div>
				</div>
				<div class="chat-bubble">
					{content}
				</div>
			</div>
		{:else}
			<div class="chat chat-end">
				<div class="avatar chat-image">
					<div class="w-10 rounded-full">
						<img
							alt="Tailwind CSS chat bubble component"
							src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
						/>
					</div>
				</div>
				<div class="chat-bubble">{content}</div>
			</div>
		{/if} -->
	{/snippet}

	<!-- {#each messages as message}
		{@render chatBubble(message.content, message.senderId)}
	{/each} -->

	<div>
		<form method="POST" action="?/message" autocomplete="off">
			<!-- <input type="hidden" name="chatId" value={chatData.chatId} /> -->
			<div class="join mt-4 w-full">
				<input
					name="message"
					type="text"
					placeholder="Message your santa"
					class="input join-item input-bordered w-full bg-white"
				/>
				<button class="btn join-item" type="submit">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
						/>
					</svg>
				</button>
			</div>
		</form>
	</div>
</div>
