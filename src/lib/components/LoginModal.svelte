<!-- A <script> tag with a module attribute runs once when the module first evaluates, rather than for each component instance. Variables declared in this block can be referenced elsewhere in the component, but not vice versa. -->
<script lang="ts">
	import { enhance } from '$app/forms';
	let { openModal = $bindable(), form = undefined } = $props();
</script>

<div class="modal" class:modal-open={openModal}>
	<div class="modal-box">
		{#if form?.data.error}
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
					<span>{form.data.error}</span>
				</div>
			</div>
		{/if}
		<h3 class="text-lg font-bold">Toda gup toda shup</h3>
		<div class="pt-6">
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
						form = result;

						if (result.type == 'success') {
							openModal = false;
							window.location.reload();
						}
						// `result` is an `ActionResult` object
						// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
					};
				}}
			>
				<button
					class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
					onclick={() => {
						openModal = false;
					}}>✕</button
				>
				<label class="max-w form-control w-full p-2">
					<input
						type="text"
						name="username"
						placeholder="username"
						class="max-w input input-bordered w-full"
					/>
				</label>
				<label class="max-w form-control w-full p-2">
					<input
						type="password"
						name="passkey"
						placeholder="passkey"
						class="max-w input input-bordered w-full"
					/>
				</label>
				<div class="flex justify-end p-2">
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
			</form>
		</div>
	</div>
</div>
