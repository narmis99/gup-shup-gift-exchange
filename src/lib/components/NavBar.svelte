<script lang="ts">
	import LoginModal from './LoginModal.svelte';
	import { writable } from 'svelte/store';

	let isLoggedIn: boolean = $state(false);
	let showModal: boolean = $state(false);
	let formData = writable({ username: '', passkey: '', error: '', success: false });
	// let formData = { username: '', error: '', success: false };

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
			{/if}
		</div>
	</div>
</nav>

{#if showModal}
	<LoginModal bind:openModal={showModal}/>
	<!-- <LoginModal bind:openModal={showModal} {formData}/> -->
{/if}
