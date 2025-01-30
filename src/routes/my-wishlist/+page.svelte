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

<div class="w-full columns-sm gap-5 space-y-5 p-5">
	{#each data.wishes.map((wish, i) => ({ ...wish, shadowIndex: i % 4 })) as wish}
		<WishCard {...wish} />
	{/each}
</div>

{#if showWishModal}
	<WishModal bind:openModal={showWishModal} />
{/if}
