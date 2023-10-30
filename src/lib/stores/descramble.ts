import { writable } from 'svelte';

function getRandomChar() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	return chars.charAt(Math.floor(Math.random() * chars.length));
}

function progressiveDescramble(targetText, durationPerChar) {
	const length = targetText.length;
	let currentRevealIndex = 0;
	const display = writable(
		Array.from({ length })
			.map((_) => getRandomChar())
			.join('')
	);

	const timer = setInterval(() => {
		display.set(
			targetText.slice(0, currentRevealIndex + 1) +
				Array.from({ length: length - currentRevealIndex - 1 })
					.map((_) => getRandomChar())
					.join('')
		);

		currentRevealIndex++;

		if (currentRevealIndex >= length) {
			clearInterval(timer);
		}
	}, durationPerChar);

	return display;
}
