<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened, spring } from 'svelte/motion';
	import { cubicOut, cubicIn, cubicInOut } from 'svelte/easing';
	import { interpolateRgb } from 'd3-interpolate';
	import { fade } from 'svelte/transition';

	import { cn } from '$lib/utils';

	export let transition: boolean = true;
	export let additionalClass: string;
	export { additionalClass as class };

	let legIsVisible: boolean = false;
	let showText: boolean = false;

	let size = spring(1);

	// The pace should be different if transition is true
	// If transition is true, the star will grow faster
	let pace: number = transition ? 400 : 0;

	const starProgress = tweened(0, {
		duration: pace * 2,
		easing: cubicInOut
	});

	onMount(() => {
		// Set the progress to 1 after 500ms
		setTimeout(() => {
			starProgress.set(1);
		}, pace); // delay of 500ms

		setTimeout(() => {
			showText = true;
		}, pace * 4); // delay of 1000ms

		legIsVisible = true;
	});

	let legs: number = 5;
	let legRotation: number = 360 / legs;
	let legStartX = 14.4;
	let legStartY = 22.5;
	let legEndX = 14.4;
	let legEndY = 35;

	$: strokeWidth = 4 * $starProgress;
	$: color = '#ef3357';

	let centerX = 20;
	let centerY = 20;

	$: legsLines = Array.from({ length: legs }).map((_, i) => {
		let angle = i * legRotation * (Math.PI / 180); // Convert to radians
		let dx = (legStartX - centerX) * Math.cos(angle) - (legStartY - centerY) * Math.sin(angle);
		let dy = (legStartX - centerX) * Math.sin(angle) + (legStartY - centerY) * Math.cos(angle);
		let dxEnd =
			(legEndX - centerX) * Math.cos(angle) * $size - (legEndY * $size - centerY) * Math.sin(angle);
		let dyEnd =
			(legEndX - centerX) * Math.sin(angle) * $size + (legEndY * $size - centerY) * Math.cos(angle);
		return {
			x1: centerX + dx,
			y1: centerY + dy,
			x2: centerX + dxEnd,
			y2: centerY + dyEnd
		};
	});

	$: strokeWidth = 4 * $starProgress;

	// Use d3-interpolate to interpolate between colors
	export let textColor: string = '#ffffff';
	const startColor = '#ffffff';
	const endColor = '#ef3357';
	$: color = interpolateRgb(startColor, endColor)($starProgress);

	// $: viewWidth = 33 + 137 * $labelProgress;
	$: viewBoxValue = `3 3 33 33`;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={viewBoxValue}
	transition:fade
	class={cn(additionalClass, 'relative transition-all duration-500')}
>
	<defs>
		<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
			<stop offset="0%" stop-color="#ffffff" />
			<stop offset="100%" stop-color="#ef3357" />
		</linearGradient>
	</defs>

	<g>
		{#each legsLines as line, i}
			<!-- Fade in every i with a 50ms delay -->
			{#if legIsVisible}
				<line
					class="leg"
					fill="none"
					stroke={color}
					stroke-width={strokeWidth}
					stroke-miterlimit="10"
					x1={line.x1}
					y1={line.y1}
					x2={line.x2}
					y2={line.y2}
				/>
			{/if}
		{/each}
	</g>
</svg>

<style lang="postcss">
	@keyframes rotateCurtains {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(45deg);
		}
		100% {
			transform: rotate(-45deg);
		}
	}

	#curtains {
		animation: rotateCurtains 2s infinite alternate;
	}
</style>
