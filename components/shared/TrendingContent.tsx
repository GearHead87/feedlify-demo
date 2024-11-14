import fetcher from '@/lib/fetcher';
import { ContentType } from '@/lib/types';
import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';

const TrendingContent = () => {
	const { data: contents, isLoading } = useSWR<ContentType[]>(`/api/content?tags=`, fetcher);
	if (isLoading) {
		return <div>Loading....</div>;
	}
	return (
		<div className="bg-gray-100 p-4 mb-4">
			<div className="bg-gray-100 p-4 mb-4">Tranding Content</div>
			<div className="flex flex-col gap-2">
				{contents?.map((item, index) => (
					<div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
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
		</div>
	);
};

export default TrendingContent;