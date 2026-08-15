import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { VideoItem } from '@/types'
import { VideoEmbed, Text, Tag, Button, Icon } from '@/components/atoms'

interface InteractiveVideoModalProps {
  video: VideoItem | null
  allVideos: VideoItem[]
  onClose: () => void
  onSelectVideo: (video: VideoItem) => void
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
  'Resolume Arena',
  'Live Link Face',
]

export function InteractiveVideoModal({
  video,
  allVideos,
  onClose,
  onSelectVideo,
}: InteractiveVideoModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Keyboard navigation (Esc to close, Left/Right arrows to navigate)
  useEffect(() => {
    if (!video) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        const currentIndex = allVideos.findIndex((v) => v.id === video.id)
        if (currentIndex < allVideos.length - 1) {
          onSelectVideo(allVideos[currentIndex + 1])
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = allVideos.findIndex((v) => v.id === video.id)
        if (currentIndex > 0) {
          onSelectVideo(allVideos[currentIndex - 1])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [video, allVideos, onClose, onSelectVideo])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (video) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [video])

  if (!video) return null

  const currentIndex = allVideos.findIndex((v) => v.id === video.id)
  const prevVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null

  const poster =
    video.thumbnailUrl ??
    (video.youtubeId
      ? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
      : undefined)

  const tags = TECH_KEYWORDS.filter((keyword) =>
    video.description.toLowerCase().includes(keyword.toLowerCase())
  )

  // Generate stills / stills reel representation for interactive scroll
  const stills = [
    poster,
    poster,
    poster,
  ].filter(Boolean) as string[]

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-2xl overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-30 bg-bg/90 backdrop-blur-md border-b border-border/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
              Interactive View ({currentIndex + 1} of {allVideos.length})
            </span>
            <Text variant="subheading" font="display" color="text" weight="semibold" className="hidden sm:block">
              {video.title}
            </Text>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-alt hover:bg-accent hover:text-bg text-text transition-all duration-200 font-medium text-sm border border-border"
              aria-label="Close Interactive Theater"
            >
              <span>Close</span>
              <Icon name="close" size={18} />
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col gap-10">
          {/* Main Title & Tagline */}
          <div className="flex flex-col gap-2">
            <Text as="h1" variant="display-lg" font="display" color="text" weight="bold">
              {video.title}
            </Text>
            <Text variant="heading" color="accent">
              {video.description}
            </Text>
          </div>

          {/* Video Player Container */}
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black aspect-video relative group">
            <VideoEmbed
              src={video.embedUrl}
              title={video.title}
              source={video.source}
              aspectRatio={video.aspectRatio ?? '16:9'}
              fallbackUrl={video.fallbackUrl}
              poster={poster}
              eager
              className="w-full h-full"
            />
          </div>

          {/* Interactive Stills & Content Scroll Rail (Max Wrote These Ads feature!) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Text variant="subheading" font="display" color="text" weight="medium">
                Project Stills & Breakdown Scroll
              </Text>
              <Text variant="caption" color="muted">
                Scroll horizontally or inspect stills
              </Text>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-transparent"
            >
              {/* Card 1: Project Details Breakdown */}
              <div className="snap-start flex-shrink-0 w-80 sm:w-96 bg-surface/90 border border-border/80 rounded-xl p-6 flex flex-col gap-4">
                <Text variant="small" color="accent" weight="medium" className="uppercase tracking-wider">
                  Overview & Software
                </Text>
                <Text variant="body" color="muted">
                  {video.description}
                </Text>
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

              {/* Card 2: Interactive Stills View */}
              {stills.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="snap-start flex-shrink-0 w-80 sm:w-96 rounded-xl overflow-hidden border border-border/80 relative group cursor-pointer bg-surface"
                >
                  <img
                    src={imgUrl}
                    alt={`${video.title} Still ${idx + 1}`}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    <Text variant="small" color="text" weight="medium">
                      Frame View #{idx + 1}
                    </Text>
                    <Text variant="caption" color="muted">
                      {video.title} render still
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Interactive Navigation Bar */}
          <div className="mt-auto pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {prevVideo ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => onSelectVideo(prevVideo)}
                  iconLeft="arrow-right"
                  className="rotate-180"
                >
                  Prev: {prevVideo.title}
                </Button>
              ) : (
                <div className="w-24" />
              )}
            </div>

            <Text variant="small" color="muted" className="text-center">
              Use <kbd className="px-2 py-0.5 rounded bg-surface border border-border text-accent text-xs">←</kbd> and{' '}
              <kbd className="px-2 py-0.5 rounded bg-surface border border-border text-accent text-xs">→</kbd> arrow keys to navigate projects
            </Text>

            <div className="flex items-center gap-3">
              {nextVideo ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => onSelectVideo(nextVideo)}
                  iconRight="arrow-right"
                >
                  Next: {nextVideo.title}
                </Button>
              ) : (
                <div className="w-24" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
