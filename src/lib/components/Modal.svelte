<script>
	let { modalHeader, modalMessage, modalButton } = $props();
	// let modalHeader = 'modal header';
	// let modalMessage = 'modal message';
	// let modalButton = 'Yay!';
	let isLoginModalOpen = $state(false);

	function openLoginModal() {
		isLoginModalOpen = true;
	}

	function closeLoginModal() {
		isLoginModalOpen = false;
	}
</script>

<button class="btn" onclick={openLoginModal}>Log in</button>

<div class="modal" class:modal-open={isLoginModalOpen}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">{modalHeader}</h3>
		<p class="py-4">{modalMessage}</p>
		<div class="modal-action">
			<button class="btn" onclick={closeLoginModal}>{modalButton}</button>
		</div>
	</div>
</div>
