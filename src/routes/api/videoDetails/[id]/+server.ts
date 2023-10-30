import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
const API_KEY = import.meta.env.VITE_YOUTUBE_API;

export const GET: RequestHandler = async (request) => {
	const videoId = request.params.id; // Access the dynamic id from the URL
	console.log('videoId: ', videoId);

	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${API_KEY}`
	);

	const data = await response.json();
	return json(data);
};
