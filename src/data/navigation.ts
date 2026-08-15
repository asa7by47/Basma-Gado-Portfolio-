import type { NavItem } from '@/types'

export const navigation: NavItem[] = [
  { id: 'resume',  label: 'Resume',   to: '/resume' },
  { id: 'reel',    label: 'Reel',     to: '/reel' },
  {
    id: 'work',
    label: 'Work',
    children: [
      { id: 'videos',      label: 'Videos',      to: '/work/videos' },
      { id: 'images',      label: 'Images',      to: '/work/images' },
      { id: 'interactive', label: 'Interactive', to: '/work/interactive' },
    ],
  },
  { id: 'about',   label: 'About Me', to: '/about' },
  { id: 'contact', label: 'Contact',  to: '/contact' },
]
