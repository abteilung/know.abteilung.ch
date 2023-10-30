<script>
	import ZoomingText from '$lib/components/ZoomingText.svelte';
	import { getContext } from 'svelte';

	const phrase = getContext('phrase') || 'Abteilung für Gestaltung&nbsp;GmbH';

	// Regular expression to split on spaces outside of HTML tags
	const words = phrase.split(/(?<!<[^>]*)\s/);
</script>

<ZoomingText class="text-center h2 font-black">
	{#each words as word}
		{@html word}<br />
	{/each}
</ZoomingText>
