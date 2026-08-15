import { SectionHeader } from '@/components/molecules/SectionHeader'
import { VideoGrid } from '@/components/organisms'

export function VideosPage() {
  return (
    <div className="w-full flex flex-col gap-10">
      <SectionHeader
        eyebrow="Portfolio Showcase"
        title="Interactive Video Projects"
        description="Select any video to enter the interactive theater view with full breakdown stills and scrollable project media."
      />
      <VideoGrid />
    </div>
  )
}

