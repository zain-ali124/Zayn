import { useEffect, useRef } from 'react'

export default function BgCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    let W, H, pts = [], raf

    function resize() {
      W = c.width  = innerWidth
      H = c.height = innerHeight
      pts = []
      const n = Math.floor(W * H / 15000)
      for (let i = 0; i < n; i++)
        pts.push({ x: Math.random()*W, y: Math.random()*H, vx:(Math.random()-.5)*.28, vy:(Math.random()-.5)*.28, r:Math.random()*1.4+.4, o:Math.random()*.6+.2 })
    }

    function draw() {
      ctx.clearRect(0,0,W,H)
      ctx.strokeStyle='rgba(0,229,160,0.035)'; ctx.lineWidth=.5
      const g=65
      for(let x=0;x<W;x+=g){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke() }
      for(let y=0;y<H;y+=g){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke() }
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0||p.x>W) p.vx*=-1
        if(p.y<0||p.y>H) p.vy*=-1
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(0,229,160,${p.o})`; ctx.fill()
      })
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy)
        if(d<110){ ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle=`rgba(0,229,160,${(1-d/110)*.1})`; ctx.lineWidth=.5; ctx.stroke() }
      }
      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize(); draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  return <canvas ref={ref} id="bg-c" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none',opacity:.5 }} />
}
