import type { AboutContent, ReelContent } from '@/types'

export const about: AboutContent = {
  name: 'Basma Gado',
  title: 'Cinema & Media Arts',
  locations: ['Toronto', 'Cairo', 'Jeddah'],
  bio: 'Basma Gado holds a Bachelor of Fine Arts in Cinema & Media Arts from York University and is based between Toronto, Cairo, and Jeddah. Her work spans storytelling, 3D animation, virtual production, video/audio editing, and media creation. Driven by a passion for visual narratives, she has hands-on experience with Blender, Unreal Engine, DaVinci Resolve, Photoshop, Procreate, and Audacity. She is eager to apply her academic knowledge in real-world settings through engaging, collaborative projects.',
  skills: [
    { id: 'blender',           label: 'Blender' },
    { id: 'unreal-engine',     label: 'Unreal Engine' },
    { id: 'davinci-resolve',   label: 'DaVinci Resolve' },
    { id: 'photoshop',         label: 'Photoshop' },
    { id: 'procreate',         label: 'Procreate' },
    { id: 'audacity',          label: 'Audacity' },
    { id: 'motion-capture',    label: 'Motion Capture' },
    { id: 'virtual-production',label: 'Virtual Production' },
    { id: '3d-animation',      label: '3D Animation' },
  ],
  socials: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'http://www.linkedin.com/in/basma-gado-62605a233',
      icon: 'linkedin',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/basmag.png/',
      icon: 'instagram',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      href: 'https://www.youtube.com/@basmagado1',
      icon: 'youtube',
    },
  ],
  avatarPrimary:
    'https://cdn.myportfolio.com/874da7b8-88cb-4374-8dab-0ca24a75e28c/7b97431d-0a76-4e80-8261-7344da26f10c_rwc_0x0x500x500x4096.png?h=52a21a5e42f5f73270aabfca99ecb16e',
  avatarSecondary:
    'https://cdn.myportfolio.com/874da7b8-88cb-4374-8dab-0ca24a75e28c/a33853eb-34fc-40c7-8860-513a685a87fe_rwc_0x0x500x500x4096.png?h=6adb21177a51300951b1cc071eefe553',
}

export const reel: ReelContent = {
  embedUrl:
    'https://www-ccv.adobe.io/v1/player/ccv/RyXTrCIhcN9/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View',
  // TODO: Basma to supply Behance/YouTube reel link as fallbackUrl
  fallbackUrl: undefined,
  musicCredit: "Ike's Mood I — Visioneers",
}
