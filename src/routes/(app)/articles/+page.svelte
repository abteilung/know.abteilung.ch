<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	export let data;

	let articles = data?.articles || [];
	let filteredArticles = [...articles];

	const uniqueTags = Array.from(
		new Set(articles.flatMap((article) => article.tags.map((tag) => tag.tags_id.slug)))
	).map((slug) => ({ slug, checked: false }));

	let selectedTags: Set<string> = new Set();

	function updateFilter(tag, checked) {
		tag.checked = checked;

		if (checked) {
			selectedTags.add(tag.slug);
		} else {
			selectedTags.delete(tag.slug);
		}

		if (selectedTags.size === 0) {
			filteredArticles = [...articles];
		} else {
			filteredArticles = articles.filter(
				(article) =>
					article.tags.some((tag) => selectedTags.has(tag.tags_id.slug)) ||
					article.tags.length === 0
			);
		}
	}
</script>

<h1>Articles page</h1>

<div class="flex space-x-4">
	{#each uniqueTags as tag}
		<label>
			<input
				type="checkbox"
				bind:checked={tag.checked}
				on:change={() => updateFilter(tag, tag.checked)}
			/>
			{tag.slug}
		</label>
	{/each}
</div>

<div class="container">
	<div class="grid lg:grid-cols-4 grid-cols-3">
		{#each filteredArticles as article, i}
			<Card content={article} />
		{/each}
	</div>
</div>
