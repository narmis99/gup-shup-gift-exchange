<!-- A <script> tag with a module attribute runs once when the module first evaluates, rather than for each component instance. Variables declared in this block can be referenced elsewhere in the component, but not vice versa. -->
<script lang="ts">
	let { openModal = $bindable(), wishData = undefined } = $props();
	let { id, name, url, rating, comment } = { ...wishData };
	const editMode: boolean = wishData ? true : false;
	let errorMessage: string | undefined = $state();

	async function handleSubmitWish() {
		let response: Response;
		if (editMode) {
			response = await fetch('/my-wishlist', {
				method: 'PATCH',
				body: JSON.stringify({
					id: id,
					name: name,
					url: url,
					rating: rating,
					comment: comment
				}),
				headers: {
					'content-type': 'application/json'
				}
			});
		} else {
			response = await fetch('/my-wishlist', {
				method: 'POST',
				body: JSON.stringify({
					name: name,
					url: url,
					rating: rating,
					comment: comment
				}),
				headers: {
					'content-type': 'application/json'
				}
			});
		}

		if (response.status === 307) {
			openModal = false;
			window.location.reload();
		} else {
			const result = await response.json();
			
			if (result.error) {
				errorMessage = result.error;
			}
		}
	}
</script>

<div class="modal" class:modal-open={openModal}>
	<div class="modal-box max-w-xl">
		{#if errorMessage}
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
					<span>{errorMessage}</span>
				</div>
			</div>
		{/if}
		<label class="max-w form-control w-full p-2">
			<span class="label-text pb-2 text-base">*What do you wish for?</span>
			<input
				type="text"
				name="name"
				bind:value={name}
				placeholder="world peace"
				class="input input-bordered"
				required
			/>
		</label>

		<label class="max-w form-control w-full p-2">
			<span class="label-text pb-2 text-base">Link to gift</span>
			<input
				type="text"
				name="url"
				bind:value={url}
				placeholder="https://www.pingalwara.org"
				class="input input-bordered"
			/>
		</label>

		<label class="max-w form-control w-full p-2">
			<span class="label-text pb-2 text-base">Any comments for your Santa?</span>
			<input
				type="text"
				name="comment"
				bind:value={comment}
				placeholder="black size M plz"
				class="input input-bordered"
			/>
		</label>

		<label class="max-w form-control w-full p-2">
			<span class="label-text pb-2 text-base">Wish rating</span>
			<input
				type="range"
				name="rating"
				bind:value={rating}
				min="0"
				max="2"
				class="range range-xs"
				step="1"
			/>
			<div class="grid grid-cols-3 justify-between gap-4 p-2 text-xs">
				<span class="w-30 flex-none justify-self-start text-left text-sm"
					>I won't say no to this 👍</span
				>
				<span class="w-30 flex-none justify-self-center text-center text-sm"
					>I'd love to have this 😍</span
				>
				<span class="w-30 flex-none justify-self-end text-right text-sm"
					>If you don't grant this for me, I will 🧞</span
				>
			</div>
		</label>

		<div class="mt-4 flex justify-end gap-4">
			<button
				class="btn"
				onclick={() => {
					openModal = false;
				}}>Cancel</button
			>
			<button class="btn btn-primary" onclick={handleSubmitWish}
				>{editMode ? 'Update Wish' : 'Create Wish'}</button
			>
		</div>
	</div>
</div>
