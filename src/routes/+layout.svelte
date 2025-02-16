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

<!-- <div class="flex h-screen flex-col"> -->

<!-- <div class="flex h-screen flex-col">
	
	<NavBar {...navBarProps}/>
	<div class="flex flex-1 flex-grow">
		{@render children()}
	</div>
</div> -->


<div class="flex min-h-screen flex-col">
	<div class="h-16">
		<NavBar {...navBarProps}/>
	</div>
	<div class="flex flex-1">
		{@render children()}
	</div>
</div>
