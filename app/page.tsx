// app/page.js
'use client';
import ContentGrid from '@/components/shared/ContentGrid';
import TagsFilter from '@/components/shared/TagsFilter';
import fetcher from '@/lib/fetcher';
import { useState } from 'react';
import useSWR from 'swr';

export default function Home() {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const { data, error } = useSWR(`/api/content?tags=${selectedTags.join(',')}`, fetcher);

	const handleTagSelect = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	return (
		<div className="flex gap-10">
			<TagsFilter selectedTags={selectedTags} onTagSelect={handleTagSelect} />
			{error ? (
				<div>Error loading content</div>
			) : !data ? (
				<div>Loading...</div>
			) : (
				<ContentGrid contents={data} />
			)}
		</div>
	);
}
