<!-- shere -->
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
<!-- <form
	method="POST"
	action="?/createWish"
	use:enhance={() => {
		return async ({ result }) => {
			console.log('result: ' + JSON.stringify(result));
		};
	}}
>
	<button type="submit" class="btn btn-accent">+ Add Wish</button>
</form> -->
