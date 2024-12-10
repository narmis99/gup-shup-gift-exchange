<script>
	import Modal from './Modal.svelte';

	const modalInfo = {
		modalHeader: 'modal header',
		modalMessage: 'modal message',
		modalButton: 'Yay!'
	};
</script>

<Modal {...modalInfo}/>

<!-- <div class="modal" class:login-modal-open={isLoginModalOpen}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Congratulations random Interner user!</h3>
		<p class="py-4">
			You've been selected for a chance to get one year of subscription to use Wikipedia for free!
		</p>
		<div class="modal-action">
			<button class="btn" on:click={() => (isLoginModalOpen = false)}>Yay!</button>
		</div>
	</div>
</div> -->
