'use client'
import Footer from '@/component/Footer'
import Navbar from '@/component/Navabr'
import { UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

/* ── Icons ── */
const BirdLogo = ({ size = 36 }: { size?: number }) => (
  <svg viewBox="0 0 72 72" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ag1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB"/>
        <stop offset="50%" stopColor="#3B82F6"/>
        <stop offset="100%" stopColor="#6366F1"/>
      </linearGradient>
      <linearGradient id="ag2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA"/>
        <stop offset="100%" stopColor="#2563EB"/>
      </linearGradient>
    </defs>
    <path d="M16 30 Q28 10 48 18 Q40 26 26 27 Z" fill="url(#ag2)" opacity="0.9"/>
    <path d="M18 36 Q34 18 52 24 Q43 34 28 33 Z" fill="url(#ag1)" opacity="0.75"/>
    <ellipse cx="38" cy="40" rx="13" ry="8" fill="url(#ag1)" transform="rotate(-18 38 40)"/>
    <path d="M47 46 Q60 56 55 64 Q50 57 45 53 Z" fill="url(#ag2)" opacity="0.8"/>
    <circle cx="28" cy="32" r="7.5" fill="url(#ag1)"/>
    <circle cx="26" cy="30" r="2.2" fill="white" opacity="0.95"/>
    <circle cx="26.5" cy="30.5" r="1" fill="#1E3A8A"/>
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
const QuoteIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
const StarIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
const CheckIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>

const SOCIALS = [
  { icon: <FBIcon />,  label: 'Facebook',  color: '#1877F2', bg: 'rgba(24,119,242,.08)'  },
  { icon: <IGIcon />,  label: 'Instagram', color: '#E1306C', bg: 'rgba(225,48,108,.08)'  },
  { icon: <TWIcon />,  label: 'Twitter',   color: '#1DA1F2', bg: 'rgba(29,161,242,.08)'  },
  { icon: <LIIcon />,  label: 'LinkedIn',  color: '#0A66C2', bg: 'rgba(10,102,194,.08)'  },
]

const TRAITS = [
  { label: 'Emotion-Driven Conversations', color: '#2563EB', bg: 'rgba(37,99,235,.07)' },
  { label: 'AI-Powered Intelligence',      color: '#0891B2', bg: 'rgba(8,145,178,.07)'  },
  { label: 'Community-First Platform',     color: '#7C3AED', bg: 'rgba(124,58,237,.07)' },
]

export default function AboutPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Force white bg — overrides any global dark theme set by other pages
    document.documentElement.style.background = '#F8F9FC'
    document.body.style.background = '#F8F9FC'
    document.body.style.backgroundColor = '#F8F9FC'
    return () => {
      document.documentElement.style.background = ''
      document.body.style.background = ''
      document.body.style.backgroundColor = ''
    }
  }, [])
  if (!mounted) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');

        @keyframes slideUp{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{0%{opacity:0}100%{opacity:1}}
        @keyframes cardReveal{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
        @keyframes dotPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}
        @keyframes avatarFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes borderSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{overflow-x:hidden;scroll-behavior:smooth}
        body{
          background:#F8F9FC;
          min-height:100vh;
          color:#111827;
          -webkit-font-smoothing:antialiased;
          font-family:'Geist',system-ui,sans-serif;
        }

        /* ── Subtle dot grid background ── */
        .page-bg{
          position:fixed;inset:0;z-index:0;pointer-events:none;
          background-image:radial-gradient(circle,rgba(37,99,235,.07) 1px,transparent 1px);
          background-size:28px 28px;
        }
        .page-bg-fade{
          position:fixed;inset:0;z-index:1;pointer-events:none;
          background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(219,234,254,.55) 0%,transparent 70%);
        }

        /* ── Navbar ── */
        .navbar{
          position:sticky;top:0;z-index:50;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 clamp(16px,4vw,48px);
          height:clamp(56px,8vw,68px);
          background:rgba(255,255,255,.85);
          backdrop-filter:blur(18px);
          -webkit-backdrop-filter:blur(18px);
          border-bottom:1px solid rgba(37,99,235,.1);
          box-shadow:0 1px 0 rgba(0,0,0,.04);
        }
        .nav-brand{display:flex;align-items:center;gap:10px;text-decoration:none}
        .nav-logo-box{
          width:38px;height:38px;border-radius:10px;
          background:linear-gradient(135deg,#EFF6FF,#DBEAFE);
          border:1px solid rgba(37,99,235,.15);
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 1px 3px rgba(37,99,235,.1);
        }
        .brand-text{font-family:'Geist',sans-serif;font-size:clamp(1rem,2.5vw,1.2rem);font-weight:700;letter-spacing:-.03em;color:#111827}
        .brand-doom{
          background:linear-gradient(90deg,#2563EB,#4F46E5,#7C3AED,#2563EB);
          background-size:300% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:shimmer 6s linear infinite;
        }
        .nav-actions{display:flex;gap:8px;align-items:center}
        .nav-btn{
          display:flex;align-items:center;gap:6px;
          padding:7px 14px;border-radius:8px;
          font-size:.8rem;font-weight:600;letter-spacing:-.01em;
          cursor:pointer;transition:all .2s ease;
          border:1px solid rgba(37,99,235,.18);
          background:white;color:#2563EB;
        }
        .nav-btn:hover{background:#EFF6FF;border-color:rgba(37,99,235,.35)}
        .nav-btn-icon{
          width:36px;height:36px;border-radius:8px;
          border:1px solid rgba(0,0,0,.08);background:white;
          color:#6B7280;display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:all .2s ease;
        }
        .nav-btn-icon:hover{background:#F9FAFB;color:#111827;border-color:rgba(0,0,0,.14)}

        /* ── Main layout ── */
        .main-wrap{
          position:relative;z-index:10;
          min-height:calc(100vh - 68px);
          display:flex;flex-direction:column;
          padding:clamp(24px,5vw,60px) clamp(16px,4vw,48px) 0;
          max-width:1200px;margin:0 auto;width:100%;
        }

        /* ── Page header ── */
        .page-header{
          margin-bottom:clamp(28px,4vw,52px);
          animation:slideUp .6s cubic-bezier(.16,1,.3,1) .05s both;
        }
        .page-badge{
          display:inline-flex;align-items:center;gap:7px;
          padding:5px 14px;border-radius:999px;
          background:rgba(37,99,235,.07);
          border:1px solid rgba(37,99,235,.15);
          color:#2563EB;font-size:.7rem;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;
          margin-bottom:16px;
        }
        .badge-dot{
          width:5px;height:5px;border-radius:50%;
          background:#2563EB;
          animation:dotPulse 2.5s ease-in-out infinite;
        }
        .page-title{
          font-family:'Instrument Serif',serif;
          font-size:clamp(1.8rem,5.5vw,3.8rem);
          font-weight:400;
          letter-spacing:-.02em;
          line-height:1.1;
          margin-bottom:14px;
          color:#0F172A;
        }
        .title-plain{color:#0F172A}
        .title-accent{
          background:linear-gradient(90deg,#2563EB,#7C3AED);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          font-style:italic;
        }
        .page-sub{
          font-size:clamp(.85rem,2vw,1rem);
          color:#64748B;
          max-width:520px;
          line-height:1.75;
          font-weight:400;
        }

        /* ── Grid ── */
        .about-grid{
          display:grid;
          grid-template-columns:1fr 1.15fr 0.9fr;
          gap:clamp(14px,2vw,24px);
          align-items:start;
          padding-bottom:clamp(32px,5vw,52px);
        }
        @media(max-width:1024px){.about-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:640px){.about-grid{grid-template-columns:1fr}}
        @media(max-width:1024px) and (min-width:641px){
          .founder-card{grid-column:1 / -1;flex-direction:row;text-align:left;align-items:flex-start}
          .founder-socials{justify-content:flex-start}
          .founder-stats{grid-template-columns:repeat(4,1fr)}
        }

        /* ── Cards ── */
        .card{
          background:#FFFFFF;
          border:1px solid rgba(0,0,0,.07);
          border-radius:16px;
          position:relative;overflow:hidden;
          box-shadow:0 1px 3px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.03);
          transition:box-shadow .25s ease,transform .25s ease,border-color .25s ease;
          min-width:0;word-break:break-word;
        }
        .card:hover{
          box-shadow:0 4px 24px rgba(37,99,235,.08),0 1px 3px rgba(0,0,0,.06);
          transform:translateY(-2px);
          border-color:rgba(37,99,235,.16);
        }
        .card-top-line{
          position:absolute;top:0;left:0;right:0;height:3px;
          background:linear-gradient(90deg,#2563EB,#7C3AED);
          opacity:0;transition:opacity .25s ease;
        }
        .card:hover .card-top-line{opacity:1}

        /* ── Welcome card ── */
        .welcome-card{
          padding:clamp(20px,4vw,32px);
          display:flex;flex-direction:column;gap:20px;
          animation:cardReveal .7s cubic-bezier(.16,1,.3,1) .1s both;
        }
        .welcome-logo-area{display:flex;align-items:center;gap:14px}
        .logo-box{
          width:52px;height:52px;border-radius:14px;
          background:linear-gradient(135deg,#EFF6FF,#DBEAFE);
          border:1px solid rgba(37,99,235,.15);
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 2px 8px rgba(37,99,235,.1);
          flex-shrink:0;
        }
        .welcome-brand-name{
          font-family:'Geist',sans-serif;font-weight:700;
          font-size:clamp(1rem,2.5vw,1.15rem);letter-spacing:-.03em;color:#111827;
        }
        .welcome-tagline{font-size:.72rem;color:#94A3B8;margin-top:3px;font-weight:400;letter-spacing:.02em}
        .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.07),transparent)}
        .welcome-desc{
          font-size:clamp(.8rem,2vw,.9rem);
          color:#475569;line-height:1.8;font-weight:400;
        }
        .welcome-desc strong{color:#0F172A;font-weight:600}
        .traits-list{display:flex;flex-direction:column;gap:9px}
        .trait-item{
          display:flex;align-items:center;gap:10px;
          padding:9px 14px;border-radius:9px;
          border:1px solid transparent;
          transition:background .2s ease,border-color .2s ease;
          animation:cardReveal .5s cubic-bezier(.16,1,.3,1) both;
        }
        .trait-item:hover{border-color:rgba(0,0,0,.06)}
        .trait-check{
          width:20px;height:20px;border-radius:6px;
          display:flex;align-items:center;justify-content:center;flex-shrink:0;
        }
        .trait-text{font-size:.8rem;font-weight:500;color:#334155}
        .social-section{display:flex;flex-direction:column;gap:10px}
        .social-label{font-size:.65rem;color:#94A3B8;text-transform:uppercase;letter-spacing:.1em;font-weight:600}
        .social-row{display:flex;gap:7px;flex-wrap:wrap}
        .soc-btn{
          width:34px;height:34px;border-radius:9px;
          border:1px solid rgba(0,0,0,.08);background:#F8F9FC;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;text-decoration:none;
          transition:all .2s cubic-bezier(.34,1.56,.64,1);
        }
        .soc-btn:hover{transform:translateY(-2px) scale(1.06)}

        /* ── Quote card ── */
        .quote-card{
          padding:clamp(20px,4vw,30px);
          display:flex;flex-direction:column;
          animation:cardReveal .7s cubic-bezier(.16,1,.3,1) .2s both;
        }
        .quote-visual{
          position:relative;width:100%;padding-top:52%;
          border-radius:12px;overflow:hidden;margin-bottom:22px;
          background:linear-gradient(135deg,#1E3A8A 0%,#1D4ED8 35%,#2563EB 60%,#4F46E5 100%);
          box-shadow:0 8px 32px rgba(37,99,235,.2);
        }
        .quote-visual-inner{
          position:absolute;inset:0;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          padding:clamp(16px,4%,28px);
        }
        .quote-visual-overlay{
          position:absolute;inset:0;
          background:radial-gradient(ellipse at 30% 30%,rgba(255,255,255,.08) 0%,transparent 60%);
        }
        .quote-visual-grid{
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);
          background-size:24px 24px;
        }
        .quote-icon-wrap{margin-bottom:12px;color:rgba(255,255,255,.5);position:relative;z-index:1}
        .quote-to{font-size:.7rem;color:rgba(255,255,255,.5);margin-bottom:8px;letter-spacing:.08em;text-transform:uppercase;position:relative;z-index:1}
        .quote-main{
          font-family:'Instrument Serif',serif;
          font-style:italic;
          font-size:clamp(1rem,3vw,1.25rem);
          font-weight:400;
          line-height:1.55;
          color:rgba(255,255,255,.95);
          text-align:center;
          position:relative;z-index:1;
        }
        .quote-main em{color:#93C5FD;font-style:italic}
        .quote-sig{
          margin-top:14px;
          display:flex;align-items:center;justify-content:flex-end;
          gap:8px;position:relative;z-index:1;
        }
        .quote-sig-line{flex:1;height:1px;background:rgba(255,255,255,.15)}
        .quote-sig-name{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.7);font-family:'Geist',sans-serif}
        .rating-row{display:flex;align-items:center;gap:9px;margin-bottom:16px}
        .stars{display:flex;gap:3px;color:#F59E0B}
        .rating-text{font-size:.78rem;color:#64748B}
        .rating-text strong{color:#0F172A;font-weight:600}
        .cta-row{
          display:flex;align-items:center;gap:12px;
          padding:13px 16px;border-radius:11px;
          background:linear-gradient(135deg,rgba(37,99,235,.06),rgba(124,58,237,.04));
          border:1px solid rgba(37,99,235,.12);
          cursor:pointer;transition:all .2s ease;
        }
        .cta-row:hover{background:linear-gradient(135deg,rgba(37,99,235,.1),rgba(124,58,237,.07));border-color:rgba(37,99,235,.25);transform:translateX(2px)}
        .cta-icon-box{
          width:32px;height:32px;border-radius:8px;
          background:linear-gradient(135deg,#2563EB,#4F46E5);
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;color:white;
          box-shadow:0 2px 8px rgba(37,99,235,.3);
        }
        .cta-text{font-size:.8rem;font-weight:500;color:#374151;flex:1}
        .cta-arrow{color:#2563EB}

        /* ── Founder card ── */
        .founder-card{
          padding:clamp(20px,4vw,28px);
          display:flex;flex-direction:column;align-items:center;
          gap:20px;text-align:center;
          animation:cardReveal .7s cubic-bezier(.16,1,.3,1) .3s both;
        }
        @media(max-width:640px){.founder-card{flex-direction:column;align-items:center;text-align:center}}
        .avatar-wrap{position:relative;flex-shrink:0}
        .avatar-circle{
          width:clamp(76px,12vw,96px);height:clamp(76px,12vw,96px);min-width:76px;min-height:76px;
          border-radius:50%;
          background:linear-gradient(135deg,#DBEAFE,#EDE9FE);
          border:2px solid rgba(37,99,235,.2);
          display:flex;align-items:center;justify-content:center;
          font-family:'Instrument Serif',serif;font-size:clamp(1.6rem,4vw,2.1rem);
          font-weight:400;font-style:italic;
          color:#2563EB;
          position:relative;z-index:1;
          animation:avatarFloat 5s ease-in-out infinite;
          box-shadow:0 4px 20px rgba(37,99,235,.15);
        }
        .online-dot{
          position:absolute;bottom:4px;right:4px;
          width:13px;height:13px;border-radius:50%;
          background:#22C55E;border:2.5px solid white;z-index:2;
          box-shadow:0 0 0 2px rgba(34,197,94,.2);
        }
        .founder-name{
          font-family:'Instrument Serif',serif;
          font-size:clamp(1.05rem,3vw,1.35rem);
          font-weight:400;font-style:italic;
          letter-spacing:-.01em;margin-bottom:6px;color:#0F172A;
        }
        .founder-role{
          display:inline-flex;align-items:center;gap:6px;
          padding:4px 12px;border-radius:999px;
          background:rgba(37,99,235,.07);
          border:1px solid rgba(37,99,235,.14);
          font-size:.68rem;font-weight:600;letter-spacing:.08em;
          text-transform:uppercase;color:#2563EB;
          margin-bottom:14px;
        }
        .role-dot{
          width:5px;height:5px;border-radius:50%;
          background:#2563EB;animation:dotPulse 2s ease-in-out infinite;
        }
        .founder-bio{
          font-size:clamp(.75rem,2vw,.84rem);
          color:#64748B;line-height:1.75;font-weight:400;margin-bottom:16px;
        }
        .founder-stats{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:18px;width:100%}
        .fstat{
          padding:11px;border-radius:10px;
          background:#F8FAFC;border:1px solid rgba(0,0,0,.06);
          text-align:center;
        }
        .fstat-val{font-family:'Geist',sans-serif;font-size:clamp(.9rem,2.5vw,1.05rem);font-weight:700;color:#2563EB;letter-spacing:-.02em}
        .fstat-lbl{font-size:.6rem;color:#94A3B8;text-transform:uppercase;letter-spacing:.07em;margin-top:2px;font-weight:500}
        .founder-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.07),transparent);margin-bottom:14px}
        .founder-social-label{font-size:.62rem;color:#94A3B8;text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px;font-weight:600}
        .founder-socials{display:flex;gap:7px;justify-content:center;flex-wrap:wrap}
        @media(max-width:1024px) and (min-width:641px){.founder-socials{justify-content:flex-start}}
        .fsoc-btn{
          width:34px;height:34px;border-radius:9px;
          border:1px solid rgba(0,0,0,.08);background:#F8F9FC;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;text-decoration:none;
          transition:all .2s cubic-bezier(.34,1.56,.64,1);
        }
        .fsoc-btn:hover{transform:translateY(-2px) scale(1.06)}

        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#F1F5F9}
        ::-webkit-scrollbar-thumb{background:rgba(37,99,235,.2);border-radius:4px}

        @media(max-width:400px){
          .navbar{padding:0 14px}
          .brand-text{font-size:.9rem}
        }
      `}</style>

      {/* Force white background on html/body — overrides any global dark theme */}
      <style>{`
        html, body, #__next, [data-nextjs-scroll-focus-boundary] {
          background: #F8F9FC !important;
          background-color: #F8F9FC !important;
        }
      `}</style>

      {/* Full-page white wrapper */}
      <div style={{ position:'fixed', inset:0, background:'#F8F9FC', zIndex:-1 }} />

      {/* Background */}
      <div className="page-bg" />
      <div className="page-bg-fade" />

      {/* Navbar */}
      <Navbar></Navbar>

      {/* Main */}
      <div className="main-wrap">

        {/* Header */}
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-dot" />
            About Us
          </div>
          <h1 className="page-title">
            <span className="title-plain">Welcome to </span>
            <span className="title-accent">futurDooM</span>
          </h1>
          <p className="page-sub">
            A platform where emotions meet AI — express, connect, and grow with a community that truly understands.
          </p>
        </div>

        {/* Grid */}
        <div className="about-grid">

          {/* ── Col 1: Welcome card ── */}
          <div className="card welcome-card">
            <div className="card-top-line" />

            <div className="welcome-logo-area">
              <div className="logo-box">
                <BirdLogo size={30} />
              </div>
              <div>
                <div className="welcome-brand-name">
                  futur<span style={{ background:'linear-gradient(90deg,#2563EB,#7C3AED)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>DooM</span>
                </div>
                <div className="welcome-tagline">Intelligence × Community</div>
              </div>
            </div>

            <div className="divider" />

            <p className="welcome-desc">
              <strong>futurDooM</strong> is a platform where emotions meet AI. People can now express their feelings through AI and share their experiences openly with a community that cares.<br/><br/>
              Connect with brilliant minds, build meaningful relationships, and explore what's possible when community meets intelligence.
            </p>

            <div className="traits-list">
              {TRAITS.map((t, i) => (
                <div
                  key={t.label}
                  className="trait-item"
                  style={{
                    background: t.bg,
                    borderColor: `${t.color}18`,
                    animationDelay: `${0.35 + i * 0.1}s`
                  }}
                >
                  <div className="trait-check" style={{ background: `${t.color}15` }}>
                    <span style={{ color: t.color }}><CheckIcon /></span>
                  </div>
                  <span className="trait-text">{t.label}</span>
                </div>
              ))}
            </div>

            <div className="divider" />

            <div className="social-section">
              <div className="social-label">Follow futurDooM</div>
              <div className="social-row">
                {SOCIALS.map(s => (
                  <a key={s.label} href="#" className="soc-btn" title={s.label}
                    style={{ color: s.color }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background=s.bg; el.style.borderColor=`${s.color}30`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='#F8F9FC'; el.style.borderColor='rgba(0,0,0,.08)'; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Col 2: Quote card ── */}
          <div className="card quote-card">
            <div className="card-top-line" />

            <div className="quote-visual">
              <div className="quote-visual-inner">
                <div className="quote-visual-overlay" />
                <div className="quote-visual-grid" />
                <div className="quote-icon-wrap"><QuoteIcon /></div>
                <div className="quote-to">To,</div>
                <div className="quote-main">For those we <em>never met!</em></div>
                <div className="quote-sig">
                  <div className="quote-sig-line" />
                  <div className="quote-sig-name">— futurDooM</div>
                </div>
              </div>
            </div>

            <div className="rating-row">
              <div className="stars">{[...Array(5)].map((_,i) => <StarIcon key={i} />)}</div>
              <span className="rating-text">Loved by <strong>12K+</strong> members</span>
            </div>

            <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(0,0,0,.07),transparent)', marginBottom:16 }} />

            <div className="cta-row">
              <div className="cta-icon-box"><ArrowRightIcon /></div>
              <div className="cta-text">Join the community — it's free</div>
              <div className="cta-arrow"><ArrowRightIcon /></div>
            </div>
          </div>

          {/* ── Col 3: Founder card ── */}
          <div className="card founder-card">
            <div className="card-top-line" />

            <div className="avatar-wrap">
              <div className="avatar-circle">D</div>
              <div className="online-dot" />
            </div>

            <div className="founder-info" style={{ width:'100%' }}>
              <div className="founder-name">Dipankar Porey</div>
              <div className="founder-role">
                <span className="role-dot" />
                The Founder
              </div>

              <p className="founder-bio">
                Visionary behind futurDooM — building a space where emotional intelligence and artificial intelligence converge to create meaningful human connections.
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
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background=s.bg; el.style.borderColor=`${s.color}30`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='#F8F9FC'; el.style.borderColor='rgba(0,0,0,.08)'; }}
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