<script lang="ts">
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
	<div class="navbar bg-base-100">
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
					<ul
						class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
					>
						<li>
							<a href="yuh" class="justify-between">
								Profile
								<span class="badge">New</span>
							</a>
						</li>
						<li>Settings</li>
						<li>Logout</li>
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
