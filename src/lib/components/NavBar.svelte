<script>
	import { enhance } from '$app/forms';
	import LoginModal from './LoginModal.svelte';
	import Countdown from './Countdown.svelte';

	let { isLoggedIn = false, user = undefined } = $props();
	let showModal = $state(false);
</script>

<nav>
	<div class="navbar">
		<div class="navbar-start">
			<!-- STODO: how about Secret Santa Banta Birthday? -->
			<a class="btn btn-ghost text-xl">Gup Shup Gift Exchange</a>
		</div>
		{#if isLoggedIn}
			<div class="navbar-center">
				<Countdown birthdate={user.birthdate} />
			</div>
		{/if}
		<div class="navbar-end">
			{#if isLoggedIn}
				<div class="dropdown dropdown-end">
					<!-- <div tabindex="0" role="button" class="avatar placeholder btn btn-circle btn-ghost"> -->
					<div tabindex="0" role="button" class="avatar placeholder btn btn-circle btn-ghost">
						<!-- <div class="w-24 rounded-full"> -->
						<div class="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
							<span class="text-2xl">{user.username[0].toUpperCase()}</span>
							<!-- <img
							alt="Tailwind CSS Navbar component"
							src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
						/> -->
						</div>
					</div>
					<ul class="menu dropdown-content menu-sm z-[1] mt-3 w-44 rounded-box bg-white shadow">
						<li><a href="/my-wishlist">My Wishlist</a></li>
						<form
							method="POST"
							action="?/logout"
							use:enhance={() => {
								return async ({ result }) => {
									if (result.type == 'success') {
										isLoggedIn = false;
									}
								};
							}}
						>
							<li class="justify-between"><button type="submit">Logout</button></li>
						</form>
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
	<LoginModal
		bind:openModal={showModal}
		refreshNavBar={() => {
			isLoggedIn = true;
		}}
	/>
{/if}
