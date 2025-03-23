<script>
	import LoginModal from './LoginModal.svelte';

	let { isLoggedIn = false, user = undefined } = $props();
	let showModal = $state(false);
</script>

<nav>
	<div class="navbar">
		<div class="navbar-start">
			<!-- SNOTE: how about Secret Santa Banta Birthday? -->
			<a href="/" class="btn btn-ghost btn-outline btn-primary text-xl">Gup Shup Gift Exchange</a>
		</div>
		<div class="navbar-end">
			{#if isLoggedIn}
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="avatar placeholder btn btn-circle btn-ghost m-1">
						<div class="btn btn-ghost btn-outline btn-primary btn-circle p-1 text-2xl">
							{user.username[0].toUpperCase()}
						</div>
					</div>
					<ul class="menu dropdown-content rounded-box bg-base-100 z-1 mt-2 w-44 shadow-sm">
						<li><a href="/my-wishlist">My Wishlist</a></li>
						<li><a href="/my-chats">My Chats</a></li>
						<li><a href="/current-exchange">Current Exchange</a></li>
						<li class="justify-between">
							<button
								onclick={async (e) => {
									const response = await fetch('/logout', {
										method: 'DELETE'
									});
									if (response.status === 307) {
										window.location.href = '/';
									}
								}}>Logout</button
							>
						</li>
					</ul>
				</div>
			{:else}
				<button
					class="btn btn-primary"
					onclick={() => {
						showModal = true;
					}}>Log in</button
				>
			{/if}
		</div>
	</div>
</nav>

{#if showModal}
	<LoginModal bind:openModal={showModal} />
{/if}
