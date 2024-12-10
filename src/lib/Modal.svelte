<script>
	let isLoginModalOpen = false;

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
		<h3 class="text-lg font-bold">Modal header</h3>
		<p class="py-4">
			Modal message
		</p>
		<div class="modal-action">
			<button class="btn" onclick={closeLoginModal}>Yay!</button>
		</div>
	</div>
</div>

<!-- {#if isLoginModalOpen}
	<dialog class="modal open">
		<div class="modal-box">
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={closeLoginModal}>✕</button>
			</form>
			<h3 class="text-lg font-bold">Hello!</h3>
			<p class="py-4">Press ESC key or click on ✕ button to close</p>
		</div>
	</dialog>
{/if} -->
