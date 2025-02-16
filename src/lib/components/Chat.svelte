<script lang="ts">
</script>

<div class="m-4 columns-1">
	<div class="chat chat-start">
		<div class="avatar chat-image">
			<div class="w-10 rounded-full">
				<img alt="Tailwind CSS chat bubble component" src="src/lib/images/santa-avatar.png" />
			</div>
		</div>
		<div class="chat-bubble">
			It's over Anakin,
			<br />
			I have the high ground.
		</div>
	</div>
	<div class="chat chat-end">
		<div class="avatar chat-image">
			<div class="w-10 rounded-full">
				<img
					alt="Tailwind CSS chat bubble component"
					src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
				/>
			</div>
		</div>
		<div class="chat-bubble">You underestimate my power!</div>
	</div>
	<div>
		<form method="POST" action="?/chat">
			<div class="join mt-4 w-full">
				<input
					type="text"
					placeholder="Message your santa"
					class="input join-item input-bordered w-full bg-white"
				/>
				<button class="btn join-item">
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
