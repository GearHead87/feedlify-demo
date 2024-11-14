import Image from 'next/image';
import React from 'react';

interface Content {
	thumbnail: string;
	title: string;
	description: string;
	tags: string[];
}

interface ContentGridProps {
	contents: Content[];
}

const ContentGrid: React.FC<ContentGridProps> = ({ contents }) => {
	return (
		<div className="grid grid-cols-2 flex-1">
			{contents.map((item, index) => (
				<div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-96">
					<Image
						src={`${item.thumbnail}`}
						alt={item.title}
						className="w-full h-48 object-cover"
						width={400}
						height={400}
					/>
					<div className="p-4">
						<h3 className="text-lg font-bold mb-2">{item.title}</h3>
						<p className="text-gray-700 mb-4">{item.description}</p>
						<div className="flex flex-wrap gap-2">
							{item.tags.map((tag, tagIndex) => (
								<span
									key={tagIndex}
									className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ContentGrid;
