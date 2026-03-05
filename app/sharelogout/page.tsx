'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserRound } from 'lucide-react'
import Footer from '@/component/Footer'
import Navbar from '@/component/Navabr'

/* ── Icons ── */
const BirdLogo = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 72 72" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="eg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB"/><stop offset="50%" stopColor="#3B82F6"/><stop offset="100%" stopColor="#6366F1"/>
      </linearGradient>
      <linearGradient id="eg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA"/><stop offset="100%" stopColor="#2563EB"/>
      </linearGradient>
    </defs>
    <path d="M16 30 Q28 10 48 18 Q40 26 26 27 Z" fill="url(#eg2)" opacity="0.9"/>
    <path d="M18 36 Q34 18 52 24 Q43 34 28 33 Z" fill="url(#eg1)" opacity="0.75"/>
    <ellipse cx="38" cy="40" rx="13" ry="8" fill="url(#eg1)" transform="rotate(-18 38 40)"/>
    <path d="M47 46 Q60 56 55 64 Q50 57 45 53 Z" fill="url(#eg2)" opacity="0.8"/>
    <circle cx="28" cy="32" r="7.5" fill="url(#eg1)"/>
    <circle cx="26" cy="30" r="2.2" fill="white" opacity="0.95"/>
    <circle cx="26.5" cy="30.5" r="1" fill="#1E3A8A"/>
    <path d="M23 33 Q15 32 11 34" stroke="url(#eg2)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
  </svg>
)
const CloseIcon   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
const SettingsIcon= () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
const ArrowRight  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
const SearchIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
const SparkleIcon = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
const UserIcon    = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>

type Message = { role: 'user' | 'ai'; text: string }
type Chat = { id: number; user: string; date: string; messages: Message[]; tag: string; tagColor: string; notif: number }

const CHATS: Chat[] = [
  { id:1, user:'Shiv Kumar', date:'Mar 4, 2026', tag:'General', tagColor:'#2563EB', notif:3,
    messages:[{role:'user',text:'hi'},{role:'ai',text:'👋 Hi Shiv Kumar, nice to meet you! How can I assist you today? 🤔'}] },
  { id:2, user:'Shiv Kumar', date:'Mar 3, 2026', tag:'Dev Help', tagColor:'#0891B2', notif:1,
    messages:[{role:'user',text:'how to do frontend in html'},{role:'ai',text:'To create a frontend in HTML:\n\n1. **Define Structure** — Use semantic tags like `<header>`, `<main>`, `<section>`, `<footer>`.\n\n2. **Style with CSS** — Link a stylesheet for layout, colors, and typography.\n\n3. **Add Interactivity** — Include JavaScript via `<script>` for events and dynamic behavior.'}] },
  { id:3, user:'Shiv Kumar', date:'Mar 2, 2026', tag:'Emotions', tagColor:'#7C3AED', notif:0,
    messages:[{role:'user',text:'I feel really overwhelmed today'},{role:'ai',text:"I hear you 💙 It's completely okay to feel overwhelmed sometimes. Would you like to talk about what's going on, or would you prefer some calming techniques?"},{role:'user',text:'just work stress mostly'},{role:'ai',text:"Work stress can really pile up 😔 Try breaking tasks into smaller chunks and give yourself permission to step away for 5 minutes every hour. One breath at a time 🌿"}] },
  { id:4, user:'Priya Sharma', date:'Mar 2, 2026', tag:'AI Chat', tagColor:'#D97706', notif:2,
    messages:[{role:'user',text:'Can you write a short poem about the night sky?'},{role:'ai',text:"Of course! Here's one:\n\n**Infinite Canvas**\n\nSilver dust on velvet black,\nStars that never find their way back.\nA quiet hum of ancient light —\nThe universe exhales at night. 🌌"},{role:'user',text:'That was beautiful, thank you!'},{role:'ai',text:"You're so welcome ✨ The night sky has always been humanity's greatest source of wonder."}] },
  { id:5, user:'Rahul Verma', date:'Mar 1, 2026', tag:'Dev Help', tagColor:'#0891B2', notif:0,
    messages:[{role:'user',text:'whats the difference between var let and const'},{role:'ai',text:"**`var`** — Function-scoped, hoisted, can be re-declared. Avoid in modern code.\n\n**`let`** — Block-scoped, mutable. Use for variables that change.\n\n**`const`** — Block-scoped, cannot be reassigned. Use by default.\n\nRule of thumb: always start with `const`, switch to `let` only when you need to reassign."},{role:'user',text:'oh that makes sense!'},{role:'ai',text:"Exactly! 🎯 Using `const` as default makes your code more predictable."}] },
  { id:6, user:'Ananya Das', date:'Feb 28, 2026', tag:'Emotions', tagColor:'#7C3AED', notif:1,
    messages:[{role:'user',text:'I had a really good day today 😊'},{role:'ai',text:"That's wonderful to hear! 🌟 What made it special?"},{role:'user',text:'got my project approved and had dinner with old friends'},{role:'ai',text:"Two amazing things in one day — that's rare and precious! 🎉 You deserve days like this more often 💛"}] },
  { id:7, user:'Rohan Mehta', date:'Feb 25, 2026', tag:'Life Advice', tagColor:'#059669', notif:0,
    messages:[{role:'user',text:'should I switch jobs or stay at my current company?'},{role:'ai',text:"Ask yourself:\n\n1. **Growth** — Are you still learning?\n2. **Compensation** — Are you fairly paid?\n3. **Culture** — Do you feel respected?\n4. **Future** — Does this align with where you want to be in 3 years?\n\nIf 2+ answers are 'no', it's worth exploring."},{role:'user',text:'honestly I feel stuck and undervalued'},{role:'ai',text:"That gut feeling is important data 📊 It might be worth quietly exploring the market — not as a commitment to leave, but as information gathering 💪"}] },
  { id:8, user:'Meera Pillai', date:'Feb 23, 2026', tag:'AI Chat', tagColor:'#D97706', notif:3,
    messages:[{role:'user',text:'explain quantum computing like im 10'},{role:'ai',text:"A normal computer is like a light switch — it's either ON (1) or OFF (0) 💡\n\nA quantum computer is like a magic dimmer that can be ON, OFF, or **both at the same time** — called superposition.\n\nThis lets it explore many possibilities simultaneously, making it incredibly fast for certain massive problems. 🧬"},{role:'user',text:'so its like cheating at guessing?'},{role:'ai',text:"Ha! That's actually brilliant 😄 Yes — it's like trying all doors in a hallway at once instead of one by one!"}] },
  { id:9, user:'Vikram Nair', date:'Feb 18, 2026', tag:'Life Advice', tagColor:'#059669', notif:0,
    messages:[{role:'user',text:'how do I stop procrastinating?'},{role:'ai',text:"Procrastination is almost never about laziness — it's usually about **emotion** 🧠\n\nTry the **2-minute rule**: if something takes less than 2 minutes, do it now. For bigger tasks, commit to just starting for 5 minutes. You'll usually keep going."},{role:'user',text:'the 5 minute thing actually worked today!!'},{role:'ai',text:"That's the magic of it! 🎉 Starting is always the hardest part. Once you're in motion, momentum takes over 🚀"}] },
  { id:10, user:'Sneha Joshi', date:'Feb 15, 2026', tag:'General', tagColor:'#2563EB', notif:0,
    messages:[{role:'user',text:'what are some good habits to build in 2026?'},{role:'ai',text:"**Mind** 📚 — Read 10 pages daily, journal 5 min each morning.\n\n**Body** 🏃 — Walk 8,000 steps daily, sleep 7-8 hours consistently.\n\n**Career** 💼 — Learn one new skill per quarter, do a weekly review every Friday.\n\nPick just 2-3 to start. Small and consistent beats ambitious and abandoned."}] },
]

export default function ExplorePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    setMounted(true)
    document.documentElement.style.cssText += ';background:#F8FAFC!important;background-color:#F8FAFC!important'
    document.body.style.cssText += ';background:#F8FAFC!important;background-color:#F8FAFC!important'
    return () => {
      document.documentElement.style.background = ''
      document.documentElement.style.backgroundColor = ''
      document.body.style.background = ''
      document.body.style.backgroundColor = ''
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
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#1E293B;font-weight:600">$1</strong>')
      .replace(/`(.*?)`/g, '<code style="background:#EFF6FF;padding:1px 6px;border-radius:4px;font-size:.82em;font-family:monospace;color:#2563EB;border:1px solid #BFDBFE">$1</code>')
    return <p key={i} style={{ marginBottom: line === '' ? 6 : 0, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} />
  })

  if (!mounted) return null

  return (
    <div style={{ minHeight:'100vh', background:'#F8FAFC', backgroundColor:'#F8FAFC', color:'#111827', fontFamily:"'Geist',system-ui,sans-serif", WebkitFontSmoothing:'antialiased', position:'relative', isolation:'isolate' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');

        html, body, #__next, [data-nextjs-scroll-focus-boundary] {
          background: #F8FAFC !important;
          background-color: #F8FAFC !important;
        }

        @keyframes slideUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer  { from{background-position:-300% center} to{background-position:300% center} }
        @keyframes pulse    { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes msgSlide { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
        @keyframes msgSlideR{ from{opacity:0;transform:translateX(6px)} to{opacity:1;transform:translateX(0)} }
        @keyframes badgePop { 0%{transform:scale(.7);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { overflow-x:hidden; scroll-behavior:smooth; }

        /* Fixed white bg safety */
        .ex-bg-white { position:fixed; inset:0; z-index:-2; background:#F8FAFC; }

        /* Dot grid */
        .ex-bg {
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background-image: radial-gradient(circle, rgba(37,99,235,.055) 1px, transparent 1px);
          background-size: 26px 26px;
        }
        .ex-bg-glow {
          position:fixed; inset:0; z-index:1; pointer-events:none;
          background: radial-gradient(ellipse 65% 40% at 50% -5%, rgba(219,234,254,.7) 0%, transparent 68%);
        }

        /* ── Navbar ── */
        .ex-nav {
          position:sticky; top:0; z-index:100;
          background:#ffffff; border-bottom:1px solid #E2E8F0;
          box-shadow:0 1px 0 rgba(0,0,0,.05), 0 2px 8px rgba(0,0,0,.04);
          display:flex; align-items:center; justify-content:space-between;
          padding:0 clamp(20px,4vw,52px); height:64px;
        }
        .ex-nav-left  { display:flex; align-items:center; }
        .ex-nav-right { display:flex; align-items:center; gap:8px; }

        .ex-brand { display:flex; align-items:center; gap:10px; text-decoration:none; margin-right:28px; }
        .ex-brand-icon {
          width:36px; height:36px; border-radius:9px;
          background:linear-gradient(135deg,#EFF6FF,#DBEAFE);
          border:1px solid #BFDBFE;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 1px 4px rgba(37,99,235,.1);
        }
        .ex-brand-name { font-family:'Geist',sans-serif; font-size:1.05rem; font-weight:700; letter-spacing:-.03em; color:#0F172A; }
        .ex-brand-accent {
          background:linear-gradient(90deg,#2563EB,#4F46E5,#7C3AED,#2563EB);
          background-size:300% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer 6s linear infinite;
        }
        .ex-nav-sep { width:1px; height:20px; background:#E2E8F0; margin:0 4px; }
        .ex-nav-link {
          font-size:.83rem; font-weight:500; color:#64748B;
          text-decoration:none; padding:6px 11px; border-radius:7px;
          transition:all .18s ease; letter-spacing:-.01em;
        }
        .ex-nav-link:hover { color:#0F172A; background:#F1F5F9; }
        .ex-nav-link.active { color:#2563EB; background:#EFF6FF; font-weight:600; }

        .ex-btn-ghost {
          display:flex; align-items:center; gap:6px;
          padding:7px 16px; border-radius:8px;
          font-size:.82rem; font-weight:600;
          cursor:pointer; border:1px solid #E2E8F0;
          background:#fff; color:#374151;
          transition:all .18s ease;
        }
        .ex-btn-ghost:hover { background:#F8FAFC; border-color:#CBD5E1; color:#111827; }

        .ex-btn-primary {
          display:flex; align-items:center; gap:6px;
          padding:7px 18px; border-radius:8px;
          font-size:.82rem; font-weight:600;
          cursor:pointer; border:1px solid #2563EB;
          background:#2563EB; color:#fff;
          box-shadow:0 1px 4px rgba(37,99,235,.22);
          transition:all .18s ease;
        }
        .ex-btn-primary:hover { background:#1D4ED8; box-shadow:0 2px 10px rgba(37,99,235,.35); }

        /* ── Main ── */
        .ex-main {
          position:relative; z-index:10;
          max-width:860px; margin:0 auto; width:100%;
          padding:clamp(32px,5vw,60px) clamp(20px,4vw,48px) 0;
          display:flex; flex-direction:column;
        }

        /* ── Header ── */
        .ex-header { margin-bottom:clamp(24px,3vw,36px); animation:slideUp .6s cubic-bezier(.16,1,.3,1) both; }
        .ex-badge {
          display:inline-flex; align-items:center; gap:7px;
          padding:5px 14px; border-radius:999px;
          background:#EFF6FF; border:1px solid #BFDBFE;
          color:#2563EB; font-size:.68rem; font-weight:700;
          letter-spacing:.09em; text-transform:uppercase; margin-bottom:14px;
        }
        .ex-badge-dot { width:5px; height:5px; border-radius:50%; background:#2563EB; animation:pulse 2.5s ease-in-out infinite; }
        .ex-title {
          font-family:'Instrument Serif',serif;
          font-size:clamp(1.9rem,5vw,3.2rem);
          font-weight:400; letter-spacing:-.025em; line-height:1.08;
          color:#0F172A;
        }
        .ex-title-accent {
          background:linear-gradient(90deg,#2563EB,#7C3AED);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          font-style:italic;
        }

        /* ── Search ── */
        .ex-search-wrap {
          position:relative; margin-bottom:14px;
          animation:slideUp .6s cubic-bezier(.16,1,.3,1) .1s both;
        }
        .ex-search-icon { position:absolute; left:13px; top:50%; transform:translateY(-50%); color:#94A3B8; pointer-events:none; }
        .ex-search {
          width:100%; background:#fff; border:1.5px solid #E2E8F0; border-radius:11px;
          padding:10px 14px 10px 38px;
          font-family:'Geist',system-ui,sans-serif;
          font-size:.88rem; color:#111827; outline:none;
          transition:border-color .2s, box-shadow .2s;
          box-shadow:0 1px 3px rgba(0,0,0,.04);
        }
        .ex-search::placeholder { color:#CBD5E1; }
        .ex-search:focus { border-color:#93C5FD; box-shadow:0 0 0 3px rgba(37,99,235,.08); }

        /* ── Filter chips ── */
        .ex-filters {
          display:flex; gap:7px; flex-wrap:wrap;
          margin-bottom:18px;
          animation:slideUp .6s cubic-bezier(.16,1,.3,1) .16s both;
        }
        .ex-chip {
          padding:5px 14px; border-radius:999px;
          font-size:.7rem; font-weight:600; letter-spacing:.03em;
          cursor:pointer; white-space:nowrap;
          border:1px solid #E2E8F0; background:#fff; color:#64748B;
          transition:all .18s ease;
          box-shadow:0 1px 2px rgba(0,0,0,.04);
        }
        .ex-chip:hover { border-color:#BFDBFE; color:#2563EB; background:#EFF6FF; }
        .ex-chip.active { background:#2563EB; border-color:#2563EB; color:#fff; box-shadow:0 2px 8px rgba(37,99,235,.28); }

        /* ── Stats row ── */
        .ex-stats {
          display:flex; gap:8px; flex-wrap:wrap;
          margin-bottom:clamp(18px,3vw,28px);
          animation:slideUp .6s cubic-bezier(.16,1,.3,1) .22s both;
        }
        .ex-stat {
          display:flex; align-items:center; gap:6px;
          padding:5px 12px; border-radius:999px;
          background:#fff; border:1px solid #E2E8F0;
          font-size:.7rem; color:#64748B; font-weight:500;
          box-shadow:0 1px 2px rgba(0,0,0,.04);
        }
        .ex-stat-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }

        /* ── Chat list ── */
        .ex-list { display:flex; flex-direction:column; gap:clamp(12px,2vw,18px); padding-bottom:clamp(40px,5vw,60px); }

        /* ── Chat card ── */
        .ex-card {
          background:#fff;
          border:1px solid #E2E8F0;
          border-radius:16px; overflow:hidden; position:relative;
          box-shadow:0 1px 3px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.03);
          transition:box-shadow .24s, transform .24s, border-color .24s;
          animation:cardIn .6s cubic-bezier(.16,1,.3,1) both;
        }
        .ex-card:hover {
          box-shadow:0 4px 20px rgba(37,99,235,.09), 0 1px 3px rgba(0,0,0,.05);
          transform:translateY(-1px); border-color:#BFDBFE;
        }
        .ex-card-stripe {
          position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,#2563EB,#7C3AED);
          opacity:0; transition:opacity .24s;
        }
        .ex-card:hover .ex-card-stripe { opacity:1; }

        /* Card header */
        .ex-card-hdr {
          display:flex; align-items:center; gap:10px;
          padding:clamp(12px,2vw,16px) clamp(16px,3vw,22px);
          flex-wrap:wrap;
        }
        .ex-hdr-btn {
          width:28px; height:28px; border-radius:7px;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; border:1px solid #E2E8F0; background:#F8FAFC;
          color:#94A3B8; transition:all .18s ease; position:relative; flex-shrink:0;
        }
        .ex-hdr-btn.close:hover { border-color:#FCA5A5; background:#FEF2F2; color:#EF4444; }
        .ex-hdr-btn.settings:hover { border-color:#BFDBFE; background:#EFF6FF; color:#2563EB; }

        .ex-notif {
          position:absolute; top:-5px; right:-5px;
          width:15px; height:15px; border-radius:50%;
          background:#7C3AED; border:2px solid #fff;
          display:flex; align-items:center; justify-content:center;
          font-size:.48rem; font-weight:700; color:#fff;
          animation:badgePop .4s cubic-bezier(.34,1.56,.64,1) both;
        }

        .ex-avatar {
          width:30px; height:30px; border-radius:50%;
          background:linear-gradient(135deg,#EFF6FF,#EDE9FE);
          border:1.5px solid #BFDBFE;
          display:flex; align-items:center; justify-content:center;
          font-family:'Geist',sans-serif; font-size:.72rem; font-weight:700;
          color:#2563EB; flex-shrink:0;
        }

        .ex-meta { display:flex; align-items:center; gap:6px; flex:1; flex-wrap:wrap; min-width:0; }
        .ex-chip-user {
          padding:3px 9px; border-radius:999px;
          background:#EFF6FF; border:1px solid #BFDBFE;
          font-size:.65rem; font-weight:600; color:#2563EB;
        }
        .ex-chip-date {
          padding:3px 9px; border-radius:999px;
          background:#F8FAFC; border:1px solid #E2E8F0;
          font-size:.65rem; color:#94A3B8;
        }
        .ex-chip-tag {
          padding:3px 9px; border-radius:999px;
          font-size:.62rem; font-weight:600;
          display:inline-flex; align-items:center; gap:4px;
          border:1px solid;
        }
        .ex-msg-count { font-size:.62rem; color:#CBD5E1; white-space:nowrap; flex-shrink:0; }

        /* Card separator */
        .ex-sep { height:1px; background:#F1F5F9; }

        /* Messages area */
        .ex-msgs { padding:clamp(12px,2vw,16px) clamp(16px,3vw,22px) clamp(14px,2.5vw,18px); display:flex; flex-direction:column; gap:10px; }

        /* Message rows */
        .ex-msg-row { display:flex; align-items:flex-end; gap:8px; }
        .ex-msg-row.ai { flex-direction:row-reverse; }

        .ex-msg-av {
          width:24px; height:24px; border-radius:50%; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
        }
        .ex-msg-av.u { background:#EFF6FF; border:1px solid #BFDBFE; color:#2563EB; }
        .ex-msg-av.a { background:linear-gradient(135deg,#EFF6FF,#EDE9FE); border:1px solid #BFDBFE; }

        .ex-bubble {
          max-width:min(78%,520px);
          padding:clamp(8px,1.8vw,11px) clamp(10px,2.2vw,14px);
          border-radius:13px;
          font-size:clamp(.78rem,2vw,.865rem); line-height:1.7;
        }
        .ex-bubble.u {
          background:#EFF6FF; border:1px solid #DBEAFE;
          border-bottom-left-radius:4px; color:#1E3A8A;
          animation:msgSlide .35s cubic-bezier(.16,1,.3,1) both;
        }
        .ex-bubble.a {
          background:#F8FAFC; border:1px solid #E2E8F0;
          border-bottom-right-radius:4px; color:#334155;
          animation:msgSlideR .35s cubic-bezier(.16,1,.3,1) .06s both;
        }
        .ex-ai-label {
          font-size:.57rem; color:#2563EB; font-weight:700;
          letter-spacing:.07em; text-transform:uppercase;
          margin-bottom:5px; display:flex; align-items:center; gap:4px; opacity:.7;
        }

        /* Empty state */
        .ex-empty { text-align:center; padding:52px 20px; color:#94A3B8; font-size:.9rem; }

        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#F1F5F9; }
        ::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:4px; }
        ::-webkit-scrollbar-thumb:hover { background:#94A3B8; }

        @media(max-width:400px) { .ex-nav { padding:0 14px; } .ex-brand-name { font-size:.92rem; } }
      `}</style>

      {/* Safety white bg */}
      <div className="ex-bg-white" />
      <div className="ex-bg" />
      <div className="ex-bg-glow" />

      {/* ── Navbar ── */}
      <Navbar></Navbar>

      {/* ── Main ── */}
      <div className="ex-main">

        {/* Header */}
        <div className="ex-header">
          <div className="ex-badge">
            <span className="ex-badge-dot" />
            Chat History
          </div>
          <h1 className="ex-title">
            Your <span className="ex-title-accent">Conversations</span>
          </h1>
        </div>

        {/* Search */}
        <div className="ex-search-wrap">
          <span className="ex-search-icon"><SearchIcon /></span>
          <input
            className="ex-search"
            placeholder="Search messages, users, tags…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="ex-filters">
          {tags.map(t => (
            <div key={t} className={`ex-chip${filter === t ? ' active' : ''}`} onClick={() => setFilter(t)}>{t}</div>
          ))}
        </div>

        {/* Stats */}
        <div className="ex-stats">
          {[
            { label:`${filtered.length} of ${CHATS.length} chats`, color:'#2563EB' },
            { label:`${CHATS.reduce((a,c) => a+c.messages.length, 0)} total messages`, color:'#0891B2' },
            { label:'Last active Mar 4', color:'#7C3AED' },
          ].map((s,i) => (
            <div key={i} className="ex-stat">
              <span className="ex-stat-dot" style={{ background:s.color }} />
              {s.label}
            </div>
          ))}
        </div>

        {/* Chat list */}
        <div className="ex-list">
          {filtered.length === 0 && (
            <div className="ex-empty">No conversations match your search.</div>
          )}

          {filtered.map((chat, ci) => (
            <div key={chat.id} className="ex-card" style={{ animationDelay:`${0.06 + ci * 0.055}s` }}>
              <div className="ex-card-stripe" />

              {/* Card header */}
              <div className="ex-card-hdr">
                {/* Action buttons */}
                <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                  <div className="ex-hdr-btn close" onClick={() => router.push('/')} title="Close">
                    <CloseIcon />
                  </div>
                  <div className="ex-hdr-btn settings" style={{ position:'relative' }}>
                    <SettingsIcon />
                    {chat.notif > 0 && <div className="ex-notif">{chat.notif}</div>}
                  </div>
                </div>

                {/* Avatar + meta */}
                <div className="ex-avatar">{chat.user.charAt(0)}</div>
                <div className="ex-meta">
                  <span className="ex-chip-user">{chat.user}</span>
                  <span className="ex-chip-date">{chat.date}</span>
                  <span className="ex-chip-tag" style={{ color:chat.tagColor, borderColor:`${chat.tagColor}30`, background:`${chat.tagColor}0a` }}>
                    <SparkleIcon />{chat.tag}
                  </span>
                </div>
                <span className="ex-msg-count">{chat.messages.length} msg{chat.messages.length !== 1 ? 's' : ''}</span>
              </div>

              <div className="ex-sep" />

              {/* Messages */}
              <div className="ex-msgs">
                {chat.messages.map((msg, mi) => (
                  <div key={mi} className={`ex-msg-row${msg.role === 'ai' ? ' ai' : ''}`}>
                    <div className={`ex-msg-av ${msg.role === 'ai' ? 'a' : 'u'}`}>
                      {msg.role === 'ai' ? <BirdLogo size={13} /> : <UserIcon />}
                    </div>
                    <div
                      className={`ex-bubble ${msg.role === 'ai' ? 'a' : 'u'}`}
                      style={{ animationDelay:`${0.06 + ci * 0.055 + mi * 0.05}s` }}
                    >
                      {msg.role === 'ai' && (
                        <div className="ex-ai-label"><BirdLogo size={9} />futurDooM AI</div>
                      )}
                      {msg.role === 'ai' ? renderAiText(msg.text) : <span>{msg.text}</span>}
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