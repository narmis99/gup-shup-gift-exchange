<script lang="ts">
	// import { assignSantas } from './+server';
	let success;

	async function handleAssignSantas() {
		console.log('assigning santas!');
		let response = await fetch('/start-gifting', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<button class="btn" onclick={handleAssignSantas}>Assign Santas</button>
