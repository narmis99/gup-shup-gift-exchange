<script lang="ts">
	// import { assignSantas } from './+server';
	let error = $state('');

	async function handleAssignSantas() {
		console.log('assigning santas!');
		let response = await fetch('/start-gifting', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});

		const result = await response.json();
		if (result.error) {
			error = result.error;
		}

		// STODO: add messaging based on response
	}
</script>

{#if error}
	<div class="toast toast-center toast-top">
		<div class="alert alert-error">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>{error}</span>
		</div>
	</div>
{/if}
<div class="m-4">
	<button class="btn" onclick={handleAssignSantas}>Assign Santas</button>
</div>
