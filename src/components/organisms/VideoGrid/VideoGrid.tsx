import { motion } from 'framer-motion'
import { videos } from '@/data/videos'
import { VideoCard } from '@/components/molecules/VideoCard'
import { useReducedMotion } from '@/hooks'

export function VideoGrid() {
  const reducedMotion = useReducedMotion()

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
      },
    },
  }

  const item = {
    hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {videos.map((video, index) => (
        <motion.div key={video.id} variants={item}>
          <VideoCard video={video} priority={index < 2} />
        </motion.div>
      ))}
    </motion.section>
  )
}
