import type { ReactNode } from 'react'
import { cn } from '@/hooks'

interface TagProps {
  children: ReactNode
  tone?: 'accent' | 'neutral'
  className?: string
}

export function Tag({ children, tone = 'neutral', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-medium border',
        tone === 'accent'
          ? 'bg-surface border-accent text-accent'
          : 'bg-surface border-border text-textMuted',
        className,
      )}
    >
      {children}
    </span>
  )
}
