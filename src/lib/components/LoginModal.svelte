<!-- A <script> tag with a module attribute runs once when the module first evaluates, rather than for each component instance. Variables declared in this block can be referenced elsewhere in the component, but not vice versa. -->
<script>
	import { enhance } from '$app/forms';

	let isLoginModalOpen = $state(false);
	let username = $state();
	let passkey = $state();
	let errorMessage = '';
	let response;

	let showAlert = true;

	function openLoginModal() {
		isLoginModalOpen = true;
	}

	function closeLoginModal() {
		isLoginModalOpen = false;
	}
</script>

<button class="btn btn-primary" onclick={openLoginModal}>Log in</button>

<div class="modal" class:modal-open={isLoginModalOpen}>
	<div class="modal-box">
		
		<!-- shere -->
		{#if showAlert}
			<!-- <div class="toast toast-center"> -->
			<div class="toast toast-top toast-center">
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
					<span>New mail arrived.</span>
				</div>
			</div>
		{/if}

		<h3 class="text-lg font-bold">Toda gup toda shup</h3>
		<div class="pt-6">
			<!-- <form method="POST" action="/" onsubmit={() => console.log('Form submitted')} use:enhance> -->
			<form method="POST" action="/" use:enhance>
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
				<button type="submit" class="btn">Login</button>
			</form>
		</div>
		<div class="modal-action">
			<button class="btn" onclick={closeLoginModal}>Yay!</button>
		</div>
	</div>
</div>
