import { motion } from 'framer-motion'
import { about } from '@/data/about'
import { Image } from '@/components/atoms/Image'
import { Text } from '@/components/atoms/Text'
import { SkillBadge } from '@/components/molecules/SkillBadge'
import { SocialLink } from '@/components/molecules/SocialLink'
import { Icon } from '@/components/atoms/Icon'
import { useReducedMotion } from '@/hooks'

export function AboutSection() {
  const reducedMotion = useReducedMotion()

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
      },
    },
  }

  const fadeInUp = {
    hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left Column: Avatar */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={about.avatarPrimary}
            alt={about.name}
            aspectRatio="4/5"
            className="rounded-lg shadow-soft overflow-hidden"
          />
        </motion.div>

        {/* Right Column: Bio & Skills */}
        <motion.div
          className="lg:col-span-7 flex flex-col gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Bio */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-6">
            <Text as="h2" variant="display-md" font="display" color="text">
              Creative Storyteller & <br /> <span className="text-accent">Media Specialist</span>
            </Text>
            <Text variant="body" color="muted" className="leading-relaxed text-lg">
              {about.bio}
            </Text>
          </motion.div>

          {/* Locations */}
          <motion.div variants={fadeInUp} className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-accent">
              <Icon name="play" size={14} className="rotate-90" />
              <Text variant="small" weight="medium" color="accent" className="uppercase tracking-widest">
                Based in
              </Text>
            </div>
            <div className="flex gap-2">
              {about.locations.map((loc, i) => (
                <span key={loc} className="flex items-center gap-2">
                  <Text variant="body" color="text">
                    {loc}
                  </Text>
                  {i < about.locations.length - 1 && <span className="text-border">·</span>}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <Text variant="subheading" font="display" color="text" weight="medium">
              Technical Expertise
            </Text>
            <div className="flex flex-wrap gap-3">
              {about.skills.map((skill) => (
                <SkillBadge key={skill.id} skill={skill} />
              ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <Text variant="subheading" font="display" color="text" weight="medium">
              Connect
            </Text>
            <div className="flex flex-wrap gap-8">
              {about.socials.map((social) => (
                <SocialLink key={social.id} social={social} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
