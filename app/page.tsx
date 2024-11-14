'use client'

import { useState } from 'react'
import useSWR from 'swr'
import ContentGrid from '@/components/shared/ContentGrid'
import TagsFilter from '@/components/shared/TagsFilter'
import TrendingContent from '@/components/shared/TrendingContent'
import fetcher from '@/lib/fetcher'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { data, error } = useSWR(`/api/content?tags=${selectedTags.join(',')}`, fetcher)

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
          <TagsFilter selectedTags={selectedTags} onTagSelect={handleTagSelect} />
        </div>
        <TabsContent value="all">
          {error ? (
            <div className="text-center text-red-500">Error loading content</div>
          ) : !data ? (
            <div className="text-center">Loading...</div>
          ) : (
            <ContentGrid contents={data} />
          )}
        </TabsContent>
        <TabsContent value="trending">
          <TrendingContent />
        </TabsContent>
      </Tabs>
    </div>
  )
}