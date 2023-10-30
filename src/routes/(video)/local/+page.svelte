<script lang="ts">
	import { onMount } from 'svelte';

	const playlist = [
		'/video/elaris-1.mp4',
		'/video/elaris-2.mp4',
		'/video/elaris-3.mp4',
		'/video/elaris-4.mp4',
		'/video/elaris-5.mp4',
		'/video/elaris-6.mp4',
		'/video/elaris-7.mp4'
	];

	let currentVideoIndex = 0;
	let currentTime = 0;
	let duration = 0;
	let percentageWatched = 0;
	$: src = playlist[currentVideoIndex];

	function playNextVideo() {
		if (currentVideoIndex < playlist.length - 1) {
			currentVideoIndex++;
		} else {
			currentVideoIndex = 0; // Loop back to the first video
		}
	}

	$: percentageWatched = (currentTime / duration) * 100;

	let videoElement; // Reference to the video element

	onMount(() => {
		if (videoElement) {
			// Update currentTime and duration when the metadata is loaded
			videoElement.addEventListener('loadedmetadata', () => {
				duration = videoElement.duration;
			});

			// Update currentTime regularly
			videoElement.addEventListener('timeupdate', () => {
				currentTime = videoElement.currentTime;
			});
		}
	});
</script>

<!-- <div class="absolute bottom-0 left-0 p-5 bg-red-500 text-white">
	<h2>Current Video: {currentVideoIndex + 1}/{playlist.length}</h2>
	<p>Current Time: {currentTime.toFixed(2)} seconds</p>
	<p>Percentage Watched: {percentageWatched.toFixed(2)}%</p>
</div> -->
<div class="w-screen h-screen bg-black flex justify-center items-center">
	<video
		id="player"
		width="560"
		height="480"
		{src}
		autoplay="autoplay"
		muted={true}
		controls={false}
		bind:this={videoElement}
		on:ended={playNextVideo}
	/>
</div>

<style lang="postcss">
	#player {
		@apply w-full h-full aspect-[16/9];
		@apply border-none;
	}
</style>
