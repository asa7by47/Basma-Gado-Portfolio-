import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/hooks'
import { Icon } from '@/components/atoms/Icon'
import type { IconName } from '@/types'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  as?: 'button' | 'a'
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
  iconLeft?: IconName
  iconRight?: IconName
  className?: string
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-bg border border-accent hover:bg-accentStrong hover:border-accentStrong',
  secondary:
    'bg-surface text-text border border-border hover:bg-surfaceAlt hover:border-accent',
  ghost:
    'bg-transparent text-text border border-transparent hover:bg-surface hover:border-border',
  link:
    'bg-transparent text-accent border border-transparent underline-offset-4 hover:underline p-0',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-small gap-1.5',
  md: 'px-6 py-3 text-body gap-2',
  lg: 'px-8 py-4 text-subheading gap-2.5',
}

const iconSizeMap: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
}

export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  type = 'button',
  disabled,
  onClick,
  iconLeft,
  iconRight,
  className,
  children,
}: ButtonProps) {
  const isLink = variant === 'link'
  const iconSize = iconSizeMap[size]

  const baseClasses = cn(
    'inline-flex items-center justify-center font-body font-medium transition-colors duration-[var(--dur-fast)]',
    !isLink && 'rounded-md',
    variantClasses[variant],
    !isLink && sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className,
  )

  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={iconSize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSize} />}
    </>
  )

  if (as === 'a' && href) {
    const isExternal = href.startsWith('http')
    return (
      <motion.a
        href={href}
        className={baseClasses}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer noopener' : undefined}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={baseClasses}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {content}
    </motion.button>
  )
}
