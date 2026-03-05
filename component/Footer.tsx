import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <>
      <style>{`
        .footer-link {
          text-decoration: none;
          transition: color .18s ease;
        }
        .footer-link:hover {
          color: #2563EB !important;
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #22C55E; }
          50%       { opacity: .5; box-shadow: 0 0 2px #22C55E; }
        }
      `}</style>

      <footer style={{
        position: 'relative',
        zIndex: 2,
        background: '#ffffff',
        borderTop: '1px solid #E2E8F0',
        padding: 'clamp(20px,4vw,32px) clamp(16px,5vw,40px)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Top row — brand + links */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'flex-start', justifyContent: 'space-between',
            gap: 'clamp(16px,3vw,24px)', marginBottom: 'clamp(16px,3vw,24px)'
          }}>

            {/* Brand */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 140 }}>
              <span style={{ fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 800, fontSize: 'clamp(.95rem,2vw,1.1rem)', letterSpacing: '-.02em' }}>
                <span style={{ color: 'black', fontWeight: 300 }}>futur</span>
                <span style={{ background: 'linear-gradient(90deg,#2563EB,#3B82F6,#6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DooM</span>
              </span>
              <span style={{ fontSize: '0.70rem', color: 'black', letterSpacing: '.03em' }}>Intelligence × Community</span>
            </div>

            {/* Link groups */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,4vw,48px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 2 }}>Company</span>
                {['Disclaimer', 'Visit Us', 'Contact Us'].map(link => (
                  <a key={link} href="#" className="footer-link" style={{ fontSize: '.72rem', color: '#64748B' }}>{link}</a>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 2 }}>Legal</span>
                {['Privacy Policy', 'Terms & Conditions'].map(link => (
                  <a key={link} href="#" className="footer-link" style={{ fontSize: '.72rem', color: '#64748B' }}>{link}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#E2E8F0', marginBottom: 'clamp(12px,2vw,18px)' }} />

          {/* Bottom row — copyright + status */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'space-between', gap: 10
          }}>
            <span style={{ fontSize: '.65rem', color: 'black', letterSpacing: '.01em' }}>
              © 2026 futurDooM Platform, Inc. All rights reserved.
            </span>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 999,
              background: 'rgba(34,197,94,.06)',
              border: '1px solid rgba(34,197,94,.2)'
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#22C55E',
                boxShadow: '0 0 6px #22C55E',
                animation: 'dotPulse 2s ease-in-out infinite'
              }} />
              <span style={{ fontSize: '.6rem', color: '#16A34A', fontWeight: 600, letterSpacing: '.06em' }}>
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer