'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedlyInterface from './components/FeedlyInterface';
import ClipCollectionInterface from './components/ClipCollectionInterface';

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-8">
			<Tabs defaultValue='collections'>
				<TabsList>
					<TabsTrigger value="collections">Clip Collection</TabsTrigger>
					<TabsTrigger value="feedly">Feedly</TabsTrigger>
				</TabsList>
				<TabsContent value="collections">
					<ClipCollectionInterface />
				</TabsContent>
				<TabsContent value="feedly">
					<FeedlyInterface />
				</TabsContent>
			</Tabs>
		</div>
	);
}
