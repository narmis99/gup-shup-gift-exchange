<script>
	import LoginModal from './LoginModal.svelte';
	let showModal = $state(false);

	const openLoginModal = () => {
		showModal = true;
	};
</script>

<nav>
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a class="btn btn-ghost text-xl">Gup Shup Gift Exchange</a>
		</div>
		<div class="flex-none">
			<button class="btn btn-primary" onclick={openLoginModal}>Log in</button>
		</div>
	</div>
</nav>

{#if showModal}
	<LoginModal bind:isModalOpen={showModal} />
{/if}
