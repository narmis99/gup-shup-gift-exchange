<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';

	let { data, children } = $props();
	let isLoggedIn = $derived(data.user);

	let navBarProps = {
		isLoggedIn: isLoggedIn,
		user: data.user
	};
</script>

<!-- <div class="h-screen">
	<NavBar {...navBarProps} />

	{@render children()}
</div> -->

<div class="flex h-screen flex-col">
	<!-- Fixed Navbar -->
	<NavBar {...navBarProps} />

	<!-- Main content area should fill remaining space -->
	<div class="flex min-h-0 flex-1">
		{@render children()}
	</div>
</div>
