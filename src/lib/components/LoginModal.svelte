<!-- A <script> tag with a module attribute runs once when the module first evaluates, rather than for each component instance. Variables declared in this block can be referenced elsewhere in the component, but not vice versa. -->
<script lang="ts">
	// @ts-nocheck
	// export let form;
	import { createEventDispatcher } from 'svelte';
	import { enhance, applyAction } from '$app/forms';

	// let formData = $state({ username: '', passkey: '', error: '' });

	const dispatch = createEventDispatcher();

	let { openModal = $bindable(), form } = $props();
	$inspect(form);

	function closeLoginModal() {
		openModal = false;
		dispatch('close');
	}

	/*	async function handleSubmit(event) {
		console.log('handleSubmit in LoginModal.svelte js');
		// console.log('formData: ' + JSON.stringify(formData));
		event.preventDefault();
		// formData.error = '';

		try {
			const response = await fetch('/api/auth.js', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, passkey })
			});

			console.log('resposnse: ' + JSON.stringify(response));
			const result = await response.json();
			console.log('result: ' + JSON.stringify(result));

			// if (response.ok) {
			// 	dispatch('closeModal');
			// } else {
			// 	formData.error = result.message || 'Invalid credentials';
			// }
		} catch (err) {
			formData.error = 'Error connecting to the server - ' + err;
		}
	}*/
</script>

<!-- <button class="btn btn-primary" onclick={openLoginModal}>Log in</button> -->

<div class="modal" class:modal-open={openModal}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Toda gup toda shup</h3>
		<div class="pt-6">
			<form
				method="POST"
				use:enhance={({ formElement, formData, action, cancel, submitter }) => {
					// `formElement` is this `<form>` element
					// `formData` is its `FormData` object that's about to be submitted
					// `action` is the URL to which the form is posted
					// calling `cancel()` will prevent the submission
					// `submitter` is the `HTMLElement` that caused the form to be submitted

					return async ({ result, update }) => {
						form = result;
						console.log('form: ' + JSON.stringify(form.data));
						await applyAction(result);
						// `result` is an `ActionResult` object
						// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
					};
				}}
			>
				<label class="max-w form-control w-full p-2">
					<input
						type="text"
						name="username"
						placeholder="username"
						required
						class="max-w input input-bordered w-full"
					/>
				</label>
				<label class="max-w form-control w-full p-2">
					<input
						type="password"
						name="passkey"
						placeholder="passkey"
						required
						class="max-w input input-bordered w-full"
					/>
				</label>
				<button type="submit">Submit</button>
				{#if form?.data.error}
					<p class="text-red-500">{form.data.error}</p>
				{/if}
				{#if form?.data.success}
					<p class="text-green-500">Login successful! Welcome, {form.data.username}.</p>
				{/if}
				<!-- <button onclick={handleSubmit} class="btn">Login</button> -->
			</form>
		</div>
		<div class="modal-action">
			<button class="btn" onclick={closeLoginModal}>Yay!</button>
		</div>
	</div>
</div>

<!-- {#if formData.error}
					<div class="toast toast-center toast-top">
						<div class="alert alert-warning">
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
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							<span>STODO: message here</span>
						</div>
					</div>
				{/if} -->
