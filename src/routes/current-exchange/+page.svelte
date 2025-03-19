<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import WishCard from '$lib/components/WishCard.svelte';
	import type { Wish } from '@prisma/client';

	let { data } = $props();

	// if birthday has passed this year, default to showing recipient information
	let showRecipientName: boolean = $state(!data.recipientBirthday && !data.isBirthdayToday);
	let showRecipientWishlist: boolean = $state(false);
	let recipientName = data?.recipient?.username
		? data.recipient.username.charAt(0).toUpperCase() + data.recipient.username.slice(1)
		: '';
	let error: string = $state('');
	let recipientWishes: Wish[] | undefined = $state();

	async function handleToggleRecipientName() {
		showRecipientName = !showRecipientName;
	}

	async function renderRecipientWishlist() {
		if (!data?.recipient?.id) {
			console.log('STODO: some error');
			return;
		}

		// do not retrieve again if recipient wishes were previously retrieved
		if (!recipientWishes) {
			const recipientId = data.recipient.id;

			let response = await fetch('/retrieve-recipient-wishes', {
				method: 'POST',
				body: JSON.stringify({ recipientId }),
				headers: {
					'content-type': 'application/json'
				}
			});

			let result = await response.json();

			if (result.error) {
				error = result.error;
				return;
			}

			if (result.wishes.length > 0) {
				recipientWishes = result.wishes;
			}
		}

		showRecipientWishlist = !showRecipientWishlist;
	}
</script>

<div class="w-full">
	<div class="m-8">
		<h1 class="flex justify-between text-xl font-bold">
			My Current Exchange
			<button class="btn btn-success btn-xs" onclick={handleToggleRecipientName}>
				{showRecipientName ? 'Hide recipient information' : 'See recipient information'}
			</button>
		</h1>

		<div class="pt-4">
			<div class="stats stats-vertical mt-4 w-full bg-base-200 shadow md:stats-horizontal">
				<div class="stat">
					<div class="stat-title">Time left to find a gift</div>
					{#if showRecipientName}
						{#if data.recipientBirthday}
							<Countdown futureDate={data.recipientBirthday} />
						{:else if data.isBirthdayToday}
							<div class="stat-value">Today 🎊</div>
						{:else}
							<!-- STODO: rename -->
							<div class="stat-value">Done this year</div>
						{/if}
					{:else}
						<div class="stat-value">.......</div>
					{/if}
				</div>

				<div class="stat">
					<div class="stat-title">Your recipient</div>
					<div class="stat-value">{showRecipientName ? recipientName : '.......'}</div>
				</div>
				<div class="stat">
					<div class="stat-title">Their wishlist</div>
					<div class="stat-value">
						<button class="btn btn-accent" onclick={renderRecipientWishlist}
							>{showRecipientWishlist ? 'Hide wishlist' : 'View wishlist'}</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if showRecipientWishlist}
		<div class="m-4 w-full">
			{#if recipientWishes}
				<div class="w-full columns-sm space-y-5 p-5">
					{#each recipientWishes.map((wish, i) => ({ ...wish, shadowIndex: i % 4 })) as wish}
						<WishCard {...wish} />
					{/each}
				</div>
			{:else}
				<div class="m-4">
					<p>
						Your recipient has not put in any wishes yet. Feel free to message them using the secret
						chat function!
					</p>
				</div>
			{/if}
		</div>
	{/if}
</div>
