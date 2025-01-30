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

<!-- <div class="m-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"> -->
<!-- <div class="m-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"> -->
<div class="w-full columns-sm gap-5 space-y-5 p-5">
	<!-- <div class="m-8 columns-2xs gap-4"> -->
	{#each data.wishes.map((wish, i) => ({ ...wish, shadowIndex: i % 4 })) as wish}
		<!-- <div class="bg-white shadow-lg p-4 rounded-md"> -->
		<WishCard {...wish} />
		<!-- </div> -->
	{/each}
</div>

{#if showWishModal}
	<WishModal bind:openModal={showWishModal} />
{/if}
