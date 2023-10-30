<script lang="ts">
	import { htmlEllipsis } from 'html-ellipsis';

	import Image from '$lib/components/Image.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Pills from '$lib/components/Pills.svelte';

	export let content;
</script>

<svelte:element
	this={content.slug ? 'a' : 'div'}
	href={content.slug ? `/articles/${content.slug}` : null}
	class="bg-white rounded-lg shadow-xl hover:shadow-md duration-150 overflow-hidden group"
>
	<div class="relative">
		<div
			class="inset-0 absolute w-full h-full bg-gradient-to-t from-black mix-blend-multiply to-transparent"
		/>
		<Pills content={content.tags} />
		<Image {...content} width="640" height="400" />
		<Avatar content={content.author} class="absolute bottom-4 left-4 text-white" />
	</div>
	<div class="p-6">
		<h4 class="mb-6">{content.title}</h4>
		{#if content.body}
			{@html htmlEllipsis(content.body, 160)}
		{/if}
	</div>
</svelte:element>
<!-- 
<pre>
{JSON.stringify(content.author, null, 2)}
</pre> -->
