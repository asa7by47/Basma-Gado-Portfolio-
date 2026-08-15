import { motion } from 'framer-motion'
import { resume } from '@/data/resume'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Button } from '@/components/atoms/Button'
import { Text } from '@/components/atoms/Text'
import { Divider } from '@/components/atoms/Divider'
import { Icon } from '@/components/atoms/Icon'
import { useReducedMotion } from '@/hooks'

const fadeInUp = (reducedMotion: boolean) => ({
  hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
})

function SectionLabel({ children }: { children: string }) {
  return (
    <Text
      as="h2"
      variant="heading"
      font="display"
      color="text"
      className="mb-6 md:mb-8"
    >
      {children}
    </Text>
  )
}

function ContactRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 text-textMuted hover:text-accent transition-colors duration-[var(--dur-fast)]"
    >
      <Icon name="play" size={12} className="rotate-90 text-accent opacity-70" />
      <Text variant="small" weight="medium" color="accent" className="uppercase tracking-widest min-w-[72px]">
        {label}
      </Text>
      <Text variant="body" color="text" className="group-hover:text-accent transition-colors duration-[var(--dur-fast)] break-all">
        {value}
      </Text>
    </a>
  )
}

export function CVPage() {
  const reducedMotion = useReducedMotion()
  const item = fadeInUp(reducedMotion)

  return (
    <div className="max-w-content mx-auto px-6 py-12 md:py-20 flex flex-col gap-16 md:gap-24">
      {/* Header + Download */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <SectionHeader
          eyebrow="Professional"
          title="Curriculum Vitae"
          description="A summary of my experience, education, and creative practice."
        />
        <Button
          as="a"
          href={resume.pdfUrl}
          variant="primary"
          iconLeft="download"
        >
          Download PDF
        </Button>
      </motion.div>

      {/* Profile + Contact */}
      <motion.section
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
      >
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Text as="h2" variant="heading" font="display" color="text">
            {resume.name}
          </Text>
          <Text variant="subheading" color="accent" className="mb-1">
            {resume.headline}
          </Text>
          <Text variant="body" color="muted" className="leading-relaxed text-lg">
            {resume.profile}
          </Text>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4 lg:border-l lg:border-border lg:pl-8">
          <ContactRow label="Email" value={resume.contact.email} href={`mailto:${resume.contact.email}`} />
          <ContactRow label="Phone" value={resume.contact.phone} href={`tel:${resume.contact.phone.replace(/[^+\d]/g, '')}`} />
          <ContactRow label="Location" value={resume.contact.location} href={`https://maps.google.com/?q=${encodeURIComponent(resume.contact.location)}`} />
          <ContactRow label="LinkedIn" value="basma-gado" href={resume.contact.linkedin} />
          <ContactRow label="Portfolio" value="gadobasma.myportfolio.com" href={resume.contact.portfolio} />
        </div>
      </motion.section>

      <Divider spacing="md" />

      {/* Work Experience */}
      <motion.section
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <SectionLabel>Work Experience</SectionLabel>
        <div className="flex flex-col gap-10">
          {resume.experience.map((job) => (
            <div key={job.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
              <div className="md:col-span-4 flex flex-col gap-1">
                <Text variant="small" color="accent" weight="medium">
                  {job.period}
                </Text>
                {job.location && (
                  <Text variant="caption" color="muted">
                    {job.location}
                  </Text>
                )}
              </div>
              <div className="md:col-span-8 flex flex-col gap-3">
                <Text as="h3" variant="subheading" font="display" color="text" weight="semibold">
                  {job.role}
                </Text>
                <Text variant="body" color="muted" weight="medium" className="mb-1">
                  {job.organization}
                </Text>
                <ul className="flex flex-col gap-2 mt-1">
                  {job.items.flatMap((group) => group.bullets).map((bullet, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <Text variant="body" color="muted" className="leading-relaxed">
                        {bullet}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <Divider spacing="md" />

      {/* Education */}
      <motion.section
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <SectionLabel>Education</SectionLabel>
        <div className="flex flex-col gap-8">
          {resume.education.map((edu) => (
            <div key={edu.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
              <div className="md:col-span-4">
                <Text variant="small" color="accent" weight="medium">
                  {edu.period}
                </Text>
              </div>
              <div className="md:col-span-8 flex flex-col gap-1">
                <Text as="h3" variant="subheading" font="display" color="text" weight="semibold">
                  {edu.degree}
                </Text>
                <Text variant="body" color="muted">
                  {edu.institution} — {edu.location}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <Divider spacing="md" />

      {/* Skills & Software */}
      <motion.section
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
      >
        <div className="flex flex-col gap-4">
          <SectionLabel>Technical Skills</SectionLabel>
          <ul className="flex flex-col gap-2">
            {resume.technicalSkills.map((skill) => (
              <li key={skill} className="flex gap-3">
                <span className="text-accent mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <Text variant="body" color="muted">
                  {skill}
                </Text>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <SectionLabel>Software</SectionLabel>
          <ul className="flex flex-col gap-2">
            {resume.software.map((tool) => (
              <li key={tool} className="flex gap-3">
                <span className="text-accent mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <Text variant="body" color="muted">
                  {tool}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      <Divider spacing="md" />

      {/* Courses */}
      <motion.section
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <SectionLabel>Courses & Certifications</SectionLabel>
        <div className="flex flex-col gap-6">
          {resume.courses.map((course) => (
            <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
              <div className="md:col-span-4">
                <Text variant="small" color="accent" weight="medium">
                  {course.year}
                </Text>
              </div>
              <div className="md:col-span-8 flex flex-col gap-1">
                <Text variant="body" color="text" weight="medium">
                  {course.title}
                </Text>
                <Text variant="small" color="muted">
                  {course.provider}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
