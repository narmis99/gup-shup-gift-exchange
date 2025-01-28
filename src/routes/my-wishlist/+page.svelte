<script>
	import WishModal from '$lib/components/WishModal.svelte';
	let showWishModal = $state(false);
</script>

<h2>My wish list page</h2>

<button
	type="submit"
	class="btn btn-outline btn-accent"
	onclick={() => {
		showWishModal = true;
	}}>+ Add Wish</button
>
{#if showWishModal}
	<WishModal bind:openModal={showWishModal} />
{/if}
