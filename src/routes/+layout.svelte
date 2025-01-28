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

<NavBar {...navBarProps} />

{@render children()}
