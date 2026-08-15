import type { Resume } from '@/types'

// Sourced from Basma Gado's CV. Update here to keep the on-site resume in sync.
export const resume: Resume = {
  name: 'Basma Gado',
  headline: 'Cinema & Media Arts',
  profile:
    'Emerging media artist and Cinema & Media Arts graduate with hands-on experience in immersive media, AR/VR, virtual production, and interactive storytelling. Skilled in Unreal Engine, Blender, DaVinci Resolve, and 360° content creation, with experience supporting exhibitions, media projects, and studio production environments. Passionate about blending technology, storytelling, and community-centered creative experiences.',
  contact: {
    email: 'Gadobasma@gmail.com',
    phone: '+1 437-995-4432',
    location: 'Toronto, ON',
    linkedin: 'https://www.linkedin.com/in/basma-gado-62605a233',
    portfolio: 'https://gadobasma.myportfolio.com/',
  },
  experience: [
    {
      id: 'media-research-assistant',
      role: 'Media Research Assistant',
      organization: 'York University, Faculty of Cinema & Media Arts',
      period: 'May 2025 – Present',
      items: [
        {
          bullets: [
            'Developing an immersive media exhibition focused on local community storytelling.',
            'Creating AR/VR projects and a dome-projection film in collaboration with professors and York alumni.',
            'Led community workshops introducing AR tools and collaborative art-making practices.',
          ],
        },
      ],
    },
    {
      id: 'green-screen-workshop-assistant',
      role: 'Green Screen Workshop Assistant',
      organization: 'Cinespace Studios',
      period: 'Oct 2025',
      location: 'Toronto, ON',
      items: [
        {
          bullets: [
            'Assisted in a virtual production workshop focused on green screen filmmaking and real-time production workflows.',
            'Created the story concept, wrote the narrative, and developed the storyboard for the project.',
            'Acted in the green screen scenes and collaborated with on-site editors and sound designers.',
            'Supported the creative and technical team during setup, filming, and post-production review.',
            'Gained hands-on experience with green screen workflow, on-set collaboration, and virtual production storytelling.',
          ],
        },
      ],
    },
    {
      id: 'artist-assistant',
      role: 'Artist Assistant',
      organization: 'Nuit Blanche',
      period: 'Oct 2025',
      location: 'Toronto, ON',
      items: [
        {
          bullets: [
            'Supported artists and curators at Nuit Blanche for 401 Richmond with event setup and coordination.',
            'Engaged with visitors, offering project insights and guiding them through the artworks and exhibitions on view.',
          ],
        },
      ],
    },
    {
      id: 'studio-interactive-media-intern',
      role: 'Studio and Interactive Media Intern',
      organization: 'InterAccess',
      period: 'May – Aug 2025',
      location: 'Toronto, ON',
      items: [
        {
          bullets: [
            'Supported studio production and technical workflows in the new media arts space.',
            'Created instructional tutorials for borrowable equipment, including setup, safety, and creative use.',
            'Assisted newcomers with hands-on equipment operation, offering guidance and basic troubleshooting.',
          ],
        },
      ],
    },
  ],
  education: [
    {
      id: 'york-bfa',
      institution: 'York University',
      location: 'Toronto, ON',
      degree: 'BFA Honours in Cinema and Media Arts',
      period: 'September 2021 – October 2025',
    },
  ],
  technicalSkills: [
    'Blender',
    'Unreal Engine',
    'DaVinci Resolve',
    '360° projects',
    'VCAM and Live Link Face in Unreal Engine',
    'Metahuman creation',
  ],
  software: [
    'Green screen filming/editing',
    'Interactive AR (Artivive)',
    'VR Content Creation',
    'Mocap Recording',
    'Resolume Arena',
    'Procreate',
  ],
  courses: [
    {
      id: 'immersive-design-events',
      title: 'Immersive Design for Events Workshop',
      provider: 'Sync School, Cairo',
      year: '2026',
    },
    {
      id: 'ue-virtual-production',
      title: 'Unreal Engine: Introduction to Virtual Production',
      provider: 'York University Micro-credential',
      year: '2024',
    },
    {
      id: 'intro-blender',
      title: 'Introduction to Blender',
      provider: 'York University Micro-credential',
      year: '2023',
    },
  ],
  pdfUrl: '/resume/basma-gado-resume.pdf',
}
