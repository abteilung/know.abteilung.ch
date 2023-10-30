<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	export let additionalClass: string;
	export { additionalClass as class };

	export let elementID: string = 'quote';
	export { elementID as id };

	let quoteElement;

	function transformQuote() {
		const quote = quoteElement.innerHTML;
		quoteElement.innerHTML = '';

		const parser = new DOMParser();
		const doc = parser.parseFromString(quote, 'text/html');

		const n = 5; // Number of groups

		// Counter to track the span elements
		let spanCounter = 0;

		function wrapInSpan(text) {
			const spanNode = document.createElement('span');
			spanNode.textContent = text;

			// Assign to a random group.
			const group = Math.floor(Math.random() * n);

			spanNode.classList.add('opacity-0', 'duration-500', 'transform-all', 'inline-block');

			// Assign even or odd class based on the counter
			if (spanCounter % 2 === 0) {
				spanNode.classList.add('scale-[2.5]');
			} else {
				spanNode.classList.add('-scale-[2.5]');
			}

			setTimeout(() => {
				spanNode.classList.remove('opacity-0', 'duration-500', 'scale-[2.5]', '-scale-[2.5]');
				spanNode.classList.add('opacity-100', 'duration-500', 'scale-100');
			}, group * 100);

			// Increment the counter for the next span element
			spanCounter++;

			return spanNode;
		}

		function traverse(node) {
			if (node.nodeType === Node.ELEMENT_NODE) {
				const newNode = document.createElement(node.nodeName);
				for (const { name, value } of node.attributes) {
					newNode.setAttribute(name, value);
				}

				for (const childNode of node.childNodes) {
					const processedChild = traverse(childNode);
					newNode.appendChild(processedChild);
				}

				return newNode;
			} else if (node.nodeType === Node.TEXT_NODE) {
				const fragment = document.createDocumentFragment();

				const words = node.textContent.split(/\s+/);
				let lastNode;

				words.forEach((word, index) => {
					// Check if the word is the last in the sequence and ends with punctuation
					const isLastWordWithPunct = index === words.length - 1 && /[.,;:]$/.test(word);
					if (!isLastWordWithPunct && /[.,;:]$/.test(word) && lastNode) {
						const punctuation = word.slice(-1);
						word = word.slice(0, -1);
						lastNode.textContent += punctuation;
					}

					const spanNode = wrapInSpan(word);
					fragment.appendChild(spanNode);

					if (index !== words.length - 1) {
						fragment.appendChild(document.createTextNode(' '));
					}
					lastNode = spanNode;
				});

				return fragment;
			}
		}

		for (const childNode of doc.body.childNodes) {
			quoteElement.appendChild(traverse(childNode));
		}
	}

	function animateCharacters() {
		const charElements = quoteElement.innerHTML.split(''); // Selecting nested spans
		let delay = 2000; // Start after 12 seconds

		charElements.forEach((charSpan) => {
			setTimeout(() => {
				charSpan.classList.add('scale-[2.5]', 'duration-[750]');
				setTimeout(() => {
					charSpan.classList.remove('scale-[2.5]');
					charSpan.classList.add('scale-100');
					setTimeout(() => {
						charSpan.classList.remove('scale-100');
					}, 150); // Reset to original state after 150ms
				}, 300); // Start zooming out after 300ms
			}, delay);

			delay += 250; // Increment delay for the next character to create the wave effect
		});
	}

	onMount(() => {
		transformQuote();
		setTimeout(animateCharacters, 0); // Start the animation after 12 seconds
	});
</script>

<div class={additionalClass} id={elementID} bind:this={quoteElement}>
	<slot />
</div>

<div class="button mt-12" on:click={() => transformQuote()}>Play again</div>
