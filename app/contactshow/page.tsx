'use client'
import Footer from '@/component/Footer'
import Navbar from '@/component/Navabr'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const MailIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
const PhoneIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
const SendIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
const ArrowRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
const CheckCircle= () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
const FBIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const IGIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
const TWIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
const LIIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>

const SOCIALS = [
  { icon: <FBIcon />, label: 'Facebook', color: '#1877F2', bg: 'rgba(24,119,242,.08)' },
  { icon: <IGIcon />, label: 'Instagram', color: '#E1306C', bg: 'rgba(225,48,108,.08)' },
  { icon: <TWIcon />, label: 'Twitter', color: '#1DA1F2', bg: 'rgba(29,161,242,.08)' },
  { icon: <LIIcon />, label: 'LinkedIn', color: '#0A66C2', bg: 'rgba(10,102,194,.08)' },
]

const TAGS = ['General Inquiry', 'Bug Report', 'Feature Request', 'Partnership']

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.documentElement.style.cssText += ';background:#F7F8FA!important'
    document.body.style.cssText += ';background:#F7F8FA!important'
    return () => {
      document.documentElement.style.background = ''
      document.body.style.background = ''
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
    <div style={{ minHeight:'100vh', background:'#F7F8FA', color:'#0D1117', fontFamily:"'DM Sans',system-ui,sans-serif", WebkitFontSmoothing:'antialiased', position:'relative', isolation:'isolate' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        html,body,#__next{background:#F7F8FA!important}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        @keyframes ct-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ct-card{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ct-dot{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
        @keyframes ct-pop{0%{opacity:0;transform:scale(.92)}60%{transform:scale(1.02)}100%{opacity:1;transform:scale(1)}}
        .ct2-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(circle,rgba(26,86,219,.05) 1px,transparent 1px);background-size:28px 28px}
        .ct2-glow{position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse 70% 45% at 50% -5%,rgba(219,234,254,.65) 0%,transparent 68%)}
        .ct2-main{position:relative;z-index:10;max-width:1160px;margin:0 auto;width:100%;padding:clamp(36px,5vw,60px) clamp(20px,4vw,48px) 0;display:flex;flex-direction:column}
        .ct2-header{margin-bottom:clamp(32px,4vw,52px);animation:ct-up .6s cubic-bezier(.16,1,.3,1) both}
        .ct2-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:999px;background:#EBF2FF;border:1px solid #C3D7FD;color:#1A56DB;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:16px}
        .ct2-badge-dot{width:5px;height:5px;border-radius:50%;background:#1A56DB;animation:ct-dot 2.5s ease-in-out infinite}
        .ct2-title{font-family:'Fraunces',serif;font-size:clamp(1.9rem,5vw,3.4rem);font-weight:300;letter-spacing:-.03em;line-height:1.08;color:#0D1117;margin-bottom:12px}
        .ct2-title-accent{background:linear-gradient(90deg,#1A56DB,#4338CA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-style:italic}
        .ct2-sub{font-size:clamp(.86rem,2vw,.97rem);color:#3D4552;max-width:460px;line-height:1.75}
        .ct2-grid{display:grid;grid-template-columns:320px 1fr;gap:clamp(16px,2.5vw,26px);align-items:start;padding-bottom:clamp(40px,5vw,60px)}
        @media(max-width:880px){.ct2-grid{grid-template-columns:1fr}}
        .ct2-card{background:#fff;border:1px solid #E4E7EC;border-radius:16px;overflow:hidden;position:relative;box-shadow:0 1px 3px rgba(13,17,23,.05),0 4px 12px rgba(13,17,23,.04);transition:box-shadow .22s,transform .22s,border-color .22s}
        .ct2-card:hover{box-shadow:0 4px 20px rgba(26,86,219,.09),0 1px 3px rgba(13,17,23,.06);transform:translateY(-2px);border-color:#C3D7FD}
        .ct2-card-top{position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#1A56DB,#4338CA);opacity:0;transition:opacity .22s}
        .ct2-card:hover .ct2-card-top{opacity:1}
        .ct2-left{display:flex;flex-direction:column;gap:14px}
        /* Brand mini card */
        .ct2-brand-card{padding:20px 22px;display:flex;align-items:center;gap:13px;animation:ct-card .6s cubic-bezier(.16,1,.3,1) .1s both}
        .ct2-brand-icon{width:44px;height:44px;border-radius:11px;background:linear-gradient(135deg,#EBF2FF,#EEF2FF);border:1px solid #C3D7FD;display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-size:1.2rem;font-weight:300;color:#1A56DB;flex-shrink:0;box-shadow:0 2px 8px rgba(26,86,219,.1)}
        .ct2-brand-name{font-weight:700;font-size:.95rem;letter-spacing:-.03em;color:#0D1117}
        .ct2-brand-doom{background:linear-gradient(90deg,#1A56DB,#4338CA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .ct2-brand-sub{font-size:.68rem;color:#7B8494;margin-top:2px}
        /* Info card */
        .ct2-info-card{padding:clamp(18px,3.5vw,26px);animation:ct-card .6s cubic-bezier(.16,1,.3,1) .18s both}
        .ct2-info-title{font-family:'Fraunces',serif;font-style:italic;font-size:1.18rem;font-weight:300;color:#0D1117;margin-bottom:9px}
        .ct2-info-desc{font-size:.83rem;color:#3D4552;line-height:1.76}
        .ct2-divider{height:1px;background:#F0F2F5;margin:18px 0}
        .ct2-contact-item{display:flex;align-items:center;gap:12px;padding:9px 0}
        .ct2-ci-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .2s ease}
        .ct2-contact-item:hover .ct2-ci-icon{transform:scale(1.07)}
        .ct2-ci-mail{background:#EBF2FF;border:1px solid #C3D7FD;color:#1A56DB}
        .ct2-ci-phone{background:#ECFEFF;border:1px solid #A5F3FC;color:#0891B2}
        .ct2-ci-label{font-size:.6rem;color:#7B8494;text-transform:uppercase;letter-spacing:.1em;margin-bottom:2px;font-weight:600}
        .ct2-ci-val{font-size:.83rem;color:#0D1117;font-weight:500}
        /* Social card */
        .ct2-social-card{padding:20px 22px;animation:ct-card .6s cubic-bezier(.16,1,.3,1) .26s both}
        .ct2-social-lbl{font-size:.62rem;color:#7B8494;text-transform:uppercase;letter-spacing:.12em;font-weight:600;margin-bottom:13px}
        .ct2-social-row{display:flex;gap:8px}
        .ct2-soc-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;padding:11px 6px;border-radius:10px;border:1px solid #E4E7EC;background:#F7F8FA;cursor:pointer;text-decoration:none;transition:all .2s cubic-bezier(.34,1.56,.64,1)}
        .ct2-soc-btn:hover{transform:translateY(-3px)}
        .ct2-soc-name{font-size:.58rem;color:#7B8494;font-weight:500}
        /* Form card */
        .ct2-form-card{padding:clamp(24px,4vw,36px);animation:ct-card .6s cubic-bezier(.16,1,.3,1) .12s both}
        .ct2-form-title{font-family:'Fraunces',serif;font-style:italic;font-size:1.4rem;font-weight:300;color:#0D1117;margin-bottom:6px}
        .ct2-form-sub{font-size:.83rem;color:#3D4552;margin-bottom:24px;line-height:1.65}
        .ct2-input-row{display:grid;grid-template-columns:1fr 1fr;gap:13px}
        @media(max-width:520px){.ct2-input-row{grid-template-columns:1fr}}
        .ct2-field{margin-bottom:14px}
        .ct2-label{display:block;font-size:.62rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#7B8494;margin-bottom:7px;transition:color .18s}
        .ct2-label.focus{color:#1A56DB}
        .ct2-input{width:100%;background:#F7F8FA;border:1.5px solid #E4E7EC;border-radius:9px;padding:11px 13px;font-family:'DM Sans',system-ui,sans-serif;font-size:.86rem;color:#0D1117;outline:none;resize:none;transition:border-color .2s,box-shadow .2s,background .2s}
        .ct2-input::placeholder{color:#CDD2DA}
        .ct2-input:focus{border-color:#93C5FD;background:#fff;box-shadow:0 0 0 3px rgba(26,86,219,.08)}
        textarea.ct2-input{min-height:128px;max-height:220px}
        .ct2-tags{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:18px}
        .ct2-tag{padding:5px 13px;border-radius:999px;border:1px solid #E4E7EC;background:#F7F8FA;font-size:.7rem;font-weight:500;color:#3D4552;cursor:pointer;transition:all .18s ease}
        .ct2-tag:hover{border-color:#C3D7FD;color:#1A56DB;background:#EBF2FF}
        .ct2-send{width:100%;padding:13px;background:linear-gradient(135deg,#1A56DB,#1347B8);border:none;border-radius:10px;color:#fff;font-family:'DM Sans',system-ui,sans-serif;font-size:.84rem;font-weight:600;letter-spacing:.02em;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 14px rgba(26,86,219,.3);transition:all .2s cubic-bezier(.34,1.56,.64,1)}
        .ct2-send:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,86,219,.4)}
        .ct2-send:active{transform:translateY(0) scale(.99)}
        .ct2-success{margin-top:13px;padding:12px 15px;border-radius:10px;background:#F0FDF4;border:1px solid #BBF7D0;color:#16A34A;font-size:.8rem;font-weight:500;display:flex;align-items:center;gap:9px;animation:ct-pop .4s cubic-bezier(.34,1.56,.64,1) both}
        .ct2-note{display:flex;align-items:center;gap:8px;margin-top:16px;padding-top:16px;border-top:1px solid #F0F2F5}
        .ct2-note-dot{width:5px;height:5px;border-radius:50%;background:#12A150;box-shadow:0 0 0 2px rgba(18,161,80,.18);flex-shrink:0;animation:ct-dot 2.5s ease-in-out infinite}
        .ct2-note-text{font-size:.7rem;color:#7B8494;line-height:1.5}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#F0F2F5}
        ::-webkit-scrollbar-thumb{background:#CDD2DA;border-radius:4px}
      `}</style>

      <div style={{ position:'fixed', inset:0, background:'#F7F8FA', zIndex:-2 }} />
      <div className="ct2-bg" />
      <div className="ct2-glow" />

      <Navbar />

      <div className="ct2-main">
        {/* Header */}
        <div className="ct2-header">
          <div className="ct2-badge"><span className="ct2-badge-dot" />Get in Touch</div>
          <h1 className="ct2-title">Contact <span className="ct2-title-accent">Us</span></h1>
          <p className="ct2-sub">We value every question and piece of feedback. Our team is always ready to help.</p>
        </div>

        <div className="ct2-grid">
          {/* Left */}
          <div className="ct2-left">
            <div className="ct2-card ct2-brand-card">
              <div className="ct2-card-top" />
              <div className="ct2-brand-icon">f</div>
              <div>
                <div className="ct2-brand-name">futur<span className="ct2-brand-doom">DooM</span></div>
                <div className="ct2-brand-sub">Intelligence × Community Platform</div>
              </div>
            </div>

            <div className="ct2-card ct2-info-card">
              <div className="ct2-card-top" />
              <div className="ct2-info-title">Reach out anytime</div>
              <div className="ct2-info-desc">We value your questions, feedback, and ideas. Our dedicated team responds promptly.</div>
              <div className="ct2-divider" />
              <div className="ct2-contact-item">
                <div className="ct2-ci-icon ct2-ci-mail"><MailIcon /></div>
                <div>
                  <div className="ct2-ci-label">Email</div>
                  <div className="ct2-ci-val">feedbackfuturdoom@gmail.com</div>
                </div>
              </div>
              <div className="ct2-contact-item">
                <div className="ct2-ci-icon ct2-ci-phone"><PhoneIcon /></div>
                <div>
                  <div className="ct2-ci-label">Phone</div>
                  <div className="ct2-ci-val">+91 89728 34354</div>
                </div>
              </div>
            </div>

            <div className="ct2-card ct2-social-card">
              <div className="ct2-card-top" />
              <div className="ct2-social-lbl">Follow futurDooM</div>
              <div className="ct2-social-row">
                {SOCIALS.map(s => (
                  <a key={s.label} href="#" className="ct2-soc-btn" style={{ color: s.color }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = s.bg; el.style.borderColor = `${s.color}28`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#F7F8FA'; el.style.borderColor = '#E4E7EC'; }}>
                    {s.icon}
                    <span className="ct2-soc-name">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="ct2-card ct2-form-card">
            <div className="ct2-card-top" />
            <div className="ct2-form-title">Send us a message</div>
            <div className="ct2-form-sub">Any questions or feedback? We'll get back to you within 24 hours.</div>

            <div className="ct2-input-row">
              <div className="ct2-field">
                <label className={`ct2-label${focused==='name'?' focus':''}`}>Full Name</label>
                <input className="ct2-input" placeholder="Your full name" value={form.name}
                  onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
              </div>
              <div className="ct2-field">
                <label className={`ct2-label${focused==='email'?' focus':''}`}>Email Address</label>
                <input className="ct2-input" placeholder="your@email.com" type="email" value={form.email}
                  onChange={e => setForm(f => ({...f, email: e.target.value}))}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
              </div>
            </div>

            <div className="ct2-field">
              <label className={`ct2-label${focused==='msg'?' focus':''}`}>Message</label>
              <textarea className="ct2-input" placeholder="Any suggestions, questions, or feedback…" value={form.message}
                onChange={e => setForm(f => ({...f, message: e.target.value}))}
                onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)} />
            </div>

            <div className="ct2-tags">
              {TAGS.map(tag => (
                <button key={tag} className="ct2-tag" onClick={() => setForm(f => ({...f, message: f.message || tag}))}>{tag}</button>
              ))}
            </div>

            <button className="ct2-send" onClick={handleSend}><SendIcon />Send Message</button>

            {sent && (
              <div className="ct2-success"><CheckCircle />Message sent! We'll be in touch within 24 hours.</div>
            )}

            <div className="ct2-note">
              <span className="ct2-note-dot" />
              <span className="ct2-note-text">We typically respond within 24 hours. All information is kept strictly confidential.</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}