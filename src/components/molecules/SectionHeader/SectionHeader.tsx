import { motion } from 'framer-motion'
import { Text } from '@/components/atoms/Text'
import { cn } from '@/hooks'
import { useReducedMotion } from '@/hooks'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const reducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.1 } },
  }

  const itemVariants = {
    hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.div
      className={cn(align === 'center' ? 'text-center' : 'text-left', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {eyebrow && (
        <motion.div variants={itemVariants}>
          <Text
            as="span"
            variant="caption"
            color="accent"
            weight="semibold"
            className="uppercase tracking-widest block mb-3"
          >
            {eyebrow}
          </Text>
        </motion.div>
      )}
      <motion.div variants={itemVariants}>
        <Text as="h2" variant="display-md" font="display" color="text" className="mb-4">
          {title}
        </Text>
      </motion.div>
      {description && (
        <motion.div variants={itemVariants}>
          <Text variant="body" color="muted" className="max-w-prose">
            {description}
          </Text>
        </motion.div>
      )}
    </motion.div>
  )
}
