import { interactive } from '@/data/interactive'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { VideoEmbed } from '@/components/atoms/VideoEmbed'
import { Text } from '@/components/atoms/Text'

export function InteractiveProject() {
  const project = interactive[0] // Primary interactive project

  if (!project) return null

  return (
    <section className="flex flex-col gap-10">
      <div className="max-w-prose">
        <SectionHeader
          eyebrow="Interactive Media"
          title={project.title}
        />
        <div className="mt-4">
          <Text variant="body" color="muted">
            {project.description}
          </Text>
        </div>
      </div>

      <div className="w-full bg-surface rounded-lg overflow-hidden shadow-soft">
        <VideoEmbed
          src={project.embedUrl}
          title={project.title}
          source="stornaway"
          aspectRatio={project.aspectRatio ?? '16:9'}
          eager={true}
        />
      </div>
    </section>
  )
}
