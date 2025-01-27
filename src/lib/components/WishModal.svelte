<!-- A <script> tag with a module attribute runs once when the module first evaluates, rather than for each component instance. Variables declared in this block can be referenced elsewhere in the component, but not vice versa. -->
<script lang="ts">
	import { enhance } from '$app/forms';
	let { openModal = $bindable(), form = undefined, user = undefined } = $props();
</script>

<div class="modal" class:modal-open={openModal}>
	<div class="modal-box max-w-xl">
		<!-- <div class="pt-2"> -->
		<form
			method="POST"
			action="?/createWish"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				console.log('updating formData...');
				console.log('user: ' + user);
				formData.append('userId', '1');
				console.log('formData in enhance: ' + JSON.stringify(formData));
				return async ({ result, update }) => {
					console.log('result in wish modal: ' + JSON.stringify(result));
				};
			}}
		>
			<label class="max-w form-control w-full p-2">
				<span class="label-text pb-2 text-base">*What do you wish for?</span>
				<input
					type="text"
					name="name"
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
					placeholder="https://pingalwara.org"
					class="input input-bordered"
				/>
			</label>

			<label class="max-w form-control w-full p-2">
				<span class="label-text pb-2 text-base">Any comments for your Santa?</span>
				<input
					type="text"
					name="comment"
					placeholder="black size M plz"
					class="input input-bordered"
				/>
			</label>

			<label class="max-w form-control w-full p-2">
				<span class="label-text pb-2 text-base">Wish rating</span>
				<input type="range" name="rating" min="0" max="2" class="range range-xs" step="1" />
				<div class="grid grid-cols-3 justify-between gap-4 p-2 text-xs">
					<span class="w-30 flex-none justify-self-start text-left text-sm"
						>I'll accept this 👍</span
					>
					<span class="w-30 flex-none justify-self-center text-center text-sm"
						>I'd love to have this ❤️</span
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
				<button type="submit" class="btn btn-primary">Create Wish</button>
			</div>
			<!-- <div class="form-control mt-6">
			</div> -->
			<!-- <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2" onclick={() => {openModal = false}}>✕</button> -->
			<!-- name -->
			<!-- url -->
			<!-- level -->
			<!-- comment -->
			<!-- userId -->
			<!-- <button type="submit" class="btn">Submit</button> -->
		</form>
		<!-- </div> -->
	</div>
</div>
