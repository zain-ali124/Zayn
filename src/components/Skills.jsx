import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

/* ── Solar system canvas ── */
const PLANETS = [
  { name:'React',      or:115, spd:.38, a:0,   color:'#61dafb', r:9, ring:1 },
  { name:'Node.js',    or:115, spd:.38, a:90,  color:'#68a063', r:9, ring:1 },
  { name:'MongoDB',    or:115, spd:.38, a:180, color:'#4db33d', r:9, ring:1 },
  { name:'Express',    or:115, spd:.38, a:270, color:'#cccccc', r:8, ring:1 },
  { name:'Tailwind',   or:185, spd:.22, a:45,  color:'#38bdf8', r:7, ring:2 },
  { name:'JWT Auth',   or:185, spd:.22, a:135, color:'#f59e0b', r:7, ring:2 },
  { name:'REST API',   or:185, spd:.22, a:225, color:'#a78bfa', r:7, ring:2 },
  { name:'Git',        or:185, spd:.22, a:315, color:'#f97316', r:6, ring:2 },
  { name:'Next.js',    or:252, spd:.13, a:0,   color:'#ffffff', r:6, ring:3 },
  { name:'TypeScript', or:252, spd:.13, a:72,  color:'#3178c6', r:6, ring:3 },
  { name:'Socket.io',  or:252, spd:.13, a:144, color:'#25c2a0', r:5, ring:3 },
  { name:'Claude AI',  or:252, spd:.13, a:216, color:'#00e5a0', r:6, ring:3 },
  { name:'Redux',      or:252, spd:.13, a:288, color:'#764abc', r:5, ring:3 },
]

function SolarCanvas() {
  const canvasRef  = useRef(null)
  const stageRef   = useRef(null)
  const chipsRef   = useRef([])
  const planetsRef = useRef(PLANETS.map(p=>({...p})))

  useEffect(()=>{
    const canvas = canvasRef.current, stage = stageRef.current
    if (!canvas || !stage) return
    const ctx = canvas.getContext('2d')
    const W=680, H=680, CX=340, CY=340
    canvas.width=W; canvas.height=H

    // Create chip elements
    const chips = planetsRef.current.map((p,i)=>{
      const chip = document.createElement('div')
      chip.className = `orbit-chip ${p.ring===3?'xs':p.ring===2?'sm':''}`
      chip.style.cssText = `position:absolute;pointer-events:auto;z-index:10;transform:translate(-50%,-50%);display:flex;align-items:center;gap:5px;font-family:var(--font-mono);white-space:nowrap;`
      chip.style.setProperty('--chip-c', p.color)
      chip.innerHTML = `<span class="chip-dot" style="width:6px;height:6px;border-radius:50%;background:${p.color};box-shadow:0 0 6px ${p.color}"></span><span class="chip-txt">${p.name}</span>`
      stage.appendChild(chip)
      return chip
    })
    chipsRef.current = chips

    let lastT=null, coreGlow=0, coreDir=1, raf

    function drawCore(){
      ;[80,55,38,24].forEach((r,i)=>{
        const a=[.04,.08,.14,.25][i]
        const grad=ctx.createRadialGradient(CX,CY,0,CX,CY,r+coreGlow*(i+1)*.8)
        grad.addColorStop(0,`rgba(0,229,160,${a+.04})`); grad.addColorStop(.5,`rgba(0,229,160,${a*.4})`); grad.addColorStop(1,'rgba(0,229,160,0)')
        ctx.fillStyle=grad; ctx.beginPath(); ctx.arc(CX,CY,r+coreGlow*(i+1)*.8,0,Math.PI*2); ctx.fill()
      })
      ctx.beginPath(); ctx.arc(CX,CY,24,0,Math.PI*2)
      const cg=ctx.createRadialGradient(CX-6,CY-6,2,CX,CY,24)
      cg.addColorStop(0,'rgba(180,255,230,.95)'); cg.addColorStop(.4,'rgba(0,229,160,.85)'); cg.addColorStop(1,'rgba(0,180,120,.6)')
      ctx.fillStyle=cg; ctx.fill()
      ctx.strokeStyle='rgba(0,229,160,.8)'; ctx.lineWidth=1.5; ctx.stroke()
      ctx.fillStyle='#050505'; ctx.font='bold 9px Orbitron,monospace'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('MERN',CX,CY-4)
      ctx.fillStyle='rgba(0,240,255,.9)'; ctx.font='7px Orbitron,monospace'; ctx.fillText('+ AI',CX,CY+6)
    }

    function drawRings(){
      [115,185,252].forEach((r,i)=>{
        const col=['rgba(0,229,160,','rgba(0,240,255,','rgba(0,229,160,'][i]
        const op=[.22,.15,.1][i]
        ctx.beginPath(); ctx.arc(CX,CY,r,0,Math.PI*2)
        ctx.strokeStyle=col+op+')'; ctx.lineWidth=1; ctx.setLineDash(i===1?[4,8]:[3,12]); ctx.stroke(); ctx.setLineDash([])
      })
    }

    function drawPlanet(p){
      const x=CX+Math.cos(p.a*Math.PI/180)*p.or, y=CY+Math.sin(p.a*Math.PI/180)*p.or
      p.cx=x; p.cy=y
      for(let t=1;t<=3;t++){
        const ta=(p.a-(t*p.spd*6))*Math.PI/180
        const tx=CX+Math.cos(ta)*p.or, ty=CY+Math.sin(ta)*p.or
        ctx.globalAlpha=.35-t*.1; ctx.fillStyle=p.color
        ctx.beginPath(); ctx.arc(tx,ty,p.r*(1-t*.25),0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1
      }
      const glow=ctx.createRadialGradient(x,y,0,x,y,p.r*3.5)
      glow.addColorStop(0,p.color+'cc'); glow.addColorStop(.4,p.color+'44'); glow.addColorStop(1,'transparent')
      ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(x,y,p.r*3.5,0,Math.PI*2); ctx.fill()
      const body=ctx.createRadialGradient(x-p.r*.3,y-p.r*.3,p.r*.1,x,y,p.r)
      body.addColorStop(0,'#ffffff88'); body.addColorStop(.3,p.color+'ff'); body.addColorStop(1,p.color+'99')
      ctx.fillStyle=body; ctx.beginPath(); ctx.arc(x,y,p.r,0,Math.PI*2); ctx.fill()
      if(p.ring===1){
        ctx.beginPath(); ctx.moveTo(CX,CY); ctx.lineTo(x,y)
        const lg=ctx.createLinearGradient(CX,CY,x,y)
        lg.addColorStop(0,'rgba(0,229,160,.18)'); lg.addColorStop(1,'rgba(0,229,160,0)')
        ctx.strokeStyle=lg; ctx.lineWidth=.7; ctx.setLineDash([3,5]); ctx.stroke(); ctx.setLineDash([])
      }
    }

    function repositionChips(){
      const rect=canvas.getBoundingClientRect(), sr=stage.getBoundingClientRect()
      const offX=rect.left-sr.left, offY=rect.top-sr.top
      planetsRef.current.forEach((p,i)=>{
        const chip=chipsRef.current[i]; if(!chip||p.cx===undefined) return
        const dx=p.cx-CX, dy=p.cy-CY, len=Math.sqrt(dx*dx+dy*dy)||1
        const ox=p.cx+(dx/len)*18, oy=p.cy+(dy/len)*16
        const sx=rect.width/680, sy=rect.height/680
        chip.style.left=(offX+ox*sx)+'px'; chip.style.top=(offY+oy*sy)+'px'
      })
    }

    function frame(ts){
      if(!lastT) lastT=ts
      const dt=Math.min(ts-lastT,50); lastT=ts
      ctx.clearRect(0,0,W,H)
      coreGlow+=coreDir*.04; if(coreGlow>8||coreGlow<0) coreDir*=-1
      drawRings()
      planetsRef.current.forEach(p=>{ p.a+=p.spd*dt*0.018; drawPlanet(p) })
      drawCore(); repositionChips()
      raf=requestAnimationFrame(frame)
    }
    raf=requestAnimationFrame(frame)

    return ()=>{
      cancelAnimationFrame(raf)
      chipsRef.current.forEach(c=>c.remove())
    }
  },[])

  return (
    <div ref={stageRef} style={{ position:'relative', display:'flex', justifyContent:'center', marginBottom:64 }}>
      <canvas ref={canvasRef} id="solarCanvas" style={{ display:'block', width:680, height:680, filter:'drop-shadow(0 0 60px rgba(0,229,160,.08))' }}/>
    </div>
  )
}

/* ── Skill bars ── */
const SK_CATS = [
  {
    ico:'FE', icoStyle:'background:rgba(97,218,251,.12);color:#61dafb', name:'Frontend', nameColor:'#61dafb',
    rows:[
      {n:'React.js',   bg:'linear-gradient(90deg,#61dafb,#00f0ff)', w:.88, pct:'88%'},
      {n:'Tailwind CSS',bg:'linear-gradient(90deg,#38bdf8,#61dafb)', w:.85, pct:'85%'},
      {n:'Next.js',    bg:'linear-gradient(90deg,#eee,#aaa)',         w:.41, pct:'41%'},
      {n:'Redux',      bg:'linear-gradient(90deg,#764abc,#9b6edb)',   w:.70, pct:'70%'},
    ]
  },
  {
    ico:'BE', icoStyle:'background:rgba(104,160,99,.12);color:#68a063', name:'Backend & Database', nameColor:'#68a063',
    rows:[
      {n:'Node.js',    bg:'linear-gradient(90deg,#68a063,#4db33d)', w:.83, pct:'83%'},
      {n:'Express.js', bg:'linear-gradient(90deg,#aaa,#ccc)',        w:.80, pct:'80%'},
      {n:'MongoDB',    bg:'linear-gradient(90deg,#4db33d,#68a063)', w:.78, pct:'78%'},
      {n:'REST API',   bg:'linear-gradient(90deg,var(--g),var(--c))',w:.86, pct:'86%'},
    ]
  },
  {
    ico:'AI', icoStyle:'background:rgba(0,229,160,.1);color:var(--g)', name:'AI & DevOps Tools', nameColor:'var(--g)',
    rows:[
      {n:'AI Dev Tools',bg:'linear-gradient(90deg,var(--g),var(--c))',w:.93, pct:'93%'},
      {n:'Git / GitHub',bg:'linear-gradient(90deg,#f97316,#fb923c)', w:.83, pct:'83%'},
      {n:'Socket.io',   bg:'linear-gradient(90deg,#25c2a0,#00f0ff)', w:.72, pct:'72%'},
      {n:'TypeScript',  bg:'linear-gradient(90deg,#3178c6,#5b96e0)', w:.47, pct:'47%'},
    ]
  },
]

function SkillRow({ name, bg, w, pct }) {
  const ref = useRef(null)
  useEffect(()=>{
    const el=ref.current; if(!el) return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add('vis');obs.unobserve(el)}},{threshold:.4})
    obs.observe(el); return ()=>obs.disconnect()
  },[])
  return (
    <div ref={ref} className="sk-row" style={{ display:'grid', gridTemplateColumns:'100px 1fr 36px', alignItems:'center', gap:10 }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:11.5, color:'var(--text)' }}>{name}</span>
      <div style={{ height:3, background:'rgba(255,255,255,.06)', borderRadius:2, overflow:'hidden' }}>
        <div className="sk-fill" style={{ background:bg, width:(w*100)+'%' }}/>
      </div>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', textAlign:'right' }}>{pct}</span>
    </div>
  )
}

const BADGES = [
  {l:'JWT Auth',c:false},{l:'Mongoose',c:false},{l:'Stripe API',c:true},
  {l:'WhatsApp API',c:true},{l:'Vercel / Render',c:false},{l:'TypeScript',c:true},
  {l:'Postman',c:false},{l:'Cursor IDE',c:true},{l:'Redux Toolkit',c:false},{l:'OpenAI API',c:true},
]

export default function Skills() {
  const grid  = useReveal(0.1, '0s')
  const solar = useReveal(0.1)
  const badges= useReveal(0.1,'0.3s')

  return (
    <section id="skills" style={{ background:'var(--bg)', position:'relative', zIndex:2, padding:'120px 64px', overflow:'hidden' }}>
      <div className="stag">What I know</div>
      <h2 style={{ fontFamily:'var(--font-orb)', fontSize:'clamp(32px,4.5vw,52px)', fontWeight:700, lineHeight:1.08, letterSpacing:'.01em', marginBottom:64 }}>
        Tech <span style={{ background:'linear-gradient(135deg,var(--g),var(--c))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Stack</span>
      </h2>

      <div ref={solar} className="rv">
        <SolarCanvas/>
      </div>

      {/* skill bars */}
      <div ref={grid} className="rv" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, transitionDelay:'.2s' }}>
        {SK_CATS.map(cat=>(
          <div key={cat.name} className="sk-cat" style={{ background:'var(--glass)', border:'1px solid rgba(255,255,255,.07)', backdropFilter:'blur(18px)', borderRadius:6, overflow:'hidden', transition:'border-color .3s,box-shadow .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,229,160,.22)'; e.currentTarget.style.boxShadow='0 0 30px rgba(0,229,160,.06)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=''; e.currentTarget.style.boxShadow=''}}>
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
              <div style={{ width:28, height:28, borderRadius:3, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, fontFamily:'var(--font-mono)', ...Object.fromEntries(cat.icoStyle.split(';').map(s=>s.split(':').map(x=>x.trim())).filter(x=>x.length===2).map(([k,v])=>[k.replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),v])) }}>{cat.ico}</div>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:cat.nameColor }}>{cat.name}</span>
            </div>
            <div style={{ padding:'14px 20px', display:'flex', flexDirection:'column', gap:10 }}>
              {cat.rows.map(r=><SkillRow key={r.n} name={r.n} bg={r.bg} w={r.w} pct={r.pct}/>)}
            </div>
          </div>
        ))}
      </div>

      {/* badges */}
      <div ref={badges} className="rv" style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:20, transitionDelay:'.3s' }}>
        {BADGES.map(({l,c})=>(
          <span key={l} style={{ fontFamily:'var(--font-mono)', fontSize:10, padding:'5px 12px', border:`1px solid ${c?'rgba(0,240,255,.2)':'rgba(0,229,160,.2)'}`, color:c?'var(--c)':'var(--g)', letterSpacing:'.07em', transition:'all .2s', cursor:'default' }}
            onMouseEnter={e=>{e.currentTarget.style.background=c?'rgba(0,240,255,.08)':'rgba(0,229,160,.08)'}}
            onMouseLeave={e=>{e.currentTarget.style.background=''}}>
            {l}
          </span>
        ))}
      </div>
    </section>
  )
}
