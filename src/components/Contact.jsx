import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

function GHIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
}
function LIIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}

const CT_ITEMS = [
  { ico:'@', label:'Email',    val:'zaynali@gmail.com' },
  { ico:<LIIcon/>, label:'LinkedIn', val:'linkedin.com/in/zayn-ali-24a0523aa' },
  { ico:<GHIcon/>, label:'GitHub',   val:'github.com/zain-ali124' },
  { ico:'◎', label:'Location', val:'Sargodha, Pakistan · Remote Only' },
]

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const infoRef = useReveal(0.1)
  const formRef = useReveal(0.1, '0.15s')

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(()=>{
      setStatus('sent')
      setTimeout(()=>{ setStatus('idle'); e.target.reset() }, 3000)
    }, 1800)
  }

  return (
    <section id="contact" style={{ background:'var(--bg2)', position:'relative', zIndex:2, padding:'120px 64px' }}>
      <div className="stag">Get in touch</div>
      <h2 style={{ fontFamily:'var(--font-orb)', fontSize:'clamp(32px,4.5vw,52px)', fontWeight:700, lineHeight:1.08, letterSpacing:'.01em', marginBottom:64 }}>
        Let's <span style={{ background:'linear-gradient(135deg,var(--g),var(--c))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Connect</span>
      </h2>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.35fr', gap:56, alignItems:'start' }}>
        {/* info */}
        <div ref={infoRef} className="rv">
          <h3 style={{ fontFamily:'var(--font-orb)', fontSize:22, fontWeight:600, marginBottom:12, letterSpacing:'.03em' }}>Open to Work — 2026</h3>
          <p style={{ fontSize:14, color:'#4a7a70', lineHeight:1.78, marginBottom:36 }}>
            Looking for a dedicated MERN developer who ships fast, communicates clearly, and brings AI-powered productivity to your team? Let's talk — I'm available immediately.
          </p>
          {CT_ITEMS.map(it=>(
            <div key={it.label} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 0', borderBottom:'1px solid rgba(0,229,160,.07)', fontFamily:'var(--font-mono)', fontSize:12 }}>
              <div style={{ width:36, height:36, border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--g)', fontSize:14, flexShrink:0 }}>{it.ico}</div>
              <div>
                <div style={{ fontSize:10, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--muted)' }}>{it.label}</div>
                <div style={{ color:'var(--text)', marginTop:2 }}>{it.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* form */}
        <div ref={formRef} className="rv" style={{ background:'var(--glass)', border:'1px solid var(--border)', backdropFilter:'blur(24px)', borderRadius:4, padding:44, position:'relative', overflow:'hidden', transitionDelay:'.15s' }}>
          <div style={{ position:'absolute', top:0, left:40, right:40, height:2, background:'linear-gradient(90deg,transparent,var(--g),var(--c),transparent)' }}/>
          <form onSubmit={handleSubmit}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <div className="fld" style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:14 }}>
                <label style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase' }}>Your Name</label>
                <input type="text" placeholder="John Smith" required/>
              </div>
              <div className="fld" style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:14 }}>
                <label style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase' }}>Email</label>
                <input type="email" placeholder="hello@company.com" required/>
              </div>
            </div>
            <div className="fld" style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:14 }}>
              <label style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase' }}>Subject</label>
              <input type="text" placeholder="Internship Opportunity"/>
            </div>
            <div className="fld" style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:14 }}>
              <label style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase' }}>Message</label>
              <textarea rows="5" placeholder="Tell me about the role and project..." required/>
            </div>
            <button type="submit" className="sub-btn"
              disabled={status==='sending'}
              style={{ opacity: status==='sending'?.7:1, background: status==='sent'?'linear-gradient(90deg,#00b870,#00d4e0)':'' }}>
              {status==='sent' ? '✓ Message Sent!' : status==='sending' ? 'Sending…' : '⚡ Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
