import type { ElementType, ReactNode } from 'react'
import { cn } from '@/hooks'

type TextVariant =
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'small'
  | 'caption'

type TextColor = 'text' | 'muted' | 'accent' | 'cream'
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold'
type TextAlign = 'left' | 'center' | 'right'

interface TextProps {
  as?: ElementType
  variant?: TextVariant
  font?: 'display' | 'body'
  color?: TextColor
  weight?: TextWeight
  align?: TextAlign
  className?: string
  children: ReactNode
}

const variantClasses: Record<TextVariant, string> = {
  'display-xl': 'text-display-xl',
  'display-lg': 'text-display-lg',
  'display-md': 'text-display-md',
  heading:      'text-heading',
  subheading:   'text-subheading',
  body:         'text-body',
  small:        'text-small',
  caption:      'text-caption',
}

const inferredFont: Record<TextVariant, 'display' | 'body'> = {
  'display-xl': 'display',
  'display-lg': 'display',
  'display-md': 'display',
  heading:      'display',
  subheading:   'body',
  body:         'body',
  small:        'body',
  caption:      'body',
}

const colorClasses: Record<TextColor, string> = {
  text:   'text-text',
  muted:  'text-textMuted',
  accent: 'text-accent',
  cream:  'text-cream',
}

const weightClasses: Record<TextWeight, string> = {
  regular:  'font-normal',
  medium:   'font-medium',
  semibold: 'font-semibold',
  bold:     'font-bold',
}

const alignClasses: Record<TextAlign, string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
}

export function Text({
  as: Component = 'p',
  variant = 'body',
  font,
  color = 'text',
  weight,
  align,
  className,
  children,
}: TextProps) {
  const resolvedFont = font ?? inferredFont[variant]

  return (
    <Component
      className={cn(
        variantClasses[variant],
        resolvedFont === 'display' ? 'font-display' : 'font-body',
        colorClasses[color],
        weight && weightClasses[weight],
        align && alignClasses[align],
        className,
      )}
    >
      {children}
    </Component>
  )
}
