import { useEffect, useState } from 'react'

const links = ['About','Skills','Projects','Experience','Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })

  return (
    <nav
      id="nav"
      style={{
        position:'fixed', top:0, left:0, right:0, zIndex:500,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding: scrolled ? '12px 64px' : '20px 64px',
        background: scrolled ? 'rgba(5,5,5,.92)' : 'rgba(5,5,5,.7)',
        backdropFilter:'blur(22px)',
        borderBottom:'1px solid rgba(0,229,160,.07)',
        transition:'padding .35s, background .35s',
      }}
    >
      <div style={{ fontFamily:'var(--font-orb)', fontSize:14, color:'var(--g)', letterSpacing:'.1em' }}>
        <span style={{color:'var(--muted)'}}>{'{ '}</span>zayn.dev<span style={{color:'var(--muted)'}}>{' }'}</span>
      </div>

      <ul className="n-links" style={{ display:'flex', gap:34, listStyle:'none' }}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} className="nav-link"
               onClick={e=>{ e.preventDefault(); scrollTo(l.toLowerCase()) }}>
              {l}
            </a>
          </li>
        ))}
      </ul>

      <span className="nav-cv-wrap">
        <a
          href="https://docs.google.com/document/d/e/2PACX-1vTmOgICrLCnbkeD_nnxMYHUzfJ8TZnX-Ci-BKhiIJmzvaC7b0NIQr5RS6Iz6_5Wvg/pub"
          className="nav-cv" target="_blank" rel="noreferrer">
          ↓ Resume
        </a>
      </span>
    </nav>
  )
}
