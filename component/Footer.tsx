import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(56,130,246,.1)', padding: 'clamp(20px,4vw,32px) clamp(16px,5vw,40px)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Top row — brand + links */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'clamp(16px,3vw,24px)', marginBottom: 'clamp(16px,3vw,24px)' }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 140 }}>
          <span style={{ fontFamily: 'system-ui', fontWeight: 800, fontSize: 'clamp(.95rem,2vw,1.1rem)', letterSpacing: '-.02em' }}>
            <span style={{ color: 'rgba(226,232,248,.85)', fontWeight: 300 }}>futur</span>
            <span style={{ background: 'linear-gradient(90deg,#3882F6,#60A5FA,#22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DooM</span>
          </span>
          <span style={{ fontSize: '.65rem', color: 'rgba(148,163,184,.9)', letterSpacing: '.03em' }}>Intelligence × Community</span>
        </div>
        {/* Link groups */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,4vw,48px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(56,130,246,.9)', marginBottom: 2 }}>Company</span>
            {['Disclaimer', 'Visit Us', 'Contact Us'].map(link => (
              <a key={link} href="#" className="footer-link" style={{ fontSize: '.72rem', color: 'rgba(148,163,184,.9)' }}>{link}</a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(56,130,246,.9)', marginBottom: 2 }}>Legal</span>
            {['Privacy Policy', 'Terms & Conditions'].map(link => (
              <a key={link} href="#" className="footer-link" style={{ fontSize: '.72rem', color: 'rgba(148,163,184,.9)' }}>{link}</a>
            ))}
          </div>
        </div>
      </div>
      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(56,130,246,.15),transparent)', marginBottom: 'clamp(12px,2vw,18px)' }} />
      {/* Bottom row — copyright + status */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <span style={{ fontSize: '.65rem', color: 'rgba(148,163,184,.9)', letterSpacing: '.01em' }}>
          © 2026 futurDooM Platform, Inc. All rights reserved.
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'rgba(34,211,238,.06)', border: '1px solid rgba(34,211,238,.15)' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22D3EE', boxShadow: '0 0 6px #22D3EE', animation: 'dotPulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '.6rem', color: 'rgba(34,211,238,.85)', fontWeight: 600, letterSpacing: '.06em' }}>ALL SYSTEMS OPERATIONAL</span>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer