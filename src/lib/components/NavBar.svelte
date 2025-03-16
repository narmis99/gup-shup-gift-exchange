<script>
	import LoginModal from './LoginModal.svelte';
	import Countdown from './Countdown.svelte';

	let { isLoggedIn = false, user = undefined } = $props();
	let showModal = $state(false);
</script>

<nav>
	<div class="navbar bg-primary">
		<div class="navbar-start">
			<!-- STODO: how about Secret Santa Banta Birthday? -->
			<a href="/" class="btn btn-ghost text-xl">Gup Shup Gift Exchange</a>
		</div>
		{#if isLoggedIn}
			<div class="navbar-center">
				<Countdown birthdate={user.birthdate} />
			</div>
		{/if}
		<div class="navbar-end">
			{#if isLoggedIn}
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="avatar placeholder btn btn-circle btn-ghost m-1">
						<div class="w-12 rounded-full ring ring-base-100 ring-offset-2 ring-offset-primary">
							<span class="text-2xl">{user.username[0].toUpperCase()}</span>
						</div>
					</div>
					<ul class="menu dropdown-content menu-sm z-[1] mt-3 w-44 rounded-box bg-white shadow">
						<li><a href="/my-wishlist">My Wishlist</a></li>
						<li><a href="/my-exchanges">My Exchanges</a></li>
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
					class="btn-base-100 btn"
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
