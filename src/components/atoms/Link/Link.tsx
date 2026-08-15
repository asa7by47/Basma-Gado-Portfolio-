import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { cn } from '@/hooks'

type UnderlineMode = 'always' | 'hover' | 'none'

interface LinkProps {
  to?: string
  href?: string
  external?: boolean
  underline?: UnderlineMode
  className?: string
  children: ReactNode
}

const underlineClasses: Record<UnderlineMode, string> = {
  always: 'underline underline-offset-4',
  hover:  'underline-offset-4 hover:underline',
  none:   'no-underline',
}

export function Link({
  to,
  href,
  external,
  underline = 'hover',
  className,
  children,
}: LinkProps) {
  const base = cn(
    'text-text transition-colors duration-[var(--dur-fast)] hover:text-accent',
    underlineClasses[underline],
    className,
  )

  if (to) {
    return (
      <RouterLink to={to} className={base}>
        {children}
      </RouterLink>
    )
  }

  if (href) {
    const isExternal = external || href.startsWith('http')
    return (
      <a
        href={href}
        className={base}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer noopener' : undefined}
      >
        {children}
      </a>
    )
  }

  return <span className={base}>{children}</span>
}
