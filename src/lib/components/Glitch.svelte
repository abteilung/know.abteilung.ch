<script>
	import { onMount } from 'svelte';

	let text = 'Glitch';

	// Function to apply random glitch effect
	function applyRandomGlitch() {
		const glitchElements = document.querySelectorAll('.glitch::before, .glitch::after');
		glitchElements.forEach((element) => {
			const duration = Math.random() * 0.5 + 0.1; // Duration between 0.1s and 0.6s
			const skewAngle = Math.random() * 10 - 5; // Skew angle between -5deg and 5deg
			const shadowDirection = Math.random() < 0.5 ? -2 : 2; // Shadow direction either -2px or 2px

			element.style.setProperty('--skew-angle', `${skewAngle}deg`);
			element.style.setProperty('--shadow-color', Math.random() < 0.5 ? 'red' : 'blue');
			element.style.setProperty('--shadow-direction', `${shadowDirection}px`);
			element.style.setProperty('animation-duration', `${duration}s`);
		});
	}

	// Apply random glitch effect at random intervals
	onMount(() => {
		const interval = setInterval(applyRandomGlitch, Math.random() * 500 + 200);
		return () => clearInterval(interval); // Cleanup on component destroy
	});
</script>

<div class="glitch" data-text={text}>
	{text}
</div>

<style>
	.glitch {
		@apply relative text-white text-3xl uppercase tracking-widest;
		/* background: black; */
	}

	.glitch::before,
	.glitch::after {
		/* background: black; */
		opacity: 0.5;
		content: attr(data-text);
		position: absolute;
		mix-blend-mode: screen;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		transform: skew(var(--skew-angle));
		text-shadow: -2px 0 var(--shadow-color);
	}

	.glitch::before {
		left: 2px;
		text-shadow: -2px 0 red;
		animation: glitch-skew 0.2s infinite linear alternate-reverse;
	}

	.glitch::after {
		left: -2px;
		text-shadow: -2px 0 blue;
		animation: glitch-skew 0.5s infinite linear alternate;
	}

	@keyframes glitch-skew {
		0% {
			transform: skew(0deg);
		}
		10% {
			transform: skew(5deg);
		}
		20% {
			transform: skew(-5deg);
		}
		30% {
			transform: skew(5deg);
		}
		40%,
		100% {
			transform: skew(0deg);
		}
	}
</style>
