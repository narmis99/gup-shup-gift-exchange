<!-- A <script> tag with a module attribute runs once when the module first evaluates, rather than for each component instance. Variables declared in this block can be referenced elsewhere in the component, but not vice versa. -->
<script>
	import { enhance } from '$app/forms';

	let isLoginModalOpen = $state(false);
	let username = $state();
	let passkey = $state();
	let errorMessage = '';

	function openLoginModal() {
		isLoginModalOpen = true;
	}

	function closeLoginModal() {
		isLoginModalOpen = false;
	}

	// async function handleLogin() {
	// 	try {
	// 		const response = await fetch('/api/auth', {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify({ username, passkey })
	// 		});

	// 		const result = await response.json();

	// 		if (response.ok) {
	// 			console.log('response ok!');
	// 			// Redirect to a protected page after successful login
	// 			// await goto('/dashboard');
	// 		} else {
	// 			// Handle errors (e.g., user not found or invalid passkey)
	// 			errorMessage = result.error;
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 		errorMessage = 'An unexpected error occurred';
	// 	}
	// }
	// $inspect(username);
	// $inspect(passkey);
</script>

<button class="btn btn-primary" onclick={openLoginModal}>Log in</button>

<div class="modal" class:modal-open={isLoginModalOpen}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Toda gup toda shup</h3>
		<div class="pt-6">
			<form method="POST" action="/" onsubmit={() => console.log('Form submitted')} use:enhance>
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
