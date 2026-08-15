import type { Resume } from '@/types'

// Sourced from Basma Gado's CV. Update here to keep the on-site resume in sync.
export const resume: Resume = {
  name: 'Basma Gado',
  headline: 'Cinema & Media Arts',
  profile:
    'Emerging media artist and Cinema & Media Arts graduate with hands-on experience in immersive media, AR/VR, virtual production, 3D animation, and interactive storytelling. Skilled in Unreal Engine, Blender, DaVinci Resolve, and 360° content creation, with experience supporting community exhibitions, media projects, and studio production environments. Passionate about blending technology, storytelling, and community-centered creative experiences.',
  contact: {
    email: 'gadobasma@gmail.com',
    phone: '+1 437-995-4432',
    location: 'Toronto, ON, Canada',
    linkedin: 'https://www.linkedin.com/in/basma-gado-62605a233',
    portfolio: 'https://gadobasma.myportfolio.com/',
  },
  experience: [
    {
      id: 'media-research-assistant',
      role: 'Research Assistant',
      organization: 'York University, Faculty of Cinema & Media Arts',
      period: 'May 2025 – Feb 2026',
      location: 'Toronto, ON',
      items: [
        {
          bullets: [
            'Developed a community-focused exhibition for the Lawrence Heights neighborhood using cutting-edge immersive media.',
            'Co-created advanced AR/VR experiences and an experimental dome projection film in close collaboration with University Professors and York Alumni.',
            'Facilitated public community workshops, introducing interactive AR tools and fostering collaborative art-making environments for participants.',
          ],
        },
      ],
    },
    {
      id: 'studio-interactive-media-intern',
      role: 'Studio and Artist Assistant Intern',
      organization: 'InterAccess',
      period: 'May 2025 – Aug 2025',
      location: 'Toronto, ON',
      items: [
        {
          bullets: [
            'Supported new media arts makerspace operations by developing clear equipment tutorials and assisting users with technical setup and troubleshooting.',
            'Provided hands-on guidance to help newcomers confidently utilize advanced creative technologies, including 3D printers and laser cutters.',
            "Contributed to the successful coordination and logistics of the organization's yearly art showcase event.",
          ],
        },
      ],
    },
    {
      id: 'lab-mentor',
      role: 'Lab Mentor',
      organization: 'Peripheral Visions Co.',
      period: 'Feb 2025 – Apr 2025',
      location: 'Toronto, ON',
      items: [
        {
          bullets: [
            'Taught photogrammetry and 3D model cleanup methodologies using Blender to high school students.',
            'Assisted students with importing and creating fully realized 3D environments using scanned models.',
          ],
        },
      ],
    },
    {
      id: 'advertising-team-member',
      role: 'Advertising Team Member',
      organization: 'Behind Fine Arts University Club',
      period: 'Sep 2024 – Apr 2025',
      location: 'Toronto, ON',
      items: [
        {
          bullets: [
            'Designed and delivered over 5 high-impact digital promotional materials using Adobe Photoshop and Canva.',
            'Successfully promoted and increased engagement for student-led arts events throughout the academic year.',
          ],
        },
      ],
    },
    {
      id: 'facilitator-ambassador',
      role: 'Facilitator and Ambassador',
      organization: "City of Toronto's Cultural Events Program",
      period: 'Sep 2024 – Dec 2024',
      location: 'Toronto, ON',
      items: [
        {
          bullets: [
            'Cavalcade of Lights: Assisted performers during a live skate party event, managed stage access, enforced safety protocols, and supported the smooth execution of public performances.',
            'Nuit Blanche: Delivered front-line patron support by answering technical and event questions, distributing maps/materials, and guiding visitors to enhance their overall experience.',
          ],
        },
      ],
    },
  ],
  education: [
    {
      id: 'york-bfa',
      institution: 'York University',
      location: 'Toronto, Canada',
      degree: 'Bachelor of Fine Arts in Cinema & Media Arts, Honours',
      period: 'Graduated',
    },
  ],
  technicalSkills: [
    '3D Environment & Animation',
    'Virtual Production',
    'Motion Capture (Mocap)',
    'Interactive Media',
    'Digital Storytelling',
    'Video Editing & Post-Production',
    'Graphic Design & Motion Design',
  ],
  software: [
    'Blender',
    'Unreal Engine',
    'DaVinci Resolve',
    'Resolume Arena',
    'Procreate',
    'Artvive',
    'Photoshop & Canva',
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

