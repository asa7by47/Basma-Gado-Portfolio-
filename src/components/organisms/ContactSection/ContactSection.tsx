import { motion } from 'framer-motion'
import { about } from '@/data/about'
import { resume } from '@/data/resume'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import { SocialLink } from '@/components/molecules/SocialLink'

export function ContactSection() {
  return (
    <section className="w-full flex flex-col items-center text-center py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl flex flex-col items-center gap-8"
      >
        <div className="flex flex-col gap-4">
          <Text as="h2" variant="display-lg" font="display" color="text">
            Let's create <span className="text-accent italic">together.</span>
          </Text>
          <Text variant="body" color="muted" className="text-lg">
            Whether you have a project in mind or just want to say hi, I'd love to hear from you.
            Currently open to new opportunities in Toronto, Cairo, and Jeddah.
          </Text>
        </div>

        <Button
          as="a"
          href={`mailto:${resume.contact.email}`}
          variant="primary"
          size="lg"
          iconRight="arrow-right"
          className="mt-2"
        >
          Get in Touch
        </Button>

        <div className="flex flex-col gap-6 mt-8">
          <Text variant="small" weight="medium" color="accent" className="uppercase tracking-widest">
            Find me on
          </Text>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {about.socials.map((social) => (
              <SocialLink key={social.id} social={social} className="scale-110" />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
