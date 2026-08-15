import { AboutSection } from '@/components/organisms'
import { SectionHeader } from '@/components/molecules/SectionHeader'

export function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-12 md:py-20 flex flex-col gap-12 md:gap-20">
      <SectionHeader
        eyebrow="Introduction"
        title="About Me"
        description="A look into my journey as a creative media specialist."
      />
      <AboutSection />
    </div>
  )
}
