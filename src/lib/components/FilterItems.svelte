<script lang="ts">
	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let isLoaded: boolean = false;

	let articles = [];

	// Filter Articles by Tag
	export let tag: string = null;
	$: filteredArticles = tag
		? articles.filter((article) => article.tags.some((t) => t.tags_id.slug === tag))
		: articles;

	onMount(() => {
		isLoaded = true;
	});
</script>

<h1>Articles page</h1>

<!-- Filter with a dropdown element -->
<select bind:value={tag}>
	<option value="">All</option>
	{#each $tags as tag}
		<option value={tag.slug}>{tag.title}</option>
	{/each}
</select>

FILTERED: {filteredArticles}

<div class="container">
	<div class="grid lg:grid-cols-4 grid-cols-3">
		{#each filteredArticles as article, i}
			{#if isLoaded}
				<div in:fade={{ delay: i * 150, duration: 250 }}>
					<Card content={article} />
				</div>
			{/if}
		{/each}
	</div>
</div>
