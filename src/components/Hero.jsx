import { useEffect, useRef } from 'react'

const ROLES = ['MERN Stack Developer','Full-Stack Engineer','AI-Powered Developer','React + Node.js Dev','Problem Solver']

const TERMINAL_LINES = [
  { t:'cmd', s:'whoami' },
  { t:'out', c:'a', s:'zayn-ali · mern-developer · pk' },
  { t:'bl' },
  { t:'cmd', s:'cat skills.json' },
  { t:'out', c:'w', s:'{' },
  { t:'out', c:'b', s:'  "frontend": ["React","Next.js","Tailwind"],' },
  { t:'out', c:'b', s:'  "backend":  ["Node.js","Express"],' },
  { t:'out', c:'b', s:'  "database": ["MongoDB"],' },
  { t:'out', c:'b', s:'  "ai_tools": ["Claude","Cursor","Copilot"],' },
  { t:'out', c:'b', s:'  "degree":   "BSSE @ UoS"' },
  { t:'out', c:'w', s:'}' },
  { t:'bl' },
  { t:'cmd', s:'git log --oneline -1' },
  { t:'out', c:'a', s:'9c8b4d5 ✓ SignalPro — first paying client' },
  { t:'bl' },
  { t:'cmd', s:'status' },
  { t:'out', c:'a', s:'🟢 Open to Work — 2026' },
  { t:'cur' },
]

function Typed() {
  const ref = useRef(null)
  useEffect(() => {
    let ri=0, ci=0, del=false, timer
    function type() {
      const cur = ROLES[ri % ROLES.length]
      if (!del) {
        if (ref.current) ref.current.textContent = cur.slice(0, ++ci)
        if (ci === cur.length) { del=true; timer=setTimeout(type,2000); return }
      } else {
        if (ref.current) ref.current.textContent = cur.slice(0, --ci)
        if (ci===0) { del=false; ri++; timer=setTimeout(type,350); return }
      }
      timer = setTimeout(type, del ? 42 : 82)
    }
    timer = setTimeout(type, 600)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div style={{ fontFamily:'var(--font-mono)', fontSize:14, color:'var(--muted)', margin:'18px 0', letterSpacing:'.06em', minHeight:22 }}>
      <span ref={ref}/>
      <span style={{ display:'inline-block', width:9, height:17, background:'var(--g)', verticalAlign:'middle', marginLeft:2, animation:'blink .9s step-end infinite' }}/>
    </div>
  )
}

function Terminal() {
  const tbRef = useRef(null)
  useEffect(() => {
    const tb = tbRef.current; if (!tb) return
    let ti=0, timer
    function nextLine() {
      if (ti >= TERMINAL_LINES.length) return
      const l = TERMINAL_LINES[ti++]
      const d = document.createElement('div')
      if      (l.t==='cmd') { d.className='tl'; d.innerHTML=`<span style="color:var(--g)">❯</span><span style="color:var(--text)"> ${l.s}</span>` }
      else if (l.t==='out') {
        const cls = l.c==='a'?'color:var(--g)' : l.c==='b'?'color:var(--c)' : 'color:var(--text)'
        d.style.cssText = `padding-left:16px;${cls}`; d.textContent = l.s
      }
      else if (l.t==='bl') { d.innerHTML='<br/>' }
      else if (l.t==='cur') {
        d.className='tl'; d.innerHTML=`<span style="color:var(--g)">❯</span><span style="color:var(--text)"> </span><span style="display:inline-block;width:8px;height:14px;background:var(--g);vertical-align:middle;animation:blink .9s step-end infinite"></span>`
      }
      tb.appendChild(d); tb.scrollTop=tb.scrollHeight
      if (ti < TERMINAL_LINES.length) timer = setTimeout(nextLine, l.t==='cmd'?200 : l.t==='bl'?80 : 65)
    }
    timer = setTimeout(nextLine, 700)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="terminal animate-float-t">
      <div className="t-bar">
        <div style={{width:10,height:10,borderRadius:'50%',background:'#ff5f56'}}/>
        <div style={{width:10,height:10,borderRadius:'50%',background:'#ffbd2e'}}/>
        <div style={{width:10,height:10,borderRadius:'50%',background:'#27c93f'}}/>
        <span style={{marginLeft:8,fontFamily:'var(--font-mono)',fontSize:11,color:'var(--muted)',letterSpacing:'.06em'}}>~/zayn — zsh — 82×26</span>
      </div>
      <div className="t-body" ref={tbRef}/>
    </div>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

export default function Hero() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })
  return (
    <section id="home" className="hero-wrap" style={{
      minHeight:'100vh', display:'flex', alignItems:'center',
      padding:'100px 64px 80px', gap:60, position:'relative', zIndex:2, overflow:'hidden',
      flexWrap:'wrap'
    }}>
      <div className="hero-scan"/>
      {/* glows */}
      <div style={{ position:'absolute', top:'15%', left:'-8%', width:700, height:700, background:'radial-gradient(circle, rgba(0,229,160,.055) 0, transparent 68%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'5%', right:'-5%', width:500, height:500, background:'radial-gradient(circle, rgba(0,240,255,.05) 0, transparent 65%)', pointerEvents:'none' }}/>

      {/* LEFT */}
      <div style={{ flex:1, maxWidth:620, zIndex:4 }}>
        {/* pill */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:9, padding:'7px 16px', border:'1px solid rgba(0,240,255,.22)', background:'rgba(0,240,255,.04)', marginBottom:28, borderRadius:40 }}>
          <span style={{ width:6, height:6, background:'var(--c)', borderRadius:'50%', animation:'pulse-d 2s infinite' }}/>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--c)', letterSpacing:'.12em' }}>Open to Work — 2026</span>
        </div>

        <h1 style={{ fontFamily:'var(--font-orb)', fontSize:'clamp(42px,6.5vw,86px)', fontWeight:900, lineHeight:1, letterSpacing:'-.01em', marginBottom:6 }}>
          Hi, I'm<br/>
          <span style={{ color:'var(--g)', textShadow:'0 0 40px rgba(0,229,160,.35)' }}>ZAYN</span>{' '}
          <span style={{ color:'var(--c)' }}>ALI</span>
        </h1>

        <Typed/>

        <p style={{ fontSize:15, color:'#4a7a70', lineHeight:1.8, maxWidth:450, marginBottom:44 }}>
          Building{' '}<em style={{ color:'var(--g)', fontStyle:'normal', fontWeight:600 }}>scalable web applications</em>{' '}&amp; intelligent systems — powered by the MERN stack and AI-driven development workflows that ship{' '}<em style={{ color:'var(--g)', fontStyle:'normal', fontWeight:600 }}>3× faster.</em>
        </p>

        <div className="h-btns" style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:52 }}>
          <button className="btn-p" onClick={() => scrollTo('projects')}>⚡ View Projects</button>
          <button className="btn-s" onClick={() => scrollTo('contact')}>Let's Collaborate →</button>
        </div>

        <div style={{ display:'flex', gap:12 }}>
          <a href="https://github.com/zain-ali124" className="soc" title="GitHub" target="_blank" rel="noreferrer"><GitHubIcon/></a>
          <a href="https://www.linkedin.com/in/zayn-ali-24a0523aa" className="soc" title="LinkedIn" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          <a href="https://github.com/zain-ali124" className="soc" title="Portfolio" target="_blank" rel="noreferrer">◈</a>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-r" style={{ flex:'0 0 auto', width:430, zIndex:4, display:'flex', flexDirection:'column', gap:18 }}>
        <Terminal/>
        <div style={{ background:'var(--glass)', border:'1px solid rgba(0,240,255,.2)', backdropFilter:'blur(16px)', padding:'14px 18px', borderRadius:4, display:'flex', alignItems:'center', gap:12, animation:'float-b 5s ease-in-out .7s infinite' }}>
          <span style={{ width:8, height:8, background:'var(--g)', borderRadius:'50%', animation:'pulse-d 2s infinite' }}/>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--c)', letterSpacing:'.09em' }}>🤖 AI-Enhanced Dev — Claude · Cursor · Copilot</span>
        </div>
      </div>
    </section>
  )
}
