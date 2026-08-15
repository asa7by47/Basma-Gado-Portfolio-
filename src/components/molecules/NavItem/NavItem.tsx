import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavItem as NavItemType } from '@/types'
import { Icon } from '@/components/atoms/Icon'
import { cn, useMediaQuery } from '@/hooks'

interface NavItemProps {
  item: NavItemType
  onNavigate?: () => void
}

export function NavItem({ item, onNavigate }: NavItemProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isDesktop) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, isDesktop])

  if (item.children) {
    return (
      <div 
        ref={containerRef}
        className={cn(isDesktop ? 'relative' : 'w-full')} 
      >
        <button
          type="button"
          className={cn(
            'inline-flex items-center gap-1 text-small font-medium text-textMuted hover:text-text transition-colors duration-[var(--dur-fast)] py-1',
            !isDesktop && 'w-full justify-between'
          )}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {item.label}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="chevron-down" size={14} />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={isDesktop ? { opacity: 0, y: -8 } : { opacity: 0, height: 0 }}
              animate={isDesktop ? { opacity: 1, y: 0 } : { opacity: 1, height: 'auto' }}
              exit={isDesktop ? { opacity: 0, y: -8 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'overflow-hidden',
                isDesktop
                  ? 'absolute top-full left-0 mt-2 min-w-[160px] bg-surface border border-border rounded-md shadow-soft z-50'
                  : 'flex flex-col mt-2 pl-4 border-l border-border/50 gap-2 w-full'
              )}
            >
              {item.children.map((child) => (
                <NavLink
                  key={child.id}
                  to={child.to ?? '#'}
                  onClick={() => { setOpen(false); onNavigate?.() }}
                  className={({ isActive }) =>
                    cn(
                      'block px-4 py-2.5 text-small font-body transition-colors duration-[var(--dur-fast)]',
                      isActive
                        ? 'text-accent bg-surfaceAlt'
                        : 'text-textMuted hover:text-text hover:bg-surfaceAlt',
                    )
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <NavLink
      to={item.to ?? '#'}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'text-small font-medium transition-colors duration-[var(--dur-fast)] py-1 relative',
          'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:transition-transform after:duration-[var(--dur-fast)]',
          !isDesktop && 'block w-full',
          isActive
            ? 'text-text after:bg-accent after:scale-x-100'
            : 'text-textMuted hover:text-text after:bg-accent after:scale-x-0 hover:after:scale-x-100',
        )
      }
    >
      {item.label}
    </NavLink>
  )
}
