import { getDirectusClient } from '$lib/client';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const load: PageServerLoad = async ({ params }) => {
	const directus = await getDirectusClient();

	let articles;
	try {
		articles = await directus.items('articles').readByQuery({
			fields: [
				'*',
				'coverImage.id',
				'coverImage.title',
				'coverImage.author',
				'coverImage.filename_disk',
				'coverImage.filename_download',
				'coverImage.location',
				'coverImage.description',
				'coverImage.tags',
				'coverImage.filesize',
				'coverImage.type',
				'coverImage.width',
				'coverImage.height',
				'author.profilePicture.id',
				'author.profilePicture.title',
				'author.profilePicture.author',
				'author.profilePicture.filename_disk',
				'author.profilePicture.filename_download',
				'author.profilePicture.location',
				'author.profilePicture.description',
				'author.profilePicture.tags',
				'author.profilePicture.filesize',
				'author.profilePicture.type',
				'author.profilePicture.width',
				'author.profilePicture.height',
				'author.name',
				'author.slug',
				'author.email',
				'author.date_created',
				'relatedArticles.*.title',
				'relatedArticles.*.slug',
				'tags.*.title',
				'tags.*.slug',
				'categories.*.title',
				'categories.*.slug'
			],
			filter: {
				status: { _eq: 'published' }
			}
		});
	} catch (err) {
		return {
			status: 404
		};
	}

	const formattedArticles = {
		...articles
	};

	return {
		articles: articles.data
	};
};
