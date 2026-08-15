import { Link as RouterLink, Outlet } from 'react-router-dom'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'

export function FullscreenTemplate() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex items-center justify-between pointer-events-none">
        <RouterLink
          to="/"
          className="pointer-events-auto flex items-center gap-2 text-textMuted hover:text-accent transition-colors duration-[var(--dur-fast)]"
        >
          <Icon name="arrow-right" size={18} className="rotate-180" />
          <Text variant="small" weight="medium" color="muted" className="hover:text-accent">
            Back
          </Text>
        </RouterLink>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 pt-24">
        <div className="w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
