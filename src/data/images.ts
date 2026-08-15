import type { ImageItem } from '@/types'

// All placeholder: true until Basma drops her files into public/images/
// When files are ready: flip placeholder to false for each item.
export const images: ImageItem[] = [
  {
    id: 'inflated-3d-text',
    title: 'Inflated 3D Text',
    description:
      'Inflated 3D text created in Blender, featuring color changes and dynamic lighting to explore soft shading, materials, and surface highlights.',
    src: '/images/work-1.jpg',
    placeholder: true,
    alt: 'Inflated 3D text created in Blender with dynamic lighting and soft shading',
  },
  {
    id: 'street-photography-collage',
    title: 'Street Photography Collage',
    description: 'Street photography collage created using Adobe Photoshop.',
    src: '/images/work-2.jpg',
    placeholder: true,
    alt: 'Street photography collage created in Adobe Photoshop',
  },
  {
    id: 'mixed-media-equirectangular',
    title: 'Mixed-Media Composition',
    description:
      'Mixed-media composition created in Blender, combining 3D assets, a 2D image, and an HDRI environment. Rendered using an equirectangular camera setup.',
    src: '/images/work-3.jpg',
    placeholder: true,
    alt: 'Mixed-media Blender composition rendered with an equirectangular camera',
  },
  {
    id: 'fireworks-clown',
    title: 'Fireworks & Clown',
    description:
      'A 3D composition combining fireworks, an animated clown character, and a custom environment built in Unreal Engine.',
    src: '/images/work-4.jpg',
    placeholder: true,
    alt: '3D composition with fireworks and animated clown character in Unreal Engine',
  },
  {
    id: 'blender-model',
    title: 'Blender Model',
    description: 'Modelled and created in Blender.',
    src: '/images/work-5.jpg',
    placeholder: true,
    alt: '3D model created in Blender',
  },
]
