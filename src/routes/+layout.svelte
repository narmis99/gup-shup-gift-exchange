<script lang="ts">
	// @ts-nocheck
	import '../app.css';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	let { data, children } = $props();
	let isLoggedIn = $derived(data.user);
</script>

<NavBar {isLoggedIn} />

{@render children()}