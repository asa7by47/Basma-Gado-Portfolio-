import { reel } from '@/data/about'
import { VideoEmbed } from '@/components/atoms/VideoEmbed'
import { Text } from '@/components/atoms/Text'
import { Link } from '@/components/atoms/Link'
import { Icon } from '@/components/atoms/Icon'

export function ReelPlayer() {
  return (
    <section className="flex flex-col items-center gap-8 w-full max-w-5xl mx-auto">
      <div className="w-full bg-surface rounded-lg overflow-hidden shadow-soft">
        <VideoEmbed
          src={reel.embedUrl}
          title="Demo Reel"
          source="adobe-ccv"
          aspectRatio="16:9"
          eager={true}
          fallbackUrl={reel.fallbackUrl}
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 px-2">
        <div className="flex items-center gap-2">
          <Icon name="play" size={16} className="text-accent" />
          <Text variant="small" color="muted">
            Music: <span className="text-text">{reel.musicCredit}</span>
          </Text>
        </div>

        {reel.fallbackUrl && (
          <Link href={reel.fallbackUrl} external className="flex items-center gap-2 group">
            <Text variant="small" color="accent" className="group-hover:text-accent-strong transition-colors">
              Watch on Behance
            </Text>
            <Icon name="external" size={14} className="text-accent group-hover:text-accent-strong transition-colors" />
          </Link>
        )}
      </div>
    </section>
  )
}
