'use client'
import Footer from '@/component/Footer'
import Navbar from '@/component/Navabr'
import { UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

/* ── Icons ── */
const BirdLogo = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 72 72" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB"/>
        <stop offset="50%" stopColor="#3B82F6"/>
        <stop offset="100%" stopColor="#6366F1"/>
      </linearGradient>
      <linearGradient id="cg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA"/>
        <stop offset="100%" stopColor="#2563EB"/>
      </linearGradient>
    </defs>
    <path d="M16 30 Q28 10 48 18 Q40 26 26 27 Z" fill="url(#cg2)" opacity="0.9"/>
    <path d="M18 36 Q34 18 52 24 Q43 34 28 33 Z" fill="url(#cg1)" opacity="0.75"/>
    <ellipse cx="38" cy="40" rx="13" ry="8" fill="url(#cg1)" transform="rotate(-18 38 40)"/>
    <path d="M47 46 Q60 56 55 64 Q50 57 45 53 Z" fill="url(#cg2)" opacity="0.8"/>
    <circle cx="28" cy="32" r="7.5" fill="url(#cg1)"/>
    <circle cx="26" cy="30" r="2.2" fill="white" opacity="0.95"/>
    <circle cx="26.5" cy="30.5" r="1" fill="#1E3A8A"/>
    <path d="M23 33 Q15 32 11 34" stroke="url(#cg2)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
  </svg>
)
const MailIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
const PhoneIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
const SendIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
const ArrowRight = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
const FBIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const IGIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
const TWIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
const LIIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
const CheckCircle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>

const SOCIALS = [
  { icon: <FBIcon />,  label: 'Facebook',  color: '#1877F2', bg: 'rgba(24,119,242,.08)'  },
  { icon: <IGIcon />,  label: 'Instagram', color: '#E1306C', bg: 'rgba(225,48,108,.08)'  },
  { icon: <TWIcon />,  label: 'Twitter',   color: '#1DA1F2', bg: 'rgba(29,161,242,.08)'  },
  { icon: <LIIcon />,  label: 'LinkedIn',  color: '#0A66C2', bg: 'rgba(10,102,194,.08)'  },
]

const TAGS = ['General Inquiry', 'Bug Report', 'Feature Request', 'Partnership']

export default function ContactPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Forcefully override any global dark background
    document.documentElement.style.cssText += ';background:#F8FAFC!important;background-color:#F8FAFC!important'
    document.body.style.cssText += ';background:#F8FAFC!important;background-color:#F8FAFC!important'
    return () => {
      document.documentElement.style.background = ''
      document.documentElement.style.backgroundColor = ''
      document.body.style.background = ''
      document.body.style.backgroundColor = ''
    }
  }, [])

  const handleSend = () => {
    if (!form.name || !form.email) return
    setSent(true)
    setTimeout(() => setSent(false), 3500)
    setForm({ name: '', email: '', message: '' })
  }

  if (!mounted) return null

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F8FAFC',
      backgroundColor: '#F8FAFC',
      color: '#111827',
      fontFamily: "'Geist', system-ui, sans-serif",
      WebkitFontSmoothing: 'antialiased',
      position: 'relative',
      isolation: 'isolate',
    }}>

      {/* ── Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');

        /* Nuclear option: force white on every ancestor */
        html, body, #__next, [data-nextjs-scroll-focus-boundary] {
          background: #F8FAFC !important;
          background-color: #F8FAFC !important;
        }

        @keyframes slideUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer  { from{background-position:-300% center} to{background-position:300% center} }
        @keyframes pulse    { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes successPop { 0%{opacity:0;transform:scale(.9)} 60%{transform:scale(1.02)} 100%{opacity:1;transform:scale(1)} }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; scroll-behavior: smooth; }

        /* Dot-grid background */
        .ct-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-color: #F8FAFC;
          background-image: radial-gradient(circle, rgba(37,99,235,.055) 1px, transparent 1px);
          background-size: 26px 26px;
        }
        .ct-bg-glow {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
          background: radial-gradient(ellipse 70% 45% at 50% -5%, rgba(219,234,254,.75) 0%, transparent 70%);
        }

        /* ── Navbar ── */
        .ct-nav {
          position: sticky; top: 0; z-index: 100;
          background: #ffffff;
          border-bottom: 1px solid #E2E8F0;
          box-shadow: 0 1px 0 rgba(0,0,0,.05), 0 2px 8px rgba(0,0,0,.04);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(20px, 4vw, 56px);
          height: 64px;
        }
        .ct-nav-left { display: flex; align-items: center; gap: 0; }
        .ct-nav-right { display: flex; align-items: center; gap: 8px; }

        /* Brand */
        .ct-brand {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; margin-right: 32px;
        }
        .ct-brand-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
          border: 1px solid #BFDBFE;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 1px 4px rgba(37,99,235,.1);
        }
        .ct-brand-name {
          font-family: 'Geist', sans-serif; font-size: 1.05rem;
          font-weight: 700; letter-spacing: -.03em; color: #0F172A;
        }
        .ct-brand-accent {
          background: linear-gradient(90deg,#2563EB,#4F46E5,#7C3AED,#2563EB);
          background-size: 300% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 6s linear infinite;
        }

        /* Nav divider */
        .ct-nav-sep { width: 1px; height: 20px; background: #E2E8F0; margin: 0 6px; }

        /* Nav links */
        .ct-nav-link {
          font-size: .83rem; font-weight: 500; color: #64748B;
          text-decoration: none; padding: 6px 11px; border-radius: 7px;
          transition: all .18s ease; letter-spacing: -.01em; white-space: nowrap;
        }
        .ct-nav-link:hover { color: #0F172A; background: #F1F5F9; }
        .ct-nav-link.active { color: #2563EB; background: #EFF6FF; font-weight: 600; }

        /* Nav buttons */
        .ct-btn-outline {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 8px;
          font-size: .82rem; font-weight: 600; letter-spacing: -.01em;
          cursor: pointer; border: 1px solid #E2E8F0;
          background: white; color: #374151;
          transition: all .18s ease;
        }
        .ct-btn-outline:hover { background: #F8FAFC; border-color: #CBD5E1; color: #111827; }

        .ct-btn-solid {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 18px; border-radius: 8px;
          font-size: .82rem; font-weight: 600; letter-spacing: -.01em;
          cursor: pointer; border: 1px solid #2563EB;
          background: #2563EB; color: white;
          box-shadow: 0 1px 4px rgba(37,99,235,.22);
          transition: all .18s ease;
        }
        .ct-btn-solid:hover { background: #1D4ED8; border-color: #1D4ED8; box-shadow: 0 2px 10px rgba(37,99,235,.35); }

        /* ── Page wrapper ── */
        .ct-main {
          position: relative; z-index: 10;
          max-width: 1160px; margin: 0 auto; width: 100%;
          padding: clamp(36px, 5vw, 68px) clamp(20px, 4vw, 52px) 0;
          display: flex; flex-direction: column;
        }

        /* ── Header ── */
        .ct-header {
          margin-bottom: clamp(32px, 4vw, 56px);
          animation: slideUp .6s cubic-bezier(.16,1,.3,1) both;
        }
        .ct-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 999px;
          background: #EFF6FF; border: 1px solid #BFDBFE;
          color: #2563EB; font-size: .68rem; font-weight: 700;
          letter-spacing: .09em; text-transform: uppercase; margin-bottom: 18px;
        }
        .ct-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #2563EB; animation: pulse 2.5s ease-in-out infinite; }
        .ct-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 5.5vw, 3.8rem);
          font-weight: 400; letter-spacing: -.025em; line-height: 1.08;
          color: #0F172A; margin-bottom: 16px;
        }
        .ct-title-plain { color: #0F172A; }
        .ct-title-accent {
          background: linear-gradient(90deg, #2563EB, #7C3AED);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          font-style: italic;
        }
        .ct-subtitle { font-size: clamp(.88rem, 2vw, 1rem); color: #64748B; max-width: 480px; line-height: 1.75; }

        /* ── Grid ── */
        .ct-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: clamp(16px, 2.5vw, 28px);
          align-items: start;
          padding-bottom: clamp(40px, 5vw, 60px);
        }
        @media(max-width: 900px) { .ct-grid { grid-template-columns: 1fr; } }

        /* ── Card base ── */
        .ct-card {
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          overflow: hidden; position: relative;
          box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.04);
          transition: box-shadow .24s, transform .24s, border-color .24s;
        }
        .ct-card:hover {
          box-shadow: 0 4px 20px rgba(37,99,235,.09), 0 1px 3px rgba(0,0,0,.05);
          transform: translateY(-2px);
          border-color: #BFDBFE;
        }
        .ct-card-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #2563EB, #7C3AED);
          opacity: 0; transition: opacity .24s;
        }
        .ct-card:hover .ct-card-accent { opacity: 1; }

        /* Left column */
        .ct-left { display: flex; flex-direction: column; gap: 16px; }

        /* Brand card */
        .ct-brand-card {
          padding: 22px 24px;
          display: flex; align-items: center; gap: 14px;
          animation: cardIn .6s cubic-bezier(.16,1,.3,1) .1s both;
        }
        .ct-brand-card-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
          border: 1px solid #BFDBFE;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(37,99,235,.12); flex-shrink: 0;
        }
        .ct-brand-card-name { font-family: 'Geist', sans-serif; font-weight: 700; font-size: 1rem; letter-spacing: -.02em; color: #0F172A; }
        .ct-brand-card-tag { font-size: .7rem; color: #94A3B8; margin-top: 2px; }

        /* Info card */
        .ct-info-card {
          padding: clamp(20px, 3.5vw, 28px);
          animation: cardIn .6s cubic-bezier(.16,1,.3,1) .18s both;
        }
        .ct-info-title {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: 1.25rem; color: #0F172A; margin-bottom: 10px;
        }
        .ct-info-desc { font-size: .84rem; color: #64748B; line-height: 1.75; }
        .ct-divider { height: 1px; background: #F1F5F9; margin: 20px 0; }

        /* Contact items */
        .ct-item { display: flex; align-items: center; gap: 13px; padding: 10px 0; }
        .ct-item-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: transform .2s ease;
        }
        .ct-item:hover .ct-item-icon { transform: scale(1.08); }
        .ct-item-mail  { background: #EFF6FF; border: 1px solid #BFDBFE; color: #2563EB; }
        .ct-item-phone { background: #ECFEFF; border: 1px solid #A5F3FC; color: #0891B2; }
        .ct-item-label { font-size: .62rem; color: #94A3B8; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 2px; font-weight: 600; }
        .ct-item-val   { font-size: .84rem; color: #1E293B; font-weight: 500; }

        /* Social card */
        .ct-social-card {
          padding: 22px 24px;
          animation: cardIn .6s cubic-bezier(.16,1,.3,1) .26s both;
        }
        .ct-social-label { font-size: .65rem; color: #94A3B8; text-transform: uppercase; letter-spacing: .1em; font-weight: 600; margin-bottom: 14px; }
        .ct-social-row { display: flex; gap: 9px; }
        .ct-soc-btn {
          flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px;
          padding: 11px 6px; border-radius: 10px;
          border: 1px solid #F1F5F9; background: #F8FAFC;
          cursor: pointer; text-decoration: none;
          transition: all .2s cubic-bezier(.34,1.56,.64,1);
        }
        .ct-soc-btn:hover { transform: translateY(-3px); }
        .ct-soc-name { font-size: .6rem; color: #94A3B8; font-weight: 500; }

        /* ── Form card ── */
        .ct-form-card {
          padding: clamp(24px, 4vw, 36px);
          animation: cardIn .6s cubic-bezier(.16,1,.3,1) .12s both;
        }
        .ct-form-title {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: 1.45rem; color: #0F172A; margin-bottom: 6px;
        }
        .ct-form-sub { font-size: .84rem; color: #64748B; margin-bottom: 26px; line-height: 1.6; }

        /* Input row */
        .ct-input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media(max-width: 520px) { .ct-input-row { grid-template-columns: 1fr; } }

        /* Fields */
        .ct-field { margin-bottom: 16px; }
        .ct-label {
          display: block; font-size: .68rem; font-weight: 600;
          letter-spacing: .07em; text-transform: uppercase;
          color: #94A3B8; margin-bottom: 7px; transition: color .18s;
        }
        .ct-label.focused { color: #2563EB; }
        .ct-input {
          width: 100%;
          background: #F8FAFC; border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          padding: 11px 14px;
          font-family: 'Geist', system-ui, sans-serif;
          font-size: .88rem; color: #111827;
          outline: none; resize: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .ct-input::placeholder { color: #CBD5E1; }
        .ct-input:focus {
          border-color: #93C5FD; background: #ffffff;
          box-shadow: 0 0 0 3px rgba(37,99,235,.08);
        }
        textarea.ct-input { min-height: 130px; max-height: 220px; }

        /* Quick tags */
        .ct-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 20px; }
        .ct-tag {
          padding: 5px 13px; border-radius: 999px;
          border: 1px solid #E2E8F0; background: #F8FAFC;
          font-size: .72rem; font-weight: 500; color: #64748B;
          cursor: pointer; transition: all .18s ease;
        }
        .ct-tag:hover { border-color: #BFDBFE; color: #2563EB; background: #EFF6FF; }

        /* Send button */
        .ct-send {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #2563EB, #1D4ED8);
          border: none; border-radius: 10px; color: white;
          font-family: 'Geist', system-ui, sans-serif;
          font-size: .85rem; font-weight: 600; letter-spacing: .03em;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 14px rgba(37,99,235,.3);
          transition: all .22s cubic-bezier(.34,1.56,.64,1);
        }
        .ct-send:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(37,99,235,.42); }
        .ct-send:active { transform: translateY(0) scale(.99); }

        /* Success */
        .ct-success {
          margin-top: 14px; padding: 12px 16px; border-radius: 10px;
          background: #F0FDF4; border: 1px solid #BBF7D0; color: #16A34A;
          font-size: .82rem; font-weight: 500;
          display: flex; align-items: center; gap: 9px;
          animation: successPop .4s cubic-bezier(.34,1.56,.64,1) both;
        }

        /* Footer note */
        .ct-form-note {
          display: flex; align-items: center; gap: 8px;
          margin-top: 16px; padding-top: 16px; border-top: 1px solid #F1F5F9;
        }
        .ct-note-dot { width: 6px; height: 6px; border-radius: 50%; background: #22C55E; box-shadow: 0 0 0 2px rgba(34,197,94,.18); flex-shrink: 0; animation: pulse 2.5s ease-in-out infinite; }
        .ct-note-text { font-size: .72rem; color: #94A3B8; line-height: 1.5; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }

        @media(max-width: 400px) { .ct-nav { padding: 0 14px; } }
      `}</style>

      {/* Fixed white bg safety layer */}
      <div style={{ position: 'fixed', inset: 0, background: '#F8FAFC', zIndex: -2 }} />

      {/* Dot grid + glow */}
      <div className="ct-bg" />
      <div className="ct-bg-glow" />

      {/* ── Navbar ── */}
      <Navbar></Navbar>

      {/* ── Main ── */}
      <div className="ct-main">

        {/* Header */}
        <div className="ct-header">
          <div className="ct-badge">
            <span className="ct-badge-dot" />
            Get in Touch
          </div>
          <h1 className="ct-title">
            <span className="ct-title-plain">Contact </span>
            <span className="ct-title-accent">Us</span>
          </h1>
          <p className="ct-subtitle">We value every question and piece of feedback. Our team is always ready to help you.</p>
        </div>

        {/* Grid */}
        <div className="ct-grid">

          {/* ── Left column ── */}
          <div className="ct-left">

            {/* Brand card */}
            <div className="ct-card ct-brand-card">
              <div className="ct-card-accent" />
              <div className="ct-brand-card-icon"><BirdLogo size={26} /></div>
              <div>
                <div className="ct-brand-card-name">
                  futur<span style={{ background:'linear-gradient(90deg,#2563EB,#7C3AED)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>DooM</span>
                </div>
                <div className="ct-brand-card-tag">Intelligence × Community Platform</div>
              </div>
            </div>

            {/* Info card */}
            <div className="ct-card ct-info-card">
              <div className="ct-card-accent" />
              <div className="ct-info-title">Reach out anytime</div>
              <div className="ct-info-desc">We value your questions, feedback, and ideas. Don't hesitate to reach out — our dedicated team responds promptly.</div>

              <div className="ct-divider" />

              <div className="ct-item">
                <div className="ct-item-icon ct-item-mail"><MailIcon /></div>
                <div>
                  <div className="ct-item-label">Email</div>
                  <div className="ct-item-val">feedbackfuturdoom@gmail.com</div>
                </div>
              </div>

              <div className="ct-item">
                <div className="ct-item-icon ct-item-phone"><PhoneIcon /></div>
                <div>
                  <div className="ct-item-label">Phone</div>
                  <div className="ct-item-val">+91 89728 34354</div>
                </div>
              </div>
            </div>

            {/* Social card */}
            <div className="ct-card ct-social-card">
              <div className="ct-card-accent" />
              <div className="ct-social-label">Follow futurDooM</div>
              <div className="ct-social-row">
                {SOCIALS.map(s => (
                  <a key={s.label} href="#" className="ct-soc-btn"
                    style={{ color: s.color }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = s.bg; el.style.borderColor = `${s.color}30`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#F8FAFC'; el.style.borderColor = '#F1F5F9'; }}
                  >
                    {s.icon}
                    <span className="ct-soc-name">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── Form card ── */}
          <div className="ct-card ct-form-card">
            <div className="ct-card-accent" />

            <div className="ct-form-title">Send us a message</div>
            <div className="ct-form-sub">Any questions or feedback? We'll get back to you within 24 hours.</div>

            <div className="ct-input-row">
              <div className="ct-field">
                <label className={`ct-label${focused === 'name' ? ' focused' : ''}`}>Full Name</label>
                <input
                  className="ct-input"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div className="ct-field">
                <label className={`ct-label${focused === 'email' ? ' focused' : ''}`}>Email Address</label>
                <input
                  className="ct-input"
                  placeholder="your@email.com"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>

            <div className="ct-field">
              <label className={`ct-label${focused === 'msg' ? ' focused' : ''}`}>Message</label>
              <textarea
                className="ct-input"
                placeholder="Any suggestions, questions, or feedback…"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                onFocus={() => setFocused('msg')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Quick tags */}
            <div className="ct-tags">
              {TAGS.map(tag => (
                <button
                  key={tag}
                  className="ct-tag"
                  onClick={() => setForm(f => ({ ...f, message: f.message || tag }))}
                >
                  {tag}
                </button>
              ))}
            </div>

            <button className="ct-send" onClick={handleSend}>
              <SendIcon />
              Send Message
            </button>

            {sent && (
              <div className="ct-success">
                <CheckCircle />
                Message sent! We'll be in touch within 24 hours.
              </div>
            )}

            <div className="ct-form-note">
              <span className="ct-note-dot" />
              <span className="ct-note-text">We typically respond within 24 hours. All information is kept strictly confidential.</span>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}