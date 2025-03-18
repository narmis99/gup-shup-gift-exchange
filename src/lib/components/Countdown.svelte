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
	<p class="m-4 flex justify-center text-2xl">{countdown.message}</p>
{:else}
	<h2 class="m-4 flex justify-center text-2xl">Birthday countdown!</h2>
	<div class="flex grid auto-cols-max grid-flow-col justify-center gap-5 text-center">
		{#snippet timeUnit(value: number, unit: string)}
			<div class="flex flex-col rounded-box bg-primary p-2 text-primary-content">
				<span class="countdown font-mono text-5xl">
					<span style="--value:{value};" aria-live="polite">{value}</span>
				</span>
				{unit}
			</div>
		{/snippet}

		{@render timeUnit(countdown.months, 'months')}
		{@render timeUnit(countdown.days, 'days')}
		{@render timeUnit(countdown.hours, 'hours')}
		{@render timeUnit(countdown.minutes, 'mins')}
	</div>
{/if}

<!-- {#if countdown.message}
	<p class="text-xl">{countdown.message}</p>
{:else}
	<div class="flex justify-center gap-2 border-b-4 border-primary p-2">
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
{/if} -->
