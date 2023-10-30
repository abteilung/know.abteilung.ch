<script lang="ts">
	// Define the type for the coverImage prop
	type CoverImageType = {
		id: string;
		storage: string;
		filename_disk: string;
		filename_download: string;
		title: string;
		type: string;
		description?: string | null; // assuming these can be optional or null
		location?: string | null;
		tags?: any; // provide a more specific type if possible
	};

	export let coverImage: CoverImageType;
	export let profilePicture: CoverImageType;
	export let width: number;
	export let height: number;
	export let alt: string;
	export let fit: 'cover' | 'contain' | 'inside' | 'outside' = 'cover';
	export let format: 'auto' | 'jpg' | 'png' | 'webp' | 'tiff' = 'auto';
	export let quality: number = 80;

	export let additionalClass: string; // Made this optional
	export { additionalClass as class };

	// Define the various sizes you want to support
	const sizes = import.meta.env.VITE_IMAGE_SIZES.split(',').map((size) => parseInt(size));

	// Calculate aspect ratio
	const aspectRatio = width / height;

	// Generate URLs for each size. This will create an array of URLs.
	$: imageUrls = sizes.map((size) => {
		const adjustedHeight = Math.round(size / aspectRatio);
		return {
			url: `${import.meta.env.VITE_DIRECTUS_URL}/assets/${
				coverImage?.filename_disk || profilePicture?.filename_disk
			}?width=${size}&height=${adjustedHeight}&fit=${fit}&quality=${quality}&format=${format}`,
			width: size,
			height: adjustedHeight
		};
	});

	// Generate srcset and sizes strings
	$: srcset = imageUrls.map(({ url, width }) => `${url} ${width}w`).join(', ');
	$: sizesValue = sizes.map((size) => `(max-width: ${size}px) ${size}px`).join(', ');

	// Reactive alt assignment
	$: alt =
		alt ||
		coverImage?.title ||
		coverImage?.filename_download ||
		profilePicture?.title ||
		profilePicture?.filename_download;
</script>

<picture>
	<img
		{srcset}
		sizes={sizesValue}
		src={imageUrls[imageUrls.length - 1].url}
		{alt}
		{width}
		{height}
		class={additionalClass}
	/>
</picture>
