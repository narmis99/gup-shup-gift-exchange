<script lang="ts">
	import '../app.css';
	import Avatar from '../lib/components/Avatar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<nav>
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a class="btn btn-ghost text-xl">Gup Shup Gift Exchange</a>
		</div>
		<div class="flex-none">
			<div class="dropdown dropdown-end">
				<!-- <Modal/> -->
				<Avatar />

				<!-- <div tabindex="0" role="button" class="avatar placeholder btn btn-circle btn-ghost"> -->
				<!-- ring ring-primary ring-offset-2 ring-offset-base-100 -->
				<!-- <div class="w-12 rounded-full bg-neutral text-neutral-content">
						<span>SY</span>
					</div>
				</div>
				<ul
					tabindex="0"
					class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
				>
					<li><a>Profile </a></li>
					<li><a>Settings</a></li>
					<li><a>Logout</a></li>
				</ul>-->
			</div>
		</div>
	</div>
</nav>

{@render children()}

<!-- <div class="p-4 drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
	  <div class="navbar bg-base-300 w-full">
		<div class="flex-none lg:hidden">
		  <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  fill="none"
			  viewBox="0 0 24 24"
			  class="inline-block h-6 w-6 stroke-current">
			  <path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		  </label>
		</div>
		<div class="mx-2 flex-1 px-2">Navbar Title</div>
		<div class="hidden flex-none lg:block">
		  <ul class="menu menu-horizontal">
			<li><a>Navbar Item 1</a></li>
			<li><a>Navbar Item 2</a></li>
		  </ul>
		</div>
	  </div>
	  Content
	</div>
	<div class="drawer-side">
	  <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
	  <ul class="menu bg-base-200 min-h-full w-80 p-4">
		<li><a>Sidebar Item 1</a></li>
		<li><a>Sidebar Item 2</a></li>
	  </ul>
	</div>
  </div>

<div class="p-4 drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label>
	</div>
	<div class="drawer-side">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
			<li><a>Sidebar Item 1</a></li>
			<li><a>Sidebar Item 2</a></li>
		</ul>
	</div>
</div> -->
