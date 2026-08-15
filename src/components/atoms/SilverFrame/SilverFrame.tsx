import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/hooks'

interface SilverFrameProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  showCornerAccents?: boolean
  onClick?: () => void
}

export function SilverFrame({
  children,
  className,
  innerClassName,
  showCornerAccents = true,
  onClick,
}: SilverFrameProps) {
  return (
    <div
      onClick={onClick}
      className={cn('silver-frame-border group cursor-pointer select-none', className)}
    >
      {/* Corner Silver Accents */}
      {showCornerAccents && (
        <>
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-white/90 z-20 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-white" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-white/90 z-20 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-white" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-white/90 z-20 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-white" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-white/90 z-20 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-white" />
        </>
      )}

      {/* Silver Light Shimmer Overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Inner Image Container */}
      <div className={cn('silver-frame-inner', innerClassName)}>{children}</div>
    </div>
  )
}
