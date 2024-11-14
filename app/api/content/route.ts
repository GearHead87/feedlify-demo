// app/api/content/route.ts
import { getFilteredContent } from '@/lib/contentService';
import { ContentType } from '@/lib/types';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const tags = searchParams.get('tags') as string;
	let content: ContentType[];
	if (tags) {
		content = await getFilteredContent(tags?.split(','));
	} else {
		content = await getFilteredContent('');
	}
	console.log(tags);

	return NextResponse.json(content);
}
