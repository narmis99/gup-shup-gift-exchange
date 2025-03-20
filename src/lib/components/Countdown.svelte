<script lang="ts">
	import { onDestroy } from 'svelte';
	import { computeCountdownValues } from '$lib/utils/computeCountdownValues';

	let { futureDate } = $props();
	let interval: NodeJS.Timeout;
	let timeout: NodeJS.Timeout;
	let countdown = $state(computeCountdownValues(futureDate));

	function startSyncedCountdown() {
		const now = new Date();
		const msUntilNextMinute = (60 - now.getSeconds()) * 1000;

		// wait unit the next minute starts
		timeout = setTimeout(() => {
			countdown = computeCountdownValues(new Date(futureDate));

			// start minute interval
			interval = setInterval(() => {
				countdown = computeCountdownValues(new Date(futureDate));
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

<!-- STODO: until next year message if above 12 months -->
<div class="grid auto-cols-max grid-flow-col gap-4 text-center">
	{#snippet timeUnit(value: number, unit: string)}
		<div class="flex flex-col rounded-box p-1 text-primary-content">
			<span class="countdown font-mono text-4xl">
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
