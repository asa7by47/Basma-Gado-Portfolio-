import { useState } from 'react'
import type { MediaSource } from '@/types'
import { useLazyLoad } from '@/hooks'
import { cn } from '@/hooks'
import { Icon } from '@/components/atoms/Icon'

interface VideoEmbedProps {
  src: string
  title: string
  source: MediaSource
  aspectRatio?: '16:9' | '9:16' | '1:1'
  fallbackUrl?: string
  poster?: string
  eager?: boolean
  className?: string
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/embed\/([^?&]+)/)
  return match ? match[1] : null
}

function getThumbnailUrl(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
}

const aspectClasses: Record<string, string> = {
  '16:9': 'aspect-video',
  '9:16': 'aspect-[9/16]',
  '1:1':  'aspect-square',
}

export function VideoEmbed({
  src,
  title,
  source,
  aspectRatio = '16:9',
  fallbackUrl,
  poster,
  eager = false,
  className,
}: VideoEmbedProps) {
  const { ref, isVisible } = useLazyLoad()
  const [activated, setActivated] = useState(false)

  const shouldMount = eager || (isVisible && activated)

  const youtubeId = source === 'youtube' ? getYouTubeId(src) : null
  const posterSrc = poster ?? (youtubeId ? getThumbnailUrl(youtubeId) : null)

  const isAdobeCcv = source === 'adobe-ccv'

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden rounded-md bg-surface',
          aspectClasses[aspectRatio],
        )}
      >
        {shouldMount ? (
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            aria-label={`Play ${title}`}
            onClick={() => setActivated(true)}
            className="absolute inset-0 w-full h-full group cursor-pointer bg-surface"
          >
            {/* Poster image or placeholder */}
            {posterSrc ? (
              <PosterImage src={posterSrc} alt={title} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface">
                <span className="text-textMuted text-small font-body text-center px-4">{title}</span>
              </div>
            )}

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-overlay opacity-60 group-hover:opacity-80 transition-opacity duration-[var(--dur-fast)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-soft group-hover:bg-accentStrong transition-colors duration-[var(--dur-fast)]">
                <Icon name="play" size={24} className="text-bg ml-1" />
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Adobe CCV always shows an external fallback link */}
      {isAdobeCcv && fallbackUrl && (
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-caption text-textMuted hover:text-accent transition-colors duration-[var(--dur-fast)] self-start"
        >
          Open in new tab
          <Icon name="arrow-up-right" size={12} />
        </a>
      )}
      {isAdobeCcv && !fallbackUrl && (
        <span className="text-caption text-textMuted self-start">
          View on Behance (link coming soon)
        </span>
      )}
    </div>
  )
}

function PosterImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    const youtubeId = src.includes('img.youtube.com')
      ? src.match(/\/vi\/([^/]+)\//)?.[1]
      : null

    if (youtubeId) {
      const fallback = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      return (
        <img
          src={fallback}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-surface">
        <span className="text-textMuted text-small font-body text-center px-4">{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
    />
  )
}
