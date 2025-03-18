<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';

	let { data } = $props();

	let showRecipientName = $state(false);
	let recipientName = data?.recipient?.username;
	let futureDate = $state();

	const birthdate: Date | undefined = data?.recipient?.birthdate;

	if (birthdate != undefined) {
		const birthMonth: number = birthdate.getUTCMonth();
		const birthDay: number = birthdate.getUTCDate();

		const now = new Date();

		if (now.getMonth() === birthMonth && now.getDate() === birthDay) {
			console.log('zerooooos');
			// return { user: locals.user }
		}
		const currentYear = now.getUTCFullYear();
		const nextBirthday = new Date(currentYear, birthMonth, birthDay, 0, 0, 0, 0);

		if (now > nextBirthday) {
			nextBirthday.setFullYear(currentYear + 1);
		}

		futureDate = nextBirthday;
	}

	console.log('data.exchanges: ' + JSON.stringify(data.exchanges));

	// console.log('data?.recipient?.birthdate: ' + data?.recipient?.birthdate);

	async function handleToggleRecipientName() {
		showRecipientName = !showRecipientName;
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
			<!-- <div class="join join-vertical flex w-full justify-center md:join-horizontal">
				<div class="card-border card join-item w-96 bg-base-200">
					<div class="card-body">
						<h2 class="card-title">Time left to find a gift</h2>
						<div class="w-full">
							{#if showRecipientName}
								<Countdown {futureDate} />
							{:else}
								<div class="stat-value">.......</div>
							{/if}
						</div>
					</div>
				</div>
				<div class="card-border card join-item w-96 bg-base-200">
					<div class="card-body">
						<h2 class="card-title">Your recipient</h2>
						<div class="stat-value">{showRecipientName ? recipientName : '.......'}</div>
					</div>
				</div>
			</div> -->

			<div class="stats stats-vertical mt-4 w-full bg-base-200 shadow md:stats-horizontal">
				<div class="stat">
					<div class="stat-title">Time left to find a gift</div>
					{#if showRecipientName}
						<Countdown {futureDate} />
					{:else}
						<div class="stat-value">.......</div>
					{/if}
					<!-- <div class="stat-desc"></div> -->
				</div>

				<div class="stat">
					<div class="stat-title">Your recipient</div>
					<div class="stat-value">{showRecipientName ? recipientName : '.......'}</div>
				</div>
				<div class="stat">
					<div class="stat-title">Your recipient</div>
					<div class="stat-value">{showRecipientName ? recipientName : '.......'}</div>
				</div>
			</div>
		</div>
	</div>

	<!-- <div class="m-8">
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
						<Countdown {futureDate} />
					{:else}
						<div class="stat-value">.......</div>
					{/if}
				</div>

				<div class="stat">
					<div class="stat-title">Your recipient</div>
					<div class="stat-value">{showRecipientName ? recipientName : '.......'}</div>
				</div>
				<div class="stat">
					<div class="stat-title">Your recipient</div>
					<div class="stat-value">{showRecipientName ? recipientName : '.......'}</div>
				</div>
			</div>
		</div>
	</div> -->
</div>
