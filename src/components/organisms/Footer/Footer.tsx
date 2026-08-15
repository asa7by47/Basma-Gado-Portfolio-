import { Link as RouterLink } from 'react-router-dom'
import { about, reel } from '@/data/about'
import { navigation } from '@/data/navigation'
import { Text } from '@/components/atoms/Text'
import { Icon } from '@/components/atoms/Icon'
import { SocialLink } from '@/components/molecules/SocialLink'
import { Button } from '@/components/atoms/Button'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-bg pt-20 pb-10 border-t border-border mt-20">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <RouterLink
              to="/"
              className="font-display text-heading text-text hover:text-accent transition-colors duration-[var(--dur-fast)]"
            >
              Basma Gado
            </RouterLink>
            <Text variant="body" color="muted" className="max-w-xs">
              Cinema & Media Arts — Specializing in 3D Animation, Virtual Production, and Interactive Narratives.
            </Text>
            <div className="flex gap-6">
              {about.socials.map((social) => (
                <SocialLink key={social.id} social={social} showLabel={false} />
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-6">
            <Text variant="small" weight="bold" color="accent" className="uppercase tracking-widest">
              Navigation
            </Text>
            <nav className="flex flex-col gap-3">
              {navigation.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.id} className="flex flex-col gap-3">
                      <span className="text-body text-textMuted/50 select-none">
                        {item.label}
                      </span>
                      <div className="flex flex-col gap-2 pl-4 border-l border-border/50">
                        {item.children.map((child) => (
                          <RouterLink
                            key={child.id}
                            to={child.to ?? '#'}
                            className="text-body text-textMuted hover:text-accent transition-colors duration-[var(--dur-fast)]"
                          >
                            {child.label}
                          </RouterLink>
                        ))}
                      </div>
                    </div>
                  )
                }
                return (
                  <RouterLink
                    key={item.id}
                    to={item.to ?? '#'}
                    className="text-body text-textMuted hover:text-accent transition-colors duration-[var(--dur-fast)]"
                  >
                    {item.label}
                  </RouterLink>
                )
              })}
            </nav>
          </div>

          {/* Credits Column */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <Text variant="small" weight="bold" color="accent" className="uppercase tracking-widest">
              Credits
            </Text>
            <div className="flex flex-col gap-2">
              <Text variant="small" color="muted">
                Portfolio Design & Build
              </Text>
              <Text variant="small" color="text">
                © {currentYear} Basma Gado
              </Text>
              <div className="mt-4">
                <Text variant="caption" color="muted">
                  Reel Music:
                </Text>
                <Text variant="caption" color="text">
                  {reel.musicCredit}
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 gap-6">
          <Text variant="caption" color="muted">
            Built with React, TypeScript & Framer Motion
          </Text>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="group text-textMuted hover:text-accent"
          >
            Back to Top
            <Icon name="arrow-right" size={14} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </footer>
  )
}
