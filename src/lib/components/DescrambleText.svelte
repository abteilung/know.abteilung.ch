<script lang="ts">
	import { onMount } from 'svelte';

	let descrambledWords = [];
	const text = 'Abteilung für Gestaltung GHBM';
	const words = text.split(' ');
	let durationPerChar = 90; // Total duration for each character to be descrambled
	let iterationsPerChar = 4; // Number of scramble iterations before a character is descrambled

	onMount(() => {
		descrambledWords = words.map((word) => {
			return {
				text: word,
				display: progressiveDescramble(word, durationPerChar, iterationsPerChar)
			};
		});
	});

	function getRandomChar() {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		return chars.charAt(Math.floor(Math.random() * chars.length));
	}

	function progressiveDescramble(targetText, duration, iterations) {
		let currentRevealIndex = 0;
		let display = Array.from({ length: targetText.length }).map((_) => ({
			char: getRandomChar(),
			zoom: false
		}));

		const iterationDuration = duration / iterations;

		const descrambleChar = () => {
			if (currentRevealIndex >= targetText.length) {
				return;
			}

			let iterationCount = 0;
			const scrambleTimer = setInterval(() => {
				const randomChar = getRandomChar();
				display[currentRevealIndex] = { char: randomChar, zoom: true };

				updateDisplay(display);

				iterationCount++;
				if (iterationCount >= iterations) {
					clearInterval(scrambleTimer);
					display[currentRevealIndex] = { char: targetText[currentRevealIndex], zoom: false };
					updateDisplay(display);
					currentRevealIndex++;
					descrambleChar(); // Proceed to the next character
				}
			}, iterationDuration);
		};

		descrambleChar(); // Start the descrambling process

		function updateDisplay(newDisplay) {
			const wordIndex = descrambledWords.findIndex((w) => w.text === targetText);
			if (wordIndex !== -1) {
				descrambledWords[wordIndex].display = newDisplay;
				descrambledWords = [...descrambledWords];
			}
		}

		return display;
	}
</script>

<div class="h2 text-center">
	{#each descrambledWords as word, index}
		<pre class="text-3xl">
			{#each word.display as char}
				{@html char.zoom ? `<span class="zoom-out">${char.char}</span>` : char.char}
			{/each}
		</pre>
	{/each}
</div>

<style lang="postcss">
	:global(.zoom-out) {
		display: inline-block;
		animation: zoomOut 0.1s ease-out;
	}

	@keyframes zoomOut {
		from {
			transform: scale(1.5);
			opacity: 0.5;
			@apply text-alert;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
