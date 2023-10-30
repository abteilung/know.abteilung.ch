<script>
	import '@fontsource/source-sans-pro/300.css';
	import '@fontsource/source-sans-pro/400.css';
	import '@fontsource/source-sans-pro/700.css';
	import '@fontsource/source-sans-pro/900.css';

	import ContextualLogo from '$lib/components/ContextualLogo.svelte';
	import JulienStar from '$lib/components/julienStar.svelte';
</script>

<div class="container mt-[5vh]">
	<div class="grid lg:grid-cols-3 grid-cols-4">
		<!-- Sidebar -->
		<div
			class="col-span-1 flex flex-col items-center justify-between h-[90vh] rounded-3xl sticky top-[5vh]"
		>
			<nav class="navigation">
				<ul class="grid grid-cols-3 gap-x-12 gap-y-2">
					<li><a href="#">Agentur</a></li>
					<li><a href="#">Referenzen</a></li>
					<li><a href="#">Labor</a></li>
					<li><a href="#">Stories</a></li>
					<li><a href="#">Kontakt</a></li>
				</ul>
			</nav>
			<div class="w-full">
				<ContextualLogo />
				<div class="w-12 mx-auto mb-12">
					<JulienStar transition={false} textColor="#000000" />
				</div>
				<p class="text-center">
					The patented GTS Aero System is commercial, scalable, substrate-free technology producing
					optimal and efficient plant cultivation.
				</p>
			</div>
			<div class="flex items-center space-x-2">
				<div class="w-7 h-7">
					<JulienStar transition={false} textColor="#000000" />
				</div>
				<div>envisioned by <a href="#" class="text-primary">abteilung.ch</a></div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="col-span-3 lg:col-span-2">
			<slot />
		</div>
	</div>
</div>
