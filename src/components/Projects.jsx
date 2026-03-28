import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    num:'01', color:'#ff6040', rgb:'255,96,64', status:'dev', statusLabel:'In Development',
    name:'VideCash',
    desc:"Next-gen video monetization ecosystem for creators. Adaptive streaming, creator analytics, viewer engagement metrics, and automated revenue distribution — engineered to rival industry-leading platforms.",
    stack:['React','Node.js','MongoDB','Express','FFmpeg'],
    links:[{ label:'⌥ GitHub', href:'https://github.com/zain-ali124/VideCash', cls:'gh' }],
  },
  {
    num:'02', color:'#00c8ff', rgb:'0,200,255', status:'beta', statusLabel:'Beta',
    name:'GigRanker',
    desc:"AI-powered freelancer suite that reverse-engineers marketplace algorithms. Auto-generates SEO-optimized gig titles, tracks keyword trends, delivers competitor insights — helping freelancers achieve 300%+ ranking boosts.",
    stack:['React','Node.js','MongoDB','OpenAI API','SEO'],
    links:[{ label:'⌥ GitHub', href:'https://github.com/zain-ali124/Fiverr-gig-seo', cls:'gh' }],
  },
  {
    num:'03', color:'#25d366', rgb:'37,211,102', status:'live', statusLabel:'Live',
    name:'WhatsApp CRM',
    desc:"Production CRM transforming WhatsApp into a full business sales channel. Automated flows, deal pipelines, broadcast campaigns, smart templates, and real-time analytics — live on Render.",
    stack:['React','Node.js','MongoDB','WA API','JWT'],
    links:[
      { label:'↗ Live Demo', href:'https://whatsapp-crm-1-cc4v.onrender.com/' },
      { label:'⌥ GitHub',   href:'https://github.com/zain-ali124/Whatsapp-CRM', cls:'gh' },
    ],
  },
  {
    num:'04', color:'#f59e0b', rgb:'245,158,11', status:'live', statusLabel:'Live · Paying Clients',
    name:'SignalPro',
    desc:"Premium crypto & forex signals platform with tiered subscriptions, real-time admin dashboard, push notifications, leaderboards, and Stripe recurring billing — live, delivering daily signals to paying subscribers.",
    stack:['React','Node.js','MongoDB','Stripe','Express'],
    links:[{ label:'↗ Case Study', href:'https://www.linkedin.com/posts/zayn-ali-24a0523aa_i-just-delivered-my-first-order-to-the-customer-activity-7437525920774742016--qV5' }],
  },
  {
    num:'05', color:'#e84cad', rgb:'232,76,173', status:'live', statusLabel:'Live',
    name:'BAWS — Charity Platform',
    desc:"Pakistan's transparent charitable giving platform. Real-time fundraising progress, verified causes, Stripe-powered donations, donor impact reports, and recognition tiers — actively deployed and creating measurable community change.",
    stack:['React','Node.js','MongoDB','Stripe','Tailwind'],
    links:[{ label:'↗ Live Demo', href:'https://baws-delta.vercel.app/' }],
  },
  {
    num:'06', color:'#8b5cf6', rgb:'139,92,246', status:'live', statusLabel:'Live',
    name:"Zayn's Estate",
    desc:"Full-stack real estate platform with advanced property filtering, interactive maps, virtual tours, AI mortgage calculator, and agent profiles — bridging buyers' dreams with reality since 2025.",
    stack:['React','Node.js','MongoDB','Maps API','Tailwind'],
    links:[{ label:'↗ Demo', href:'https://www.linkedin.com/posts/zayn-ali-24a0523aa_developed-a-full-stack-real-estate-web-application-activity-7429917615784976385-JL5O' }],
  },
  {
    num:'07', color:'#00e5a0', rgb:'0,229,160', status:'live', statusLabel:'Delivered to Client',
    name:'Full-Stack Earning App',
    desc:"Gamified passive income platform — task earnings, viral referral trees, multi-gateway withdrawals, leaderboard, and admin campaign panel. Delivered to a paying Fiverr client and running live in production.",
    stack:['React','Node.js','MongoDB','Express','JWT'],
    links:[{ label:'↗ Case Study', href:'https://www.linkedin.com/posts/zayn-ali-24a0523aa_developed-a-full-stack-earning-web-application-activity-7435364800441937920-QLO6' }],
  },
]

const STATUS_STYLE = {
  live: { border:'1px solid rgba(0,229,160,.35)', color:'var(--g)', background:'rgba(0,229,160,.09)' },
  dev:  { border:'1px solid rgba(255,189,0,.28)',  color:'#ffbd00', background:'rgba(255,189,0,.07)' },
  beta: { border:'1px solid rgba(0,240,255,.28)',  color:'var(--c)', background:'rgba(0,240,255,.07)' },
}

function ProjectCard({ proj, delay }) {
  const ref = useReveal(0.1, delay)
  const rafRef = useRef(null)

  const onMouseMove = e => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const el = ref.current; if (!el) return
      const rc = el.getBoundingClientRect()
      const x = (e.clientX - rc.left) / rc.width
      const y = (e.clientY - rc.top)  / rc.height
      const tX = (y-.5)*18, tY = (x-.5)*-18
      el.style.transform = `translateY(-12px) perspective(1200px) rotateX(${tX}deg) rotateY(${tY}deg)`
      el.style.setProperty('--mx', (x*100)+'%')
      el.style.setProperty('--my', (y*100)+'%')
    })
  }
  const onMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const el = ref.current; if (!el) return
    el.style.transform = ''
    el.style.setProperty('--mx','50%'); el.style.setProperty('--my','50%')
  }

  const st = STATUS_STYLE[proj.status]
  return (
    <div ref={ref} className="rv proj-card" data-tilt
      style={{ '--card-color':proj.color, '--card-rgb':proj.rgb }}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="shine"/>
      <div className="pc-spot"/>

      {/* banner */}
      <div style={{ position:'relative', zIndex:1, height:118, overflow:'hidden', display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'14px 22px' }}>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg,rgba(${proj.rgb},.18) 0,rgba(${proj.rgb},.05) 55%,transparent 100%)` }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(${proj.rgb},.08) 1px,transparent 1px),linear-gradient(90deg,rgba(${proj.rgb},.08) 1px,transparent 1px)`, backgroundSize:'26px 26px', maskImage:'linear-gradient(180deg,rgba(0,0,0,.3) 0%,rgba(0,0,0,.7) 100%)' }}/>
        <div style={{ position:'absolute', top:-20, right:70, width:1, height:'200%', background:`linear-gradient(180deg,transparent 0%,rgba(${proj.rgb},.4) 50%,transparent 100%)`, transform:'rotate(22deg)', opacity:.6 }}/>
        <div style={{ position:'absolute', top:-16, right:14, fontFamily:'var(--font-orb)', fontSize:88, fontWeight:900, color:`rgba(${proj.rgb},.06)`, lineHeight:1, pointerEvents:'none', userSelect:'none', letterSpacing:'-.04em' }} className="pc-watermark">
          {proj.num}
        </div>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:`rgba(${proj.rgb},.75)`, letterSpacing:'.22em', position:'relative', zIndex:2 }}>// PROJECT_{proj.num}</span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:9, padding:'4px 10px', letterSpacing:'.14em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:5, position:'relative', zIndex:2, borderRadius:2, ...st }}>
          <span style={{ width:5, height:5, borderRadius:'50%', background:'currentColor', animation:'pulse-d 2s infinite' }}/>
          {proj.statusLabel}
        </span>
      </div>

      {/* divider */}
      <div style={{ position:'relative', zIndex:1, height:1, background:`linear-gradient(90deg,transparent,rgba(${proj.rgb},.35) 25%,rgba(${proj.rgb},.35) 75%,transparent)` }}/>

      {/* body */}
      <div style={{ padding:'22px 22px 26px', position:'relative', zIndex:1 }}>
        <div className="pc-name" style={{ fontFamily:'var(--font-orb)', fontSize:16, fontWeight:700, marginBottom:10, color:'var(--text)', letterSpacing:'.03em' }}>
          {proj.name}
        </div>
        <p style={{ fontSize:12.5, color:'#3a6058', lineHeight:1.72, marginBottom:18 }}>{proj.desc}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:22 }}>
          {proj.stack.map(t=>(
            <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:9.5, padding:'4px 10px', border:'1px solid rgba(255,255,255,.08)', color:'rgba(208,236,230,.4)', letterSpacing:'.07em', textTransform:'uppercase', transition:'all .22s', borderRadius:2 }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=proj.color; e.currentTarget.style.color=proj.color; e.currentTarget.style.background=`rgba(${proj.rgb},.07)`}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=''; e.currentTarget.style.color=''; e.currentTarget.style.background=''}}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display:'flex', gap:10 }}>
          {proj.links.map(lk=>(
            <a key={lk.label} href={lk.href} target="_blank" rel="noreferrer"
              className={`pl${lk.cls?' '+lk.cls:''}`}
              style={{ fontFamily:'var(--font-mono)', fontSize:10.5, padding:'9px 16px', border:'1px solid rgba(255,255,255,.1)', color:'rgba(208,236,230,.5)', letterSpacing:'.1em', textTransform:'uppercase', transition:'all .25s', display:'flex', alignItems:'center', gap:6, borderRadius:2 }}
              onMouseEnter={e=>{ const el=e.currentTarget; if(lk.cls==='gh'){el.style.color='#ddd';el.style.borderColor='rgba(255,255,255,.4)';el.style.background='rgba(255,255,255,.05)'}else{el.style.color=proj.color;el.style.borderColor=`rgba(${proj.rgb},.55)`;el.style.background=`rgba(${proj.rgb},.07)`;el.style.boxShadow=`0 0 18px rgba(${proj.rgb},.14)`;el.style.transform='translateY(-1px)'} }}
              onMouseLeave={e=>{ const el=e.currentTarget; el.style.color='';el.style.borderColor='';el.style.background='';el.style.boxShadow='';el.style.transform='' }}>
              {lk.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" style={{ background:'var(--bg2)', position:'relative', zIndex:2, padding:'120px 64px' }}>
      <div className="stag">What I've built</div>
      <h2 style={{ fontFamily:'var(--font-orb)', fontSize:'clamp(32px,4.5vw,52px)', fontWeight:700, lineHeight:1.08, letterSpacing:'.01em', marginBottom:64 }}>
        Real <span style={{ background:'linear-gradient(135deg,var(--g),var(--c))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Projects</span>
      </h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(350px,1fr))', gap:28 }}>
        {PROJECTS.map((p,i)=>(
          <ProjectCard key={p.num} proj={p} delay={`${i*0.07}s`}/>
        ))}
      </div>
    </section>
  )
}
