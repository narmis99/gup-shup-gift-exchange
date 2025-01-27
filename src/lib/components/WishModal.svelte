<!-- A <script> tag with a module attribute runs once when the module first evaluates, rather than for each component instance. Variables declared in this block can be referenced elsewhere in the component, but not vice versa. -->
<script lang="ts">
	import { enhance } from '$app/forms';
	let { openModal = $bindable(), form = undefined, refreshNavBar } = $props();
</script>

<div class="modal" class:modal-open={openModal}>
	<div class="modal-box">
		<!-- <div class="pt-2"> -->
		<form
			method="POST"
			action="?/login"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				return async ({ result, update }) => {
					console.log('result in wish modal: ' + JSON.stringify(result));
				};
			}}
		>
			<div class="form-control">
				<label class="label">
					<span class="label-text">*What do you wish for?</span>
				</label>
				<input type="text" placeholder="world peace" class="input input-bordered" required />
			</div>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Link to gift</span>
				</label>
				<input type="text" placeholder="www.thebestgift.org" class="input input-bordered" />
			</div>
			<div class="flex justify-end gap-4 mt-4">
				<button class="btn">Cancel</button>
				<button class="btn btn-primary">Create Wish</button>
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
