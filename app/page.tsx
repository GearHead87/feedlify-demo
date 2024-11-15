'use client';

import { useState } from 'react';
import useSWR from 'swr';
import ContentGrid from '@/components/shared/ContentGrid';
import TagsFilter from '@/components/shared/TagsFilter';
import TrendingContent from '@/components/shared/TrendingContent';
import fetcher from '@/lib/fetcher';

export default function Home() {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const { data, error, isLoading } = useSWR(
		`/api/content?tags=${selectedTags.join(',')}`,
		fetcher
	);

	const handleTagSelect = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col lg:flex-row gap-8">
				<aside className="w-full lg:w-1/5">
					<TagsFilter selectedTags={selectedTags} onTagSelect={handleTagSelect} />
				</aside>
				<main className="w-full lg:w-1/2">
					{error ? (
						<div className="text-center text-red-500">Error loading content</div>
					) : isLoading ? (
						<div className="text-center">Loading...</div>
					) : (
						<ContentGrid contents={data} />
					)}
				</main>
				<aside className="w-full lg:w-1/4">
					<h2 className="text-2xl font-bold mb-4">Trending Content</h2>
					<TrendingContent />
				</aside>
			</div>
		</div>
	);
}
