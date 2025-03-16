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

<div class="flex min-h-screen flex-col">
	<div class="h-16">
		<NavBar {...navBarProps}/>
	</div>
	<div class="flex flex-1">
		{@render children()}
	</div>
</div>
