import { useEffect, useRef } from 'react'

export default function Cursor() {
  const curRef  = useRef(null)
  const curRRef = useRef(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = e => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove)

    let raf
    const loop = () => {
      if (curRef.current)  { curRef.current.style.left  = mx + 'px'; curRef.current.style.top  = my + 'px' }
      if (curRRef.current) { rx += (mx - rx) * .13; ry += (my - ry) * .13; curRRef.current.style.left = rx + 'px'; curRRef.current.style.top = ry + 'px' }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // hover class on interactive elements
    const targets = document.querySelectorAll('a,button,.proj-card,.cnt,.soc,.orbit-chip,.sk-cat,.tl-box,.pl')
    const add = () => document.body.classList.add('hov')
    const rem = () => document.body.classList.remove('hov')
    targets.forEach(el => { el.addEventListener('mouseenter', add); el.addEventListener('mouseleave', rem) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      targets.forEach(el => { el.removeEventListener('mouseenter', add); el.removeEventListener('mouseleave', rem) })
    }
  }, [])

  return (
    <>
      <div id="cur"  ref={curRef}  />
      <div id="cur-r" ref={curRRef} />
    </>
  )
}
