import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { navigation } from '@/data/navigation'
import { NavItem } from '@/components/molecules/NavItem'
import { Icon } from '@/components/atoms/Icon'
import { useScrollPosition, useMediaQuery, cn } from '@/hooks'

export function Navbar() {
  const { scrolled } = useScrollPosition()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--dur-med)]',
        scrolled
          ? 'bg-bg/80 backdrop-blur-lg border-b border-border py-3'
          : 'bg-transparent py-5',
      )}
    >
      <div className="max-w-content mx-auto px-6 flex items-center justify-between relative z-50">
        {/* Wordmark */}
        <RouterLink
          to="/"
          className="font-display text-subheading text-text hover:text-accent transition-colors duration-[var(--dur-fast)]"
          onClick={closeMobile}
        >
          Basma Gado
        </RouterLink>

        {/* Desktop nav */}
        {isDesktop ? (
          <div className="flex items-center gap-8">
            {navigation.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Mobile hamburger */
          <button
            type="button"
            className="text-text hover:text-accent transition-colors duration-[var(--dur-fast)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
          </button>
        )}
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 bg-bg/95 backdrop-blur-xl z-40 pt-24 px-8"
          >
            <div className="flex flex-col gap-6">
              {navigation.map((item) => (
                <NavItem key={item.id} item={item} onNavigate={closeMobile} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
