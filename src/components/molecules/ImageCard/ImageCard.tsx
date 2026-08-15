import { motion } from 'framer-motion'
import type { ImageItem } from '@/types'
import { Image, SilverFrame, Text } from '@/components/atoms'
import { cn } from '@/hooks'

interface ImageCardProps {
  image: ImageItem
  onClick?: (image: ImageItem) => void
  className?: string
}

export function ImageCard({ image, onClick, className }: ImageCardProps) {
  return (
    <motion.article
      className={cn('flex flex-col h-full', className)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <SilverFrame onClick={() => onClick?.(image)} className="w-full flex-1">
        <div className="relative overflow-hidden group">
          <Image
            src={image.src}
            alt={image.alt}
            placeholder={image.placeholder}
            aspectRatio="4/3"
            className="w-full transition-transform duration-500 group-hover:scale-108"
          />
          {!image.placeholder && (
            <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <Text as="span" variant="subheading" font="display" color="text" weight="medium">
                {image.title}
              </Text>
            </div>
          )}
        </div>
      </SilverFrame>
      <div className="pt-3 px-1 flex flex-col gap-1">
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

