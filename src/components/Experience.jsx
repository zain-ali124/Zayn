import { useReveal } from '../hooks/useReveal'

const ITEMS = [
  {
    date:'2024 — Present',
    role:'Freelance MERN Developer',
    company:'Self-Employed · Fiverr / Direct Clients · Remote',
    desc:'Designing, building, and deploying full-stack MERN applications for international clients. Delivered a trading signals platform (SignalPro), a gamified earning app, and a WhatsApp CRM — all live in production. Leveraging AI tools to compress timelines without sacrificing quality.',
    tags:['React','Node.js','MongoDB','Stripe','AI Tools'],
    delay:'0s',
  },
  {
    date:'2023',
    role:'Open Source Contributor',
    company:'GitHub · Remote',
    desc:'Contributed bug fixes and feature additions to React and Node.js open source repositories. Built experience with pull requests, code review culture, and collaborative async development workflows used by global engineering teams.',
    tags:['Open Source','Git','Code Review','Collaboration'],
    delay:'.12s',
  },
  {
    date:'2020 — 2024',
    role:'Bachelor of Software Engineering (BSSE)',
    company:'University of Sargodha · Sargodha, Pakistan',
    desc:'Four-year degree covering software engineering principles, data structures & algorithms, web development, database management, and system design. Applied theoretical knowledge through 7+ real-world full-stack projects spanning multiple industries.',
    tags:['BSSE','Algorithms','System Design','Databases'],
    delay:'.24s',
  },
  {
    date:'2022',
    role:'MERN Stack Certification',
    company:'Self-Directed Learning · Online',
    desc:'Intensive self-directed training covering React hooks, Redux, RESTful API design, MongoDB aggregation pipelines, JWT authentication patterns, real-time Socket.io integration, and production deployment on Vercel and Render.',
    tags:['Certified','Full-Stack','JWT','Deployment'],
    delay:'.36s',
  },
]

function TLItem({ item }) {
  const ref = useReveal(0.1, item.delay)
  return (
    <div ref={ref} className="rv tl-item" style={{ paddingLeft:76, paddingBottom:54, position:'relative' }}>
      {/* dot */}
      <div style={{ position:'absolute', left:18, top:4, width:17, height:17, border:'1.5px solid var(--g)', background:'var(--bg)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 16px rgba(0,229,160,.3)', zIndex:2 }}>
        <div style={{ width:6, height:6, background:'var(--g)', borderRadius:'50%' }}/>
      </div>
      {/* box */}
      <div className="tl-box">
        <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--g)', letterSpacing:'.2em', textTransform:'uppercase', marginBottom:8 }}>{item.date}</div>
        <div style={{ fontFamily:'var(--font-orb)', fontSize:16, fontWeight:600, marginBottom:4, letterSpacing:'.02em' }}>{item.role}</div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--c)', marginBottom:12 }}>{item.company}</div>
        <p style={{ fontSize:13, color:'#4a7a70', lineHeight:1.72 }}>{item.desc}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:14 }}>
          {item.tags.map(t=>(
            <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:10, padding:'3px 9px', background:'rgba(0,229,160,.07)', border:'1px solid rgba(0,229,160,.14)', color:'var(--muted)' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ background:'var(--bg)', position:'relative', zIndex:2, padding:'120px 64px' }}>
      <div className="stag">My Journey</div>
      <h2 style={{ fontFamily:'var(--font-orb)', fontSize:'clamp(32px,4.5vw,52px)', fontWeight:700, lineHeight:1.08, letterSpacing:'.01em', marginBottom:64 }}>
        Experience &amp; <span style={{ color:'var(--c)' }}>Education</span>
      </h2>
      <div style={{ position:'relative', maxWidth:800, margin:'0 auto' }}>
        {/* timeline line */}
        <div style={{ position:'absolute', left:26, top:0, bottom:0, width:1, background:'linear-gradient(180deg,var(--g) 0,var(--c) 50%,transparent 100%)', opacity:.25 }}/>
        {ITEMS.map(item=><TLItem key={item.role} item={item}/>)}
      </div>
    </section>
  )
}
