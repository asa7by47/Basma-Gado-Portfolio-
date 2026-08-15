import { cn } from '@/hooks'

type Orientation = 'horizontal' | 'vertical'
type Spacing = 'sm' | 'md' | 'lg'

interface DividerProps {
  orientation?: Orientation
  spacing?: Spacing
  className?: string
}

const spacingH: Record<Spacing, string> = {
  sm: 'my-4',
  md: 'my-8',
  lg: 'my-16',
}

const spacingV: Record<Spacing, string> = {
  sm: 'mx-2',
  md: 'mx-4',
  lg: 'mx-8',
}

export function Divider({
  orientation = 'horizontal',
  spacing = 'md',
  className,
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          'w-px self-stretch bg-border',
          spacingV[spacing],
          className,
        )}
      />
    )
  }

  return (
    <hr
      className={cn(
        'border-none h-px bg-border w-full',
        spacingH[spacing],
        className,
      )}
    />
  )
}
