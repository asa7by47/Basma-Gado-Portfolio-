import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { Text } from '@/components/atoms/Text'
import { Icon } from '@/components/atoms/Icon'
import { cn } from '@/hooks'

interface ProjectCardProps {
  title: string
  description: string
  to: string
  media?: ReactNode
  className?: string
}

export function ProjectCard({ title, description, to, media, className }: ProjectCardProps) {
  return (
    <motion.div
      className={cn('bg-surface rounded-lg overflow-hidden shadow-soft group', className)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <RouterLink to={to} className="block">
        {media && <div className="overflow-hidden">{media}</div>}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Text as="h3" variant="subheading" font="display" color="text" weight="medium">
              {title}
            </Text>
            <Icon
              name="arrow-right"
              size={16}
              className="text-textMuted group-hover:text-accent transition-colors duration-[var(--dur-fast)]"
            />
          </div>
          <Text variant="small" color="muted">
            {description}
          </Text>
        </div>
      </RouterLink>
    </motion.div>
  )
}
