import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

function Counter({ target, suffix='' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      let v=0
      const step=()=>{ v+=Math.max(1,Math.ceil(target/30)); if(v>=target){el.textContent=target+suffix;return}; el.textContent=v+suffix; requestAnimationFrame(step) }
      step(); obs.unobserve(el)
    }, { threshold:.1 })
    obs.observe(el)
    return ()=>obs.disconnect()
  },[target,suffix])
  return <span ref={ref}>0</span>
}

export default function About() {
  const card1 = useReveal(0.1)
  const card2 = useReveal(0.1,'0.15s')

  return (
    <section id="about" style={{ background:'var(--bg2)', position:'relative', zIndex:2, padding:'120px 64px' }}>
      <div className="stag">Who I am</div>
      <h2 style={{ fontFamily:'var(--font-orb)', fontSize:'clamp(32px,4.5vw,52px)', fontWeight:700, lineHeight:1.08, letterSpacing:'.01em', marginBottom:64 }}>
        About{' '}
        <span style={{ background:'linear-gradient(135deg,var(--g),var(--c))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Me</span>
      </h2>

      <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:36, alignItems:'start' }}>
        {/* text card */}
        <div ref={card1} className="rv" style={{ background:'var(--glass)', border:'1px solid var(--border)', backdropFilter:'blur(24px)', borderRadius:6, padding:44, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,var(--g) 40%,var(--c) 60%,transparent)' }}/>
          {[
            { text: <>I'm <strong style={{color:'var(--text)'}}>Zayn Ali</strong>, a Full-Stack MERN Developer from <strong style={{color:'var(--text)'}}>Sargodha, Pakistan</strong>, holding a <strong style={{color:'var(--text)'}}>BSSE from the University of Sargodha.</strong></> },
            { text: <>I specialize in building <strong style={{color:'var(--text)'}}>production-grade web applications</strong> — from video platforms and CRMs to charity platforms and real estate portals. I leverage <strong style={{color:'var(--text)'}}>AI tools</strong> to compress development cycles and deliver higher quality output, faster.</> },
            { text: <>Currently seeking <strong style={{color:'var(--text)'}}>remote paid internships</strong> where I can contribute meaningfully from day one.</>, mb:32 },
          ].map((p,i)=>(
            <p key={i} style={{ fontSize:15, color:'#4a7a70', lineHeight:1.82, marginBottom: p.mb||24 }}>{p.text}</p>
          ))}
          {[
            'MERN Stack — React · Node · Express · MongoDB',
            'AI-Assisted Dev — Claude · Cursor · Copilot',
            <>BSSE, University of Sargodha <span style={{color:'var(--c)'}}>2024</span></>,
            'Remote Ready — Available globally, any timezone',
          ].map((item,i)=>(
            <div key={i} className="a-hi">
              <div style={{width:5,height:5,background:'var(--g)',borderRadius:'50%',flexShrink:0}}/>
              {item}
            </div>
          ))}
        </div>

        {/* counters */}
        <div ref={card2} className="rv" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          {[
            { n:7, s:'+', l:'Projects Shipped' },
            { n:4, s:'+', l:'Core Technologies' },
            { n:100, s:'%', l:'Remote Ready' },
            { n:3, s:'x', l:'Faster with AI' },
          ].map(({n,s,l})=>(
            <div key={l} className="cnt" style={{ background:'var(--glass)', border:'1px solid var(--border)', backdropFilter:'blur(16px)', borderRadius:4, padding:28, textAlign:'center', transition:'border-color .3s,box-shadow .3s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,229,160,.45)'; e.currentTarget.style.boxShadow='var(--glow-sm)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=''; e.currentTarget.style.boxShadow=''}}>
              <div style={{ fontFamily:'var(--font-orb)', fontSize:38, fontWeight:700, color:'var(--g)', letterSpacing:'-.02em', lineHeight:1 }}>
                <Counter target={n} suffix={s}/>
              </div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.2em', textTransform:'uppercase', marginTop:7 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
