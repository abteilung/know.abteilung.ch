// Combine ClassNames
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

const UNITS = {
	year: 24 * 60 * 60 * 1000 * 365,
	month: (24 * 60 * 60 * 1000 * 365) / 12,
	day: 24 * 60 * 60 * 1000,
	hour: 60 * 60 * 1000,
	minute: 60 * 1000,
	second: 1000
};

const LOCALE = 'de-CH';

const rtf = new Intl.RelativeTimeFormat(LOCALE, { numeric: 'auto' });

export function formatRelativeTime(fromDate, toDate) {
	const elapsed = fromDate - (toDate || new Date());

	// "Math.abs" accounts for both "past" & "future" scenarios
	for (let u in UNITS) {
		if (Math.abs(elapsed) > UNITS[u] || u === 'second')
			return rtf.format(Math.round(elapsed / UNITS[u]), u);
	}

	return fromDate.toLocaleDateString(LOCALE);
}

// Embeds
type UrlTransformation = {
	pattern: RegExp;
	replacement: string;
};

const transformations: UrlTransformation[] = [
	// Video Players
	{
		pattern: /https:\/\/www\.youtube\.com\/watch\?v=(.+)/,
		replacement: 'https://www.youtube.com/embed/$1'
	},
	{
		pattern: /https:\/\/vimeo\.com\/(.+)/,
		replacement: 'https://player.vimeo.com/video/$1'
	},
	{
		pattern: /https:\/\/www\.loom\.com\/share\/(.+)/,
		replacement: 'https://www.loom.com/embed/$1'
	},
	// File Services
	{
		pattern: /https:\/\/drive\.google\.com\/file\/d\/(.*?)\/view/,
		replacement: 'https://drive.google.com/file/d/$1/preview'
	}
	// Calendar Tools
	// Calendly: Remains unchanged
	// SavvyCal: Remains unchanged
	// Hubspot: @TODO
];

export function transformUrlToIframeSrc(url: string): string {
	for (const transformation of transformations) {
		if (transformation.pattern.test(url)) {
			return url.replace(transformation.pattern, transformation.replacement);
		}
	}

	// If no transformation matches, return the original URL.
	return url;
}

//Generate the Youtube, Vimeo, or Loom embed URL based on an URL from the user
export function generateVideoEmbed(url: string) {
	if (url.includes('youtube.com')) {
		return `https://www.youtube.com/embed/${url.split('v=')[1]}`;
	}
	// Handle youtu.be links
	else if (url.includes('youtu.be')) {
		return `https://www.youtube.com/embed/${url.split('be/')[1]}`;
	} else if (url.includes('vimeo.com')) {
		return `https://player.vimeo.com/video/${url.split('vimeo.com/')[1]}`;
	} else if (url.includes('loom.com')) {
		return `https://www.loom.com/embed/${url.split('loom.com/share/')[1]}`;
	} else {
		return url;
	}
}

// Function to easily format a mailto link. Encodes the subject and body to preserve formatting.
export function createMailto(
	to: string,
	{ subject, body, cc, bcc }: { subject?: string; body?: string; cc?: string; bcc?: string } = {}
): string {
	const params = [
		subject && `subject=${encodeURIComponent(subject)}`,
		body && `body=${encodeURIComponent(body)}`,
		cc && `cc=${encodeURIComponent(cc)}`,
		bcc && `bcc=${encodeURIComponent(bcc)}`
	]
		.filter(Boolean)
		.join('&');

	return `mailto:${to}?${params}`;
}

export function createTel(phoneNumber: string) {
	// Remove all non-numeric characters
	const cleanedNumber = phoneNumber.replace(/\D+/g, '');

	// Check if the number has a country code (e.g., +1 for the US)
	if (cleanedNumber.length > 10 && cleanedNumber.startsWith('1')) {
		return `tel:+${cleanedNumber}`;
	}

	return `tel:${cleanedNumber}`;
}

// Calculate read time for a string
export function calculateReadTime(
	str: string | undefined,
	wordsPerMinute = 200
): string | undefined {
	if (!str) return;
	// Strip HTML tags
	str = str.replace(/(<([^>]+)>)/gi, '');
	const noOfWords = str.split(/\s/g).length;
	const minutes = noOfWords / wordsPerMinute;
	const readTime = Math.ceil(minutes);
	return readTime + ' min read';
}

import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
	return uuidv4();
}

export function stripHTML(original: string | undefined): string | undefined {
	if (!original) return;
	else return original.replace(/(<([^>]+)>)/gi, '');
}

export function truncateString(str: string | undefined, num: number): string | undefined {
	if (!str) return;

	if (str.length <= num) {
		return str;
	}

	return str.slice(0, num) + '...';
}

export function truncateHTML(html: string | undefined, num: number): string | undefined {
	if (!html) return;
	return truncateString(stripHTML(html), num);
}

// Slugify a string for hyphens and underscores
export function slugify(str: string | undefined): string | undefined {
	if (!str) return;
	return str
		.toString()
		.trim()
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');
}

// Deslugify a string for hyphens and underscores and capitalize each word
export function deslugify(str: string | undefined): string | undefined {
	if (!str) return;
	return str
		.trim()
		.toLowerCase()
		.replace(/[-_]+/g, ' ')
		.replace(/ +/g, ' ')
		.replace(/(^| )(\w)/g, (s) => s.toUpperCase());
}

export function getDomainNameFromEmail(email: string): string {
	const temp = email.replace(/.*@/, '').split('.');
	return temp[temp.length - 2];
}
