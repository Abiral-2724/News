import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .fd-footer {
          position: relative;
          z-index: 2;
          background: #ffffff;
          border-top: 1px solid #E4E7EC;
        }

        .fd-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(32px, 4vw, 52px) clamp(20px, 5vw, 48px) clamp(20px, 3vw, 32px);
        }

        .fd-footer-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(24px, 4vw, 48px);
          margin-bottom: clamp(24px, 3vw, 36px);
          align-items: start;
        }

        @media (max-width: 580px) {
          .fd-footer-top { grid-template-columns: 1fr; }
        }

        .fd-footer-brand-name {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1rem, 2vw, 1.15rem);
          font-weight: 700;
          letter-spacing: -.03em;
          color: #0D1117;
          margin-bottom: 6px;
        }

        .fd-footer-brand-accent {
          background: linear-gradient(90deg, #1A56DB, #4338CA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .fd-footer-brand-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem;
          color: #7B8494;
          letter-spacing: .02em;
          font-weight: 400;
        }

        .fd-footer-links-row {
          display: flex;
          gap: clamp(28px, 5vw, 56px);
          flex-wrap: wrap;
        }

        .fd-footer-col-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #1A56DB;
          margin-bottom: 12px;
          display: block;
        }

        .fd-footer-col {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .fd-footer-link {
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          color: #3D4552;
          text-decoration: none;
          font-weight: 400;
          transition: color .16s ease;
          white-space: nowrap;
        }

        .fd-footer-link:hover { color: #1A56DB; }

        .fd-footer-divider {
          height: 1px;
          background: #E4E7EC;
          margin-bottom: clamp(16px, 2vw, 22px);
        }

        .fd-footer-bottom {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .fd-footer-copy {
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem;
          color: #7B8494;
          letter-spacing: .01em;
        }

        .fd-footer-status {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          border-radius: 999px;
          background: rgba(18, 161, 80, .06);
          border: 1px solid rgba(18, 161, 80, .2);
        }

        .fd-footer-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #12A150;
          box-shadow: 0 0 0 2px rgba(18,161,80,.2);
          animation: fd-dot-pulse 2.4s ease-in-out infinite;
        }

        .fd-footer-status-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .62rem;
          color: #12A150;
          font-weight: 600;
          letter-spacing: .07em;
          text-transform: uppercase;
        }

        @keyframes fd-dot-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>

      <footer className="fd-footer">
        <div className="fd-footer-inner">

          {/* Top row */}
          <div className="fd-footer-top">
            <div>
              <div className="fd-footer-brand-name">
                futur<span className="fd-footer-brand-accent">DooM</span>
              </div>
              <div className="fd-footer-brand-sub">Intelligence × Community</div>
            </div>

            <div className="fd-footer-links-row">
              <div className="fd-footer-col">
                <span className="fd-footer-col-label">Company</span>
                {['Disclaimer', 'Visit Us', 'Contact Us'].map(link => (
                  <a key={link} href="#" className="fd-footer-link">{link}</a>
                ))}
              </div>
              <div className="fd-footer-col">
                <span className="fd-footer-col-label">Legal</span>
                {['Privacy Policy', 'Terms & Conditions'].map(link => (
                  <a key={link} href="#" className="fd-footer-link">{link}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="fd-footer-divider" />

          {/* Bottom row */}
          <div className="fd-footer-bottom">
            <span className="fd-footer-copy">
              © 2026 futurDooM Platform, Inc. All rights reserved.
            </span>
            <div className="fd-footer-status">
              <div className="fd-footer-status-dot" />
              <span className="fd-footer-status-label">All Systems Operational</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer