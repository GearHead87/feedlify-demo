// app/api/content/route.ts
import { getFilteredContent } from '@/lib/contentService';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {

	const searchParams = request.nextUrl.searchParams;
	const tags = searchParams.get('tag') as string;
	const filteredContent = await getFilteredContent(tags?.split(','));
    
	return NextResponse.json(filteredContent);
}
