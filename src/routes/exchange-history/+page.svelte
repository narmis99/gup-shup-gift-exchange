<script lang="ts">
	let { data } = $props();

	function formatName(username: string) {
		return username.charAt(0).toUpperCase() + username.slice(1);
	}
</script>

<div class="m-4 w-full">
	<p class="m-4 text-xl font-bold">Exchange History</p>
	<div class="bg-base-100 rounded-box m-4 overflow-x-auto">
		<table class="table">
			<thead>
				<tr class="text-accent">
					<th>Year</th>
					<th>Recipient</th>
					<th>Santa</th>
					<th>Present</th>
				</tr>
			</thead>

			<tbody>
				{#each data.exchanges as exchange}
					<tr>
						<th>{exchange.year}</th>
						<td>{formatName(exchange.recipientUser.username)}</td>
						<td>{formatName(exchange.santaUser.username)}</td>
						<td>{exchange.present}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
