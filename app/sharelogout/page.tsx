'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '@/component/Footer'
import Navbar from '@/component/Navabr'

const CloseIcon   = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
const SettingsIcon= () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
const SearchIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
const UserIcon    = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const BotIcon     = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 2v4M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="9" cy="16" r="1" fill="currentColor"/><circle cx="15" cy="16" r="1" fill="currentColor"/></svg>

type Message = { role: 'user' | 'ai'; text: string }
type Chat = { id: number; user: string; date: string; messages: Message[]; tag: string; tagColor: string; notif: number }

const CHATS: Chat[] = [
  { id:1, user:'Shiv Kumar', date:'Mar 4, 2026', tag:'General', tagColor:'#1A56DB', notif:3,
    messages:[{role:'user',text:'hi'},{role:'ai',text:'👋 Hi Shiv Kumar, nice to meet you! How can I assist you today?'}] },
  { id:2, user:'Shiv Kumar', date:'Mar 3, 2026', tag:'Dev Help', tagColor:'#0891B2', notif:1,
    messages:[{role:'user',text:'how to do frontend in html'},{role:'ai',text:'To create a frontend in HTML:\n\n1. **Define Structure** — Use semantic tags like `<header>`, `<main>`, `<section>`, `<footer>`.\n\n2. **Style with CSS** — Link a stylesheet for layout, colors, and typography.\n\n3. **Add Interactivity** — Include JavaScript via `<script>` for events and dynamic behavior.'}] },
  { id:3, user:'Shiv Kumar', date:'Mar 2, 2026', tag:'Emotions', tagColor:'#4338CA', notif:0,
    messages:[{role:'user',text:'I feel really overwhelmed today'},{role:'ai',text:"I hear you 💙 It's completely okay to feel overwhelmed. Would you like to talk about what's going on?"},{role:'user',text:'just work stress mostly'},{role:'ai',text:"Work stress can really pile up 😔 Try breaking tasks into smaller chunks. One breath at a time 🌿"}] },
  { id:4, user:'Priya Sharma', date:'Mar 2, 2026', tag:'AI Chat', tagColor:'#D97706', notif:2,
    messages:[{role:'user',text:'Can you write a short poem about the night sky?'},{role:'ai',text:"**Infinite Canvas**\n\nSilver dust on velvet black,\nStars that never find their way back.\nA quiet hum of ancient light —\nThe universe exhales at night. 🌌"},{role:'user',text:'That was beautiful, thank you!'},{role:'ai',text:"You're so welcome ✨ The night sky has always been humanity's greatest source of wonder."}] },
  { id:5, user:'Rahul Verma', date:'Mar 1, 2026', tag:'Dev Help', tagColor:'#0891B2', notif:0,
    messages:[{role:'user',text:'whats the difference between var let and const'},{role:'ai',text:"**`var`** — Function-scoped, hoisted. Avoid in modern code.\n\n**`let`** — Block-scoped, mutable. Use for variables that change.\n\n**`const`** — Block-scoped, cannot be reassigned. Use by default."},{role:'user',text:'oh that makes sense!'},{role:'ai',text:"Exactly! 🎯 Using `const` as default makes your code more predictable."}] },
  { id:6, user:'Ananya Das', date:'Feb 28, 2026', tag:'Emotions', tagColor:'#4338CA', notif:1,
    messages:[{role:'user',text:'I had a really good day today 😊'},{role:'ai',text:"That's wonderful to hear! 🌟 What made it special?"},{role:'user',text:'got my project approved and had dinner with old friends'},{role:'ai',text:"Two amazing things in one day — that's rare and precious! 🎉"}] },
  { id:7, user:'Rohan Mehta', date:'Feb 25, 2026', tag:'Life Advice', tagColor:'#059669', notif:0,
    messages:[{role:'user',text:'should I switch jobs or stay at my current company?'},{role:'ai',text:"Ask yourself: Are you still growing? Are you fairly paid? Do you feel respected? Does this align with your 3-year vision?\n\nIf 2+ answers are 'no', it's worth exploring."},{role:'user',text:'honestly I feel stuck and undervalued'},{role:'ai',text:"That gut feeling is important data 📊 Explore the market quietly — not as a commitment to leave, but as information gathering 💪"}] },
  { id:8, user:'Meera Pillai', date:'Feb 23, 2026', tag:'AI Chat', tagColor:'#D97706', notif:3,
    messages:[{role:'user',text:'explain quantum computing like im 10'},{role:'ai',text:"A normal computer is like a light switch — ON (1) or OFF (0) 💡\n\nA quantum computer can be ON, OFF, or **both at once** — called superposition. It explores many possibilities simultaneously. 🧬"},{role:'user',text:'so its like cheating at guessing?'},{role:'ai',text:"Ha! Yes — it's like trying all doors in a hallway at once instead of one by one! 😄"}] },
  { id:9, user:'Vikram Nair', date:'Feb 18, 2026', tag:'Life Advice', tagColor:'#059669', notif:0,
    messages:[{role:'user',text:'how do I stop procrastinating?'},{role:'ai',text:"Procrastination is usually about **emotion**, not laziness 🧠\n\nTry the **2-minute rule**: if something takes less than 2 minutes, do it now. For bigger tasks, commit to just 5 minutes. You'll usually keep going."},{role:'user',text:'the 5 minute thing actually worked today!!'},{role:'ai',text:"That's the magic of it! 🎉 Starting is always the hardest part 🚀"}] },
  { id:10, user:'Sneha Joshi', date:'Feb 15, 2026', tag:'General', tagColor:'#1A56DB', notif:0,
    messages:[{role:'user',text:'what are some good habits to build in 2026?'},{role:'ai',text:"**Mind** 📚 — Read 10 pages daily, journal 5 min each morning.\n\n**Body** 🏃 — Walk 8,000 steps, sleep 7-8 hours consistently.\n\n**Career** 💼 — Learn one skill per quarter, do a weekly review every Friday.\n\nPick just 2-3 to start. Small and consistent beats ambitious and abandoned."}] },
]

export default function ExplorePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    setMounted(true)
    document.documentElement.style.cssText += ';background:#F7F8FA!important'
    document.body.style.cssText += ';background:#F7F8FA!important'
    return () => {
      document.documentElement.style.background = ''
      document.body.style.background = ''
    }
  }, [])

  const tags = ['All', ...Array.from(new Set(CHATS.map(c => c.tag)))]
  const filtered = CHATS.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = q === '' || c.messages.some(m => m.text.toLowerCase().includes(q)) || c.user.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q)
    return matchSearch && (filter === 'All' || c.tag === filter)
  })

  const renderAiText = (text: string) => text.split('\n').map((line, i) => {
    const html = line
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#0D1117;font-weight:600">$1</strong>')
      .replace(/`(.*?)`/g, '<code style="background:#EBF2FF;padding:1px 5px;border-radius:4px;font-size:.82em;font-family:monospace;color:#1A56DB;border:1px solid #C3D7FD">$1</code>')
    return <p key={i} style={{ marginBottom: line===''?5:0, lineHeight:1.72 }} dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} />
  })

  if (!mounted) return null

  return (
    <div style={{ minHeight:'100vh', background:'#F7F8FA', color:'#0D1117', fontFamily:"'DM Sans',system-ui,sans-serif", WebkitFontSmoothing:'antialiased', position:'relative', isolation:'isolate' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        html,body,#__next{background:#F7F8FA!important}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        @keyframes ex-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ex-card{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ex-dot{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
        @keyframes ex-msg{from{opacity:0;transform:translateX(-5px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ex-msgr{from{opacity:0;transform:translateX(5px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ex-badge{0%{transform:scale(.7);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
        .ex2-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(circle,rgba(26,86,219,.05) 1px,transparent 1px);background-size:28px 28px}
        .ex2-glow{position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse 65% 40% at 50% -5%,rgba(219,234,254,.62) 0%,transparent 68%)}
        .ex2-main{position:relative;z-index:10;max-width:860px;margin:0 auto;width:100%;padding:clamp(36px,5vw,60px) clamp(20px,4vw,48px) 0;display:flex;flex-direction:column}
        .ex2-header{margin-bottom:clamp(22px,3vw,34px);animation:ex-up .6s cubic-bezier(.16,1,.3,1) both}
        .ex2-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:999px;background:#EBF2FF;border:1px solid #C3D7FD;color:#1A56DB;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}
        .ex2-badge-dot{width:5px;height:5px;border-radius:50%;background:#1A56DB;animation:ex-dot 2.5s ease-in-out infinite}
        .ex2-title{font-family:'Fraunces',serif;font-size:clamp(1.9rem,5vw,3.2rem);font-weight:300;letter-spacing:-.03em;line-height:1.08;color:#0D1117}
        .ex2-title-accent{background:linear-gradient(90deg,#1A56DB,#4338CA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-style:italic}
        .ex2-search-wrap{position:relative;margin-bottom:13px;animation:ex-up .6s cubic-bezier(.16,1,.3,1) .1s both}
        .ex2-search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#7B8494;pointer-events:none}
        .ex2-search{width:100%;background:#fff;border:1.5px solid #E4E7EC;border-radius:10px;padding:10px 14px 10px 36px;font-family:'DM Sans',system-ui,sans-serif;font-size:.86rem;color:#0D1117;outline:none;transition:border-color .2s,box-shadow .2s;box-shadow:0 1px 3px rgba(13,17,23,.04)}
        .ex2-search::placeholder{color:#CDD2DA}
        .ex2-search:focus{border-color:#93C5FD;box-shadow:0 0 0 3px rgba(26,86,219,.08)}
        .ex2-filters{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:16px;animation:ex-up .6s cubic-bezier(.16,1,.3,1) .16s both}
        .ex2-chip{padding:5px 13px;border-radius:999px;font-size:.69rem;font-weight:600;letter-spacing:.02em;cursor:pointer;white-space:nowrap;border:1px solid #E4E7EC;background:#fff;color:#3D4552;transition:all .18s ease;box-shadow:0 1px 2px rgba(13,17,23,.04)}
        .ex2-chip:hover{border-color:#C3D7FD;color:#1A56DB;background:#EBF2FF}
        .ex2-chip.active{background:#1A56DB;border-color:#1A56DB;color:#fff;box-shadow:0 2px 8px rgba(26,86,219,.28)}
        .ex2-stats{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:clamp(18px,3vw,28px);animation:ex-up .6s cubic-bezier(.16,1,.3,1) .22s both}
        .ex2-stat{display:flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;background:#fff;border:1px solid #E4E7EC;font-size:.7rem;color:#3D4552;font-weight:500;box-shadow:0 1px 2px rgba(13,17,23,.04)}
        .ex2-stat-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
        .ex2-list{display:flex;flex-direction:column;gap:clamp(12px,2vw,18px);padding-bottom:clamp(40px,5vw,60px)}
        .ex2-card{background:#fff;border:1px solid #E4E7EC;border-radius:16px;overflow:hidden;position:relative;box-shadow:0 1px 3px rgba(13,17,23,.05),0 4px 12px rgba(13,17,23,.04);transition:box-shadow .22s,transform .22s,border-color .22s;animation:ex-card .6s cubic-bezier(.16,1,.3,1) both}
        .ex2-card:hover{box-shadow:0 4px 20px rgba(26,86,219,.09),0 1px 3px rgba(13,17,23,.06);transform:translateY(-1px);border-color:#C3D7FD}
        .ex2-card-stripe{position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#1A56DB,#4338CA);opacity:0;transition:opacity .22s}
        .ex2-card:hover .ex2-card-stripe{opacity:1}
        .ex2-card-hdr{display:flex;align-items:center;gap:9px;padding:clamp(12px,2vw,15px) clamp(15px,3vw,20px);flex-wrap:wrap}
        .ex2-hdr-btn{width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid #E4E7EC;background:#F7F8FA;color:#7B8494;transition:all .18s ease;position:relative;flex-shrink:0}
        .ex2-hdr-btn.close:hover{border-color:#FCA5A5;background:#FEF2F2;color:#EF4444}
        .ex2-hdr-btn.settings:hover{border-color:#C3D7FD;background:#EBF2FF;color:#1A56DB}
        .ex2-notif{position:absolute;top:-5px;right:-5px;width:14px;height:14px;border-radius:50%;background:#4338CA;border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:.46rem;font-weight:700;color:#fff;animation:ex-badge .4s cubic-bezier(.34,1.56,.64,1) both}
        .ex2-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#EBF2FF,#EEF2FF);border:1.5px solid #C3D7FD;display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:700;color:#1A56DB;flex-shrink:0}
        .ex2-meta{display:flex;align-items:center;gap:5px;flex:1;flex-wrap:wrap;min-width:0}
        .ex2-chip-user{padding:3px 9px;border-radius:999px;background:#EBF2FF;border:1px solid #C3D7FD;font-size:.62rem;font-weight:600;color:#1A56DB}
        .ex2-chip-date{padding:3px 9px;border-radius:999px;background:#F7F8FA;border:1px solid #E4E7EC;font-size:.62rem;color:#7B8494}
        .ex2-chip-tag{padding:3px 9px;border-radius:999px;font-size:.6rem;font-weight:600;display:inline-flex;align-items:center;gap:4px;border:1px solid}
        .ex2-msg-count{font-size:.6rem;color:#CDD2DA;white-space:nowrap;flex-shrink:0}
        .ex2-sep{height:1px;background:#F0F2F5}
        .ex2-msgs{padding:clamp(12px,2vw,15px) clamp(15px,3vw,20px) clamp(13px,2.5vw,17px);display:flex;flex-direction:column;gap:9px}
        .ex2-msg-row{display:flex;align-items:flex-end;gap:7px}
        .ex2-msg-row.ai{flex-direction:row-reverse}
        .ex2-msg-av{width:22px;height:22px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center}
        .ex2-msg-av.u{background:#EBF2FF;border:1px solid #C3D7FD;color:#1A56DB}
        .ex2-msg-av.a{background:linear-gradient(135deg,#EBF2FF,#EEF2FF);border:1px solid #C3D7FD;color:#4338CA}
        .ex2-bubble{max-width:min(78%,520px);padding:clamp(8px,1.8vw,11px) clamp(10px,2.2vw,13px);border-radius:12px;font-size:clamp(.77rem,1.9vw,.85rem);line-height:1.72}
        .ex2-bubble.u{background:#EBF2FF;border:1px solid #DBEAFE;border-bottom-left-radius:4px;color:#1e3a8a;animation:ex-msg .32s cubic-bezier(.16,1,.3,1) both}
        .ex2-bubble.a{background:#F7F8FA;border:1px solid #E4E7EC;border-bottom-right-radius:4px;color:#3D4552;animation:ex-msgr .32s cubic-bezier(.16,1,.3,1) .06s both}
        .ex2-ai-label{font-size:.55rem;color:#1A56DB;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:5px;display:flex;align-items:center;gap:4px;opacity:.65}
        .ex2-empty{text-align:center;padding:52px 20px;color:#7B8494;font-size:.88rem}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#F0F2F5}
        ::-webkit-scrollbar-thumb{background:#CDD2DA;border-radius:4px}
      `}</style>

      <div style={{ position:'fixed', inset:0, background:'#F7F8FA', zIndex:-2 }} />
      <div className="ex2-bg" />
      <div className="ex2-glow" />

      <Navbar />

      <div className="ex2-main">
        <div className="ex2-header">
          <div className="ex2-badge"><span className="ex2-badge-dot" />Chat History</div>
          <h1 className="ex2-title">Your <span className="ex2-title-accent">Conversations</span></h1>
        </div>

        <div className="ex2-search-wrap">
          <span className="ex2-search-icon"><SearchIcon /></span>
          <input className="ex2-search" placeholder="Search messages, users, tags…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="ex2-filters">
          {tags.map(t => (
            <div key={t} className={`ex2-chip${filter===t?' active':''}`} onClick={() => setFilter(t)}>{t}</div>
          ))}
        </div>

        <div className="ex2-stats">
          {[
            { label:`${filtered.length} of ${CHATS.length} chats`, color:'#1A56DB' },
            { label:`${CHATS.reduce((a,c) => a+c.messages.length, 0)} total messages`, color:'#0891B2' },
            { label:'Last active Mar 4', color:'#4338CA' },
          ].map((s,i) => (
            <div key={i} className="ex2-stat">
              <span className="ex2-stat-dot" style={{ background:s.color }} />{s.label}
            </div>
          ))}
        </div>

        <div className="ex2-list">
          {filtered.length === 0 && (
            <div className="ex2-empty">No conversations match your search.</div>
          )}

          {filtered.map((chat, ci) => (
            <div key={chat.id} className="ex2-card" style={{ animationDelay:`${.06+ci*.05}s` }}>
              <div className="ex2-card-stripe" />

              <div className="ex2-card-hdr">
                <div style={{ display:'flex', gap:5, flexShrink:0 }}>
                  <div className="ex2-hdr-btn close" onClick={() => router.push('/')} title="Close"><CloseIcon /></div>
                  <div className="ex2-hdr-btn settings" style={{ position:'relative' }}>
                    <SettingsIcon />
                    {chat.notif > 0 && <div className="ex2-notif">{chat.notif}</div>}
                  </div>
                </div>

                <div className="ex2-avatar">{chat.user.charAt(0)}</div>
                <div className="ex2-meta">
                  <span className="ex2-chip-user">{chat.user}</span>
                  <span className="ex2-chip-date">{chat.date}</span>
                  <span className="ex2-chip-tag" style={{ color:chat.tagColor, borderColor:`${chat.tagColor}28`, background:`${chat.tagColor}0a` }}>
                    {chat.tag}
                  </span>
                </div>
                <span className="ex2-msg-count">{chat.messages.length} msg{chat.messages.length !== 1 ? 's' : ''}</span>
              </div>

              <div className="ex2-sep" />

              <div className="ex2-msgs">
                {chat.messages.map((msg, mi) => (
                  <div key={mi} className={`ex2-msg-row${msg.role==='ai'?' ai':''}`}>
                    <div className={`ex2-msg-av ${msg.role==='ai'?'a':'u'}`}>
                      {msg.role==='ai' ? <BotIcon /> : <UserIcon />}
                    </div>
                    <div className={`ex2-bubble ${msg.role==='ai'?'a':'u'}`} style={{ animationDelay:`${.06+ci*.05+mi*.04}s` }}>
                      {msg.role==='ai' && (
                        <div className="ex2-ai-label">futurDooM AI</div>
                      )}
                      {msg.role==='ai' ? renderAiText(msg.text) : <span>{msg.text}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}