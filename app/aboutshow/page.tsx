'use client'
import Footer from '@/component/Footer'
import Navbar from '@/component/Navabr'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
)
const FBIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const IGIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
const TWIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
const LIIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
const CheckIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
const QuoteIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
const StarIcon = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>

const SOCIALS = [
  { icon: <FBIcon />, label: 'Facebook', color: '#1877F2', bg: 'rgba(24,119,242,.08)' },
  { icon: <IGIcon />, label: 'Instagram', color: '#E1306C', bg: 'rgba(225,48,108,.08)' },
  { icon: <TWIcon />, label: 'Twitter', color: '#1DA1F2', bg: 'rgba(29,161,242,.08)' },
  { icon: <LIIcon />, label: 'LinkedIn', color: '#0A66C2', bg: 'rgba(10,102,194,.08)' },
]

const TRAITS = [
  { label: 'Emotion-Driven Conversations', color: '#1A56DB', bg: '#EBF2FF', border: '#C3D7FD' },
  { label: 'AI-Powered Intelligence',      color: '#0891B2', bg: '#ECFEFF', border: '#A5F3FC' },
  { label: 'Community-First Platform',     color: '#4338CA', bg: '#EEF2FF', border: '#C7D2FE' },
]

export default function AboutPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.documentElement.style.cssText += ';background:#F7F8FA!important'
    document.body.style.cssText += ';background:#F7F8FA!important'
    return () => {
      document.documentElement.style.background = ''
      document.body.style.background = ''
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        html,body,#__next{background:#F7F8FA!important}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        @keyframes ab-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ab-card{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ab-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes ab-dot{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.45)}}

        .ab-page{background:#F7F8FA;min-height:100vh;color:#0D1117;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased}

        /* Background */
        .ab-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(circle,rgba(26,86,219,.05) 1px,transparent 1px);background-size:30px 30px}
        .ab-bg-glow{position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse 75% 50% at 50% -5%,rgba(219,234,254,.6) 0%,transparent 68%)}

        /* Main */
        .ab-main{position:relative;z-index:10;max-width:1200px;margin:0 auto;width:100%;padding:clamp(36px,5vw,60px) clamp(20px,4vw,48px) 0}

        /* Header */
        .ab-header{margin-bottom:clamp(28px,4vw,48px);animation:ab-up .6s cubic-bezier(.16,1,.3,1) .05s both}
        .ab-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:999px;background:#EBF2FF;border:1px solid #C3D7FD;color:#1A56DB;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}
        .ab-badge-dot{width:5px;height:5px;border-radius:50%;background:#1A56DB;animation:ab-dot 2.5s ease-in-out infinite}
        .ab-title{font-family:'Fraunces',serif;font-size:clamp(1.9rem,5vw,3.4rem);font-weight:300;letter-spacing:-.03em;line-height:1.08;color:#0D1117;margin-bottom:12px}
        .ab-title-accent{background:linear-gradient(90deg,#1A56DB,#4338CA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-style:italic}
        .ab-sub{font-size:clamp(.86rem,2vw,.97rem);color:#3D4552;max-width:500px;line-height:1.75}

        /* Grid */
        .ab-grid{display:grid;grid-template-columns:1fr 1.1fr .9fr;gap:clamp(14px,2vw,22px);align-items:start;padding-bottom:clamp(40px,5vw,60px)}
        @media(max-width:1024px){.ab-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:640px){.ab-grid{grid-template-columns:1fr}}

        /* Card base */
        .ab-card{background:#fff;border:1px solid #E4E7EC;border-radius:16px;position:relative;overflow:hidden;box-shadow:0 1px 3px rgba(13,17,23,.05),0 4px 16px rgba(13,17,23,.04);transition:box-shadow .22s,transform .22s,border-color .22s}
        .ab-card:hover{box-shadow:0 4px 24px rgba(26,86,219,.09),0 1px 3px rgba(13,17,23,.06);transform:translateY(-2px);border-color:#C3D7FD}
        .ab-card-top{position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#1A56DB,#4338CA);opacity:0;transition:opacity .22s}
        .ab-card:hover .ab-card-top{opacity:1}

        /* Welcome card */
        .ab-welcome{padding:clamp(20px,4vw,30px);display:flex;flex-direction:column;gap:18px;animation:ab-card .7s cubic-bezier(.16,1,.3,1) .1s both}
        .ab-logo-row{display:flex;align-items:center;gap:13px}
        .ab-logo-box{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#EBF2FF,#EEF2FF);border:1px solid #C3D7FD;display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-size:1.3rem;font-weight:400;color:#1A56DB;flex-shrink:0;box-shadow:0 2px 8px rgba(26,86,219,.1)}
        .ab-logo-name{font-family:'DM Sans',sans-serif;font-weight:700;font-size:.97rem;letter-spacing:-.03em;color:#0D1117}
        .ab-logo-doom{background:linear-gradient(90deg,#1A56DB,#4338CA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .ab-logo-tag{font-size:.68rem;color:#7B8494;margin-top:2px;font-weight:400}
        .ab-divider{height:1px;background:#F0F2F5}
        .ab-desc{font-size:clamp(.8rem,1.9vw,.88rem);color:#3D4552;line-height:1.82;font-weight:400}
        .ab-desc strong{color:#0D1117;font-weight:600}
        .ab-traits{display:flex;flex-direction:column;gap:8px}
        .ab-trait{display:flex;align-items:center;gap:10px;padding:9px 13px;border-radius:9px;border:1px solid transparent;transition:background .2s,border-color .2s;animation:ab-card .5s cubic-bezier(.16,1,.3,1) both}
        .ab-trait:hover{border-color:rgba(0,0,0,.06)}
        .ab-trait-check{width:20px;height:20px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .ab-trait-text{font-size:.78rem;font-weight:500;color:#3D4552}
        .ab-social-section{display:flex;flex-direction:column;gap:9px}
        .ab-social-lbl{font-size:.62rem;color:#7B8494;text-transform:uppercase;letter-spacing:.12em;font-weight:600}
        .ab-social-row{display:flex;gap:7px;flex-wrap:wrap}
        .ab-soc-btn{width:32px;height:32px;border-radius:8px;border:1px solid #E4E7EC;background:#F7F8FA;display:flex;align-items:center;justify-content:center;cursor:pointer;text-decoration:none;transition:all .2s cubic-bezier(.34,1.56,.64,1)}
        .ab-soc-btn:hover{transform:translateY(-2px) scale(1.06)}

        /* Quote card */
        .ab-quote-card{padding:clamp(20px,4vw,28px);display:flex;flex-direction:column;animation:ab-card .7s cubic-bezier(.16,1,.3,1) .2s both}
        .ab-quote-visual{position:relative;width:100%;padding-top:50%;border-radius:12px;overflow:hidden;margin-bottom:20px;background:linear-gradient(145deg,#0F2D8A 0%,#1747C8 40%,#1A56DB 65%,#4338CA 100%);box-shadow:0 8px 28px rgba(26,86,219,.22)}
        .ab-quote-inner{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:clamp(16px,4%,28px)}
        .ab-quote-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:28px 28px}
        .ab-quote-glow{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 30%,rgba(255,255,255,.07) 0%,transparent 60%)}
        .ab-quote-icon{margin-bottom:10px;color:rgba(255,255,255,.45);position:relative;z-index:1}
        .ab-quote-to{font-size:.65rem;color:rgba(255,255,255,.45);margin-bottom:8px;letter-spacing:.1em;text-transform:uppercase;position:relative;z-index:1}
        .ab-quote-main{font-family:'Fraunces',serif;font-style:italic;font-size:clamp(.98rem,3vw,1.2rem);font-weight:300;line-height:1.55;color:rgba(255,255,255,.94);text-align:center;position:relative;z-index:1}
        .ab-quote-main em{color:#93C5FD}
        .ab-quote-sig{margin-top:14px;display:flex;align-items:center;justify-content:flex-end;gap:8px;position:relative;z-index:1}
        .ab-quote-sig-line{flex:1;height:1px;background:rgba(255,255,255,.15)}
        .ab-quote-sig-name{font-size:.75rem;font-weight:600;color:rgba(255,255,255,.6)}
        .ab-rating-row{display:flex;align-items:center;gap:9px;margin-bottom:16px}
        .ab-stars{display:flex;gap:3px;color:#F59E0B}
        .ab-rating-text{font-size:.76rem;color:#3D4552}
        .ab-rating-text strong{color:#0D1117;font-weight:600}
        .ab-cta-row{display:flex;align-items:center;gap:12px;padding:13px 15px;border-radius:11px;background:#F7F8FA;border:1px solid #E4E7EC;cursor:pointer;transition:all .2s ease}
        .ab-cta-row:hover{background:#EBF2FF;border-color:#C3D7FD;transform:translateX(2px)}
        .ab-cta-icon{width:30px;height:30px;border-radius:8px;background:#1A56DB;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;box-shadow:0 2px 8px rgba(26,86,219,.3)}
        .ab-cta-text{font-size:.78rem;font-weight:500;color:#3D4552;flex:1}
        .ab-cta-arrow{color:#7B8494;transition:all .2s ease}
        .ab-cta-row:hover .ab-cta-arrow{color:#1A56DB;transform:translateX(3px)}

        /* Founder card */
        .ab-founder{padding:clamp(20px,4vw,28px);display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center;animation:ab-card .7s cubic-bezier(.16,1,.3,1) .3s both}
        .ab-avatar-wrap{position:relative;flex-shrink:0}
        .ab-avatar{width:clamp(76px,12vw,92px);height:clamp(76px,12vw,92px);border-radius:50%;background:linear-gradient(135deg,#EBF2FF,#EEF2FF);border:2px solid #C3D7FD;display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-size:clamp(1.6rem,4vw,2rem);font-weight:300;font-style:italic;color:#1A56DB;animation:ab-float 5s ease-in-out infinite;box-shadow:0 4px 20px rgba(26,86,219,.15)}
        .ab-online{position:absolute;bottom:4px;right:4px;width:12px;height:12px;border-radius:50%;background:#12A150;border:2.5px solid #fff;box-shadow:0 0 0 2px rgba(18,161,80,.2)}
        .ab-founder-name{font-family:'Fraunces',serif;font-size:clamp(1.05rem,3vw,1.3rem);font-weight:300;font-style:italic;letter-spacing:-.01em;margin-bottom:6px;color:#0D1117}
        .ab-founder-role{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;background:#EBF2FF;border:1px solid #C3D7FD;font-size:.64rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#1A56DB;margin-bottom:14px}
        .ab-role-dot{width:5px;height:5px;border-radius:50%;background:#1A56DB;animation:ab-dot 2s ease-in-out infinite}
        .ab-founder-bio{font-size:clamp(.75rem,1.9vw,.83rem);color:#3D4552;line-height:1.78;font-weight:400;margin-bottom:16px}
        .ab-fstats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px;width:100%}
        .ab-fstat{padding:12px;border-radius:10px;background:#F7F8FA;border:1px solid #E4E7EC;text-align:center}
        .ab-fstat-val{font-family:'Fraunces',serif;font-size:clamp(.95rem,2.5vw,1.1rem);font-weight:400;color:#1A56DB;letter-spacing:-.02em}
        .ab-fstat-lbl{font-size:.6rem;color:#7B8494;text-transform:uppercase;letter-spacing:.08em;margin-top:3px;font-weight:500}
        .ab-founder-div{width:100%;height:1px;background:#F0F2F5;margin-bottom:14px}
        .ab-founder-soc-lbl{font-size:.6rem;color:#7B8494;text-transform:uppercase;letter-spacing:.12em;margin-bottom:10px;font-weight:600}
        .ab-fsocs{display:flex;gap:7px;justify-content:center}
        .ab-fsoc-btn{width:32px;height:32px;border-radius:8px;border:1px solid #E4E7EC;background:#F7F8FA;display:flex;align-items:center;justify-content:center;cursor:pointer;text-decoration:none;transition:all .2s cubic-bezier(.34,1.56,.64,1)}
        .ab-fsoc-btn:hover{transform:translateY(-2px) scale(1.06)}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#F0F2F5}
        ::-webkit-scrollbar-thumb{background:#CDD2DA;border-radius:4px}
      `}</style>

      <div className="ab-page">
        <div className="ab-bg" />
        <div className="ab-bg-glow" />
        <Navbar />

        <div className="ab-main">
          {/* Header */}
          <div className="ab-header">
            <div className="ab-badge"><span className="ab-badge-dot" />About Us</div>
            <h1 className="ab-title">Welcome to <span className="ab-title-accent">futurDooM</span></h1>
            <p className="ab-sub">A platform where emotions meet AI — express, connect, and grow with a community that truly understands.</p>
          </div>

          {/* Grid */}
          <div className="ab-grid">

            {/* Col 1: Welcome */}
            <div className="ab-card ab-welcome">
              <div className="ab-card-top" />
              <div className="ab-logo-row">
                <div className="ab-logo-box">f</div>
                <div>
                  <div className="ab-logo-name">futur<span className="ab-logo-doom">DooM</span></div>
                  <div className="ab-logo-tag">Intelligence × Community</div>
                </div>
              </div>
              <div className="ab-divider" />
              <p className="ab-desc">
                <strong>futurDooM</strong> is a platform where emotions meet AI. People can express their feelings through AI and share experiences openly with a community that cares.<br /><br />
                Connect with brilliant minds, build meaningful relationships, and explore what's possible when community meets intelligence.
              </p>
              <div className="ab-traits">
                {TRAITS.map((t, i) => (
                  <div key={t.label} className="ab-trait" style={{ background: t.bg, borderColor: t.border, animationDelay: `${.35+i*.1}s` }}>
                    <div className="ab-trait-check" style={{ background: `${t.color}18` }}>
                      <span style={{ color: t.color }}><CheckIcon /></span>
                    </div>
                    <span className="ab-trait-text">{t.label}</span>
                  </div>
                ))}
              </div>
              <div className="ab-divider" />
              <div className="ab-social-section">
                <div className="ab-social-lbl">Follow futurDooM</div>
                <div className="ab-social-row">
                  {SOCIALS.map(s => (
                    <a key={s.label} href="#" className="ab-soc-btn" title={s.label} style={{ color: s.color }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = s.bg; el.style.borderColor = `${s.color}28`; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#F7F8FA'; el.style.borderColor = '#E4E7EC'; }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Col 2: Quote */}
            <div className="ab-card ab-quote-card">
              <div className="ab-card-top" />
              <div className="ab-quote-visual">
                <div className="ab-quote-inner">
                  <div className="ab-quote-grid" />
                  <div className="ab-quote-glow" />
                  <div className="ab-quote-icon"><QuoteIcon /></div>
                  <div className="ab-quote-to">To,</div>
                  <div className="ab-quote-main">For those we <em>never met!</em></div>
                  <div className="ab-quote-sig">
                    <div className="ab-quote-sig-line" />
                    <div className="ab-quote-sig-name">— futurDooM</div>
                  </div>
                </div>
              </div>
              <div className="ab-rating-row">
                <div className="ab-stars">{[...Array(5)].map((_,i) => <StarIcon key={i} />)}</div>
                <span className="ab-rating-text">Loved by <strong>12K+</strong> members</span>
              </div>
              <div className="ab-divider" style={{ marginBottom:16 }} />
              <div className="ab-cta-row">
                <div className="ab-cta-icon"><ArrowRightIcon /></div>
                <div className="ab-cta-text">Join the community — it's free</div>
                <div className="ab-cta-arrow"><ArrowRightIcon /></div>
              </div>
            </div>

            {/* Col 3: Founder */}
            <div className="ab-card ab-founder">
              <div className="ab-card-top" />
              <div className="ab-avatar-wrap">
                <div className="ab-avatar">D</div>
                <div className="ab-online" />
              </div>
              <div style={{ width:'100%' }}>
                <div className="ab-founder-name">Dipankar Porey</div>
                <div className="ab-founder-role"><span className="ab-role-dot" />The Founder</div>
                <p className="ab-founder-bio">Visionary behind futurDooM — building a space where emotional intelligence and artificial intelligence converge to create meaningful human connections.</p>
                <div className="ab-fstats">
                  <div className="ab-fstat"><div className="ab-fstat-val">12K+</div><div className="ab-fstat-lbl">Members</div></div>
                  <div className="ab-fstat"><div className="ab-fstat-val">v2.0</div><div className="ab-fstat-lbl">Platform</div></div>
                </div>
                <div className="ab-founder-div" />
                <div className="ab-founder-soc-lbl">Connect with Dipankar</div>
                <div className="ab-fsocs">
                  {SOCIALS.map(s => (
                    <a key={s.label} href="#" className="ab-fsoc-btn" title={s.label} style={{ color: s.color }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = s.bg; el.style.borderColor = `${s.color}28`; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#F7F8FA'; el.style.borderColor = '#E4E7EC'; }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}