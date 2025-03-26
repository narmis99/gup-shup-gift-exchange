<script lang="ts">
	let { data } = $props();

	let exchanges = $state(data.exchanges);
	let showWarning: boolean = $state(false);
	let errorMessage: string | undefined = $state(undefined);

	function formatName(username: string) {
		return username.charAt(0).toUpperCase() + username.slice(1);
	}

	async function handleAssignSantas(replaceExchange: boolean) {
		let deleteResponse, postResponse;
		if (replaceExchange) {
			const idsToDelete = exchanges.map((exchange) => {
				return exchange.id;
			});

			deleteResponse = await fetch('/start-gifting', {
				method: 'DELETE',
				body: JSON.stringify({ idsToDelete }),
				headers: {
					'content-type': 'application/json'
				}
			});
		}

		postResponse = await fetch('/start-gifting', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});

		const postResult = await postResponse.json();
		
		if (postResult.error) {
			errorMessage = postResult.error;
		} else if (postResult.success) {
			exchanges = postResult.data;
			window.location.reload();
		}
	}
</script>

<div class="w-full">
	<div class="bg-base-100 rounded-box border-info m-8 border p-4">
		<p class="p-4">
			Clicking the button below will create the exchange for this year by creating records in the
			databse to track the assignment from santa sibling to recipient sibling. The algorirthm checks
			against the previous year to ensure that recipient siblings are not the same as last year's.
		</p>

		<div class="p-4">
			<button
				class="btn btn-secondary"
				onclick={() => (exchanges.length ? (showWarning = true) : handleAssignSantas(false))}
				>Assign {exchanges.length ? 'New' : ''} Santas</button
			>
		</div>
	</div>

	{#if exchanges.length}
		<div class="m-4">
			<p class="m-4 text-xl font-bold">Current Exchange</p>
			<div class="bg-base-100 rounded-box m-4 overflow-x-auto">
				<table class="table">
					<thead>
						<tr class="text-accent">
							<th>Year</th>
							<th>Recipient</th>
							<th>Santa</th>
						</tr>
					</thead>

					<tbody>
						{#each exchanges as exchange}
							<tr>
								<th>{exchange.year}</th>
								<td>{formatName(exchange.recipientUser.username)}</td>
								<td>{formatName(exchange.santaUser.username)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}

	{#if showWarning}
		<div class="toast toast-center toast-top w-lg">
			<div role="alert" class="alert alert-warning alert-vertical sm:alert-horizontal">
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
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<span>
					Santas have already been assigned! <br /> Click continue if you'd like to erase the current
					exchange and start a new one for this year.
				</span>
				<div>
					<button class="btn btn-sm" onclick={() => (showWarning = false)}>Cancel</button>
					<button class="btn btn-sm btn-neutral" onclick={() => handleAssignSantas(true)}
						>Continue</button
					>
				</div>
			</div>
		</div>
	{/if}

	<!-- STODO: turn into error component -->
	{#if errorMessage}
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
				<span>{errorMessage}</span>
			</div>
		</div>
	{/if}
</div>
