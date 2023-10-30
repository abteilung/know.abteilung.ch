export async function load({ fetch, params }) {
	// Import API key from .env:
	const API_KEY = import.meta.env.VITE_YOUTUBE_API;
	const VIDEO_ID = 'GT-5XNqFXb4'; // Assuming the video ID is a route parameter
	// const VIDEO_ID = params.id; // Assuming the video ID is a route parameter
	const res = await fetch(
		`https://www.googleapis.com/youtube/v3/videos?id=${VIDEO_ID}&part=contentDetails&key=${API_KEY}`
	);
	const data = await res.json();

	return {
		videoDetails: data.items
	};
}
