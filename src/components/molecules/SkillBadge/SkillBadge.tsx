import { motion } from 'framer-motion'
import type { Skill } from '@/types'
import { cn } from '@/hooks'

interface SkillBadgeProps {
  skill: Skill
  className?: string
}

export function SkillBadge({ skill, className }: SkillBadgeProps) {
  return (
    <motion.span
      className={cn(
        'inline-flex items-center px-4 py-2 rounded-full text-small font-medium font-body',
        'bg-surface border border-border text-textMuted',
        'transition-colors duration-[var(--dur-fast)] hover:border-accent hover:text-accent',
        className,
      )}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {skill.label}
    </motion.span>
  )
}
