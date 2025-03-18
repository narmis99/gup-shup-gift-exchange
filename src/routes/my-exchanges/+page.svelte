<script lang="ts">
	let { data } = $props();

	let showRecipientName = $state(false);
	let recipientName = data?.recipient?.username;

	console.log('data.exchanges: ' + JSON.stringify(data.exchanges));

	async function handleToggleRecipientName() {
		showRecipientName = !showRecipientName;
	}
</script>

<div class="m-8 w-full">
	<h1 class="flex justify-between text-xl font-bold">
		My Exchanges
		<button class="btn btn-success btn-xs" onclick={handleToggleRecipientName}>
			Toggle recipient information
		</button>
		<!-- {#if showRecipientName}
			<button class="btn btn-success btn-xs" onclick={handleToggleRecipientName}
				>Click to hide your recipient information</button
			>
		{:else}
			<button class="btn btn-success btn-xs" onclick={handleToggleRecipientName}
				>Click to show your recipient information</button
			>
		{/if} -->
	</h1>

	<div class="stats stats-vertical mt-4 w-full bg-base-200 shadow md:stats-horizontal">
		<div class="stat">
			<div class="stat-title">Time left to find a gift</div>
			<div class="stat-value">$89,400</div>
			<!-- <div class="stat-actions">
				<button class="btn btn-xs">Withdrawal</button>
				<button class="btn btn-xs">Deposit</button>
			</div> -->
		</div>

		<div class="stat">
			<div class="stat-title">Your recipient</div>
			{#if showRecipientName}
				<div class="stat-value">{recipientName}</div>
			{:else}
				<div class="stat-value">.......</div>
			{/if}
		</div>
	</div>
</div>
