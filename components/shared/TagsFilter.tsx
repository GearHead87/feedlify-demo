import React from 'react';

interface TagsFilterProps {
	selectedTags: string[];
	onTagSelect: (tag: string) => void;
}

const TagsFilter: React.FC<TagsFilterProps> = ({ selectedTags, onTagSelect }) => {
	const allTags = ['tag1', 'tag2', 'tag3', 'tag4'];

	return (
		<div className="bg-gray-100 p-4 mb-4">
			<h2 className="text-lg font-bold mb-2">Filter by Tags</h2>
			<div className="flex flex-wrap gap-2">
				{allTags.map((tag) => (
					<button
						key={tag}
						className={`px-3 py-1 rounded-full transition-colors ${
							selectedTags.includes(tag)
								? 'bg-blue-500 text-white hover:bg-blue-600'
								: 'bg-white text-gray-700 hover:bg-gray-200'
						}`}
						onClick={() => onTagSelect(tag)}
					>
						{tag}
					</button>
				))}
			</div>
		</div>
	);
};

export default TagsFilter;
