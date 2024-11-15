'use client';

import React from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import fetcher from '@/lib/fetcher';
import { ContentType } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const TrendingContent = () => {
	const { data: contents, isLoading } = useSWR<ContentType[]>(`/api/content?tags=`, fetcher);

	if (isLoading) {
		return (
			<div className="space-y-4">
				{[...Array(3)].map((_, i) => (
					<Card key={i} className="overflow-hidden">
						<div className="flex items-center space-x-4 p-4">
							<Skeleton className="h-16 w-16 rounded" />
							<div className="space-y-2 flex-1">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-5/6" />
							</div>
						</div>
					</Card>
				))}
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{contents?.slice(0, 5).map((item, index) => (
				<Card key={index} className="overflow-hidden">
					<div className="flex items-center space-x-4 p-4">
						<Image
							src={item.thumbnail}
							alt={item.title}
							className="w-16 h-16 object-cover rounded"
							width={64}
							height={64}
						/>
						<div className="flex-1">
							<h3 className="font-semibold text-base mb-1">{item.title}</h3>
							<p className="text-sm mb-1">{item.description}</p>
							<div className="flex flex-wrap gap-1">
								{item.tags.slice(0, 2).map((tag, tagIndex) => (
									<Badge key={tagIndex} variant="secondary" className="text-xs">
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
};

export default TrendingContent;
