'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

/* ── Bird Logo ── */
const BirdLogo = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 72 72" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nb1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB"/>
        <stop offset="50%" stopColor="#3B82F6"/>
        <stop offset="100%" stopColor="#6366F1"/>
      </linearGradient>
      <linearGradient id="nb2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA"/>
        <stop offset="100%" stopColor="#2563EB"/>
      </linearGradient>
    </defs>
    <path d="M16 30 Q28 10 48 18 Q40 26 26 27 Z" fill="url(#nb2)" opacity="0.9"/>
    <path d="M18 36 Q34 18 52 24 Q43 34 28 33 Z" fill="url(#nb1)" opacity="0.75"/>
    <ellipse cx="38" cy="40" rx="13" ry="8" fill="url(#nb1)" transform="rotate(-18 38 40)"/>
    <path d="M47 46 Q60 56 55 64 Q50 57 45 53 Z" fill="url(#nb2)" opacity="0.8"/>
    <circle cx="28" cy="32" r="7.5" fill="url(#nb1)"/>
    <circle cx="26" cy="30" r="2.2" fill="white" opacity="0.95"/>
    <circle cx="26.5" cy="30.5" r="1" fill="#1E3A8A"/>
    <path d="M23 33 Q15 32 11 34" stroke="url(#nb2)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

interface NavbarProps {
  active?: string
}

export default function Navbar({ active }: NavbarProps) {
  const router   = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string, label: string) => {
    if (active) return label === active
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  const handleGetStarted = () => {
    setMenuOpen(false)
    router.push('/')
  }

  const handleSignIn = () => {
    setMenuOpen(false)
    router.push('/')
  }

  return (
    <>
      <style>{`
        @keyframes nb-shimmer { from{background-position:-300% center} to{background-position:300% center} }
        @keyframes nb-slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Base nav ── */
        .nb-nav {
          position: sticky; top: 0; z-index: 100;
          background: #ffffff;
          border-bottom: 1px solid #E2E8F0;
          box-shadow: 0 1px 0 rgba(0,0,0,.05), 0 2px 8px rgba(0,0,0,.04);
        }

        .nb-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(16px, 4vw, 56px);
          height: 64px;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }

        .nb-left  { display: flex; align-items: center; }
        .nb-right { display: flex; align-items: center; gap: 8px; }

        /* ── Brand ── */
        .nb-brand {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; margin-right: 28px;
          flex-shrink: 0;
        }
        .nb-brand-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
          border: 1px solid #BFDBFE;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 1px 4px rgba(37,99,235,.1);
          flex-shrink: 0;
        }
        .nb-brand-name {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 1.05rem; font-weight: 700;
          letter-spacing: -.03em; color: #0F172A;
          white-space: nowrap;
        }
        .nb-brand-accent {
          background: linear-gradient(90deg, #2563EB, #4F46E5, #7C3AED, #2563EB);
          background-size: 300% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: nb-shimmer 6s linear infinite;
        }

        /* ── Separator ── */
        .nb-sep { width: 1px; height: 20px; background: #E2E8F0; margin: 0 4px; }

        /* ── Ghost button ── */
        .nb-btn-ghost {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 8px;
          font-family: 'Geist', system-ui, sans-serif;
          font-size: .82rem; font-weight: 600; letter-spacing: -.01em;
          cursor: pointer; border: 1px solid #E2E8F0;
          background: #fff; color: #374151;
          transition: all .18s ease;
          white-space: nowrap;
        }
        .nb-btn-ghost:hover { background: #F8FAFC; border-color: #CBD5E1; color: #111827; }

        /* ── Primary button ── */
        .nb-btn-primary {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 18px; border-radius: 8px;
          font-family: 'Geist', system-ui, sans-serif;
          font-size: .82rem; font-weight: 600; letter-spacing: -.01em;
          cursor: pointer; border: 1px solid #2563EB;
          background: #2563EB; color: #fff;
          box-shadow: 0 1px 4px rgba(37,99,235,.22);
          transition: all .18s ease;
          white-space: nowrap;
        }
        .nb-btn-primary:hover { background: #1D4ED8; border-color: #1D4ED8; box-shadow: 0 2px 10px rgba(37,99,235,.35); }

        /* ── Hamburger button ── */
        .nb-hamburger {
          display: none;
          align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 8px;
          background: none; border: 1px solid #E2E8F0;
          cursor: pointer; color: #374151;
          transition: all .18s ease;
          flex-shrink: 0;
        }
        .nb-hamburger:hover { background: #F1F5F9; border-color: #CBD5E1; }

        /* ── Mobile drawer ── */
        .nb-drawer {
          display: none;
          flex-direction: column;
          gap: 8px;
          padding: 16px clamp(16px, 4vw, 56px) 20px;
          border-top: 1px solid #E2E8F0;
          background: #fff;
          animation: nb-slide-down .2s ease;
        }
        .nb-drawer.open { display: flex; }

        .nb-drawer-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 11px 18px; border-radius: 10px;
          font-family: 'Geist', system-ui, sans-serif;
          font-size: .9rem; font-weight: 600; letter-spacing: -.01em;
          cursor: pointer; transition: all .18s ease;
        }
        .nb-drawer-btn.ghost {
          background: #F8FAFC; border: 1px solid #E2E8F0; color: #374151;
        }
        .nb-drawer-btn.ghost:hover { background: #F1F5F9; border-color: #CBD5E1; }
        .nb-drawer-btn.primary {
          background: #2563EB; border: 1px solid #2563EB; color: #fff;
          box-shadow: 0 1px 4px rgba(37,99,235,.22);
        }
        .nb-drawer-btn.primary:hover { background: #1D4ED8; }

        /* ── Responsive breakpoints ── */

        /* Tablet & small desktop: compress padding, smaller text */
        @media (max-width: 768px) {
          .nb-brand { margin-right: 0; }
          .nb-sep   { display: none; }
          .nb-right { display: none; }
          .nb-hamburger { display: flex; }
        }

        /* Large mobile: show hamburger, hide desktop buttons */
        @media (max-width: 480px) {
          .nb-brand-name { font-size: .95rem; }
          .nb-brand-icon { width: 32px; height: 32px; }
        }

        /* Very small phones */
        @media (max-width: 360px) {
          .nb-inner { padding: 0 14px; }
          .nb-brand-name { font-size: .85rem; }
          .nb-brand { gap: 8px; }
        }
      `}</style>

      <nav className="nb-nav">
        <div className="nb-inner">
          {/* Left: brand */}
          <div className="nb-left">
            <a href="/" className="nb-brand">
              <div className="nb-brand-icon">
                <BirdLogo size={22} />
              </div>
              <span className="nb-brand-name">
                futur<span className="nb-brand-accent">DooM</span>
              </span>
            </a>
            <div className="nb-sep" />
          </div>

          {/* Right: desktop action buttons */}
          <div className="nb-right">
            <button className="nb-btn-ghost" onClick={handleSignIn}>
              Sign In
            </button>
            <button className="nb-btn-primary" onClick={handleGetStarted}>
              Get Started <ArrowRight />
            </button>
          </div>

          {/* Hamburger: shown on mobile */}
          <button
            className="nb-hamburger"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`nb-drawer${menuOpen ? ' open' : ''}`}>
          <button className="nb-drawer-btn ghost" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="nb-drawer-btn primary" onClick={handleGetStarted}>
            Get Started <ArrowRight />
          </button>
        </div>
      </nav>
    </>
  )
}