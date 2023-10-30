import { getDirectusClient } from '$lib/client';
import { formatRelativeTime } from '$lib/utils';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const directus = await getDirectusClient();

	let article;
	try {
		article = await directus.items('articles').readByQuery({
			fields: [
				'*',
				'author.profilePicture.*',
				'author.name',
				'author.email',
				'author.date_created',
				'relatedArticles.*.title',
				'relatedArticles.*.slug',
				'tags.*.title',
				'tags.*.slug'
			],
			filter: {
				slug: { _eq: slug },
				status: { _eq: 'published' }
			}
		});
	} catch (err) {
		return {
			status: 404
		};
	}

	const formattedArticle = {
		...article
		// publishedAt: formatRelativeTime(new Date(article.date_created))
	};

	const moreArticlesResponse = await directus.items('articles').readByQuery({
		fields: ['*'],
		// fields: ['*', 'author.avatar', 'author.first_name', 'author.last_name'],
		filter: {
			_and: [{ slug: { _neq: slug } }, { status: { _eq: 'published' } }]
		},
		limit: 2
	});
	const formattedMoreArticles = moreArticlesResponse.data.map((moreArticle) => {
		return {
			...moreArticle
			// publishedAt: formatRelativeTime(new Date(moreArticle.publishedAt))
		};
	});

	return {
		body: { article: formattedArticle, moreArticles: formattedMoreArticles }
	};
};
