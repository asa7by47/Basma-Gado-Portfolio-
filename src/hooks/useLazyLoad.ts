import { useEffect, useRef, useState } from 'react'

interface UseLazyLoadOptions {
  rootMargin?: string
  threshold?: number
}

export function useLazyLoad(options: UseLazyLoadOptions = {}) {
  const { rootMargin = '200px', threshold = 0 } = options
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return { ref, isVisible }
}
