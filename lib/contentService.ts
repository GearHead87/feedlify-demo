// utils/contentService.ts
const content = [
	{
		thumbnail: 'https://firebasestorage.googleapis.com/v0/b/simple-news-ddb74.appspot.com/o/feedlify%2Flittle-plant-FsO4cAZxiVk-unsplash.jpg?alt=media&token=6b5f2cd0-6f73-4ba5-adb8-309618299bae',
		title: 'Content 1',
		description: 'This is the description for Content 1',
		tags: ['tag1', 'tag2', 'tag3'],
	},
	{
		thumbnail: 'https://firebasestorage.googleapis.com/v0/b/simple-news-ddb74.appspot.com/o/feedlify%2Fbrian-mcgowan-YDDnFThf48g-unsplash.jpg?alt=media&token=693bcb82-7530-4fab-921e-b8dcc717a415',
		title: 'Content 2',
		description: 'This is the description for Content 2',
		tags: ['tag2', 'tag3'],
	},
	{
		thumbnail: 'https://firebasestorage.googleapis.com/v0/b/simple-news-ddb74.appspot.com/o/feedlify%2Flittle-plant-FsO4cAZxiVk-unsplash.jpg?alt=media&token=6b5f2cd0-6f73-4ba5-adb8-309618299bae',
		title: 'Content 2',
		description: 'This is the description for Content 2',
		tags: ['tag3', 'tag4'],
	},
	{
		thumbnail: 'https://firebasestorage.googleapis.com/v0/b/simple-news-ddb74.appspot.com/o/feedlify%2Fbrian-mcgowan-YDDnFThf48g-unsplash.jpg?alt=media&token=693bcb82-7530-4fab-921e-b8dcc717a415',
		title: 'Content 2',
		description: 'This is the description for Content 2',
		tags: ['tag2'],
	},
	{
		thumbnail: 'https://firebasestorage.googleapis.com/v0/b/simple-news-ddb74.appspot.com/o/feedlify%2Flittle-plant-FsO4cAZxiVk-unsplash.jpg?alt=media&token=6b5f2cd0-6f73-4ba5-adb8-309618299bae',
		title: 'Content 2',
		description: 'This is the description for Content 2',
		tags: ['tag4'],
	},
	// Add more content as needed
];

export async function getFilteredContent(selectedTags: string[] | '') {
	if (!selectedTags) {
		return content;
	}

	return content.filter((item) => selectedTags.every((tag) => item.tags.includes(tag)));
}
