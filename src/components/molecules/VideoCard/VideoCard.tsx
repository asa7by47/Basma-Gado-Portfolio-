import { motion } from 'framer-motion'
import type { VideoItem } from '@/types'
import { VideoEmbed } from '@/components/atoms/VideoEmbed'
import { Text } from '@/components/atoms/Text'
import { Tag } from '@/components/atoms/Tag'
import { cn } from '@/hooks'

interface VideoCardProps {
  video: VideoItem
  priority?: boolean
  className?: string
}

const TECH_KEYWORDS = [
  'Unreal Engine',
  'Blender',
  '360 camera',
  'Mocap',
  'Metahumans',
  'Photogrammetry',
  'DaVinci Resolve',
  'Photoshop',
  'Virtual Production',
  'After Effects',
  'Mixamo',
]

export function VideoCard({ video, priority = false, className }: VideoCardProps) {
  const poster =
    video.thumbnailUrl ??
    (video.youtubeId
      ? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
      : undefined)

  const tags = TECH_KEYWORDS.filter((keyword) =>
    video.description.toLowerCase().includes(keyword.toLowerCase())
  )

  return (
    <motion.article
      className={cn('bg-surface rounded-lg overflow-hidden shadow-soft flex flex-col h-full', className)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <VideoEmbed
        src={video.embedUrl}
        title={video.title}
        source={video.source}
        aspectRatio={video.aspectRatio ?? '16:9'}
        fallbackUrl={video.fallbackUrl}
        poster={poster}
        eager={priority}
        className="rounded-none"
      />
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1">
          <Text as="h3" variant="subheading" font="display" color="text" weight="medium">
            {video.title}
          </Text>
          <Text variant="small" color="muted">
            {video.description}
          </Text>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <Tag key={tag} tone="neutral">
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
