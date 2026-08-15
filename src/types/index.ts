export type MediaSource = 'youtube' | 'adobe-ccv' | 'stornaway' | 'image'

export type IconName =
  | 'linkedin'
  | 'instagram'
  | 'youtube'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'play'
  | 'menu'
  | 'close'
  | 'chevron-down'
  | 'download'
  | 'external'

export interface VideoItem {
  id: string
  title: string
  description: string
  embedUrl: string
  source: MediaSource
  youtubeId?: string
  thumbnailUrl?: string
  fallbackUrl?: string
  aspectRatio?: '16:9' | '9:16' | '1:1'
}

export interface ImageItem {
  id: string
  title: string
  description: string
  src: string
  placeholder: boolean
  alt: string
  width?: number
  height?: number
}

export interface InteractiveProject {
  id: string
  title: string
  description: string
  embedUrl: string
  source: MediaSource
  aspectRatio?: '16:9' | '9:16' | '1:1'
}

export interface SocialLink {
  id: string
  label: string
  href: string
  icon: IconName
}

export interface NavItem {
  id: string
  label: string
  to?: string
  children?: NavItem[]
  external?: boolean
}

export interface Skill {
  id: string
  label: string
}

export interface AboutContent {
  name: string
  title: string
  locations: string[]
  bio: string
  skills: Skill[]
  socials: SocialLink[]
  avatarPrimary: string
  avatarSecondary: string
}

export interface ReelContent {
  embedUrl: string
  fallbackUrl?: string
  musicCredit: string
}

export interface ResumeContact {
  email: string
  phone: string
  location: string
  linkedin: string
  portfolio: string
}

export interface ResumeExperienceItem {
  bullets: string[]
}

export interface ResumeExperience {
  id: string
  role: string
  organization: string
  period: string
  location?: string
  items: ResumeExperienceItem[]
}

export interface ResumeEducation {
  id: string
  institution: string
  location: string
  degree: string
  period: string
}

export interface ResumeCourse {
  id: string
  title: string
  provider: string
  year: string
}

export interface Resume {
  name: string
  headline: string
  profile: string
  contact: ResumeContact
  experience: ResumeExperience[]
  education: ResumeEducation[]
  technicalSkills: string[]
  software: string[]
  courses: ResumeCourse[]
  pdfUrl: string
}
