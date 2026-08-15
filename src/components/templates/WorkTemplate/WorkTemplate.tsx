import { NavLink, Outlet } from 'react-router-dom'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { cn } from '@/hooks'

interface WorkTab {
  id: string
  label: string
  to: string
}

const workTabs: WorkTab[] = [
  { id: 'videos',      label: 'Videos',      to: '/work/videos' },
  { id: 'images',      label: 'Images',      to: '/work/images' },
  { id: 'interactive', label: 'Interactive', to: '/work/interactive' },
]

export function WorkTemplate() {
  return (
    <div className="max-w-content mx-auto px-6 py-12 flex flex-col gap-12">
      <SectionHeader
        eyebrow="Portfolio"
        title="Creative Work"
        description="A collection of my projects across 3D animation, virtual production, and interactive storytelling."
      />

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-border">
        {workTabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.to}
            className={({ isActive }) =>
              cn(
                'pb-4 text-body font-medium transition-all duration-[var(--dur-fast)] border-b-2',
                isActive
                  ? 'text-accent border-accent'
                  : 'text-textMuted border-transparent hover:text-text'
              )
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}
