<script lang="ts">
	import { onMount } from 'svelte';

	let descrambledWords = [];
	const text = 'Abteilung für Gestaltung GHBM';
	const words = text.split(' ');
	let durationPerChar = 120; // Total duration for each character to be descrambled
	let iterationsPerChar = 3; // Number of scramble iterations before a character is descrambled

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
		let display = Array.from({ length: targetText.length })
			.map((_) => getRandomChar())
			.join('');

		const iterationDuration = duration / iterations;

		const descrambleChar = () => {
			if (currentRevealIndex >= targetText.length) {
				return;
			}

			let iterationCount = 0;
			const scrambleTimer = setInterval(() => {
				display =
					targetText.slice(0, currentRevealIndex) +
					getRandomChar() +
					display.slice(currentRevealIndex + 1);

				updateDisplay(display);

				iterationCount++;
				if (iterationCount >= iterations) {
					clearInterval(scrambleTimer);
					display =
						targetText.slice(0, currentRevealIndex + 1) + display.slice(currentRevealIndex + 1);
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
		<pre class="text-3xl">{word.display}</pre>
	{/each}
</div>
