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
  onSelect?: (video: VideoItem) => void
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

export function VideoCard({ video, priority = false, className, onSelect }: VideoCardProps) {
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
      className={cn(
        'bg-surface rounded-xl overflow-hidden shadow-soft flex flex-col h-full border border-border/60 hover:border-accent/50 transition-colors duration-300 group',
        className
      )}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onSelect?.(video)}>
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
        <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-accent text-bg font-medium text-xs tracking-wider uppercase shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span>Interactive View</span>
            <span className="text-base">↗</span>
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1 cursor-pointer" onClick={() => onSelect?.(video)}>
          <Text as="h3" variant="subheading" font="display" color="text" weight="semibold" className="group-hover:text-accent transition-colors">
            {video.title}
          </Text>
          <Text variant="small" color="muted">
            {video.description}
          </Text>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
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

