<script lang="ts">
	let { data } = $props();

	function formatName(username: string) {
		return username.charAt(0).toUpperCase() + username.slice(1);
	}
</script>

<div class="m-4 w-full">
	<p class="m-4 text-xl font-bold">Exchange History</p>
	<div class="m-4 overflow-x-auto rounded-box bg-gray-400 p-4">
		<table class="table">
			<thead>
				<tr>
					<th>Year</th>
					<th>Recipient</th>
					<th>Santa</th>
					<th>Present</th>
				</tr>
			</thead>

			{#each data.exchanges as exchange}
				<tbody>
					<tr>
						<th>{exchange.year}</th>
						<td>{formatName(exchange.recipientUser.username)}</td>
						<td>{formatName(exchange.santaUser.username)}</td>
						<td>{exchange.present}</td>
					</tr>
				</tbody>
			{/each}
		</table>
	</div>
</div>
