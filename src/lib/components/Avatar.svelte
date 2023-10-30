<script lang="ts">
	import { cn } from '$lib/utils';
	import Image from '$lib/components/Image.svelte';
	export let content;
	export let additionalClass: string;
	export { additionalClass as class };
</script>

<svelte:element
	this={content.slug ? 'a' : 'div'}
	href={content.slug ? `/articles/${content.slug}` : null}
	class={cn('flex  items-center space-x-4 ', additionalClass)}
>
	<Image
		{...content}
		width="100"
		height="100"
		class="w-16 h-16 rounded-full  shadow-red-500/50 shadow-lg  decoration-purple-500"
	/>
	<div class="">
		<p class="font-bold">{content.name}</p>
		{#if content.title}<p>{content.title}</p>{/if}
	</div>
</svelte:element>
