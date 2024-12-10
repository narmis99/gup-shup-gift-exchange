<script>
	// let { modalHeader, modalMessage, modalButton } = $props();
	// let modalHeader = 'modal header';
	// let modalMessage = 'modal message';
	// let modalButton = 'Yay!';
	let isLoginModalOpen = $state(false);
	let username = $state();
	let passkey = $state();

	function openLoginModal() {
		isLoginModalOpen = true;
	}

	function closeLoginModal() {
		isLoginModalOpen = false;
	}

	$inspect(username);
	$inspect(passkey);
</script>

<button class="btn" onclick={openLoginModal}>Log in</button>

<div class="modal" class:modal-open={isLoginModalOpen}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Toda gup toda shup</h3>
		<div class="pt-6">
			<label class="max-w form-control w-full p-2">
				<input type="text" placeholder="username" class="max-w input input-bordered w-full" bind:value={username}/>
			</label>
			<label class="max-w form-control w-full p-2">
				<input type="password" placeholder="passkey" class="max-w input input-bordered w-full" bind:value={passkey} />
			</label>
		</div>
		<div class="modal-action">
			<button class="btn" onclick={closeLoginModal}>Yay!</button>
		</div>
	</div>
</div>
