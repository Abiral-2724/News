'use client'
import Footer from '@/component/Footer'
import { UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

/* ── Icons ── */
const BirdLogo = ({ size = 36 }: { size?: number }) => (
  <svg viewBox="0 0 72 72" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ag1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22D3EE"/>
        <stop offset="50%" stopColor="#3882F6"/>
        <stop offset="100%" stopColor="#818CF8"/>
      </linearGradient>
      <linearGradient id="ag2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA"/>
        <stop offset="100%" stopColor="#22D3EE"/>
      </linearGradient>
    </defs>
    <path d="M16 30 Q28 10 48 18 Q40 26 26 27 Z" fill="url(#ag2)" opacity="0.9"/>
    <path d="M18 36 Q34 18 52 24 Q43 34 28 33 Z" fill="url(#ag1)" opacity="0.75"/>
    <ellipse cx="38" cy="40" rx="13" ry="8" fill="url(#ag1)" transform="rotate(-18 38 40)"/>
    <path d="M47 46 Q60 56 55 64 Q50 57 45 53 Z" fill="url(#ag2)" opacity="0.8"/>
    <circle cx="28" cy="32" r="7.5" fill="url(#ag1)"/>
    <circle cx="26" cy="30" r="2.2" fill="white" opacity="0.95"/>
    <circle cx="26.5" cy="30.5" r="1" fill="#0A1628"/>
    <path d="M23 33 Q15 32 11 34" stroke="url(#ag2)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const FBIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const IGIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
const TWIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
const LIIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
const QuoteIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
const StarIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>

const SOCIALS = [
  { icon: <FBIcon />,  label: 'Facebook',  color: '#1877F2', bg: 'rgba(24,119,242,.12)'  },
  { icon: <IGIcon />,  label: 'Instagram', color: '#E1306C', bg: 'rgba(225,48,108,.12)'  },
  { icon: <TWIcon />,  label: 'Twitter',   color: '#1DA1F2', bg: 'rgba(29,161,242,.12)'  },
  { icon: <LIIcon />,  label: 'LinkedIn',  color: '#0A66C2', bg: 'rgba(10,102,194,.12)'  },
]

const STARS_BG = Array.from({ length: 55 }, (_, i) => ({
  id: i, x: (i * 17.3) % 100, y: (i * 13.7) % 100,
  size: (i % 3) * 0.7 + 0.5, delay: (i % 4) * 1.1, dur: (i % 3) * 1.5 + 2.5,
}))

const TRAITS = [
  { label: 'Emotion-Driven', color: '#60A5FA' },
  { label: 'AI-Powered',     color: '#22D3EE' },
  { label: 'Community-First',color: '#818CF8' },
]

export default function AboutPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [mouse,   setMouse]   = useState({ x: -100, y: -100 })
  const [ring,    setRing]    = useState({ x: -100, y: -100 })
  const rafRef   = useRef<number>(0)
  const mouseRef = useRef({ x: -100, y: -100 })

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; setMouse({ x: e.clientX, y: e.clientY }) }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  useEffect(() => {
    let rx = -100, ry = -100
    const tick = () => { rx += (mouseRef.current.x - rx) * 0.1; ry += (mouseRef.current.y - ry) * 0.1; setRing({ x: rx, y: ry }); rafRef.current = requestAnimationFrame(tick) }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  if (!mounted) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Syne:wght@700;800&display=swap');

        @keyframes aurora{0%,100%{transform:translate(0,0)scale(1);opacity:.6}25%{transform:translate(35px,-25px)scale(1.07);opacity:.8}50%{transform:translate(-18px,18px)scale(.95);opacity:.5}75%{transform:translate(25px,12px)scale(1.04);opacity:.7}}
        @keyframes floatSlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes starTwinkle{0%,100%{opacity:.06}50%{opacity:.5}}
        @keyframes slideUp{0%{opacity:0;transform:translateY(22px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
        @keyframes dotPulse{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
        @keyframes ringRotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes ringRotateReverse{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(56,130,246,.3),0 0 20px rgba(56,130,246,.2)}50%{box-shadow:0 0 0 6px rgba(56,130,246,0),0 0 36px rgba(56,130,246,.4)}}
        @keyframes borderGlow{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes avatarFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-6px) scale(1.01)}}
        @keyframes cardReveal{0%{opacity:0;transform:translateY(18px) scale(.97)}100%{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes traitSlide{0%{opacity:0;transform:translateX(-12px)}100%{opacity:1;transform:translateX(0)}}
        @keyframes quoteFloat{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(1deg)}}

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{overflow-x:hidden;scroll-behavior:smooth}
        body{background:#05070F;min-height:100vh;color:#E2E8F8;-webkit-font-smoothing:antialiased;font-family:'DM Sans',system-ui,sans-serif}

        @media(hover:hover)and(pointer:fine){
          *{cursor:none!important}
          .c-dot{position:fixed;z-index:999999;width:6px;height:6px;border-radius:50%;background:#3882F6;pointer-events:none;box-shadow:0 0 10px #3882F6;transform:translate(-50%,-50%);will-change:transform}
          .c-ring{position:fixed;z-index:999998;width:26px;height:26px;border-radius:50%;border:1.5px solid rgba(56,130,246,.45);pointer-events:none;transform:translate(-50%,-50%);transition:width .3s,height .3s;will-change:transform}
        }
        @media(max-width:768px){.c-dot,.c-ring{display:none!important}*{cursor:auto!important}}

        .page-bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
        .au1{position:absolute;border-radius:50%;width:min(65vw,580px);height:min(65vw,580px);top:-15%;left:-10%;background:radial-gradient(circle,rgba(56,130,246,.2) 0%,transparent 65%);animation:aurora 18s ease-in-out infinite;filter:blur(44px)}
        .au2{position:absolute;border-radius:50%;width:min(55vw,500px);height:min(55vw,500px);bottom:-10%;right:-8%;background:radial-gradient(circle,rgba(34,211,238,.14) 0%,transparent 65%);animation:aurora 22s ease-in-out infinite reverse;animation-delay:-8s;filter:blur(52px)}
        .au3{position:absolute;border-radius:50%;width:min(42vw,420px);height:min(42vw,420px);top:38%;left:42%;transform:translateX(-50%);background:radial-gradient(circle,rgba(129,140,248,.11) 0%,transparent 65%);animation:aurora 26s ease-in-out infinite;animation-delay:-14s;filter:blur(56px)}
        .grid-ov{position:absolute;inset:0;background-image:linear-gradient(rgba(56,130,246,.033) 1px,transparent 1px),linear-gradient(90deg,rgba(56,130,246,.033) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%)}
        .star-bg{position:absolute;border-radius:50%;background:white}

        /* Navbar */
        .navbar{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(16px,4vw,40px);height:clamp(52px,8vw,64px);background:rgba(5,7,15,.75);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(56,130,246,.12)}
        .nav-brand{display:flex;align-items:center;gap:10px;text-decoration:none}
        .nav-logo-ring-wrap{position:relative;width:44px;height:44px;display:flex;align-items:center;justify-content:center}
        .nav-ring-o{position:absolute;inset:0;border-radius:50%;border:1px dashed rgba(56,130,246,.28);animation:ringRotate 18s linear infinite}
        .nav-ring-i{position:absolute;inset:7px;border-radius:50%;border:1px solid rgba(34,211,238,.16);animation:ringRotateReverse 12s linear infinite}
        .nav-core{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#0f1e3c,#0a1628);border:1px solid rgba(56,130,246,.25);display:flex;align-items:center;justify-content:center;position:relative;z-index:1;animation:pulseGlow 3.5s ease-in-out infinite}
        .brand-text{font-family:'Syne',sans-serif;font-size:clamp(1.1rem,3vw,1.3rem);font-weight:800;letter-spacing:-.02em}
        .brand-futur{color:rgba(226,232,248,.7);font-weight:700}
        .brand-doom{background:linear-gradient(90deg,#3882F6,#60A5FA,#22D3EE,#818CF8,#3882F6);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 5s linear infinite}
        .nav-actions{display:flex;gap:9px;align-items:center}
        .nav-icon-btn{position:relative;width:36px;height:36px;border-radius:50%;border:1px solid rgba(56,130,246,.2);background:rgba(13,21,38,.7);color:rgba(100,116,139,.8);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s ease}
        .nav-icon-btn:hover{border-color:rgba(56,130,246,.5);color:#3882F6;background:rgba(56,130,246,.1)}
        .nav-icon-btn .tooltip{position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);background:rgba(13,21,38,.95);border:1px solid rgba(56,130,246,.2);color:rgba(226,232,248,.8);font-size:.6rem;font-weight:600;letter-spacing:.05em;padding:3px 8px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s ease;z-index:999999}
        .nav-icon-btn:hover .tooltip{opacity:1}

        /* Main layout */
        .main-wrap{position:relative;z-index:10;min-height:calc(100vh - 64px);display:flex;flex-direction:column;padding:clamp(16px,4vw,52px) clamp(12px,4vw,40px) 0;max-width:1180px;margin:0 auto;width:100%}

        /* Page header */
        .page-header{margin-bottom:clamp(20px,4vw,44px);animation:slideUp .7s cubic-bezier(.16,1,.3,1) .1s both}
        .page-badge{display:inline-flex;align-items:center;gap:7px;padding:4px 14px;border-radius:999px;background:rgba(56,130,246,.08);border:1px solid rgba(56,130,246,.2);color:rgba(99,179,237,.85);font-size:.68rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}
        .page-title{font-family:'Syne',sans-serif;font-size:clamp(1.5rem,5.5vw,3.4rem);font-weight:800;letter-spacing:-.03em;line-height:1.1;margin-bottom:10px;word-break:break-word}
        .title-light{color:rgba(226,232,248,.55);font-weight:700}
        .title-accent{background:linear-gradient(90deg,#60A5FA,#22D3EE);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .page-sub{font-size:clamp(.78rem,2vw,.95rem);color:rgba(100,116,139,.7);max-width:480px;line-height:1.7;font-weight:300}

        /* Main grid */
        .about-grid{display:grid;grid-template-columns:1fr 1.1fr 0.85fr;gap:clamp(12px,2.5vw,22px);align-items:start;padding-bottom:clamp(24px,4vw,40px)}
        @media(max-width:1024px){.about-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:640px){.about-grid{grid-template-columns:1fr}}

        /* On tablet founder spans full width */
        @media(max-width:1024px) and (min-width:641px){
          .founder-card{grid-column:1 / -1;flex-direction:row;text-align:left;align-items:flex-start}
          .founder-socials{justify-content:flex-start}
          .founder-stats{grid-template-columns:repeat(4,1fr)}
        }

        /* Glass card */
        .glass-card{background:linear-gradient(145deg,rgba(13,21,38,.92) 0%,rgba(11,18,34,.96) 100%);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(56,130,246,.14);border-radius:18px;position:relative;overflow:hidden;transition:border-color .3s ease,box-shadow .3s ease,transform .3s ease;min-width:0;word-break:break-word}
        .glass-card::before{content:'';position:absolute;top:0;left:20%;right:20%;height:1px;background:linear-gradient(90deg,transparent,rgba(99,179,237,.35),transparent)}
        .glass-card:hover{border-color:rgba(56,130,246,.28);box-shadow:0 0 44px rgba(56,130,246,.08);transform:translateY(-2px)}
        .cdot{position:absolute;width:5px;height:5px;border-radius:50%}
        .cdot-tl{top:12px;left:12px;background:#3882F6;box-shadow:0 0 7px #3882F6}
        .cdot-tr{top:12px;right:12px;background:#22D3EE;box-shadow:0 0 7px #22D3EE}
        .cdot-bl{bottom:12px;left:12px;background:rgba(56,130,246,.35)}

        /* Welcome card */
        .welcome-card{padding:clamp(18px,4vw,34px);display:flex;flex-direction:column;gap:18px;animation:cardReveal .8s cubic-bezier(.16,1,.3,1) .15s both}
        .welcome-logo-area{display:flex;align-items:center;gap:14px}
        .logo-ring-wrap{position:relative;width:58px;height:58px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .logo-ring-o{position:absolute;inset:0;border-radius:50%;border:1.5px dashed rgba(56,130,246,.3);animation:ringRotate 18s linear infinite}
        .logo-ring-i{position:absolute;inset:9px;border-radius:50%;border:1px solid rgba(34,211,238,.18);animation:ringRotateReverse 12s linear infinite}
        .logo-core-el{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#0f1e3c,#0a1628);border:1px solid rgba(56,130,246,.28);display:flex;align-items:center;justify-content:center;animation:pulseGlow 3.5s ease-in-out infinite;position:relative;z-index:1}
        .welcome-brand{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1rem,2.5vw,1.2rem);letter-spacing:-.02em}
        .welcome-tagline{font-size:.72rem;color:rgba(100,116,139,.55);margin-top:3px;font-weight:300}
        .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(56,130,246,.2),transparent)}
        .welcome-desc{font-size:clamp(.78rem,2vw,.875rem);color:rgba(100,116,139,.75);line-height:1.75;font-weight:300}
        .welcome-desc strong{color:rgba(226,232,248,.8);font-weight:500}
        .traits-list{display:flex;flex-direction:column;gap:8px}
        .trait-item{display:flex;align-items:center;gap:10px;animation:traitSlide .6s cubic-bezier(.16,1,.3,1) both}
        .trait-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
        .trait-text{font-size:.78rem;font-weight:500;letter-spacing:.02em}
        .social-row-wrap{display:flex;flex-direction:column;gap:10px}
        .social-row-label{font-size:.63rem;color:rgba(100,116,139,.5);text-transform:uppercase;letter-spacing:.1em}
        .social-row{display:flex;gap:8px;flex-wrap:wrap}
        .soc-btn{width:34px;height:34px;border-radius:10px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.03);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s cubic-bezier(.34,1.56,.64,1);text-decoration:none}
        .soc-btn:hover{transform:translateY(-3px) scale(1.08)}

        /* Quote card */
        .quote-card{padding:clamp(18px,4vw,32px);display:flex;flex-direction:column;animation:cardReveal .8s cubic-bezier(.16,1,.3,1) .25s both}
        .quote-img-wrap{position:relative;width:100%;padding-top:55%;border-radius:12px;overflow:hidden;margin-bottom:20px}
        @media(max-width:640px){.quote-img-wrap{padding-top:65%}}
        .quote-img-inner{position:absolute;inset:0;background:linear-gradient(135deg,#0a2a1a 0%,#0d3b22 30%,#134d2a 60%,#0a2216 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:clamp(14px,4%,28px)}
        .quote-img-overlay{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 80%,rgba(34,197,94,.07) 0%,transparent 60%)}
        .grass-accent{position:absolute;bottom:0;left:0;right:0;height:28%;background:linear-gradient(0deg,rgba(22,101,52,.4) 0%,transparent 100%)}
        .quote-icon-wrap{margin-bottom:12px;color:rgba(99,179,237,.4)}
        .quote-text{font-family:'DM Sans',sans-serif;font-style:italic;font-size:clamp(.9rem,2.8vw,1.15rem);font-weight:300;line-height:1.65;color:rgba(226,232,248,.85);text-align:center;letter-spacing:.01em;position:relative;z-index:1}
        .quote-text em{color:#60A5FA;font-style:italic;font-weight:400}
        .quote-to{font-size:.72rem;color:rgba(100,116,139,.55);margin-bottom:8px;letter-spacing:.06em;text-transform:uppercase;position:relative;z-index:1}
        .quote-sig{margin-top:16px;display:flex;align-items:center;justify-content:flex-end;gap:8px;position:relative;z-index:1}
        .quote-sig-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(56,130,246,.25))}
        .quote-sig-text{font-family:'Syne',sans-serif;font-size:.82rem;font-weight:700;letter-spacing:-.01em}
        .quote-cta{margin-top:18px;display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:12px;background:rgba(56,130,246,.07);border:1px solid rgba(56,130,246,.15);cursor:pointer;transition:all .25s ease}
        .quote-cta:hover{background:rgba(56,130,246,.13);border-color:rgba(56,130,246,.3);transform:translateX(3px)}
        .quote-cta-text{font-size:.78rem;font-weight:500;color:rgba(226,232,248,.75);flex:1}
        .quote-cta-icon{color:rgba(56,130,246,.7)}
        .stars-row{display:flex;gap:3px;color:#FBBF24}

        /* Founder card */
        .founder-card{padding:clamp(18px,4vw,30px);display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center;animation:cardReveal .8s cubic-bezier(.16,1,.3,1) .35s both}
        @media(max-width:640px){.founder-card{flex-direction:column;align-items:center;text-align:center}}
        .avatar-wrap{position:relative;flex-shrink:0}
        .avatar-ring{position:absolute;inset:-5px;border-radius:50%;border:2px solid transparent;background:linear-gradient(135deg,rgba(56,130,246,.5),rgba(34,211,238,.5)) border-box;-webkit-mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);-webkit-mask-composite:destination-out;mask-composite:exclude;animation:borderGlow 3s ease-in-out infinite}
        .avatar-glow{position:absolute;inset:-8px;border-radius:50%;background:radial-gradient(circle,rgba(56,130,246,.15) 0%,transparent 70%);animation:pulseGlow 3s ease-in-out infinite}
        .avatar-placeholder{width:clamp(70px,12vw,100px);height:clamp(70px,12vw,100px);min-width:70px;min-height:70px;border-radius:50%;background:linear-gradient(135deg,#0f1e3c,#162040);border:2px solid rgba(56,130,246,.3);position:relative;z-index:1;animation:avatarFloat 5s ease-in-out infinite;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:clamp(1.4rem,4vw,2rem);font-weight:800;color:rgba(56,130,246,.7)}
        .online-dot{position:absolute;bottom:4px;right:4px;width:12px;height:12px;border-radius:50%;background:#22C55E;border:2px solid rgba(5,7,15,.9);z-index:2;box-shadow:0 0 8px rgba(34,197,94,.6)}
        .founder-info{flex:1;width:100%}
        .founder-name{font-family:'Syne',sans-serif;font-size:clamp(1rem,3vw,1.3rem);font-weight:800;letter-spacing:-.02em;margin-bottom:5px;background:linear-gradient(90deg,rgba(226,232,248,.9),rgba(226,232,248,.65));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .founder-role{display:inline-flex;align-items:center;gap:7px;padding:4px 12px;border-radius:999px;background:rgba(56,130,246,.1);border:1px solid rgba(56,130,246,.2);font-size:.68rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(99,179,237,.85);margin-bottom:12px}
        .founder-role-dot{width:5px;height:5px;border-radius:50%;background:#22D3EE;box-shadow:0 0 6px #22D3EE;animation:dotPulse 2s ease-in-out infinite}
        .founder-bio{font-size:clamp(.72rem,2vw,.82rem);color:rgba(100,116,139,.7);line-height:1.7;font-weight:300;margin-bottom:14px}
        .founder-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}
        .fstat{padding:10px;border-radius:10px;background:rgba(56,130,246,.05);border:1px solid rgba(56,130,246,.1);text-align:center}
        .fstat-val{font-family:'Syne',sans-serif;font-size:clamp(.85rem,2.5vw,1rem);font-weight:800;color:#60A5FA}
        .fstat-lbl{font-size:.6rem;color:rgba(100,116,139,.55);text-transform:uppercase;letter-spacing:.07em;margin-top:2px}
        .founder-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(56,130,246,.18),transparent);margin-bottom:14px}
        .founder-social-label{font-size:.62rem;color:rgba(100,116,139,.5);text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px}
        .founder-socials{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
        @media(max-width:1024px) and (min-width:641px){.founder-socials{justify-content:flex-start}}
        .fsoc-btn{width:34px;height:34px;border-radius:10px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.03);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s cubic-bezier(.34,1.56,.64,1);text-decoration:none}
        .fsoc-btn:hover{transform:translateY(-3px) scale(1.08)}

        /* Navbar small screens */
        @media(max-width:360px){
          .navbar{padding:0 12px}
          .brand-text{font-size:.95rem}
          .nav-logo-ring-wrap{width:36px;height:36px}
          .nav-core{width:26px;height:26px}
        }

        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#05070F}::-webkit-scrollbar-thumb{background:rgba(56,130,246,.25);border-radius:3px}
      `}</style>

      <div className="c-dot" style={{ left: mouse.x, top: mouse.y }} />
      <div className="c-ring" style={{ left: ring.x, top: ring.y }} />

      {/* Background */}
      <div className="page-bg">
        <div className="au1" /><div className="au2" /><div className="au3" />
        <div className="grid-ov" />
        {STARS_BG.map(s => (
          <div key={s.id} className="star-bg" style={{ left:`${s.x}%`, top:`${s.y}%`, width:s.size, height:s.size, opacity:.12, animation:`starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
        ))}
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="nav-brand">
          <div className="nav-logo-ring-wrap">
            <div className="nav-ring-o" /><div className="nav-ring-i" />
            <div className="nav-core"><BirdLogo size={22} /></div>
          </div>
          <span className="brand-text">
            <span className="brand-futur">futur</span>
            <span className="brand-doom">DooM</span>
          </span>
        </a>
        <div style={{ display:'flex', gap:9, alignItems:'center' }}>
          <button className="nav-icon-btn" aria-label="Login">
            <UserRound className="h-4 w-4" />
            <span className="tooltip">Login</span>
          </button>
          <button className="nav-icon-btn" onClick={() => router.push('/')} aria-label="Close">
            <ArrowRightIcon />
            <span className="tooltip">Close</span>
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="main-wrap">

        {/* Header */}
        <div className="page-header">
          <div className="page-badge">
            <span style={{ display:'inline-block', width:5, height:5, borderRadius:'50%', background:'#22D3EE', boxShadow:'0 0 7px #22D3EE', animation:'dotPulse 2s ease-in-out infinite' }} />
            About Us
          </div>
          <h1 className="page-title">
            <span className="title-light">Welcome to </span>
            <span className="title-accent">futurDooM</span>
          </h1>
          <p className="page-sub">A platform where emotions meet AI — express, connect, and grow with a community that understands.</p>
        </div>

        {/* Grid */}
        <div className="about-grid">

          {/* ── Col 1: Welcome card ── */}
          <div className="glass-card welcome-card">
            <div className="cdot cdot-tl" /><div className="cdot cdot-tr" />

            <div className="welcome-logo-area">
              <div className="logo-ring-wrap">
                <div className="logo-ring-o" /><div className="logo-ring-i" />
                <div className="logo-core-el"><BirdLogo size={28} /></div>
              </div>
              <div>
                <div className="welcome-brand">
                  <span style={{ color:'rgba(226,232,248,.7)', fontWeight:700 }}>futur</span>
                  <span style={{ background:'linear-gradient(90deg,#60A5FA,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>DooM</span>
                </div>
                <div className="welcome-tagline">Intelligence × Community</div>
              </div>
            </div>

            <div className="divider" />

            <p className="welcome-desc">
              <strong>futurDooM</strong> — A platform where emotions meet AI. People can now express their feelings through AI and share their experiences openly.<br/><br/>
              Join us and let your emotions flow with AI. Connect with brilliant minds, build meaningful relationships, and explore what's possible when community meets intelligence.
            </p>

            <div className="traits-list">
              {TRAITS.map((t, i) => (
                <div key={t.label} className="trait-item" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
                  <div className="trait-dot" style={{ background: t.color, boxShadow: `0 0 7px ${t.color}` }} />
                  <span className="trait-text" style={{ color: t.color }}>{t.label}</span>
                </div>
              ))}
            </div>

            <div className="divider" />

            <div className="social-row-wrap">
              <div className="social-row-label">Follow futurDooM</div>
              <div className="social-row">
                {SOCIALS.map(s => (
                  <a key={s.label} href="#" className="soc-btn" title={s.label}
                    style={{ color: s.color }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background=s.bg; el.style.borderColor=`${s.color}40`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(255,255,255,.03)'; el.style.borderColor='rgba(255,255,255,.07)'; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Col 2: Quote card ── */}
          <div className="glass-card quote-card">
            <div className="cdot cdot-tl" /><div className="cdot cdot-bl" />

            <div className="quote-img-wrap" style={{ animation: 'quoteFloat 6s ease-in-out infinite' }}>
              <div className="quote-img-inner">
                <div className="quote-img-overlay" />
                <div className="grass-accent" />
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{
                    position:'absolute', borderRadius:'50%',
                    width: 3 + (i%3), height: 3 + (i%3),
                    left: `${15 + i*13}%`, bottom: `${20 + (i%3)*15}%`,
                    background: i%2===0 ? 'rgba(96,165,250,.4)' : 'rgba(34,211,238,.35)',
                    animation: `floatSlow ${3+i*.7}s ease-in-out ${i*.4}s infinite`,
                    boxShadow: `0 0 ${(3+(i%3))*2}px currentColor`,
                  }} />
                ))}
                <div className="quote-icon-wrap"><QuoteIcon /></div>
                <div className="quote-to">To,</div>
                <div className="quote-text">For those we <em>never met!</em></div>
              </div>
            </div>

            <div className="quote-sig">
              <div className="quote-sig-line" />
              <div className="quote-sig-text">
                <span style={{ color:'rgba(226,232,248,.5)', fontWeight:700 }}>— futur</span>
                <span style={{ background:'linear-gradient(90deg,#60A5FA,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>DooM</span>
              </div>
            </div>

            <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(56,130,246,.15),transparent)', margin:'16px 0' }} />

            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
              <div className="stars-row">{[...Array(5)].map((_,i) => <StarIcon key={i} />)}</div>
              <span style={{ fontSize:'.75rem', color:'rgba(100,116,139,.65)' }}>Loved by <strong style={{ color:'rgba(226,232,248,.75)' }}>12K+</strong> members</span>
            </div>

            <div className="quote-cta">
              <div style={{ width:32, height:32, borderRadius:9, background:'linear-gradient(135deg,#3882F6,#1d4ed8)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <ArrowRightIcon />
              </div>
              <div className="quote-cta-text">Join the community — it's free</div>
              <div className="quote-cta-icon"><ArrowRightIcon /></div>
            </div>
          </div>

          {/* ── Col 3: Founder card ── */}
          <div className="glass-card founder-card">
            <div className="cdot cdot-tl" /><div className="cdot cdot-tr" />

            <div className="avatar-wrap">
              <div className="avatar-glow" />
              <div className="avatar-ring" />
              <div className="avatar-placeholder">D</div>
              <div className="online-dot" />
            </div>

            <div className="founder-info">
              <div className="founder-name">Dipankar Porey</div>
              <div className="founder-role">
                <span className="founder-role-dot" />
                The Founder
              </div>

              <p className="founder-bio">
                Visionary behind futurDooM — building a space where emotional intelligence and artificial intelligence converge.
              </p>

              <div className="founder-stats">
                <div className="fstat">
                  <div className="fstat-val">12K+</div>
                  <div className="fstat-lbl">Members</div>
                </div>
                <div className="fstat">
                  <div className="fstat-val">v2.0</div>
                  <div className="fstat-lbl">Platform</div>
                </div>
              </div>

              <div className="founder-divider" />
              <div className="founder-social-label">Connect with Dipankar</div>
              <div className="founder-socials">
                {SOCIALS.map(s => (
                  <a key={s.label} href="#" className="fsoc-btn" title={s.label}
                    style={{ color: s.color }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background=s.bg; el.style.borderColor=`${s.color}40`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(255,255,255,.03)'; el.style.borderColor='rgba(255,255,255,.07)'; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}