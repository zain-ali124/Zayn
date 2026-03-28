export default function Footer() {
  return (
    <footer style={{ position:'relative', zIndex:2, borderTop:'1px solid rgba(0,229,160,.07)', padding:'28px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--bg)', flexWrap:'wrap', gap:12 }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)' }}>
        © 2025 <span style={{ color:'var(--g)' }}>Zayn Ali</span> — MERN + AI Engineer · Sargodha, PK
      </div>
      <div style={{ display:'flex', gap:26 }}>
        {[
          { label:'GitHub',   href:'https://github.com/zain-ali124' },
          { label:'LinkedIn', href:'https://www.linkedin.com/in/zayn-ali-24a0523aa' },
          { label:'Resume',   href:'https://docs.google.com/document/d/e/2PACX-1vS1MsYN6VL5K_MEL2aaoQUOZ1SZPw-Rvi89ORyxsbgDin42PoXWcyUYbp98_NGDOjvdzyIDmkcskaZH/pub' },
        ].map(l=>(
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
            style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)', letterSpacing:'.12em', transition:'color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--g)'}
            onMouseLeave={e=>e.currentTarget.style.color=''}>
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
