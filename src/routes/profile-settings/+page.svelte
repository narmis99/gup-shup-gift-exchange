<script lang="ts">
</script>

<!-- change profile pic -->
<!-- change password -->
<!-- start exchange -->

<div class="m-4 flex">
	<div class="drawer lg:drawer-open">
		<input id="profile-settings" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col items-center justify-center">
			<!-- Page content here -->
			<label for="profile-settings" class="btn btn-primary drawer-button lg:hidden">
				Open drawer
			</label>
		</div>
		<div class="drawer-side">
			<label for="profile-settings" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
				<!-- Sidebar content here -->
				<li><a>Sidebar Item 1</a></li>
				<li><a>Sidebar Item 2</a></li>
			</ul>
		</div>
	</div>
	<div>
		<p>something else here</p>
	</div>
	<!-- <ul class="menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none">
		<li><a>Item 1</a></li>
		<li><a>Item 2</a></li>
		<li><a>Item 3</a></li>
	</ul> -->
</div>
