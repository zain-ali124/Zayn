import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, the 'vis' class is added.
 * @param {number} threshold - 0..1, default 0.1
 * @param {string} delay - CSS transition-delay, e.g. '0.15s'
 */
export function useReveal(threshold = 0.1, delay = '0s') {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (delay) el.style.transitionDelay = delay
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('vis'); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, delay])
  return ref
}
