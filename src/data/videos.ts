import type { VideoItem } from '@/types'

export const videos: VideoItem[] = [
  {
    id: 'community-documentary',
    title: 'Community Documentary',
    description: '360 camera exhibit',
    embedUrl: 'https://www.youtube.com/embed/cfMIfu2KUjE?si=1VdmjuS1mOB5LK6u',
    source: 'youtube',
    youtubeId: 'cfMIfu2KUjE',
  },
  {
    id: 'copper-fish-parallax',
    title: 'Copper Fish Pendant',
    description: 'After Effects parallax effect — copper fish pendant',
    embedUrl: 'https://www-ccv.adobe.io/v1/player/ccv/MWwhRhgpJZ4/embed',
    source: 'adobe-ccv',
    // TODO: confirm Behance permalink — replace placeholder below
    fallbackUrl: 'https://www.behance.net/',
  },
  {
    id: 'multichannel-mocap',
    title: 'Multichannel Mocap',
    description: 'Multichannel video & audio — Mocap, Metahumans, Unreal Engine',
    embedUrl: 'https://www.youtube.com/embed/L-b2Mjx2r00?si=KqwHhG0UgWVv9tyO',
    source: 'youtube',
    youtubeId: 'L-b2Mjx2r00',
  },
  {
    id: 'perception-neuron-mocap',
    title: 'Mocap Performance',
    description:
      'Mocap performance in Unreal Engine using Perception Neuron and Live Link Face',
    embedUrl: 'https://www.youtube.com/embed/OULvHxN37FI?si=OBySmXtyEwqDrDU1',
    source: 'youtube',
    youtubeId: 'OULvHxN37FI',
  },
  {
    id: 'virtual-production-cinespace',
    title: 'Virtual Production',
    description: 'Shot in Cinespace Studios, Toronto',
    embedUrl: 'https://www.youtube.com/embed/QSEIJh9z2ic?si=A0wubo-Yxm7oCLkS',
    source: 'youtube',
    youtubeId: 'QSEIJh9z2ic',
  },
  {
    id: 'metahuman-dance',
    title: 'Metahuman Dance',
    description: 'Metahuman dance animation — Unreal Engine',
    embedUrl: 'https://www.youtube.com/embed/dR-cJ0TT9ls?si=2QZESMkekwQZGE_Z',
    source: 'youtube',
    youtubeId: 'dR-cJ0TT9ls',
  },
  {
    id: 'previs-metahumans',
    title: 'Pre-visualization',
    description:
      'Pre-visualization in Unreal Engine using Metahumans and Face Live Link',
    embedUrl: 'https://www.youtube.com/embed/sgVprK54XYQ?si=ymMfUmMxkvRON5Ti',
    source: 'youtube',
    youtubeId: 'sgVprK54XYQ',
  },
  {
    id: 'music-video-photogrammetry',
    title: 'Music Video',
    description: 'Made in Blender using Photogrammetry and Mixamo',
    embedUrl: 'https://www.youtube.com/embed/_rMro_11S-U?si=ViVlRQL19Q7R7LjI',
    source: 'youtube',
    youtubeId: '_rMro_11S-U',
  },
  {
    id: 'dome-presentation-360',
    title: 'Dome Presentation',
    description:
      '360 camera view of dome presentation — MV made in Blender and Unreal',
    embedUrl: 'https://www.youtube.com/embed/NJ__vWXrw4g?si=63S40IvahOLVyb8k',
    source: 'youtube',
    youtubeId: 'NJ__vWXrw4g',
  },
  {
    id: 'mv-rendered-view',
    title: 'MV Rendered View',
    description: 'Rendered view of the MV made in Blender and Unreal',
    embedUrl: 'https://www.youtube.com/embed/EzaQpzzWMCI?si=gMF8ZwYnp3meyhGc',
    source: 'youtube',
    youtubeId: 'EzaQpzzWMCI',
  },
]
