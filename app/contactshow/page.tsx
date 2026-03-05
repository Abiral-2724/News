'use client'
import Footer from '@/component/Footer'
import { UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

/* ── Icons ── */
const BirdLogo = () => (
  <svg viewBox="0 0 72 72" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22D3EE"/>
        <stop offset="50%" stopColor="#3882F6"/>
        <stop offset="100%" stopColor="#818CF8"/>
      </linearGradient>
      <linearGradient id="cg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA"/>
        <stop offset="100%" stopColor="#22D3EE"/>
      </linearGradient>
    </defs>
    <path d="M16 30 Q28 10 48 18 Q40 26 26 27 Z" fill="url(#cg2)" opacity="0.9"/>
    <path d="M18 36 Q34 18 52 24 Q43 34 28 33 Z" fill="url(#cg1)" opacity="0.75"/>
    <ellipse cx="38" cy="40" rx="13" ry="8" fill="url(#cg1)" transform="rotate(-18 38 40)"/>
    <path d="M47 46 Q60 56 55 64 Q50 57 45 53 Z" fill="url(#cg2)" opacity="0.8"/>
    <circle cx="28" cy="32" r="7.5" fill="url(#cg1)"/>
    <circle cx="26" cy="30" r="2.2" fill="white" opacity="0.95"/>
    <circle cx="26.5" cy="30.5" r="1" fill="#0A1628"/>
    <path d="M23 33 Q15 32 11 34" stroke="url(#cg2)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.95-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13"/>
    <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

/* Social icons */
const FBIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const IGIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)
const TWIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
)
const LIIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i, x: (i * 17.3) % 100, y: (i * 13.7) % 100,
  size: (i % 3) * 0.7 + 0.5, delay: (i % 4) * 1.1, dur: (i % 3) * 1.5 + 2.5,
}))

const SOCIALS = [
  { icon: <FBIcon />, label: 'Facebook',  color: '#1877F2', bg: 'rgba(24,119,242,.12)' },
  { icon: <IGIcon />, label: 'Instagram', color: '#E1306C', bg: 'rgba(225,48,108,.12)' },
  { icon: <TWIcon />, label: 'Twitter',   color: '#1DA1F2', bg: 'rgba(29,161,242,.12)' },
  { icon: <LIIcon />, label: 'LinkedIn',  color: '#0A66C2', bg: 'rgba(10,102,194,.12)' },
]

export default function ContactPage() {
    const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [mouse, setMouse] = useState({ x: -100, y: -100 })
  const [ring, setRing]   = useState({ x: -100, y: -100 })
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

  const handleSend = () => {
    if (!form.name || !form.email) return
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  if (!mounted) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

        @keyframes aurora { 0%,100%{transform:translate(0,0)scale(1);opacity:.6} 25%{transform:translate(35px,-25px)scale(1.07);opacity:.8} 50%{transform:translate(-18px,18px)scale(.95);opacity:.5} 75%{transform:translate(25px,12px)scale(1.04);opacity:.7} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes starTwinkle { 0%,100%{opacity:.06} 50%{opacity:.5} }
        @keyframes slideUp { 0%{opacity:0;transform:translateY(22px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { 0%{opacity:0} 100%{opacity:1} }
        @keyframes shimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes dotPulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes ringRotate { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes ringRotateReverse { from{transform:rotate(0)} to{transform:rotate(-360deg)} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(56,130,246,.3),0 0 20px rgba(56,130,246,.2)} 50%{box-shadow:0 0 0 6px rgba(56,130,246,0),0 0 36px rgba(56,130,246,.4)} }
        @keyframes successPop { 0%{opacity:0;transform:scale(.8)} 60%{transform:scale(1.05)} 100%{opacity:1;transform:scale(1)} }
        @keyframes borderFlow { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { overflow-x:hidden; scroll-behavior:smooth; }
        body {
          background: #05070F;
          min-height: 100vh;
          color: #E2E8F8;
          -webkit-font-smoothing: antialiased;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        /* Cursor */
        @media (hover:hover) and (pointer:fine) {
          body { cursor:none; }
          .c-dot { position:fixed;z-index:9999;width:6px;height:6px;border-radius:50%;background:#3882F6;pointer-events:none;box-shadow:0 0 10px #3882F6;transform:translate(-50%,-50%); }
          .c-ring { position:fixed;z-index:9998;width:26px;height:26px;border-radius:50%;border:1.5px solid rgba(56,130,246,.45);pointer-events:none;transform:translate(-50%,-50%);transition:width .3s,height .3s; }
        }
        @media (max-width:768px) { .c-dot,.c-ring{display:none!important} body{cursor:auto!important} }

        /* Background */
        .page-bg { position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none; }
        .au1 { position:absolute;border-radius:50%;width:min(60vw,560px);height:min(60vw,560px);top:-15%;left:-10%;background:radial-gradient(circle,rgba(56,130,246,.2) 0%,transparent 65%);animation:aurora 18s ease-in-out infinite;filter:blur(40px); }
        .au2 { position:absolute;border-radius:50%;width:min(50vw,480px);height:min(50vw,480px);bottom:-10%;right:-8%;background:radial-gradient(circle,rgba(34,211,238,.14) 0%,transparent 65%);animation:aurora 22s ease-in-out infinite reverse;animation-delay:-8s;filter:blur(50px); }
        .au3 { position:absolute;border-radius:50%;width:min(40vw,400px);height:min(40vw,400px);top:40%;left:40%;transform:translateX(-50%);background:radial-gradient(circle,rgba(129,140,248,.11) 0%,transparent 65%);animation:aurora 26s ease-in-out infinite;animation-delay:-14s;filter:blur(55px); }
        .grid-ov { position:absolute;inset:0;background-image:linear-gradient(rgba(56,130,246,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(56,130,246,.035) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%); }
        .star { position:absolute;border-radius:50%;background:white; }

        /* Navbar */
        .navbar {
          position:sticky;top:0;z-index:50;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 clamp(16px,4vw,40px);
          height:clamp(52px,8vw,64px);
          background:rgba(5,7,15,.75);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(56,130,246,.12);
        }
        .nav-brand { display:flex;align-items:center;gap:10px;text-decoration:none; }
        .nav-brand-text { font-family:'Syne',sans-serif;font-size:clamp(1.1rem,3vw,1.35rem);font-weight:800;letter-spacing:-.02em; }
        .nav-brand-futur { color:rgba(226,232,248,.75);font-weight:700; }
        .nav-brand-doom { background:linear-gradient(90deg,#3882F6,#60A5FA,#22D3EE,#818CF8,#3882F6);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 5s linear infinite; }
        .nav-actions { display:flex;gap:10px;align-items:center; }
        .nav-icon-btn { width:38px;height:38px;border-radius:50%;border:1px solid rgba(56,130,246,.2);background:rgba(13,21,38,.7);color:rgba(100,116,139,.8);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s ease; }
        .nav-icon-btn:hover { border-color:rgba(56,130,246,.5);color:#3882F6;background:rgba(56,130,246,.1); }

        /* Layout */
        .main-layout {
          position:relative;z-index:10;
          min-height:calc(100vh - 64px);
          display:flex;flex-direction:column;
          padding:clamp(24px,5vw,56px) clamp(16px,5vw,40px) 0;
          max-width:1100px;margin:0 auto;width:100%;
        }

        /* Page header */
        .page-header { margin-bottom:clamp(24px,4vw,48px);animation:slideUp .7s cubic-bezier(.16,1,.3,1) .1s both; }
        .page-badge { display:inline-flex;align-items:center;gap:7px;padding:4px 14px;border-radius:999px;background:rgba(56,130,246,.08);border:1px solid rgba(56,130,246,.2);color:rgba(99,179,237,.85);font-size:.68rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px; }
        .page-title { font-family:'Syne',sans-serif;font-size:clamp(2rem,6vw,3.5rem);font-weight:800;letter-spacing:-.03em;line-height:1.05;margin-bottom:10px; }
        .page-title-light { color:rgba(226,232,248,.55);font-weight:700; }
        .page-title-accent { background:linear-gradient(90deg,#60A5FA,#22D3EE);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .page-sub { font-size:clamp(.8rem,2vw,.95rem);color:rgba(100,116,139,.75);max-width:420px;line-height:1.65;font-weight:300; }

        /* Content grid */
        .contact-grid {
          display:grid;
          grid-template-columns:1fr 1.45fr;
          gap:clamp(16px,3vw,28px);
          flex:1;
        }
        @media (max-width:720px) { .contact-grid{grid-template-columns:1fr;} }

        /* Glass card base */
        .glass-card {
          background:linear-gradient(145deg,rgba(13,21,38,.92) 0%,rgba(11,18,34,.96) 100%);
          backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
          border:1px solid rgba(56,130,246,.14);
          border-radius:18px;
          position:relative;overflow:hidden;
          transition:border-color .3s ease,box-shadow .3s ease;
        }
        .glass-card::before { content:'';position:absolute;top:0;left:20%;right:20%;height:1px;background:linear-gradient(90deg,transparent,rgba(99,179,237,.4),transparent); }
        .glass-card:hover { border-color:rgba(56,130,246,.28);box-shadow:0 0 40px rgba(56,130,246,.07); }

        /* Left column */
        .left-col { display:flex;flex-direction:column;gap:clamp(14px,2.5vw,20px); }

        /* Info card */
        .info-card { padding:clamp(20px,4vw,32px); }
        .info-title { font-family:'Syne',sans-serif;font-size:clamp(1.1rem,3vw,1.35rem);font-weight:800;letter-spacing:-.02em;margin-bottom:10px;background:linear-gradient(90deg,#60A5FA,#22D3EE);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .info-desc { font-size:clamp(.78rem,2vw,.875rem);color:rgba(100,116,139,.75);line-height:1.7;font-weight:300; }

        /* Divider */
        .card-divider { height:1px;background:linear-gradient(90deg,transparent,rgba(56,130,246,.18),transparent);margin:clamp(14px,3vw,20px) 0; }

        /* Contact items */
        .contact-item { display:flex;align-items:center;gap:12px;padding:10px 0; }
        .contact-icon { width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .25s ease; }
        .contact-icon-mail { background:rgba(56,130,246,.12);border:1px solid rgba(56,130,246,.2);color:#3882F6; }
        .contact-icon-phone { background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.2);color:#22D3EE; }
        .contact-item:hover .contact-icon { transform:scale(1.08); }
        .contact-text-label { font-size:.62rem;color:rgba(100,116,139,.55);text-transform:uppercase;letter-spacing:.08em;margin-bottom:2px; }
        .contact-text-val { font-size:clamp(.78rem,2vw,.85rem);color:rgba(226,232,248,.85);font-weight:500; }

        /* Social card */
        .social-card { padding:clamp(18px,3vw,26px); }
        .social-label { font-size:.68rem;color:rgba(100,116,139,.55);text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px; }
        .social-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:10px; }
        .social-btn { display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 6px;border-radius:12px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.03);cursor:pointer;transition:all .25s cubic-bezier(.34,1.56,.64,1);text-decoration:none; }
        .social-btn:hover { transform:translateY(-4px);border-color:rgba(255,255,255,.14); }
        .social-btn-label { font-size:.6rem;color:rgba(100,116,139,.6);letter-spacing:.04em; }

        /* Logo card */
        .logo-card { padding:clamp(18px,3vw,24px);display:flex;align-items:center;gap:14px; }
        .logo-ring-wrap { position:relative;width:56px;height:56px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
        .logo-ring-o { position:absolute;inset:0;border-radius:50%;border:1.5px dashed rgba(56,130,246,.28);animation:ringRotate 18s linear infinite; }
        .logo-ring-i { position:absolute;inset:9px;border-radius:50%;border:1px solid rgba(34,211,238,.18);animation:ringRotateReverse 12s linear infinite; }
        .logo-core { width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#0f1e3c,#0a1628);border:1px solid rgba(56,130,246,.28);display:flex;align-items:center;justify-content:center;animation:pulseGlow 3.5s ease-in-out infinite;position:relative;z-index:1; }
        .logo-brand-text { font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(.95rem,2.5vw,1.1rem);letter-spacing:-.02em; }

        /* Form card */
        .form-card { padding:clamp(22px,4vw,36px); }
        .form-header { margin-bottom:clamp(18px,3vw,28px); }
        .form-title { font-family:'Syne',sans-serif;font-size:clamp(.95rem,2.5vw,1.1rem);font-weight:800;letter-spacing:-.01em;color:rgba(226,232,248,.9);margin-bottom:6px; }
        .form-sub { font-size:clamp(.72rem,1.8vw,.8rem);color:rgba(100,116,139,.65);line-height:1.5; }

        /* Inputs */
        .field-wrap { position:relative;margin-bottom:clamp(12px,2.5vw,16px); }
        .field-label { display:block;font-size:.65rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(100,116,139,.6);margin-bottom:7px;transition:color .2s ease; }
        .field-label.focused { color:#3882F6; }
        .field-input {
          width:100%;background:rgba(5,10,20,.6);
          border:1px solid rgba(56,130,246,.14);
          border-radius:10px;
          padding:clamp(10px,2vw,13px) clamp(12px,2.5vw,16px);
          font-family:'DM Sans',system-ui,sans-serif;
          font-size:clamp(.8rem,2vw,.875rem);color:#E2E8F8;
          outline:none;transition:border-color .25s ease,box-shadow .25s ease,background .25s ease;
          resize:none;
        }
        .field-input::placeholder { color:rgba(100,116,139,.4); }
        .field-input:focus { border-color:rgba(56,130,246,.5);background:rgba(13,21,38,.8);box-shadow:0 0 0 3px rgba(56,130,246,.08),0 0 20px rgba(56,130,246,.08); }
        textarea.field-input { min-height:clamp(90px,15vw,130px);max-height:200px; }

        /* Input row */
        .input-row { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
        @media (max-width:480px) { .input-row{grid-template-columns:1fr;} }

        /* Send button */
        .send-btn {
          width:100%;padding:clamp(12px,2.5vw,14px);
          background:linear-gradient(135deg,#3882F6 0%,#1d4ed8 100%);
          box-shadow:0 6px 22px rgba(56,130,246,.38),0 0 0 1px rgba(56,130,246,.28);
          border:none;border-radius:10px;
          color:white;font-family:'DM Sans',system-ui,sans-serif;
          font-size:clamp(.78rem,2vw,.85rem);font-weight:600;letter-spacing:.06em;text-transform:uppercase;
          cursor:pointer;
          display:flex;align-items:center;justify-content:center;gap:8px;
          transition:all .3s cubic-bezier(.34,1.56,.64,1);
          margin-top:clamp(4px,1vw,8px);
        }
        .send-btn:hover { transform:translateY(-2px) scale(1.01);box-shadow:0 12px 32px rgba(56,130,246,.52),0 0 0 1px rgba(99,179,237,.45); }
        .send-btn:active { transform:translateY(0) scale(.99); }

        /* Success state */
        .success-banner { animation:successPop .45s cubic-bezier(.34,1.56,.64,1) both;display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:10px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);color:rgba(134,239,172,.9);font-size:.82rem;font-weight:500;margin-top:12px; }

        /* Corner dots */
        .cdot { position:absolute;width:5px;height:5px;border-radius:50%; }
        .cdot-tl { top:12px;left:12px;background:#3882F6;box-shadow:0 0 7px #3882F6; }
        .cdot-tr { top:12px;right:12px;background:#22D3EE;box-shadow:0 0 7px #22D3EE; }

        /* Footer */
        .footer { position:relative;z-index:10;border-top:1px solid rgba(56,130,246,.1);padding:clamp(14px,3vw,20px) clamp(16px,5vw,40px);margin-top:clamp(24px,4vw,40px); }
        .footer-inner { max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px; }
        .footer-link { color:rgba(100,116,139,.55);font-size:.72rem;text-decoration:none;letter-spacing:.01em;white-space:nowrap;transition:color .2s ease; }
        .footer-link:hover { color:#3882F6; }

        /* Anim helpers */
        .a-up { animation:slideUp .75s cubic-bezier(.16,1,.3,1) both; }
        .d1{animation-delay:.15s} .d2{animation-delay:.25s} .d3{animation-delay:.35s} .d4{animation-delay:.45s} .d5{animation-delay:.55s}
        .nav-icon-btn{position:relative}
.nav-icon-btn .tooltip{position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);background:rgba(13,21,38,.95);border:1px solid rgba(56,130,246,.2);color:rgba(226,232,248,.8);font-size:.6rem;font-weight:600;letter-spacing:.05em;padding:3px 8px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s ease;z-index:999999}
.nav-icon-btn:hover .tooltip{opacity:1}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#05070F} ::-webkit-scrollbar-thumb{background:rgba(56,130,246,.25);border-radius:3px}
      `}</style>

      {/* Cursor */}
      <div className="c-dot" style={{ left: mouse.x, top: mouse.y }} />
      <div className="c-ring" style={{ left: ring.x, top: ring.y }} />

      {/* Background */}
      <div className="page-bg">
        <div className="au1" /><div className="au2" /><div className="au3" />
        <div className="grid-ov" />
        {STARS.map(s => (
          <div key={s.id} className="star" style={{
            left:`${s.x}%`, top:`${s.y}%`, width:s.size, height:s.size, opacity:.12,
            animation:`starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }} />
        ))}
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="nav-brand" style={{ textDecoration: 'none' }}>
          <BirdLogo />
          <span className="nav-brand-text">
            <span className="nav-brand-futur">futur</span>
            <span className="nav-brand-doom">DooM</span>
          </span>
        </a>
        <div style={{ display:'flex', gap:9, alignItems:'center' }}>
  <button className="nav-icon-btn" aria-label="Login">
    <UserRound className='h-6 w-6'/>
    <span className="tooltip">Login</span>
  </button>
  <button className="nav-icon-btn" onClick={() => router.push('/')} aria-label="Close">
    <ArrowRightIcon />
    <span className="tooltip">Close</span>
  </button>
</div>
      </nav>

      {/* Main */}
      <div className="main-layout">

        {/* Page header */}
        <div className="page-header">
          <div className="page-badge">
            <span style={{ display:'inline-block', width:5, height:5, borderRadius:'50%', background:'#22D3EE', boxShadow:'0 0 7px #22D3EE', animation:'dotPulse 2s ease-in-out infinite' }} />
            Get in Touch
          </div>
          <h1 className="page-title">
            <span className="page-title-light">Contact </span>
            <span className="page-title-accent">Us</span>
          </h1>
          <p className="page-sub">We value your questions and feedback. Our dedicated team is always here to help you.</p>
        </div>

        {/* Grid */}
        <div className="contact-grid">

          {/* ── Left column ── */}
          <div className="left-col">

            {/* Logo card */}
            <div className="glass-card logo-card a-up d1">
              <div className="cdot cdot-tl" />
              <div className="logo-ring-wrap">
                <div className="logo-ring-o" />
                <div className="logo-ring-i" />
                <div className="logo-core"><BirdLogo /></div>
              </div>
              <div>
                <div className="logo-brand-text">
                  <span style={{ color:'rgba(226,232,248,.7)', fontWeight:700 }}>futur</span>
                  <span style={{ background:'linear-gradient(90deg,#60A5FA,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>DooM</span>
                </div>
                <div style={{ fontSize:'.72rem', color:'rgba(100,116,139,.55)', marginTop:3, fontWeight:300 }}>Intelligence × Community Platform</div>
              </div>
            </div>

            {/* Info card */}
            <div className="glass-card info-card a-up d2" style={{ flex: 1 }}>
              <div className="cdot cdot-tl" /><div className="cdot cdot-tr" />
              <div className="info-title">Contact Us</div>
              <div className="info-desc">We value your questions, feedback, and comments and are always here to help. Please don't hesitate to reach out to our dedicated support team.</div>
              <div className="card-divider" />
              <div className="contact-item">
                <div className="contact-icon contact-icon-mail"><MailIcon /></div>
                <div>
                  <div className="contact-text-label">Email</div>
                  <div className="contact-text-val">feedbackfuturdoom@gmail.com</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon contact-icon-phone"><PhoneIcon /></div>
                <div>
                  <div className="contact-text-label">Phone</div>
                  <div className="contact-text-val">+91 8972834354</div>
                </div>
              </div>
            </div>

            {/* Social card */}
            <div className="glass-card social-card a-up d3">
              <div className="social-label">Follow us</div>
              <div className="social-grid">
                {SOCIALS.map(s => (
                  <a key={s.label} href="#" className="social-btn" style={{ color: s.color }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = s.bg; (e.currentTarget as HTMLElement).style.borderColor = `${s.color}40`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.06)'; }}
                  >
                    {s.icon}
                    <span className="social-btn-label">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column: Form ── */}
          <div className="glass-card form-card a-up d2" style={{ alignSelf: 'start' }}>
            <div className="cdot cdot-tl" /><div className="cdot cdot-tr" />
            <div className="form-header">
              <div className="form-title">Send us a message</div>
              <div className="form-sub">Any questions or remarks? We'll get back to you within 24 hours.</div>
            </div>

            <div className="input-row">
              <div className="field-wrap">
                <label className={`field-label ${focused === 'name' ? 'focused' : ''}`}>Name</label>
                <input
                  className="field-input"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div className="field-wrap">
                <label className={`field-label ${focused === 'email' ? 'focused' : ''}`}>Email</label>
                <input
                  className="field-input"
                  placeholder="your@email.com"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>

            <div className="field-wrap">
              <label className={`field-label ${focused === 'msg' ? 'focused' : ''}`}>Message</label>
              <textarea
                className="field-input"
                placeholder="Any suggestions, questions, or feedback…"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                onFocus={() => setFocused('msg')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Quick suggestions */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:16 }}>
              {['General Inquiry', 'Bug Report', 'Feature Request', 'Partnership'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setForm(f => ({ ...f, message: f.message ? f.message : tag }))}
                  style={{
                    padding:'5px 12px', borderRadius:999, border:'1px solid rgba(56,130,246,.18)',
                    background:'rgba(56,130,246,.06)', color:'rgba(100,116,139,.75)',
                    fontSize:'.68rem', fontWeight:500, cursor:'pointer', letterSpacing:'.03em',
                    transition:'all .2s ease',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor='rgba(56,130,246,.4)'; el.style.color='#60A5FA'; el.style.background='rgba(56,130,246,.12)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor='rgba(56,130,246,.18)'; el.style.color='rgba(100,116,139,.75)'; el.style.background='rgba(56,130,246,.06)'; }}
                >
                  {tag}
                </button>
              ))}
            </div>

            <button className="send-btn" onClick={handleSend}>
              <SendIcon />
              Send Message
            </button>

            {sent && (
              <div className="success-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                Message sent! We'll be in touch soon.
              </div>
            )}

            {/* Bottom note */}
            <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#22D3EE', boxShadow:'0 0 6px #22D3EE', animation:'dotPulse 2s ease-in-out infinite', flexShrink:0 }} />
              <span style={{ fontSize:'.68rem', color:'rgba(100,116,139,.5)', lineHeight:1.5 }}>We typically respond within 24 hours. All information is kept confidential.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer></Footer>
    </>
  )
}