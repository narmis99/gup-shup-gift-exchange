<!-- This component renders a chat interface where users can send and receive messages, displaying chat bubbles based on the 
 sender's identity. It includes a form for message submission, which updates the chat in real time -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Message } from '@prisma/client';

	const { data, refreshChat } = $props();
	const userId: number = data.userId;
	const messages: Message[] = data.messages;
	const chatId = data.chatId;
</script>

<div class="m-4 columns-1">
	{#snippet chatBubble(content: string, senderId: number)}
		{#if senderId == userId}
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
		{:else}
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
		{/if}
	{/snippet}

	{#each messages as message}
		{@render chatBubble(message.content, message.senderId)}
	{/each}

	<div class="sticky bottom-0">
		<form
			method="POST"
			action="?/message"
			autocomplete="off"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type == 'success') {
						refreshChat();
					}
				};
			}}
		>
			<input type="hidden" name="chatId" value={chatId} />
			<div class="join mt-4 w-full">
				<input
					name="message"
					type="text"
					placeholder="Write your message here"
					class="input join-item input-bordered w-full bg-base-200"
				/>
				<!-- STODO: button background, border, and svg color -->
				<button class="btn btn-secondary join-item" type="submit" aria-label="submit message button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6 stroke-secondary-content"
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
