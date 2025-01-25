<script lang="ts">
	import { enhance } from '$app/forms';
	import LoginModal from './LoginModal.svelte';

	let { isLoggedIn = false } = $props();
	$inspect(isLoggedIn);

	// let isLoggedIn: boolean = $state(false);
	let showModal: boolean = $state(false);

	function openLoginModal() {
		showModal = true;
	}
</script>

<nav>
	<div class="navbar">
		<div class="flex-1">
			<a class="btn btn-ghost text-xl">Gup Shup Gift Exchange</a>
		</div>
		<div class="flex-none">
			{#if !isLoggedIn}
				<button class="btn btn-primary" onclick={openLoginModal}>Log in</button>
			{:else}
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
						<div class="w-10 rounded-full">
							<img
								alt="Tailwind CSS Navbar component"
								src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
							/>
						</div>
					</div>
					<ul class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-white p-2 shadow">
						<form method="POST" use:enhance action="?/logout">
							<li class="justify-between"><button  type="submit">Logout</button></li>
						</form>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</nav>

{#if showModal}
	<LoginModal
		bind:openModal={showModal}
		getUsername={(username: string) => {
			console.log('returned username: ' + username);
			isLoggedIn = true;
		}}
	/>
	<!-- <LoginModal bind:openModal={showModal} {formData}/> -->
{/if}
