'use client'
import Footer from '@/component/Footer'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)
const InfoIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
  </svg>
)
const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)
const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

export default function FuturDooMPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null)

  useEffect(() => {
    setMounted(true)
    const s = 'background:#F0F4FB!important;background-color:#F0F4FB!important'
    document.documentElement.style.cssText += ';' + s
    document.body.style.cssText += ';' + s
    return () => {
      document.documentElement.style.background = ''
      document.body.style.background = ''
    }
  }, [])

  const handleLetGo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() })
    setTimeout(() => setRipple(null), 650)
    router.push('/sharelogout')
  }

  if (!mounted) return null

  return (
    <div style={{ minHeight:'100vh', background:'#F0F4FB', fontFamily:"'DM Sans',system-ui,sans-serif", WebkitFontSmoothing:'antialiased', display:'flex', flexDirection:'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body,#__next{background:#F0F4FB!important}
        @keyframes lp-fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes lp-shimmer{from{background-position:-250% center}to{background-position:250% center}}
        @keyframes lp-ripple{from{transform:scale(0);opacity:.45}to{transform:scale(5);opacity:0}}
        @keyframes lp-orb{0%,100%{transform:translate(0,0)}50%{transform:translate(28px,-18px)}}
        @keyframes lp-orb2{0%,100%{transform:translate(0,0)}50%{transform:translate(-18px,22px)}}
        @keyframes lp-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .lp-shell{flex:1;display:flex;align-items:center;justify-content:center;padding:clamp(24px,5vw,60px) clamp(16px,4vw,32px);min-height:calc(100vh - 80px)}
        .lp-card{width:100%;max-width:480px;border-radius:24px;overflow:hidden;box-shadow:0 0 0 1px rgba(13,17,23,.07),0 20px 60px rgba(13,17,23,.12),0 4px 16px rgba(13,17,23,.07);animation:lp-fadeUp .65s cubic-bezier(.16,1,.3,1) both}
        @media(min-width:880px){.lp-card{max-width:920px;display:grid;grid-template-columns:1fr 1fr;border-radius:28px}}
        @media(min-width:1200px){.lp-card{max-width:1060px}}
        .lp-banner{position:relative;background:linear-gradient(148deg,#0F2D8A 0%,#1747C8 40%,#1A56DB 70%,#1347B8 100%);padding:clamp(36px,5vw,56px) clamp(32px,5vw,52px);overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;min-height:300px}
        @media(min-width:880px){.lp-banner{min-height:520px;padding:56px 52px}}
        .lp-banner-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.032) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.032) 1px,transparent 1px);background-size:40px 40px}
        .lp-banner-orb1{position:absolute;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.07) 0%,transparent 70%);top:-120px;right:-80px;animation:lp-orb 11s ease-in-out infinite}
        .lp-banner-orb2{position:absolute;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(147,197,253,.1) 0%,transparent 70%);bottom:-60px;left:-20px;animation:lp-orb2 15s ease-in-out infinite}
        .lp-banner-ring{display:none;position:absolute;bottom:52px;right:-52px;width:180px;height:180px;border-radius:50%;border:1px solid rgba(255,255,255,.1);animation:lp-float 9s ease-in-out infinite}
        .lp-banner-ring::after{content:'';position:absolute;inset:22px;border-radius:50%;border:1px solid rgba(255,255,255,.07)}
        @media(min-width:880px){.lp-banner-ring{display:block}}
        .lp-banner-content{position:relative;z-index:1}
        .lp-est{display:flex;align-items:center;gap:10px;margin-bottom:clamp(20px,3.5vw,32px)}
        .lp-est-line{width:24px;height:1.5px;background:rgba(255,255,255,.4);border-radius:2px;flex-shrink:0}
        .lp-est-text{font-size:.65rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.55)}
        .lp-brand-title{font-family:'Fraunces',serif;font-weight:300;font-size:clamp(2.8rem,7.5vw,4.2rem);letter-spacing:-.04em;line-height:.94;color:#fff;margin-bottom:clamp(16px,3vw,24px)}
        .lp-brand-title .doom{background:linear-gradient(90deg,#93C5FD,#C7D7FD,#A5B4FC,#93C5FD);background-size:220% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:lp-shimmer 5s linear infinite;font-style:italic;font-weight:400}
        .lp-banner-desc{font-size:clamp(.82rem,1.8vw,.94rem);color:rgba(255,255,255,.65);line-height:1.72;max-width:300px}
        .lp-banner-desc strong{color:rgba(255,255,255,.92);font-weight:600}
        .lp-banner-tagline{font-size:.73rem;color:rgba(255,255,255,.38);margin-top:clamp(10px,2vw,16px);position:relative;z-index:1}
        .lp-banner-tagline em{color:rgba(255,255,255,.65);font-style:italic;font-weight:500}
        .lp-stats{display:none;gap:20px;margin-top:clamp(32px,4vw,44px);position:relative;z-index:1}
        @media(min-width:880px){.lp-stats{display:flex}}
        .lp-stat-val{font-family:'Fraunces',serif;font-size:1.45rem;font-weight:400;color:#fff;letter-spacing:-.03em;line-height:1}
        .lp-stat-lbl{font-size:.62rem;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.13em;margin-top:4px;font-weight:500}
        .lp-stat-sep{width:1px;background:rgba(255,255,255,.1);align-self:stretch;margin:2px 0}
        .lp-body{background:#fff;padding:clamp(28px,5vw,44px) clamp(24px,5vw,44px);display:flex;flex-direction:column;justify-content:center}
        .lp-section-label{font-size:.62rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#1A56DB;text-align:center;margin-bottom:22px}
        .lp-cta-primary{position:relative;overflow:hidden;width:100%;display:flex;align-items:center;gap:0;padding:0;border-radius:14px;border:none;cursor:pointer;background:linear-gradient(110deg,#0F2D8A 0%,#1A56DB 55%,#1347B8 100%);box-shadow:0 6px 24px rgba(26,86,219,.34),0 1px 4px rgba(26,86,219,.2);transition:all .2s cubic-bezier(.34,1.56,.64,1);margin-bottom:12px;text-align:left}
        .lp-cta-primary:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(26,86,219,.44),0 2px 8px rgba(26,86,219,.24)}
        .lp-cta-primary:active{transform:translateY(0)}
        .lp-cta-icon{width:56px;min-width:56px;height:72px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.75);border-right:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.1)}
        .lp-cta-body{flex:1;padding:16px 18px}
        .lp-cta-label{font-size:1rem;font-weight:700;color:#fff;letter-spacing:-.02em;display:block;margin-bottom:3px}
        .lp-cta-hint{font-size:.72rem;color:rgba(255,255,255,.58);display:block}
        .lp-cta-arrow{width:52px;min-width:52px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.6);transition:transform .2s ease}
        .lp-cta-primary:hover .lp-cta-arrow{transform:translateX(4px);color:#fff}
        .lp-ripple{position:absolute;border-radius:50%;width:80px;height:80px;background:rgba(255,255,255,.22);transform:scale(0);animation:lp-ripple .65s ease-out forwards;pointer-events:none;margin-left:-40px;margin-top:-40px}
        .lp-sec-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .lp-sec-card{display:flex;align-items:center;justify-content:space-between;padding:15px 14px;border-radius:12px;border:1px solid #E4E7EC;background:#F7F8FA;cursor:pointer;transition:all .18s cubic-bezier(.34,1.56,.64,1);text-align:left;width:100%}
        .lp-sec-card:hover{border-color:#C3D7FD;background:#EBF2FF;transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,86,219,.1)}
        .lp-sec-left{display:flex;align-items:center;gap:10px}
        .lp-sec-icon{width:36px;height:36px;border-radius:9px;background:#fff;border:1px solid #E4E7EC;display:flex;align-items:center;justify-content:center;color:#7B8494;flex-shrink:0;transition:all .18s ease}
        .lp-sec-card:hover .lp-sec-icon{background:#EBF2FF;border-color:#C3D7FD;color:#1A56DB}
        .lp-sec-name{font-size:.84rem;font-weight:700;color:#0D1117;letter-spacing:-.02em}
        .lp-sec-sub{font-size:.68rem;color:#7B8494;margin-top:1px}
        .lp-sec-arrow{color:#CDD2DA;transition:all .18s ease}
        .lp-sec-card:hover .lp-sec-arrow{color:#1A56DB;transform:translateX(3px)}
        .lp-inner-foot{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:24px;flex-wrap:wrap}
        .lp-foot-link{font-size:.69rem;color:#7B8494;text-decoration:none;transition:color .15s}
        .lp-foot-link:hover{color:#1A56DB}
        .lp-foot-sep{color:#CDD2DA;font-size:.6rem}
        .lp-foot-copy{width:100%;text-align:center;margin-top:5px;font-size:.66rem;color:#CDD2DA}
        @media(max-width:380px){.lp-sec-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="lp-shell">
        <div className="lp-card">
          {/* Banner */}
          <div className="lp-banner">
            <div className="lp-banner-grid" />
            <div className="lp-banner-orb1" />
            <div className="lp-banner-orb2" />
            <div className="lp-banner-ring" />

            <div className="lp-banner-content">
              <div className="lp-est">
                <div className="lp-est-line" />
                <span className="lp-est-text">Est. 2026</span>
              </div>
              <div className="lp-brand-title">futur<span className="doom">DooM</span></div>
              <p className="lp-banner-desc">
                A new space where <strong>Intelligence</strong> meets <strong>Community</strong> — express, connect, and grow.
              </p>
              <p className="lp-banner-tagline">Enjoy a new experience with — <em>futurDooM</em></p>
            </div>

            <div className="lp-stats">
              <div><div className="lp-stat-val">12K+</div><div className="lp-stat-lbl">Members</div></div>
              <div className="lp-stat-sep" />
              <div><div className="lp-stat-val">98%</div><div className="lp-stat-lbl">Uptime</div></div>
              <div className="lp-stat-sep" />
              <div><div className="lp-stat-val">4.9</div><div className="lp-stat-lbl">Rating</div></div>
            </div>
          </div>

          {/* Body */}
          <div className="lp-body">
            <div className="lp-section-label">Get Started</div>

            <button className="lp-cta-primary" onClick={handleLetGo}>
              {ripple && <span className="lp-ripple" key={ripple.id} style={{ left: ripple.x, top: ripple.y }} />}
              <div className="lp-cta-icon"><ZapIcon /></div>
              <div className="lp-cta-body">
                <span className="lp-cta-label">Let's Go</span>
                <span className="lp-cta-hint">Start your journey</span>
              </div>
              <div className="lp-cta-arrow"><ArrowRight /></div>
            </button>

            <div className="lp-sec-grid">
              <button className="lp-sec-card" onClick={() => router.push('/aboutshow')}>
                <div className="lp-sec-left">
                  <div className="lp-sec-icon"><InfoIcon /></div>
                  <div><div className="lp-sec-name">About Us</div><div className="lp-sec-sub">Learn our story</div></div>
                </div>
                <div className="lp-sec-arrow"><ArrowRight /></div>
              </button>
              <button className="lp-sec-card" onClick={() => router.push('/contactshow')}>
                <div className="lp-sec-left">
                  <div className="lp-sec-icon"><MailIcon /></div>
                  <div><div className="lp-sec-name">Contact Us</div><div className="lp-sec-sub">Get in touch</div></div>
                </div>
                <div className="lp-sec-arrow"><ArrowRight /></div>
              </button>
            </div>

            <div className="lp-inner-foot">
              <a href="#" className="lp-foot-link">Terms</a><span className="lp-foot-sep">·</span>
              <a href="#" className="lp-foot-link">Privacy</a><span className="lp-foot-sep">·</span>
              <a href="#" className="lp-foot-link">Disclaimer</a>
            </div>
            <div className="lp-foot-copy">© 2026 futurdoom · All rights reserved</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}