<script lang="ts">
	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let isLoaded: boolean = false;

	onMount(() => {
		isLoaded = true;
	});

	export let content: any;
	export let position: string = 'absolute';
</script>

<!-- Pills Component for Card Items -->
<div class={cn(position, 'space-x-2  top-4 left-4')}>
	{#each content as tag, i}
		{#if isLoaded}
			<svelte:element
				this={tag.tags_id.slug ? 'a' : 'span'}
				in:fade={{ delay: i * 150, duration: 250 }}
				href={tag.tags_id.slug ? `${'/tags/' + tag.tags_id.slug}` : null}
				class="px-2 py-1 rounded-full text-xs text-white bg-blue-500 hover:bg-black"
			>
				{tag.tags_id.title}
			</svelte:element>
		{/if}
	{/each}
</div>
