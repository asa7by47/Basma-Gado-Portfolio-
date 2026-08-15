import { motion } from 'framer-motion'
import { about } from '@/data/about'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import { Link as RouterLink } from 'react-router-dom'
import { useReducedMotion } from '@/hooks'

export function Hero() {
  const reducedMotion = useReducedMotion()

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.12 } },
  }

  const item = {
    hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-bg">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 20% 50%, var(--color-accent) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, var(--color-surface-alt) 0%, transparent 50%)',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-content mx-auto px-6 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item}>
          <Text
            as="h1"
            variant="display-xl"
            font="display"
            color="text"
            weight="bold"
            className="mb-4"
          >
            {about.name}
          </Text>
        </motion.div>

        <motion.div variants={item}>
          <Text
            as="p"
            variant="heading"
            font="body"
            color="accent"
            className="mb-3"
          >
            {about.title} — 3D, Virtual Production, Interactive
          </Text>
        </motion.div>

        <motion.div variants={item}>
          <Text variant="body" color="muted" className="mb-10">
            {about.locations.join(' · ')}
          </Text>
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
          <RouterLink to="/reel">
            <Button variant="primary" size="lg" iconRight="play">
              Watch the Reel
            </Button>
          </RouterLink>
          <RouterLink to="/work/videos">
            <Button variant="secondary" size="lg" iconRight="arrow-right">
              View Work
            </Button>
          </RouterLink>
        </motion.div>
      </motion.div>
    </section>
  )
}
