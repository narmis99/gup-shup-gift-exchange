<!-- A <script> tag with a module attribute runs once when the module first evaluates, rather than for each component instance. Variables declared in this block can be referenced elsewhere in the component, but not vice versa. -->
<script lang="ts">
	const { id, name, url, rating, comment, shadowIndex } = $props();

	const shadowClasses = ['shadow-secondary', 'shadow-accent', 'shadow-success', 'shadow-primary'];

	async function handleDeleteWish() {
		console.log('deleting wish: ' + id);
		const response = await fetch('/my-wishlist', {
			method: 'DELETE',
			body: JSON.stringify({ id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.status === 307) {
			window.location.href = '/my-wishlist';
		}
	}

	async function handleEditWish() {
		console.log('editing wish: ' + id);
	}
</script>

<div class="w-full card card-bordered break-inside-avoid-column shadow-lg {shadowClasses[shadowIndex]}">
	<div class="card-body">
		<!-- STODO: implement edit and delete functions -->
		<button
			class="group btn btn-circle btn-ghost btn-sm absolute bottom-4 right-12"
			aria-label="edit wish card"
			onclick={handleEditWish}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-5 group-hover:stroke-blue-500"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
				/>
			</svg>
		</button>

		<button
			class="group btn btn-circle btn-ghost btn-sm absolute bottom-4 right-4"
			aria-label="trash wish card"
			onclick={handleDeleteWish}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-5 group-hover:stroke-red-500"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
				/>
			</svg>
		</button>

		<span class="absolute right-4 top-4">
			{#if rating == 0}
				<span class="text-3xl">👍</span>
			{:else if rating == 1}
				<span class="text-3xl">😍</span>
			{:else}
				<span class="text-3xl">🧞</span>
			{/if}
		</span>
		<h2 class="card-title">
			{name}
		</h2>

		<p>{comment}</p>
		{#if url}
			<a class="link link-secondary" href={url} target="_blank" rel="noopener noreferrer"
				>buy me here</a
			>
		{/if}
	</div>
</div>
