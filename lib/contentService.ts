// utils/contentService.ts
const content = [
	{
		thumbnail: 'https://i.ibb.co.com/B6YrLZ1/local-hero.webp',
		title: 'Content 1',
		description: 'This is the description for Content 1',
		tags: ['tag1', 'tag2', 'tag3'],
	},
	{
		thumbnail: 'https://i.ibb.co.com/B6YrLZ1/local-hero.webp',
		title: 'Content 2',
		description: 'This is the description for Content 2',
		tags: ['tag2', 'tag3'],
	},
	{
		thumbnail: 'https://i.ibb.co.com/B6YrLZ1/local-hero.webp',
		title: 'Content 2',
		description: 'This is the description for Content 2',
		tags: ['tag3', 'tag4'],
	},
	{
		thumbnail: 'https://i.ibb.co.com/B6YrLZ1/local-hero.webp',
		title: 'Content 2',
		description: 'This is the description for Content 2',
		tags: ['tag2'],
	},
	{
		thumbnail: 'https://i.ibb.co.com/B6YrLZ1/local-hero.webp',
		title: 'Content 2',
		description: 'This is the description for Content 2',
		tags: ['tag4'],
	},
	// Add more content as needed
];

export async function getFilteredContent(selectedTags: string[]) {
	if (!selectedTags) {
		return content;
	}

	return content.filter((item) => selectedTags.every((tag) => item.tags.includes(tag)));
}
