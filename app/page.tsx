'use client'
import { MoveUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

/* ── Icons ── */
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)
const ExploreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

/* ── Hummingbird Logo ── */
const BirdLogo = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 72 72" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22D3EE"/>
        <stop offset="50%" stopColor="#3882F6"/>
        <stop offset="100%" stopColor="#818CF8"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA"/>
        <stop offset="100%" stopColor="#22D3EE"/>
      </linearGradient>
    </defs>
    <path d="M16 30 Q28 10 48 18 Q40 26 26 27 Z" fill="url(#g2)" opacity="0.9"/>
    <path d="M18 36 Q34 18 52 24 Q43 34 28 33 Z" fill="url(#g1)" opacity="0.75"/>
    <ellipse cx="38" cy="40" rx="13" ry="8" fill="url(#g1)" transform="rotate(-18 38 40)"/>
    <path d="M47 46 Q60 56 55 64 Q50 57 45 53 Z" fill="url(#g2)" opacity="0.8"/>
    <circle cx="28" cy="32" r="7.5" fill="url(#g1)"/>
    <circle cx="26" cy="30" r="2.2" fill="white" opacity="0.95"/>
    <circle cx="26.5" cy="30.5" r="1" fill="#0A1628"/>
    <circle cx="25.8" cy="29.8" r="0.5" fill="white" opacity="0.8"/>
    <path d="M23 33 Q15 32 11 34" stroke="url(#g2)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <ellipse cx="34" cy="37" rx="4" ry="2.5" fill="white" opacity="0.15" transform="rotate(-18 34 37)"/>
  </svg>
)

/* ── Static data ── */
const STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: (i * 17.3) % 100,
  y: (i * 13.7) % 100,
  size: (i % 3) * 0.8 + 0.6,
  delay: (i % 4) * 1.1,
  dur: (i % 3) * 1.5 + 2.5,
}))

const ORBS = [
  { size: 6,  style: { left: '7%',  top: '35%' },    color: 'rgba(56,130,246,0.75)', delay: '0s',   dur: '7s'  },
  { size: 11, style: { left: '11%', top: '60%' },    color: 'rgba(100,116,139,0.3)', delay: '1.2s', dur: '9s'  },
  { size: 8,  style: { right: '9%', top: '22%' },    color: 'rgba(34,211,238,0.7)', delay: '0.5s', dur: '6s'  },
  { size: 15, style: { right: '5%', bottom: '28%' }, color: 'rgba(100,116,139,0.25)',delay: '2s',   dur: '11s' },
  { size: 5,  style: { left: '27%', top: '10%' },    color: 'rgba(56,130,246,0.6)', delay: '0.8s', dur: '5s'  },
  { size: 7,  style: { right: '24%',bottom: '16%' }, color: 'rgba(129,140,248,0.55)',delay:'1.8s',  dur: '8s'  },
]

type NavId = 'about' | 'explore' | 'contact'
const NAV: { id: NavId; label: string; icon: React.ReactNode }[] = [
  { id: 'about',   label: 'About',   icon: <UserIcon /> },
  { id: 'explore', label: 'Explore', icon: <MoveUp /> },
  { id: 'contact', label: 'Contact', icon: <MailIcon /> },
]

export default function FuturDooMPage() {
  const router = useRouter() 
  const [active, setActive]   = useState<NavId>('explore')
  const [mounted, setMounted] = useState(false)
  const [mouse,   setMouse]   = useState({ x: -100, y: -100 })
  const [ring,    setRing]    = useState({ x: -100, y: -100 })
  const rafRef   = useRef<number>(0)
  const mouseRef = useRef({ x: -100, y: -100 })

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setMouse({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    let rx = -100, ry = -100
    const tick = () => {
      rx += (mouseRef.current.x - rx) * 0.1
      ry += (mouseRef.current.y - ry) * 0.1
      setRing({ x: rx, y: ry })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)rotate(0)} 33%{transform:translateY(-10px)rotate(.8deg)} 66%{transform:translateY(-4px)rotate(-.8deg)} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes aurora { 0%,100%{transform:translate(0,0)scale(1);opacity:.6} 25%{transform:translate(35px,-25px)scale(1.07);opacity:.8} 50%{transform:translate(-18px,18px)scale(.95);opacity:.5} 75%{transform:translate(25px,12px)scale(1.04);opacity:.7} }
        @keyframes ringRotate { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes ringRotateReverse { from{transform:rotate(0)} to{transform:rotate(-360deg)} }
        @keyframes pulseRing { 0%,100%{box-shadow:0 0 0 0 rgba(99,179,237,.35),0 0 24px rgba(56,130,246,.25)} 50%{box-shadow:0 0 0 8px rgba(99,179,237,0),0 0 40px rgba(56,130,246,.5)} }
        @keyframes slideUp { 0%{opacity:0;transform:translateY(24px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes fadeScale { 0%{opacity:0;transform:scale(.93)} 100%{opacity:1;transform:scale(1)} }
        @keyframes shimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes dotPulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }
        @keyframes borderGlow { 0%,100%{opacity:.4} 50%{opacity:.9} }
        @keyframes starTwinkle { 0%,100%{opacity:.08} 50%{opacity:.6} }

        :root {
          --bg:#05070F; --surface:rgba(13,21,38,.95); --surface2:rgba(11,18,34,.98);
          --border:rgba(56,130,246,.18); --border-b:rgba(99,179,237,.45);
          --text:#E2E8F8; --text-sub:rgba(100,116,139,.85); --text-dim:rgba(100,116,139,.55);
          --blue:#3882F6; --cyan:#22D3EE; --violet:#818CF8;
          --nav-bg:rgba(13,21,38,.8); --nav-border:rgba(56,130,246,.22); --nav-color:#64748B;
          --card-bg1:rgba(13,21,38,.95); --card-bg2:rgba(11,18,34,.98);
          --logo-bg1:#0f1e3c; --logo-bg2:#0a1628; --logo-border:rgba(56,130,246,.3);
          --grid-color:rgba(56,130,246,.04); --aurora1:rgba(56,130,246,.22); --aurora2:rgba(34,211,238,.16); --aurora3:rgba(129,140,248,.13);
        }

        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        html,body { overflow-x:hidden; scroll-behavior:smooth; }
        body { background:var(--bg); min-height:100vh; color:var(--text); -webkit-font-smoothing:antialiased; font-family:system-ui,sans-serif; }

        .page-bg { position:fixed; inset:0; z-index:0; overflow:hidden; pointer-events:none; background:var(--bg); }
        .aurora-1 { position:absolute; border-radius:50%; width:min(65vw,600px); height:min(65vw,600px); top:-18%; left:-12%; background:radial-gradient(circle,var(--aurora1) 0%,transparent 65%); animation:aurora 18s ease-in-out infinite; filter:blur(40px); }
        .aurora-2 { position:absolute; border-radius:50%; width:min(55vw,520px); height:min(55vw,520px); bottom:-8%; right:-8%; background:radial-gradient(circle,var(--aurora2) 0%,transparent 65%); animation:aurora 22s ease-in-out infinite reverse; animation-delay:-8s; filter:blur(50px); }
        .aurora-3 { position:absolute; border-radius:50%; width:min(45vw,440px); height:min(45vw,440px); top:38%; left:35%; transform:translateX(-50%); background:radial-gradient(circle,var(--aurora3) 0%,transparent 65%); animation:aurora 26s ease-in-out infinite; animation-delay:-12s; filter:blur(55px); }
        .grid-overlay { position:absolute; inset:0; background-image:linear-gradient(var(--grid-color) 1px,transparent 1px),linear-gradient(90deg,var(--grid-color) 1px,transparent 1px); background-size:60px 60px; mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%); }
        .star { position:absolute; border-radius:50%; background:white; }

        .hero-card {
          background:linear-gradient(145deg,var(--card-bg1) 0%,var(--card-bg2) 100%);
          backdrop-filter:blur(28px); -webkit-backdrop-filter:blur(28px);
          border:1px solid var(--border); border-radius:20px;
          box-shadow:0 0 0 1px rgba(56,130,246,.07),0 20px 56px rgba(0,0,0,.45),0 0 70px rgba(56,130,246,.07),inset 0 1px 0 rgba(255,255,255,.06);
          position:relative; overflow:hidden;
          animation:fadeScale .9s cubic-bezier(.16,1,.3,1) .2s both;
        }
        .hero-card::before { content:''; position:absolute; inset:0; pointer-events:none; background:linear-gradient(135deg,rgba(56,130,246,.04) 0%,transparent 50%,rgba(34,211,238,.03) 100%); }
        .hero-card::after { content:''; position:absolute; top:0; left:20%; right:20%; height:1px; background:linear-gradient(90deg,transparent,rgba(99,179,237,.55),transparent); }

        .corner-dot { position:absolute; width:5px; height:5px; border-radius:50%; }
        .corner-tl { top:12px; left:12px; background:var(--blue); box-shadow:0 0 7px var(--blue); }
        .corner-tr { top:12px; right:12px; background:var(--cyan); box-shadow:0 0 7px var(--cyan); }
        .corner-bl { bottom:12px; left:12px; background:rgba(56,130,246,.38); }
        .corner-br { bottom:12px; right:12px; background:rgba(34,211,238,.38); }

        .logo-wrap { position:relative; margin:0 auto; display:flex; align-items:center; justify-content:center; }
        .logo-ring-outer { position:absolute; inset:0; border-radius:50%; border:1.5px dashed rgba(56,130,246,.32); animation:ringRotate 20s linear infinite; }
        .logo-ring-outer::before { content:''; position:absolute; top:-3px; left:50%; transform:translateX(-50%); width:5px; height:5px; border-radius:50%; background:var(--blue); box-shadow:0 0 8px var(--blue); }
        .logo-ring-inner { position:absolute; inset:10px; border-radius:50%; border:1px solid rgba(34,211,238,.2); animation:ringRotateReverse 14s linear infinite; }
        .logo-ring-inner::before { content:''; position:absolute; bottom:-3px; right:8%; width:4px; height:4px; border-radius:50%; background:var(--cyan); box-shadow:0 0 6px var(--cyan); }
        .logo-core { border-radius:50%; background:linear-gradient(135deg,var(--logo-bg1) 0%,var(--logo-bg2) 100%); border:1px solid var(--logo-border); box-shadow:0 0 0 3px rgba(56,130,246,.08),0 0 28px rgba(56,130,246,.22),inset 0 1px 0 rgba(255,255,255,.06); display:flex; align-items:center; justify-content:center; animation:pulseRing 3.5s ease-in-out infinite; position:relative; z-index:1; }

        .text-shimmer { background:linear-gradient(90deg,#3882F6 0%,#60A5FA 25%,#22D3EE 45%,#818CF8 65%,#60A5FA 80%,#3882F6 100%); background-size:300% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 5s linear infinite; }

        .nav-row { display:flex; align-items:center; justify-content:center; }
        .nav-btn { display:flex; flex-direction:column; align-items:center; gap:6px; cursor:pointer; padding:3px 4px; background:none; border:none; transition:transform .35s cubic-bezier(.34,1.56,.64,1); }
        .nav-btn:hover { transform:translateY(-4px) scale(1.05); }
        .nav-btn:active { transform:translateY(-2px) scale(1.01); }
        .nav-icon { border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all .3s ease; position:relative; }
        .nav-icon.inactive { background:var(--nav-bg); border:1.5px solid var(--nav-border); box-shadow:0 3px 14px rgba(0,0,0,.25); color:var(--nav-color); }
        .nav-icon.inactive:hover { border-color:rgba(56,130,246,.5); background:rgba(56,130,246,.1); color:var(--blue); }
        .nav-icon.active { background:linear-gradient(135deg,#3882F6 0%,#2563EB 100%); border:none; color:white; box-shadow:0 6px 20px rgba(56,130,246,.48),0 0 0 3px rgba(56,130,246,.14); }
        .nav-icon.active::after { content:''; position:absolute; inset:-1px; border-radius:50%; background:linear-gradient(135deg,rgba(99,179,237,.4),transparent); animation:borderGlow 2s ease-in-out infinite; }
        .nav-label { font-size:.65rem; font-weight:600; letter-spacing:.05em; text-transform:uppercase; transition:color .2s ease; }
        .nav-label.active { color:var(--blue); }
        .nav-label.inactive { color:var(--nav-color); }
        .nav-connector { display:flex; gap:3px; align-items:center; padding:0 4px; margin-bottom:22px; }
        .nav-dot { width:3px; height:3px; border-radius:50%; background:rgba(56,130,246,.25); animation:dotPulse 2s ease-in-out infinite; }
        .nav-dot:nth-child(2){animation-delay:.3s} .nav-dot:nth-child(3){animation-delay:.6s}

        .orb { position:absolute; border-radius:50%; pointer-events:none; filter:blur(1px); }
        .footer-link { color:var(--text-dim); font-size:.72rem; text-decoration:none; letter-spacing:.01em; white-space:nowrap; transition:color .2s ease; }
        .footer-link:hover { color:var(--blue); }
        .page-dot { border-radius:999px; height:5px; background:rgba(56,130,246,.22); transition:all .35s cubic-bezier(.34,1.56,.64,1); cursor:pointer; }
        .page-dot.active { background:linear-gradient(90deg,var(--blue),var(--cyan)); box-shadow:0 0 7px rgba(56,130,246,.45); }
        .page-dot:hover:not(.active) { background:rgba(56,130,246,.42); }

        .anim-slide-up { animation:slideUp .8s cubic-bezier(.16,1,.3,1) both; }
        .delay-1{animation-delay:.1s} .delay-2{animation-delay:.2s} .delay-3{animation-delay:.35s}
        .delay-4{animation-delay:.5s} .delay-5{animation-delay:.65s} .delay-6{animation-delay:.8s}

        @media (hover:hover) and (pointer:fine) {
          body { cursor:none; }
          .cursor-dot { position:fixed; z-index:9999; width:6px; height:6px; border-radius:50%; background:var(--blue); pointer-events:none; box-shadow:0 0 10px var(--blue); transform:translate(-50%,-50%); }
          .cursor-ring { position:fixed; z-index:9998; width:26px; height:26px; border-radius:50%; border:1.5px solid rgba(56,130,246,.45); pointer-events:none; transform:translate(-50%,-50%); transition:width .3s,height .3s,border-color .3s; }
        }
        @media (max-width:768px) { .cursor-dot,.cursor-ring{display:none!important} body{cursor:auto!important} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:var(--bg)} ::-webkit-scrollbar-thumb{background:rgba(56,130,246,.28);border-radius:3px}

        /* ── Responsive nav icon sizes ── */
        .nav-icon { width:52px; height:52px; }
        @media (max-width:480px) { .nav-icon{width:46px;height:46px} }
        @media (max-width:360px) { .nav-icon{width:40px;height:40px} }
      `}</style>

      {/* Custom cursor */}
      <div className="cursor-dot" style={{ left: mouse.x, top: mouse.y }} />
      <div className="cursor-ring" style={{ left: ring.x, top: ring.y }} />

      {/* ── Layered background ── */}
      <div className="page-bg">
        <div className="aurora-1" />
        <div className="aurora-2" />
        <div className="aurora-3" />
        <div className="grid-overlay" />
        {STARS.map(s => (
          <div key={s.id} className="star" style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size, opacity: 0.15,
            animation: `starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }} />
        ))}
      </div>

      <main style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* ── Header ── */}
        <header className="anim-slide-up delay-1" style={{ marginTop: 8, paddingTop: 'clamp(32px, 6vw, 56px)', paddingBottom: 8, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>

            {/* Live badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 999,
              background: 'rgba(56,130,246,.1)', border: '1px solid rgba(56,130,246,.25)',
              color: 'rgba(99,179,237,.9)',
              fontSize: 'clamp(.6rem,.15rem + 1.5vw,.68rem)', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase',
            }}>
              <span style={{
                display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
                background: '#22D3EE', boxShadow: '0 0 8px #22D3EE',
                animation: 'dotPulse 2s ease-in-out infinite',
              }} />
              Now Live — Platform v2.0
            </div>

            {/* Logo title — key change: tighter clamp */}
            <h1 style={{
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '-.03em', lineHeight: 1,
              fontSize: 'clamp(2.4rem, 8vw, 5rem)',
            }}>
              <span style={{ color: 'rgba(226,232,248,.8)', fontWeight: 300 }}>futur</span>
              <span className="text-shimmer" style={{ fontWeight: 800 }}>DooM</span>
            </h1>

            {/* Accent line */}
            <div style={{ position: 'relative', height: 1, width: 56 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'linear-gradient(90deg,transparent,#3882F6,#22D3EE,transparent)' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: 999, filter: 'blur(4px)', background: 'linear-gradient(90deg,transparent,#3882F6,#22D3EE,transparent)', opacity: .6 }} />
            </div>
          </div>
        </header>

        {/* ── Floating orbs ── */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          {ORBS.map((o, i) => (
            <div key={i} className="orb" style={{
              width: o.size, height: o.size,
              ...o.style,
              background: o.color,
              boxShadow: `0 0 ${o.size * 2.5}px ${o.color}`,
              animation: `floatSlow ${o.dur} ease-in-out ${o.delay} infinite`,
            }} />
          ))}
        </div>

        {/* ── Hero card ── */}
        <section style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(12px,3vw,24px) 16px', position: 'relative', zIndex: 2 }}>
          <div className="hero-card" style={{
            width: '100%', maxWidth: 400,
            padding: 'clamp(20px, 5vw, 40px)',
          }}>
            <div className="corner-dot corner-tl" />
            <div className="corner-dot corner-tr" />
            <div className="corner-dot corner-bl" />
            <div className="corner-dot corner-br" />

            {/* ── Logo ── */}
            <div className="anim-slide-up delay-3" style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(18px, 4vw, 28px)' }}>
              <div className="logo-wrap" style={{ width: 'clamp(72px,18vw,90px)', height: 'clamp(72px,18vw,90px)' }}>
                <div className="logo-ring-outer" />
                <div className="logo-ring-inner" />
                <div className="logo-core" style={{
                  width: 'clamp(52px,13vw,68px)', height: 'clamp(52px,13vw,68px)',
                  animation: 'floatSlow 7s ease-in-out infinite',
                }}>
                  <BirdLogo size={Math.min(40, 36)} />
                </div>
              </div>
            </div>

            {/* ── Tagline ── */}
            <div className="anim-slide-up delay-4" style={{ textAlign: 'center', marginBottom: 'clamp(16px,4vw,24px)' }}>
              <p style={{ color: 'rgba(100,116,139,.85)', fontSize: 'clamp(.75rem,2.5vw,.88rem)', fontWeight: 300, letterSpacing: '.02em', marginBottom: 6 }}>
                A new space where
              </p>
              <p style={{ fontSize: 'clamp(1.05rem,4vw,1.45rem)', fontWeight: 700, letterSpacing: '-.01em' }}>
                <span style={{ color: '#60A5FA' }}>Intelligence</span>
                <span style={{ color: 'rgba(100,116,139,.5)', fontWeight: 300, margin: '0 7px', fontSize: '.85em' }}>×</span>
                <span style={{ color: '#22D3EE' }}>Community</span>
              </p>
              <p style={{ color: 'rgba(100,116,139,.6)', fontSize: 'clamp(.7rem,2vw,.78rem)', lineHeight: 1.6, marginTop: 8, maxWidth: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                The next-gen platform connecting brilliant minds with powerful AI
              </p>
            </div>

            {/* ── Stats row ── */}
            <div className="anim-slide-up delay-4" style={{
              display: 'flex', marginBottom: 'clamp(16px,4vw,24px)',
              borderRadius: 10, overflow: 'hidden',
              border: '1px solid rgba(56,130,246,.12)', background: 'rgba(56,130,246,.04)',
            }}>
              {[['12K+', 'Members'], ['98%', 'Uptime'], ['4.9★', 'Rating']].map(([val, label], i) => (
                <div key={i} style={{
                  flex: 1, padding: 'clamp(7px,2vw,10px) 6px', textAlign: 'center',
                  borderRight: i < 2 ? '1px solid rgba(56,130,246,.1)' : 'none',
                }}>
                  <div style={{ fontSize: 'clamp(.82rem,2.5vw,.95rem)', fontWeight: 700, color: i === 0 ? '#60A5FA' : i === 1 ? '#22D3EE' : '#818CF8' }}>{val}</div>
                  <div style={{ fontSize: 'clamp(.58rem,1.5vw,.65rem)', color: 'rgba(100,116,139,.65)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* ── Nav buttons ── */}
            <div className="nav-row anim-slide-up delay-5">
              {NAV.map((item, i) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && (
                    <div className="nav-connector">
                      <div className="nav-dot" />
                      <div className="nav-dot" />
                      <div className="nav-dot" />
                    </div>
                  )}
                  <button className="nav-btn" 
                  onClick={() => {
                    setActive(item.id)
                    if (item.id === 'about')   router.push('/aboutshow')
                    if (item.id === 'contact') router.push('/contactshow')
                    if (item.id === 'explore') router.push('/sharelogout')
                  }}
                  aria-label={item.label} aria-pressed={active === item.id}>
                    <div className={`nav-icon ${active === item.id ? 'active' : 'inactive'}`}>
                      {item.icon}
                    </div>
                    <span className={`nav-label ${active === item.id ? 'active' : 'inactive'}`}>
                      {item.label}
                    </span>
                  </button>
                </div>
              ))}
            </div>

            {/* ── CTA ── */}
            {/* <div className="anim-slide-up delay-6" style={{ marginTop: 'clamp(18px,4vw,28px)', display: 'flex', justifyContent: 'center' }}>
              <button
                style={{
                  background: 'linear-gradient(135deg,#3882F6 0%,#1d4ed8 100%)',
                  boxShadow: '0 7px 24px rgba(56,130,246,.4),0 0 0 1px rgba(56,130,246,.3)',
                  color: 'white', border: 'none', borderRadius: 10,
                  padding: 'clamp(10px,2.5vw,13px) clamp(24px,6vw,36px)',
                  fontSize: 'clamp(.75rem,2vw,.82rem)', fontWeight: 600,
                  letterSpacing: '.05em', textTransform: 'uppercase',
                  cursor: 'pointer', width: '100%', maxWidth: 220,
                  transition: 'all .3s cubic-bezier(.34,1.56,.64,1)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-3px) scale(1.02)'
                  el.style.boxShadow = '0 14px 36px rgba(56,130,246,.55),0 0 0 1px rgba(99,179,237,.5)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0) scale(1)'
                  el.style.boxShadow = '0 7px 24px rgba(56,130,246,.4),0 0 0 1px rgba(56,130,246,.3)'
                }}
              >
                Get Early Access →
              </button>
            </div> */}
          </div>
        </section>

        {/* ── Bottom tagline ── */}
        <div style={{ textAlign: 'center', paddingBottom: 'clamp(12px,3vw,20px)', padding: '0 16px', position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: 'clamp(.72rem,2vw,.82rem)', color: 'rgba(100,116,139,.6)' }}>
            Enjoy a new experience with{' '}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ display: 'inline-block', width: 20, height: 1, background: 'linear-gradient(90deg,transparent,#3882F6)' }} />
              <span className="text-shimmer" style={{ fontWeight: 700, letterSpacing: '-.01em' }}>futurDooM</span>
            </span>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 12, paddingBottom: 16 }}>
            {[7, 22, 7, 7].map((w, i) => (
              <div key={i} className={`page-dot ${i === 1 ? 'active' : ''}`} style={{ width: w, cursor: 'pointer' }} />
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <footer style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(56,130,246,.1)', padding: 'clamp(12px,3vw,18px) 20px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <nav style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['Disclaimer', 'Visit Us', 'Contact Us'].map(link => (
                <a key={link} href="#" className="footer-link">{link}</a>
              ))}
            </nav>
            <nav style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              {['Privacy Policy', 'Terms & Conditions'].map(link => (
                <a key={link} href="#" className="footer-link">{link}</a>
              ))}
              <span className="footer-link">© 2026 futurDooM Platform, Inc.</span>
            </nav>
          </div>
        </footer>

      </main>
    </>
  )
}