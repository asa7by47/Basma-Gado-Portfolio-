import type { SocialLink as SocialLinkType } from '@/types'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { cn } from '@/hooks'

interface SocialLinkProps {
  social: SocialLinkType
  showLabel?: boolean
  className?: string
}

export function SocialLink({ social, showLabel = true, className }: SocialLinkProps) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'inline-flex items-center gap-2 text-textMuted hover:text-accent transition-colors duration-[var(--dur-fast)]',
        className,
      )}
    >
      <Icon name={social.icon} size={20} />
      {showLabel && (
        <Text as="span" variant="small" color="muted" className="group-hover:text-accent">
          {social.label}
        </Text>
      )}
    </a>
  )
}
