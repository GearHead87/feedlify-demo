import React from 'react'
import { Badge } from "@/components/ui/badge"

interface TagsFilterProps {
  selectedTags: string[]
  onTagSelect: (tag: string) => void
}

const TagsFilter: React.FC<TagsFilterProps> = ({ selectedTags, onTagSelect }) => {
  const allTags = ['tag1', 'tag2', 'tag3', 'tag4']

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Filter by Tags</h2>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default TagsFilter