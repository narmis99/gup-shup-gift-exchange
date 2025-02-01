<script lang="ts">
	import WishModal from '$lib/components/WishModal.svelte';
	import WishCard from '$lib/components/WishCard.svelte';

	let { data, form } = $props();
	let showWishModal = $state(false);
</script>

<!-- <div class="m-4 flex items-center justify-between"> -->
<div class="m-4 flex justify-end">
	<!-- <h1 class="text-xl">My Wishlist</h1> -->
	<button
		class="btn btn-accent"
		onclick={() => {
			showWishModal = true;
		}}>+ Add Wish</button
	>
</div>

<div class="w-full columns-sm space-y-5 p-5">
	{#each data.wishes.map((wish, i) => ({ ...wish, shadowIndex: i % 4 })) as wish}
		<WishCard {...wish} />
	{/each}
</div>

{#if showWishModal}
	<WishModal bind:openModal={showWishModal} />
{/if}
