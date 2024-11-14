import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Content {
  thumbnail: string
  title: string
  description: string
  tags: string[]
}

interface ContentGridProps {
  contents: Content[]
}

const ContentGrid: React.FC<ContentGridProps> = ({ contents }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((item, index) => (
        <Card key={index} className="overflow-hidden">
          <Image
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-48 object-cover"
            width={400}
            height={200}
          />
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{item.description}</p>
          </CardContent>
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default ContentGrid