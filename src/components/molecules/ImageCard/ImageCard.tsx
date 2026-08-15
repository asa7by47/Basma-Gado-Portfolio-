import { motion } from 'framer-motion'
import type { ImageItem } from '@/types'
import { Image } from '@/components/atoms/Image'
import { Text } from '@/components/atoms/Text'
import { cn } from '@/hooks'

interface ImageCardProps {
  image: ImageItem
  onClick?: (image: ImageItem) => void
  className?: string
}

export function ImageCard({ image, onClick, className }: ImageCardProps) {
  return (
    <motion.article
      className={cn(
        'bg-surface rounded-lg overflow-hidden shadow-soft flex flex-col cursor-pointer group',
        className,
      )}
      onClick={() => onClick?.(image)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="relative overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          placeholder={image.placeholder}
          aspectRatio="4/3"
          className="w-full transition-transform duration-[var(--dur-med)] group-hover:scale-105"
        />
        {!image.placeholder && (
          <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--dur-fast)] flex items-end p-4">
            <Text as="span" variant="subheading" font="display" color="text" weight="medium">
              {image.title}
            </Text>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1">
        <Text as="h3" variant="subheading" font="display" color="text" weight="medium">
          {image.title}
        </Text>
        <Text variant="small" color="muted">
          {image.description}
        </Text>
      </div>
    </motion.article>
  )
}
