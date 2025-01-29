<script>
	import WishModal from '$lib/components/WishModal.svelte';
	import WishCard from '$lib/components/WishCard.svelte';
	let { data, form } = $props();
	let showWishModal = $state(false);
</script>


<div class="m-4 flex justify-end">
	<button
		type="submit"
		class="btn"
		onclick={() => {
			showWishModal = true;
		}}>+ Add Wish</button
	>
</div>

<div class="m-4">
	<WishCard {...data.wishes[0]}/>
</div>

{#if showWishModal}
	<WishModal bind:openModal={showWishModal} />
{/if}
