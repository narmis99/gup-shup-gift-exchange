<!-- The wishes created by the user are loaded upon page navigation and then passed to children components to handle display. -->
<script lang="ts">
	import WishModal from '$lib/components/WishModal.svelte';
	import SantaBantaModal from '$lib/components/SantaBantaModal.svelte';
	import WishCard from '$lib/components/WishCard.svelte';

	let { data, form } = $props();
	let showWishModal: boolean = $state(false);
	let showSantaBantaModal: boolean = $state(false);
</script>

<div class="m-4 w-full">
	<div>
		<div class="flex justify-between">
			<h1 class="text-xl font-bold">My Wishlist</h1>
			<div>
				<button
					class="btn btn-secondary"
					onclick={() => {
						showSantaBantaModal = true;
					}}>Ask Santa Banta ✨</button
				>
				<button
					class="btn btn-accent"
					onclick={() => {
						showWishModal = true;
					}}>+ Add Wish</button
				>
			</div>
		</div>

		<div class="w-full columns-sm space-y-5 p-5">
			{#each data.wishes.map( (wish, i) => ({ ...wish, shadowIndex: i % 4, readOnly: false }) ) as wish}
				<WishCard {...wish} />
			{/each}
		</div>
	</div>
</div>

{#if showWishModal}
	<WishModal bind:openModal={showWishModal} />
{/if}

{#if showSantaBantaModal}
	<SantaBantaModal bind:openModal={showSantaBantaModal} />
{/if}
