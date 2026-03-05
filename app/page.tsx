'use client'
import Footer from '@/component/Footer'
import { MoveUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

/* ── Icons ── */
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)
const BirdLogo = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 72 72" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB"/><stop offset="50%" stopColor="#3B82F6"/><stop offset="100%" stopColor="#6366F1"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA"/><stop offset="100%" stopColor="#2563EB"/>
      </linearGradient>
    </defs>
    <path d="M16 30 Q28 10 48 18 Q40 26 26 27 Z" fill="url(#g2)" opacity="0.9"/>
    <path d="M18 36 Q34 18 52 24 Q43 34 28 33 Z" fill="url(#g1)" opacity="0.75"/>
    <ellipse cx="38" cy="40" rx="13" ry="8" fill="url(#g1)" transform="rotate(-18 38 40)"/>
    <path d="M47 46 Q60 56 55 64 Q50 57 45 53 Z" fill="url(#g2)" opacity="0.8"/>
    <circle cx="28" cy="32" r="7.5" fill="url(#g1)"/>
    <circle cx="26" cy="30" r="2.2" fill="white" opacity="0.95"/>
    <circle cx="26.5" cy="30.5" r="1" fill="#1E3A8A"/>
    <path d="M23 33 Q15 32 11 34" stroke="url(#g2)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
  </svg>
)

type NavId = 'about' | 'explore' | 'contact'
const NAV: { id: NavId; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'about',   label: 'About',   icon: <UserIcon />,  desc: 'Our story & team' },
  { id: 'explore', label: 'Explore', icon: <MoveUp size={18} />, desc: 'Browse conversations' },
  { id: 'contact', label: 'Contact', icon: <MailIcon />,  desc: 'Get in touch' },
]

const STATS = [
  { val: '12K+', label: 'Members',  color: '#2563EB' },
  { val: '98%',  label: 'Uptime',   color: '#0891B2' },
  { val: '4.9★', label: 'Rating',   color: '#7C3AED' },
]

export default function FuturDooMPage() {
  const router = useRouter()
  const [active, setActive] = useState<NavId>('explore')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.documentElement.style.cssText += ';background:#F8FAFC!important;background-color:#F8FAFC!important'
    document.body.style.cssText += ';background:#F8FAFC!important;background-color:#F8FAFC!important'
    return () => {
      document.documentElement.style.background = ''
      document.documentElement.style.backgroundColor = ''
      document.body.style.background = ''
      document.body.style.backgroundColor = ''
    }
  }, [])

  if (!mounted) return null

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F8FAFC',
      backgroundColor: '#F8FAFC',
      color: '#111827',
      fontFamily: "'Geist', system-ui, sans-serif",
      WebkitFontSmoothing: 'antialiased',
      display: 'flex',
      flexDirection: 'column',
      isolation: 'isolate',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');

        html, body, #__next, [data-nextjs-scroll-focus-boundary] {
          background: #F8FAFC !important;
          background-color: #F8FAFC !important;
        }

        @keyframes shimmer   { from{background-position:-300% center} to{background-position:300% center} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse     { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes floatLogo { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ringRotate{ from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes ringRev   { from{transform:rotate(0)} to{transform:rotate(-360deg)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,.18),0 0 24px rgba(37,99,235,.12)} 50%{box-shadow:0 0 0 8px rgba(37,99,235,0),0 0 36px rgba(37,99,235,.22)} }
        @keyframes navIn     { from{opacity:0;transform:translateY(8px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { overflow-x:hidden; scroll-behavior:smooth; }

        /* ── Dot-grid BG ── */
        .fd-bg-solid { position:fixed; inset:0; z-index:-2; background:#F8FAFC; }
        .fd-bg-dots  {
          position:fixed; inset:0; z-index:-1; pointer-events:none;
          background-image: radial-gradient(circle, rgba(37,99,235,.055) 1px, transparent 1px);
          background-size: 26px 26px;
        }
        .fd-bg-glow  {
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background: radial-gradient(ellipse 70% 55% at 50% 0%, rgba(219,234,254,.75) 0%, transparent 68%);
        }

        /* ── Navbar ── */
        .fd-nav {
          position: sticky; top:0; z-index:100;
          background: #ffffff; border-bottom: 1px solid #E2E8F0;
          box-shadow: 0 1px 0 rgba(0,0,0,.05), 0 2px 8px rgba(0,0,0,.04);
          display: flex; align-items:center; justify-content:space-between;
          padding: 0 clamp(20px,4vw,56px); height: 64px;
        }
        .fd-nav-left  { display:flex; align-items:center; }
        .fd-nav-right { display:flex; align-items:center; gap:8px; }

        .fd-brand { display:flex; align-items:center; gap:10px; text-decoration:none; margin-right:28px; }
        .fd-brand-icon {
          width:36px; height:36px; border-radius:9px;
          background: linear-gradient(135deg,#EFF6FF,#DBEAFE);
          border: 1px solid #BFDBFE;
          display:flex; align-items:center; justify-content:center;
          box-shadow: 0 1px 4px rgba(37,99,235,.1);
        }
        .fd-brand-name {
          font-family:'Geist',sans-serif; font-size:1.05rem;
          font-weight:700; letter-spacing:-.03em; color:#0F172A;
        }
        .fd-brand-accent {
          background: linear-gradient(90deg,#2563EB,#4F46E5,#7C3AED,#2563EB);
          background-size:300% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation: shimmer 6s linear infinite;
        }
        .fd-nav-sep { width:1px; height:20px; background:#E2E8F0; margin:0 4px; }
        .fd-nav-link {
          font-size:.83rem; font-weight:500; color:#64748B;
          text-decoration:none; padding:6px 11px; border-radius:7px;
          transition:all .18s ease; letter-spacing:-.01em;
        }
        .fd-nav-link:hover  { color:#0F172A; background:#F1F5F9; }
        .fd-nav-link.active { color:#2563EB; background:#EFF6FF; font-weight:600; }

        .fd-btn-ghost {
          display:flex; align-items:center; gap:6px; padding:7px 16px; border-radius:8px;
          font-size:.82rem; font-weight:600; cursor:pointer;
          border:1px solid #E2E8F0; background:#fff; color:#374151;
          transition:all .18s ease;
        }
        .fd-btn-ghost:hover { background:#F8FAFC; border-color:#CBD5E1; color:#111827; }

        .fd-btn-primary {
          display:flex; align-items:center; gap:6px; padding:7px 18px; border-radius:8px;
          font-size:.82rem; font-weight:600; cursor:pointer;
          border:1px solid #2563EB; background:#2563EB; color:#fff;
          box-shadow: 0 1px 4px rgba(37,99,235,.22);
          transition:all .18s ease;
        }
        .fd-btn-primary:hover { background:#1D4ED8; box-shadow:0 2px 10px rgba(37,99,235,.35); }

        /* ── Main ── */
        .fd-main {
          flex:1; position:relative; z-index:10;
          display:flex; flex-direction:column; align-items:center;
          padding: clamp(40px,6vw,72px) clamp(20px,4vw,48px) clamp(32px,4vw,48px);
        }

        /* ── Live badge ── */
        .fd-badge {
          display:inline-flex; align-items:center; gap:7px;
          padding:5px 16px; border-radius:999px;
          background:#EFF6FF; border:1px solid #BFDBFE;
          color:#2563EB; font-size:.68rem; font-weight:700;
          letter-spacing:.09em; text-transform:uppercase;
          margin-bottom:20px;
          animation: fadeUp .6s cubic-bezier(.16,1,.3,1) both;
        }
        .fd-badge-dot { width:5px; height:5px; border-radius:50%; background:#22C55E; box-shadow:0 0 0 3px rgba(34,197,94,.15); animation:pulse 2.5s ease-in-out infinite; }

        /* ── Title ── */
        .fd-title {
          font-family:'Instrument Serif',serif;
          font-size: clamp(2.8rem, 9vw, 5.5rem);
          font-weight:400; letter-spacing:-.03em; line-height:1;
          color:#0F172A; margin-bottom:16px; text-align:center;
          animation: fadeUp .7s cubic-bezier(.16,1,.3,1) .08s both;
        }
        .fd-title-futur { color:#0F172A; font-weight:300; }
        .fd-title-doom {
          background: linear-gradient(90deg,#2563EB,#4F46E5,#7C3AED,#2563EB);
          background-size:300% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation: shimmer 6s linear infinite;
          font-style:italic; font-weight:400;
        }

        /* Accent underline */
        .fd-underline {
          width:64px; height:3px; border-radius:999px; margin:0 auto 24px;
          background: linear-gradient(90deg,#2563EB,#7C3AED);
          animation: fadeUp .6s cubic-bezier(.16,1,.3,1) .14s both;
        }

        /* ── Subtitle ── */
        .fd-sub {
          font-size: clamp(.9rem,2.5vw,1.08rem);
          color:#64748B; text-align:center; max-width:420px; line-height:1.75;
          margin-bottom:36px;
          animation: fadeUp .7s cubic-bezier(.16,1,.3,1) .18s both;
        }
        .fd-sub strong { color:#0F172A; font-weight:600; }

        /* ── Hero card ── */
        .fd-card {
          width:100%; max-width:420px;
          background:#ffffff;
          border:1px solid #E2E8F0;
          border-radius:20px; overflow:hidden; position:relative;
          box-shadow: 0 4px 24px rgba(37,99,235,.08), 0 1px 3px rgba(0,0,0,.05);
          animation: fadeUp .75s cubic-bezier(.16,1,.3,1) .24s both;
        }
        .fd-card-stripe {
          position:absolute; top:0; left:0; right:0; height:3px;
          background: linear-gradient(90deg,#2563EB,#7C3AED);
        }

        /* ── Logo zone ── */
        .fd-logo-zone {
          display:flex; flex-direction:column; align-items:center;
          padding: clamp(28px,5vw,40px) clamp(24px,5vw,36px) 0;
          text-align:center;
        }
        .fd-logo-wrap {
          position:relative; display:flex; align-items:center; justify-content:center;
          width:clamp(80px,18vw,96px); height:clamp(80px,18vw,96px);
          margin-bottom:20px;
        }
        .fd-ring-o {
          position:absolute; inset:0; border-radius:50%;
          border:1.5px dashed rgba(37,99,235,.22);
          animation:ringRotate 20s linear infinite;
        }
        .fd-ring-i {
          position:absolute; inset:11px; border-radius:50%;
          border:1px solid rgba(124,58,237,.16);
          animation:ringRev 14s linear infinite;
        }
        .fd-logo-core {
          width:clamp(58px,13vw,72px); height:clamp(58px,13vw,72px);
          border-radius:50%;
          background: linear-gradient(135deg,#EFF6FF,#EDE9FE);
          border:1.5px solid #BFDBFE;
          display:flex; align-items:center; justify-content:center;
          position:relative; z-index:1;
          box-shadow: 0 4px 20px rgba(37,99,235,.15);
          animation:floatLogo 6s ease-in-out infinite, glowPulse 4s ease-in-out infinite;
        }

        /* Tagline inside card */
        .fd-tagline-label {
          font-size:.68rem; color:#94A3B8; text-transform:uppercase;
          letter-spacing:.1em; font-weight:600; margin-bottom:6px;
        }
        .fd-tagline-main {
          font-size:clamp(1rem,3.5vw,1.2rem); font-weight:600;
          letter-spacing:-.02em; color:#0F172A; margin-bottom:6px;
        }
        .fd-tagline-main .intel { color:#2563EB; }
        .fd-tagline-main .cx    { color:#CBD5E1; font-weight:300; margin:0 8px; font-size:.8em; }
        .fd-tagline-main .comm  { color:#7C3AED; }
        .fd-tagline-sub {
          font-size:.78rem; color:#94A3B8; line-height:1.65;
          max-width:260px; margin:0 auto 24px;
        }

        /* ── Stats strip ── */
        .fd-stats {
          display:flex; width:100%;
          border-top:1px solid #F1F5F9; border-bottom:1px solid #F1F5F9;
          margin-bottom:24px;
        }
        .fd-stat {
          flex:1; padding:14px 10px; text-align:center;
          border-right:1px solid #F1F5F9; transition:background .2s;
        }
        .fd-stat:last-child { border-right:none; }
        .fd-stat:hover { background:#F8FAFC; }
        .fd-stat-val { font-family:'Geist',sans-serif; font-size:1rem; font-weight:700; letter-spacing:-.02em; }
        .fd-stat-lbl { font-size:.6rem; color:#94A3B8; text-transform:uppercase; letter-spacing:.08em; margin-top:2px; font-weight:600; }

        /* ── Nav buttons ── */
        .fd-nav-btns {
          display:flex; align-items:stretch; gap:0;
          padding:0 clamp(20px,5vw,32px) clamp(24px,5vw,32px);
          width:100%;
        }
        .fd-nav-sep-v { width:1px; background:#F1F5F9; flex-shrink:0; margin:0; }

        .fd-nav-btn {
          flex:1; display:flex; flex-direction:column; align-items:center; gap:8px;
          padding:16px 10px; border-radius:12px;
          background:none; border:none; cursor:pointer;
          transition:all .22s cubic-bezier(.34,1.56,.64,1);
          position:relative; text-decoration:none;
          animation:navIn .5s cubic-bezier(.16,1,.3,1) both;
        }
        .fd-nav-btn:hover { background:#F8FAFC; transform:translateY(-2px); }
        .fd-nav-btn.active { background:#EFF6FF; }

        .fd-nav-btn-icon {
          width:44px; height:44px; border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          transition:all .22s ease;
        }
        .fd-nav-btn.active   .fd-nav-btn-icon { background:#2563EB; color:#fff; box-shadow:0 4px 14px rgba(37,99,235,.35); }
        .fd-nav-btn:not(.active) .fd-nav-btn-icon { background:#F1F5F9; color:#64748B; border:1px solid #E2E8F0; }
        .fd-nav-btn:hover:not(.active) .fd-nav-btn-icon { background:#DBEAFE; color:#2563EB; border-color:#BFDBFE; }

        .fd-nav-btn-label {
          font-size:.72rem; font-weight:700; letter-spacing:.03em; text-transform:uppercase;
          transition:color .18s;
        }
        .fd-nav-btn.active   .fd-nav-btn-label { color:#2563EB; }
        .fd-nav-btn:not(.active) .fd-nav-btn-label { color:#94A3B8; }
        .fd-nav-btn:hover:not(.active) .fd-nav-btn-label { color:#2563EB; }

        .fd-nav-btn-desc {
          font-size:.62rem; color:#CBD5E1; line-height:1.3; text-align:center;
          transition:color .18s;
        }
        .fd-nav-btn:hover .fd-nav-btn-desc { color:#94A3B8; }
        .fd-nav-btn.active .fd-nav-btn-desc { color:#93C5FD; }

        /* active indicator dot */
        .fd-active-dot {
          position:absolute; bottom:8px;
          width:4px; height:4px; border-radius:50%; background:#2563EB;
        }

        /* ── Bottom tagline ── */
        .fd-foot-text {
          margin-top:28px; font-size:.78rem; color:#94A3B8; text-align:center;
          animation: fadeUp .7s cubic-bezier(.16,1,.3,1) .35s both;
        }
        .fd-foot-brand {
          background:linear-gradient(90deg,#2563EB,#7C3AED);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          font-weight:700; font-style:italic;
        }

        /* ── Page dots ── */
        .fd-dots { display:flex; align-items:center; gap:7px; margin-top:16px; }
        .fd-dot { height:4px; border-radius:999px; transition:all .3s ease; cursor:pointer; background:#E2E8F0; }
        .fd-dot.active { width:22px; background:linear-gradient(90deg,#2563EB,#7C3AED); }
        .fd-dot:not(.active) { width:7px; }
        .fd-dot:hover:not(.active) { background:#BFDBFE; }

        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#F1F5F9; }
        ::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:4px; }
        ::-webkit-scrollbar-thumb:hover { background:#94A3B8; }

        @media(max-width:400px) {
          .fd-nav { padding:0 14px; }
          .fd-brand-name { font-size:.9rem; }
        }
      `}</style>

      {/* Safety white layers */}
      <div className="fd-bg-solid" />
      <div className="fd-bg-dots" />
      <div className="fd-bg-glow" />


      {/* ── Main ── */}
      <main className="fd-main">

        {/* Live badge */}
        <div className="fd-badge">
          <span className="fd-badge-dot" />
          Now Live — Platform v2.0
        </div>

        {/* Title */}
        <h1 className="fd-title">
          <span className="fd-title-futur">futur</span>
          <span className="fd-title-doom">DooM</span>
        </h1>
        <div className="fd-underline" />

        {/* Subtitle */}
        <p className="fd-sub">
          A new space where <strong>intelligence</strong> meets <strong>community</strong> —
          express, connect, and grow with powerful AI.
        </p>

        {/* ── Hero card ── */}
        <div className="fd-card">
          <div className="fd-card-stripe" />

          {/* Logo zone */}
          <div className="fd-logo-zone">
            <div className="fd-logo-wrap">
              <div className="fd-ring-o" />
              <div className="fd-ring-i" />
              <div className="fd-logo-core"><BirdLogo size={38} /></div>
            </div>

            <div className="fd-tagline-label">Intelligence × Community</div>
            <div className="fd-tagline-main">
              <span className="intel">Intelligence</span>
              <span className="cx">×</span>
              <span className="comm">Community</span>
            </div>
            <p className="fd-tagline-sub">
              The next-gen platform connecting brilliant minds with powerful AI
            </p>
          </div>

          {/* Stats strip */}
          <div className="fd-stats">
            {STATS.map((s, i) => (
              <div key={i} className="fd-stat">
                <div className="fd-stat-val" style={{ color: s.color }}>{s.val}</div>
                <div className="fd-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Nav buttons */}
          <div className="fd-nav-btns">
            {NAV.map((item, i) => (
              <button
                key={item.id}
                className={`fd-nav-btn${active === item.id ? ' active' : ''}`}
                style={{ animationDelay: `${0.3 + i * 0.07}s` }}
                onClick={() => {
                  setActive(item.id)
                  if (item.id === 'about')   router.push('/aboutshow')
                  if (item.id === 'contact') router.push('/contactshow')
                  if (item.id === 'explore') router.push('/sharelogout')
                }}
                aria-label={item.label}
              >
                <div className="fd-nav-btn-icon">{item.icon}</div>
                <span className="fd-nav-btn-label">{item.label}</span>
                <span className="fd-nav-btn-desc">{item.desc}</span>
                {active === item.id && <span className="fd-active-dot" />}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="fd-foot-text">
          Enjoy a new experience with <span className="fd-foot-brand">futurDooM</span>
        </p>

        {/* Page dots */}
        <div className="fd-dots">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`fd-dot${i === 1 ? ' active' : ''}`} />
          ))}
        </div>

      </main>

      <Footer />
    </div>
  )
}