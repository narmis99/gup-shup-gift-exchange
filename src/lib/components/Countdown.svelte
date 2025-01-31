<script lang="ts">
	import { onDestroy } from 'svelte';
	import { computeCountdownValues } from '$lib/utils/computeCountdownValues';

	let { birthdate } = $props();
	let interval: NodeJS.Timeout;
	let timeout: NodeJS.Timeout;
	let countdown = $state(computeCountdownValues(birthdate));

	function startSyncedCountdown() {
		const now = new Date();
		const msUntilNextMinute = (60 - now.getSeconds()) * 1000;

		// wait unit the next minute starts
		timeout = setTimeout(() => {
			countdown = computeCountdownValues(new Date(birthdate));

			// start minute interval
			interval = setInterval(() => {
				countdown = computeCountdownValues(new Date(birthdate));
			}, 60 * 1000);
		}, msUntilNextMinute);
	}

	startSyncedCountdown();

	// cleans up when component is destroyed
	onDestroy(() => {
		clearInterval(interval);
		clearTimeout(timeout);
	});
</script>

{#if countdown.message}
	<p class="text-xl">{countdown.message}</p>
{:else}
	<div class="flex gap-2 border-b-4 border-primary p-2">
		{#snippet timeUnit(value: number, unit: string)}
			{#if value}
				<div>
					<span class="countdown font-mono text-3xl">
						<span style="--value:{value};"></span>
					</span>
					{unit}
				</div>
			{/if}
		{/snippet}

		{@render timeUnit(countdown.months, 'months')}
		{@render timeUnit(countdown.days, 'days')}
		{@render timeUnit(countdown.hours, 'hours')}
		{@render timeUnit(countdown.minutes, 'mins')}
	</div>
{/if}
