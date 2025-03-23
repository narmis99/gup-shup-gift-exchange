<!-- A <script> tag with a module attribute runs once when the module first evaluates, rather than for each component instance. Variables declared in this block can be referenced elsewhere in the component, but not vice versa. -->
<script lang="ts">
	import { enhance } from '$app/forms';
	let { openModal = $bindable(), form = undefined } = $props();
	let errorMessage: string = $state('');
</script>

<div class="modal" class:modal-open={openModal}>
	<div class="modal-box">
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
		<h3 class="p-2 text-lg font-bold">Toda gup toda shup</h3>

		<form
			method="POST"
			action="/login"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				// `formElement` is this `<form>` element
				// `formData` is its `FormData` object that's about to be submitted
				// `action` is the URL to which the form is posted
				// calling `cancel()` will prevent the submission
				// `submitter` is the `HTMLElement` that caused the form to be submitted
				return async ({ result, update }) => {
					if (result.type == 'failure') {
						errorMessage = result?.data?.error as string;
					} else if (result.type == 'success') {
						openModal = false;
						window.location.reload();
					}
					// `result` is an `ActionResult` object
					// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
				};
			}}
		>
			<button
				class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2"
				onclick={() => {
					openModal = false;
				}}>✕</button
			>

			<fieldset class="fieldset rounded-box px-2">
				<div class="m-1">
					<label class="input w-full">
						<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							><g
								stroke-linejoin="round"
								stroke-linecap="round"
								stroke-width="2.5"
								fill="none"
								stroke="currentColor"
								><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle
									cx="12"
									cy="7"
									r="4"
								></circle></g
							></svg
						>
						<input type="input" name="username" required placeholder="username" />
					</label>
				</div>
				<div class="m-1">
					<label class="input w-full">
						<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							><g
								stroke-linejoin="round"
								stroke-linecap="round"
								stroke-width="2.5"
								fill="none"
								stroke="currentColor"
								><path
									d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
								></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g
							></svg
						>
						<input type="password" name="passkey" required placeholder="passkey" />
					</label>
				</div>
			</fieldset>
			<div class="flex justify-end p-2">
				<button type="submit" class="btn btn-primary">Submit</button>
			</div>
		</form>
	</div>
</div>
