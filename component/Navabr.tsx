'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

/* ── Logomark ── */
const FDMark = () => (
  <svg viewBox="0 0 32 32" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="url(#fdg)"/>
    <defs>
      <linearGradient id="fdg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1A56DB"/><stop offset="1" stopColor="#4338CA"/>
      </linearGradient>
    </defs>
    <path d="M9 10h9M9 16h6M9 22h8" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="22" cy="10" r="2" fill="white" opacity=".7"/>
  </svg>
)

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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

  const handleGetStarted = () => { setMenuOpen(false); router.push('/') }
  const handleSignIn     = () => { setMenuOpen(false); router.push('/') }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes nb-fade-down {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nb2-nav {
          position: sticky;
          top: 0;
          z-index: 200;
          background: rgba(255,255,255,.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid #E4E7EC;
          box-shadow: 0 1px 0 rgba(13,17,23,.04), 0 2px 10px rgba(13,17,23,.04);
        }

        .nb2-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(16px, 4vw, 48px);
        }

        .nb2-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nb2-brand-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .nb2-brand-name {
          font-family: 'DM Sans', sans-serif;
          font-size: .98rem;
          font-weight: 700;
          letter-spacing: -.035em;
          color: #0D1117;
        }

        .nb2-brand-doom {
          background: linear-gradient(90deg, #1A56DB, #4338CA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nb2-divider {
          width: 1px;
          height: 18px;
          background: #E4E7EC;
          margin: 0 6px;
          flex-shrink: 0;
        }

        .nb2-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nb2-btn-ghost {
          font-family: 'DM Sans', sans-serif;
          font-size: .8rem;
          font-weight: 600;
          letter-spacing: -.01em;
          color: #3D4552;
          padding: 7px 14px;
          border-radius: 7px;
          border: 1px solid #E4E7EC;
          background: #ffffff;
          cursor: pointer;
          transition: all .16s ease;
          white-space: nowrap;
        }
        .nb2-btn-ghost:hover {
          background: #F7F8FA;
          border-color: #CDD2DA;
          color: #0D1117;
        }

        .nb2-btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: .8rem;
          font-weight: 600;
          letter-spacing: -.01em;
          color: #ffffff;
          padding: 7px 16px;
          border-radius: 7px;
          border: 1px solid #1A56DB;
          background: #1A56DB;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all .16s ease;
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(26,86,219,.28), 0 0 0 0 rgba(26,86,219,0);
        }
        .nb2-btn-primary:hover {
          background: #1347B8;
          border-color: #1347B8;
          box-shadow: 0 3px 12px rgba(26,86,219,.36);
          transform: translateY(-1px);
        }

        .nb2-hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 7px;
          border: 1px solid #E4E7EC;
          background: #ffffff;
          cursor: pointer;
          color: #3D4552;
          transition: all .16s ease;
          flex-shrink: 0;
        }
        .nb2-hamburger:hover {
          background: #F7F8FA;
          border-color: #CDD2DA;
          color: #0D1117;
        }

        .nb2-drawer {
          display: none;
          flex-direction: column;
          gap: 8px;
          padding: 14px clamp(16px, 4vw, 48px) 18px;
          border-top: 1px solid #E4E7EC;
          background: #ffffff;
          animation: nb-fade-down .2s ease both;
        }
        .nb2-drawer.open { display: flex; }

        .nb2-drawer-btn {
          width: 100%;
          padding: 11px;
          border-radius: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all .16s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .nb2-drawer-btn.ghost {
          background: #F7F8FA;
          border: 1px solid #E4E7EC;
          color: #3D4552;
        }
        .nb2-drawer-btn.ghost:hover { background: #ECEEF2; }
        .nb2-drawer-btn.primary {
          background: #1A56DB;
          border: 1px solid #1A56DB;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(26,86,219,.28);
        }
        .nb2-drawer-btn.primary:hover { background: #1347B8; }

        @media (max-width: 640px) {
          .nb2-actions { display: none; }
          .nb2-divider { display: none; }
          .nb2-hamburger { display: flex; }
        }

        @media (max-width: 400px) {
          .nb2-inner { padding: 0 14px; }
        }
      `}</style>

      <nav className="nb2-nav">
        <div className="nb2-inner">
          {/* Brand */}
          <a href="/" className="nb2-brand">
            <div className="nb2-brand-icon">
              <FDMark />
            </div>
            <span className="nb2-brand-name">
              futur<span className="nb2-brand-doom">DooM</span>
            </span>
          </a>

          <div className="nb2-divider" />

          {/* Desktop actions */}
          <div className="nb2-actions">
            <button className="nb2-btn-ghost" onClick={handleSignIn}>
              Sign In
            </button>
            <button className="nb2-btn-primary" onClick={handleGetStarted}>
              Get Started <ChevronRight />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nb2-hamburger"
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`nb2-drawer${menuOpen ? ' open' : ''}`}>
          <button className="nb2-drawer-btn ghost" onClick={handleSignIn}>Sign In</button>
          <button className="nb2-drawer-btn primary" onClick={handleGetStarted}>Get Started</button>
        </div>
      </nav>
    </>
  )
}