<!-- A <script> tag with a module attribute runs once when the module first evaluates, rather than for each component instance. Variables declared in this block can be referenced elsewhere in the component, but not vice versa. -->

<!-- This component presents the inputs to create or edit a wish. PATCH and POST calls are made accordingly. $props are only populated when editing a wish -->
<!-- This component is a modal for creating or editing a wishlist item. It determines edit mode based on whether wishData is 
  provided. Users can input a wish name, optional URL, comment, and a rating using a range slider. Upon submission, the 
  component makes a POST request for new wishes and a PATCH request for updates. If the request succeeds, the modal closes, 
  and the page reloads. If an error occurs, an error message is displayed in an alert. -->
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
			<Toast message={errorMessage} />
		{/if}

		<fieldset class="fieldset m-4 grid grid-cols-1 gap-4">
			<div>
				<span class="form-control text">*What do you wish for?</span>
				<input
					type="text"
					name="name"
					bind:value={name}
					placeholder="world peace"
					class="input w-full"
					required
				/>
			</div>

			<div>
				<span class="form-control text">Link to gift</span>
				<input
					type="url"
					name="url"
					bind:value={url}
					placeholder="https://www.pingalwara.org"
					class="input w-full"
				/>
			</div>

			<div>
				<span class="form-control text">Comments for your Santa</span>
				<input
					type="text"
					name="comment"
					bind:value={comment}
					placeholder="black size M plz"
					class="input w-full"
				/>
			</div>

			<div>
				<span class="form-control text">Wish rating</span>
				<input
					type="range"
					name="rating"
					bind:value={rating}
					min="0"
					max="2"
					class="range range-xs w-full"
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
			</div>
		</fieldset>

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
