import { SectionHeader } from '@/components/molecules/SectionHeader'
import { ImageGallery } from '@/components/organisms'

export function ImagesPage() {
  return (
    <div className="w-full flex flex-col gap-10">
      <SectionHeader
        eyebrow="Stills & Renders"
        title="Featured Images & 3D Art"
        description="Explore 3D renders, mixed-media compositions, and photogrammetry stills set in animated metallic silver frames."
      />
      <ImageGallery />
    </div>
  )
}

