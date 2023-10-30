<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const playlist = [
		'GT-5XNqFXb4',
		'fqhjyF9nXrU',
		'T7TtWdOSlk8',
		'OtbdJJb-4ek',
		'XpWaDisMmAE',
		'6x3WtZjyvdA',
		'qWejqstaV3E'
	];

	let videoDetailsList = [];
	let currentVideoIndex = 0;
	let player;
	let currentTime = 0;
	let percentageWatched = 0;

	async function fetchVideoDetails(videoId) {
		const response = await fetch(`/api/videoDetails/${videoId}`);
		const details = await response.json();
		return details;
	}

	onMount(async () => {
		videoDetailsList = [...(await Promise.all(playlist.map((id) => fetchVideoDetails(id))))];

		// Check if the IFrame Player API script has already been loaded
		if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
			const tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/iframe_api';
			const firstScriptTag = document.getElementsByTagName('script')[0];
			if (firstScriptTag && firstScriptTag.parentNode) {
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			} else {
				document.head.appendChild(tag);
			}
		}

		// This function creates an <iframe> (and YouTube player) after the API code downloads.
		window.onYouTubeIframeAPIReady = () => {
			player = new YT.Player('player', {
				height: '480',
				width: '560',
				videoId: videoDetailsList[currentVideoIndex]?.items[0]?.id,
				events: {
					onReady: onPlayerReady,
					onStateChange: onPlayerStateChange
				},
				playerVars: {
					autoplay: 1,
					controls: 1,
					mute: 1,
					showinfo: 0,
					modestbranding: 1,
					rel: 0,
					iv_load_policy: 3
				}
			});
		};
	});

	function onPlayerReady(event) {
		event.target.playVideo();
	}

	let intervalId; // Add this line to store the interval ID

	function onPlayerStateChange(event) {
		if (event.data == YT.PlayerState.PLAYING) {
			// Clear any existing intervals
			clearInterval(intervalId);

			// Set the interval and store its ID
			intervalId = setInterval(() => {
				currentTime = player.getCurrentTime();
				const totalDuration = player.getDuration();
				percentageWatched = (currentTime / totalDuration) * 100;
			}, 1000);
		}

		// Check if the video has ended
		if (event.data == YT.PlayerState.ENDED) {
			clearInterval(intervalId); // Clear the interval
			playNextVideo();
		}
	}

	function playNextVideo() {
		if (currentVideoIndex < videoDetailsList.length - 1) {
			currentVideoIndex++;
		} else {
			currentVideoIndex = 0; // Loop back to the first video
		}
		player.loadVideoById(videoDetailsList[currentVideoIndex]?.items[0]?.id);
	}

	function parseISO8601Duration(duration) {
		const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

		const hours = parseInt(match[1]) || 0;
		const minutes = parseInt(match[2]) || 0;
		const seconds = parseInt(match[3]) || 0;

		return { hours, minutes, seconds };
	}

	function formatDuration(duration) {
		const { hours, minutes, seconds } = parseISO8601Duration(duration);

		// Format the duration into "HH:MM:SS" or "MM:SS" if hours is 0
		return hours > 0
			? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
					.toString()
					.padStart(2, '0')}`
			: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	$: src = `https://www.youtube.com/embed/${videoDetailsList[currentVideoIndex]?.items[0]?.id}?autoplay=1&controls=0&mute=1`;

	$: currentVideoDuration = videoDetailsList[currentVideoIndex]
		? formatDuration(videoDetailsList[currentVideoIndex].items[0].contentDetails.duration)
		: '';
</script>

<div class="absolute bottom-0 left-0 p-5 bg-red-500 text-white">
	<h2>Duration: {currentVideoDuration}</h2>
	<p>Current Time: {currentTime.toFixed(2)} seconds</p>
	<p>Percentage Watched: {percentageWatched.toFixed(2)}%</p>
</div>
<div class="w-screen h-screen bg-black flex justify-center items-center">
	<div id="player" />
</div>

<style lang="postcss">
	#player {
		@apply w-full h-full aspect-[16/9];
		@apply border-none;
	}
</style>
