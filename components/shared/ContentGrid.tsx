'use client';

import Image from 'next/image';
import React from 'react';
import { Card, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, HelpCircle, ChevronDown, CircleCheckBig } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Content {
	thumbnail: string;
	title: string;
	description: string;
	tags: string[];
}

interface ContentGridProps {
	contents: Content[];
	varient: 'collections' | 'feedly';
}

const ContentGrid: React.FC<ContentGridProps> = ({ contents, varient }) => {
	return (
		<div className="grid grid-cols-1 gap-6">
			{contents.map((item, index) => (
				<Card key={index} className="overflow-hidden">
					<div className="flex flex-col sm:flex-row">
						<div className="w-full sm:w-1/3">
							<Image
								src={item.thumbnail}
								alt={item.title}
								className="w-full h-48 sm:h-full object-cover"
								width={400}
								height={300}
							/>
						</div>
						<div className="flex flex-col justify-between w-full sm:w-2/3 p-4">
							<div>
								<h3 className="text-lg font-semibold mb-2">{item.title}</h3>
								<p className="text-muted-foreground mb-4">{item.description}</p>
								<div className="flex flex-wrap gap-2 mb-4">
									{item.tags.map((tag, tagIndex) => (
										<Badge key={tagIndex} variant="secondary">
											{tag}
										</Badge>
									))}
								</div>
							</div>
							<CardFooter className="px-0 pt-4 flex justify-end gap-2">
								{varient === 'feedly' && (
									<>
										<Button variant="outline">
											<CircleCheckBig className="mr-2 h-4 w-4" />
											Accepted
										</Button>
										<Button variant="outline">
											<Check className="mr-2 h-4 w-4" />
											Relevant
										</Button>
										<Button variant="outline">
											<X className="mr-2 h-4 w-4" />
											irrelevant
										</Button>
									</>
								)}
								{varient === 'collections' && (
									<>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="outline">
													<Check className="mr-2 h-4 w-4" />
													Accept
													<ChevronDown className="ml-2 h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem>Great</DropdownMenuItem>
												<DropdownMenuItem>Good</DropdownMenuItem>
												<DropdownMenuItem>Average</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
										<Button variant="outline">
											<X className="mr-2 h-4 w-4" />
											Decline
										</Button>
										<Button variant="outline">
											<HelpCircle className="mr-2 h-4 w-4" />
											Question
										</Button>
									</>
								)}
							</CardFooter>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
};

export default ContentGrid;
