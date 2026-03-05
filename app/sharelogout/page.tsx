'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { UserRound } from 'lucide-react'

const BirdLogo = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 72 72" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="eg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22D3EE"/><stop offset="50%" stopColor="#3882F6"/><stop offset="100%" stopColor="#818CF8"/>
      </linearGradient>
      <linearGradient id="eg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA"/><stop offset="100%" stopColor="#22D3EE"/>
      </linearGradient>
    </defs>
    <path d="M16 30 Q28 10 48 18 Q40 26 26 27 Z" fill="url(#eg2)" opacity="0.9"/>
    <path d="M18 36 Q34 18 52 24 Q43 34 28 33 Z" fill="url(#eg1)" opacity="0.75"/>
    <ellipse cx="38" cy="40" rx="13" ry="8" fill="url(#eg1)" transform="rotate(-18 38 40)"/>
    <path d="M47 46 Q60 56 55 64 Q50 57 45 53 Z" fill="url(#eg2)" opacity="0.8"/>
    <circle cx="28" cy="32" r="7.5" fill="url(#eg1)"/>
    <circle cx="26" cy="30" r="2.2" fill="white" opacity="0.95"/>
    <circle cx="26.5" cy="30.5" r="1" fill="#0A1628"/>
    <path d="M23 33 Q15 32 11 34" stroke="url(#eg2)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
  </svg>
)
const CloseIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
const SettingsIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
const ArrowRightIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
const SearchIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
const SparkleIcon = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>

const STARS_BG = Array.from({ length: 50 }, (_, i) => ({
  id: i, x: (i * 17.3) % 100, y: (i * 13.7) % 100,
  size: (i % 3) * 0.7 + 0.5, delay: (i % 4) * 1.1, dur: (i % 3) * 1.5 + 2.5,
}))

type Message = { role: 'user' | 'ai'; text: string }
type Chat = { id: number; user: string; date: string; messages: Message[]; tag: string; tagColor: string; notif: number }

const CHATS: Chat[] = [
  {
    id: 1, user: 'Shiv Kumar', date: 'Mar 4, 2026', tag: 'General', tagColor: '#3882F6', notif: 3,
    messages: [
      { role: 'user', text: 'hi' },
      { role: 'ai', text: '👋 Hi Shiv Kumar, nice to meet you! How can I assist you today? 🤔' },
    ],
  },
  {
    id: 2, user: 'Shiv Kumar', date: 'Mar 3, 2026', tag: 'Dev Help', tagColor: '#22D3EE', notif: 1,
    messages: [
      { role: 'user', text: 'how to do frontend in html' },
      { role: 'ai', text: 'To create a frontend in HTML, follow these steps:\n\n1. **Define Structure** — Use semantic tags like `<header>`, `<main>`, `<section>`, `<footer>` to build your page skeleton.\n\n2. **Style with CSS** — Link a stylesheet or use `<style>` tags to handle layout, colors, and typography.\n\n3. **Add Interactivity** — Include JavaScript via `<script>` to handle events and dynamic behavior.' },
    ],
  },
  {
    id: 3, user: 'Shiv Kumar', date: 'Mar 2, 2026', tag: 'Emotions', tagColor: '#818CF8', notif: 0,
    messages: [
      { role: 'user', text: 'I feel really overwhelmed today' },
      { role: 'ai', text: "I hear you 💙 It's completely okay to feel overwhelmed sometimes. Would you like to talk about what's going on, or would you prefer some calming techniques to help ground yourself?" },
      { role: 'user', text: 'just work stress mostly' },
      { role: 'ai', text: "Work stress can really pile up 😔 Try breaking your tasks into smaller chunks and give yourself permission to step away for 5 minutes every hour. You don't have to solve everything today. One breath at a time 🌿" },
    ],
  },
  {
    id: 4, user: 'Priya Sharma', date: 'Mar 2, 2026', tag: 'AI Chat', tagColor: '#F59E0B', notif: 2,
    messages: [
      { role: 'user', text: 'Can you write a short poem about the night sky?' },
      { role: 'ai', text: "Of course! Here's one:\n\n**Infinite Canvas**\n\nSilver dust on velvet black,\nStars that never find their way back.\nA quiet hum of ancient light —\nThe universe exhales at night. 🌌" },
      { role: 'user', text: 'That was beautiful, thank you!' },
      { role: 'ai', text: "You're so welcome ✨ The night sky has always been humanity's greatest source of wonder. Glad it resonated with you!" },
    ],
  },
  {
    id: 5, user: 'Rahul Verma', date: 'Mar 1, 2026', tag: 'Dev Help', tagColor: '#22D3EE', notif: 0,
    messages: [
      { role: 'user', text: 'whats the difference between var let and const in javascript' },
      { role: 'ai', text: "Great question! Here's a quick breakdown:\n\n**`var`** — Function-scoped, hoisted, can be re-declared. Avoid in modern code.\n\n**`let`** — Block-scoped, not re-declarable in same scope, mutable. Use for variables that change.\n\n**`const`** — Block-scoped, must be initialized, cannot be reassigned. Use by default.\n\nRule of thumb: always start with `const`, switch to `let` only when you need to reassign." },
      { role: 'user', text: 'oh that makes sense, so const most of the time?' },
      { role: 'ai', text: "Exactly! 🎯 Using `const` as default makes your code more predictable. Only reach for `let` when you genuinely need to reassign a value, like a counter in a loop." },
    ],
  },
  {
    id: 6, user: 'Ananya Das', date: 'Feb 28, 2026', tag: 'Emotions', tagColor: '#818CF8', notif: 1,
    messages: [
      { role: 'user', text: 'I had a really good day today 😊' },
      { role: 'ai', text: "That's wonderful to hear! 🌟 What made it special?" },
      { role: 'user', text: 'got my project approved at work and had dinner with old friends' },
      { role: 'ai', text: "Two amazing things in one day — that's rare and precious! 🎉 The project approval means your hard work paid off, and reconnecting with old friends fills a part of you that nothing else can. You deserve days like this more often 💛" },
    ],
  },
  {
    id: 7, user: 'Shiv Kumar', date: 'Feb 27, 2026', tag: 'General', tagColor: '#3882F6', notif: 0,
    messages: [
      { role: 'user', text: 'what is machine learning in simple words' },
      { role: 'ai', text: "Machine learning is teaching computers to learn from examples instead of following rigid rules 🤖\n\nImagine showing a child 1000 pictures of cats and dogs. After enough examples, they can identify a new photo correctly.\n\nML works the same way: feed the computer lots of data, it finds patterns, and then it makes predictions on new data. No hard-coded rules — just learned patterns." },
      { role: 'user', text: 'wow thats actually really easy to understand' },
      { role: 'ai', text: "Glad it clicked! 😊 At its core, ML is really just pattern recognition at scale. The maths gets complex, but the intuition stays that simple." },
    ],
  },
  {
    id: 8, user: 'Rohan Mehta', date: 'Feb 25, 2026', tag: 'Life Advice', tagColor: '#34D399', notif: 0,
    messages: [
      { role: 'user', text: 'should I switch jobs or stay at my current company?' },
      { role: 'ai', text: "That's a big decision — let me help you think through it 🤝\n\nAsk yourself:\n\n1. **Growth** — Are you still learning and being challenged?\n2. **Compensation** — Are you fairly paid?\n3. **Culture** — Do you feel respected?\n4. **Future** — Does this company align with where you want to be in 3 years?\n\nIf 2 or more answers are 'no', it's probably worth exploring. What's your gut feeling?" },
      { role: 'user', text: 'honestly I feel stuck and undervalued' },
      { role: 'ai', text: "That gut feeling is important data 📊 Feeling stuck and undervalued erodes your confidence over time. It might be worth quietly exploring the market — not as a commitment to leave, but as information gathering. You might discover you're worth more than you think 💪" },
    ],
  },
  {
    id: 9, user: 'Meera Pillai', date: 'Feb 23, 2026', tag: 'AI Chat', tagColor: '#F59E0B', notif: 3,
    messages: [
      { role: 'user', text: 'explain quantum computing like im 10' },
      { role: 'ai', text: "Okay! Imagine a normal computer is like a light switch — it's either ON (1) or OFF (0) 💡\n\nA quantum computer is like a magic dimmer switch that can be ON, OFF, or **both at the same time** — this is called a superposition.\n\nBecause quantum computers can explore many possibilities simultaneously, they can solve certain massive problems way faster — like cracking codes or simulating molecules for new medicines. 🧬" },
      { role: 'user', text: 'so its like cheating at guessing?' },
      { role: 'ai', text: "Ha! That's actually a brilliant way to put it 😄 Yes — it's like trying all doors in a hallway at once instead of one by one. Not cheating exactly, but definitely playing by different rules!" },
    ],
  },
  {
    id: 10, user: 'Shiv Kumar', date: 'Feb 20, 2026', tag: 'Dev Help', tagColor: '#22D3EE', notif: 0,
    messages: [
      { role: 'user', text: 'how to center a div in css' },
      { role: 'ai', text: "The classic question! 😄 Here are the modern ways:\n\n**Flexbox (recommended):**\n`display: flex; align-items: center; justify-content: center;`\n\n**Grid:**\n`display: grid; place-items: center;`\n\n**Absolute positioning:**\n`position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`\n\nFor most cases, Flexbox or Grid is your best friend." },
      { role: 'user', text: 'flexbox worked perfectly, thanks!' },
      { role: 'ai', text: "Flexbox for the win! 🏆 Once you get comfortable with it, you'll reach for it instinctively for almost every layout challenge." },
    ],
  },
  {
    id: 11, user: 'Vikram Nair', date: 'Feb 18, 2026', tag: 'Life Advice', tagColor: '#34D399', notif: 0,
    messages: [
      { role: 'user', text: 'how do I stop procrastinating?' },
      { role: 'ai', text: "Procrastination is almost never about laziness — it's usually about **emotion** 🧠\n\nWe avoid tasks because they feel overwhelming, boring, or anxiety-inducing. The fix isn't willpower — it's lowering the activation energy.\n\nTry the **2-minute rule**: if something takes less than 2 minutes, do it now. For bigger tasks, commit to just starting for 5 minutes. You'll usually keep going." },
      { role: 'user', text: 'the 5 minute thing actually worked today!!' },
      { role: 'ai', text: "That's the magic of it! 🎉 Starting is always the hardest part. Once you're in motion, momentum takes over. You just need to trick your brain into beginning 🚀" },
    ],
  },
  {
    id: 12, user: 'Sneha Joshi', date: 'Feb 15, 2026', tag: 'General', tagColor: '#3882F6', notif: 0,
    messages: [
      { role: 'user', text: 'what are some good habits to build in 2026?' },
      { role: 'ai', text: "Great question! Here are some high-impact habits:\n\n**Mind** 📚\n— Read 10 pages daily\n— Journal for 5 minutes each morning\n— Limit doom-scrolling to 30 min/day\n\n**Body** 🏃\n— Walk 8,000 steps daily\n— Sleep 7-8 hours consistently\n— Drink water before coffee\n\n**Career** 💼\n— Learn one new skill per quarter\n— Do a weekly review every Friday\n\nPick just 2-3 to start. Small and consistent beats ambitious and abandoned." },
    ],
  },
]

export default function ExplorePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [mouse,   setMouse]   = useState({ x: -100, y: -100 })
  const [ring,    setRing]    = useState({ x: -100, y: -100 })
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('All')
  const rafRef   = useRef<number>(0)
  const mouseRef = useRef({ x: -100, y: -100 })

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; setMouse({ x: e.clientX, y: e.clientY }) }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  useEffect(() => {
    let rx = -100, ry = -100
    const tick = () => { rx += (mouseRef.current.x - rx) * 0.1; ry += (mouseRef.current.y - ry) * 0.1; setRing({ x: rx, y: ry }); rafRef.current = requestAnimationFrame(tick) }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const tags = ['All', ...Array.from(new Set(CHATS.map(c => c.tag)))]

  const filtered = CHATS.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = q === '' ||
      c.messages.some(m => m.text.toLowerCase().includes(q)) ||
      c.user.toLowerCase().includes(q) ||
      c.date.toLowerCase().includes(q) ||
      c.tag.toLowerCase().includes(q)
    const matchFilter = filter === 'All' || c.tag === filter
    return matchSearch && matchFilter
  })

  const renderAiText = (text: string) => text.split('\n').map((line, i) => {
    const html = line
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:rgba(226,232,248,.92);font-weight:600">$1</strong>')
      .replace(/`(.*?)`/g, '<code style="background:rgba(56,130,246,.15);padding:1px 6px;border-radius:4px;font-size:.82em;font-family:monospace;color:#60A5FA">$1</code>')
    return <p key={i} style={{ marginBottom: line === '' ? 6 : 0, lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} />
  })

  if (!mounted) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        @keyframes aurora{0%,100%{transform:translate(0,0)scale(1);opacity:.6}25%{transform:translate(35px,-25px)scale(1.07);opacity:.8}50%{transform:translate(-18px,18px)scale(.95);opacity:.5}75%{transform:translate(25px,12px)scale(1.04);opacity:.7}}
        @keyframes starTwinkle{0%,100%{opacity:.06}50%{opacity:.5}}
        @keyframes slideUp{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
        @keyframes dotPulse{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
        @keyframes ringRotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes ringRotateReverse{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(56,130,246,.28),0 0 18px rgba(56,130,246,.18)}50%{box-shadow:0 0 0 6px rgba(56,130,246,0),0 0 32px rgba(56,130,246,.38)}}
        @keyframes cardIn{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes msgIn{0%{opacity:0;transform:translateX(-8px)}100%{opacity:1;transform:translateX(0)}}
        @keyframes msgInRight{0%{opacity:0;transform:translateX(8px)}100%{opacity:1;transform:translateX(0)}}
        @keyframes badgePop{0%{transform:scale(.7);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{overflow-x:hidden;scroll-behavior:smooth}
        body{background:#05070F;min-height:100vh;color:#E2E8F8;-webkit-font-smoothing:antialiased;font-family:'DM Sans',system-ui,sans-serif}
@media(hover:hover)and(pointer:fine){*{cursor:none!important}.c-dot{position:fixed;z-index:999999;width:6px;height:6px;border-radius:50%;background:#3882F6;pointer-events:none;box-shadow:0 0 10px #3882F6;transform:translate(-50%,-50%);will-change:transform}.c-ring{position:fixed;z-index:999998;width:26px;height:26px;border-radius:50%;border:1.5px solid rgba(56,130,246,.45);pointer-events:none;transform:translate(-50%,-50%);transition:width .3s,height .3s;will-change:transform}}
@media(max-width:768px){.c-dot,.c-ring{display:none!important}*{cursor:auto!important}}
        .page-bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
        .au1{position:absolute;border-radius:50%;width:min(65vw,580px);height:min(65vw,580px);top:-15%;left:-10%;background:radial-gradient(circle,rgba(56,130,246,.18) 0%,transparent 65%);animation:aurora 18s ease-in-out infinite;filter:blur(44px)}
        .au2{position:absolute;border-radius:50%;width:min(55vw,500px);height:min(55vw,500px);bottom:-10%;right:-8%;background:radial-gradient(circle,rgba(34,211,238,.12) 0%,transparent 65%);animation:aurora 22s ease-in-out infinite reverse;animation-delay:-8s;filter:blur(52px)}
        .au3{position:absolute;border-radius:50%;width:min(42vw,400px);height:min(42vw,400px);top:38%;left:42%;transform:translateX(-50%);background:radial-gradient(circle,rgba(129,140,248,.1) 0%,transparent 65%);animation:aurora 26s ease-in-out infinite;animation-delay:-14s;filter:blur(56px)}
        .grid-ov{position:absolute;inset:0;background-image:linear-gradient(rgba(56,130,246,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(56,130,246,.03) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%)}
        .star-bg{position:absolute;border-radius:50%;background:white}
        .navbar{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(16px,4vw,40px);height:clamp(52px,8vw,64px);background:rgba(5,7,15,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(56,130,246,.12)}
        .nav-brand{display:flex;align-items:center;gap:10px;text-decoration:none}
        .nav-logo-ring-wrap{position:relative;width:44px;height:44px;display:flex;align-items:center;justify-content:center}
        .nav-ring-o{position:absolute;inset:0;border-radius:50%;border:1px dashed rgba(56,130,246,.28);animation:ringRotate 18s linear infinite}
        .nav-ring-i{position:absolute;inset:7px;border-radius:50%;border:1px solid rgba(34,211,238,.16);animation:ringRotateReverse 12s linear infinite}
        .nav-core{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#0f1e3c,#0a1628);border:1px solid rgba(56,130,246,.25);display:flex;align-items:center;justify-content:center;position:relative;z-index:1;animation:pulseGlow 3.5s ease-in-out infinite}
        .brand-text{font-family:'Syne',sans-serif;font-size:clamp(1.05rem,3vw,1.3rem);font-weight:800;letter-spacing:-.02em}
        .brand-futur{color:rgba(226,232,248,.7);font-weight:700}
        .brand-doom{background:linear-gradient(90deg,#3882F6,#60A5FA,#22D3EE,#818CF8,#3882F6);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 5s linear infinite}
        .nav-icon-btn{width:36px;height:36px;border-radius:50%;border:1px solid rgba(56,130,246,.2);background:rgba(13,21,38,.7);color:rgba(100,116,139,.8);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s ease}
        .nav-icon-btn:hover{border-color:rgba(56,130,246,.5);color:#3882F6;background:rgba(56,130,246,.1)}
        .main-wrap{position:relative;z-index:10;min-height:calc(100vh - 64px);display:flex;flex-direction:column;padding:clamp(20px,4vw,44px) clamp(16px,5vw,40px) 0;max-width:860px;margin:0 auto;width:100%}
        .page-header{margin-bottom:clamp(14px,3vw,26px);animation:slideUp .7s cubic-bezier(.16,1,.3,1) .1s both}
        .page-badge{display:inline-flex;align-items:center;gap:7px;padding:4px 14px;border-radius:999px;background:rgba(56,130,246,.08);border:1px solid rgba(56,130,246,.2);color:rgba(99,179,237,.85);font-size:.67rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px}
        .page-title{font-family:'Syne',sans-serif;font-size:clamp(1.7rem,5vw,3rem);font-weight:800;letter-spacing:-.03em;line-height:1.05}
        .title-light{color:rgba(226,232,248,.5);font-weight:700}
        .title-accent{background:linear-gradient(90deg,#60A5FA,#22D3EE);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .search-wrap{position:relative;margin-bottom:clamp(10px,2vw,16px);animation:slideUp .7s cubic-bezier(.16,1,.3,1) .18s both}
        .search-icon-el{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:rgba(100,116,139,.42);pointer-events:none}
        .search-input{width:100%;background:rgba(13,21,38,.85);border:1px solid rgba(56,130,246,.13);border-radius:12px;padding:11px 14px 11px 40px;font-family:'DM Sans',system-ui,sans-serif;font-size:clamp(.8rem,2vw,.875rem);color:#E2E8F8;outline:none;transition:border-color .25s,box-shadow .25s}
        .search-input::placeholder{color:rgba(100,116,139,.36)}
        .search-input:focus{border-color:rgba(56,130,246,.45);box-shadow:0 0 0 3px rgba(56,130,246,.07)}
        .filter-row{display:flex;gap:7px;margin-bottom:clamp(12px,2.5vw,20px);flex-wrap:wrap;animation:slideUp .7s cubic-bezier(.16,1,.3,1) .24s both}
        .filter-chip{padding:5px 13px;border-radius:999px;font-size:.68rem;font-weight:600;letter-spacing:.04em;cursor:pointer;border:1px solid rgba(56,130,246,.14);background:rgba(13,21,38,.8);color:rgba(100,116,139,.65);transition:all .2s ease;white-space:nowrap}
        .filter-chip:hover{border-color:rgba(56,130,246,.32);color:rgba(226,232,248,.75)}
        .filter-chip.active{background:rgba(56,130,246,.14);border-color:rgba(56,130,246,.42);color:#60A5FA}
        .stats-row{display:flex;gap:clamp(6px,1.5vw,11px);margin-bottom:clamp(14px,3vw,24px);animation:slideUp .7s cubic-bezier(.16,1,.3,1) .28s both;flex-wrap:wrap}
        .stat-pill{display:flex;align-items:center;gap:6px;padding:5px 11px;border-radius:999px;background:rgba(13,21,38,.85);border:1px solid rgba(56,130,246,.11);font-size:.68rem;font-weight:500;color:rgba(100,116,139,.72)}
        .stat-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
        .chats-list{display:flex;flex-direction:column;gap:clamp(10px,2vw,16px);padding-bottom:clamp(24px,5vw,48px)}
        .chat-card{background:linear-gradient(145deg,rgba(13,21,38,.93) 0%,rgba(11,18,34,.97) 100%);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(56,130,246,.12);border-radius:18px;overflow:hidden;transition:border-color .3s ease,box-shadow .3s ease;animation:cardIn .65s cubic-bezier(.16,1,.3,1) both;position:relative}
        .chat-card::before{content:'';position:absolute;top:0;left:18%;right:18%;height:1px;background:linear-gradient(90deg,transparent,rgba(99,179,237,.25),transparent);pointer-events:none}
        .chat-card:hover{border-color:rgba(56,130,246,.22);box-shadow:0 0 30px rgba(56,130,246,.06)}
        .card-header{display:flex;align-items:center;justify-content:space-between;padding:clamp(11px,2vw,15px) clamp(14px,3vw,20px);flex-wrap:wrap;gap:8px}
        .hdr-btn{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid rgba(56,130,246,.15);background:rgba(13,21,38,.7);color:rgba(100,116,139,.6);transition:all .25s ease;position:relative;flex-shrink:0}
        .hdr-btn.close:hover{border-color:rgba(239,68,68,.4);background:rgba(239,68,68,.1);color:#F87171}
        .hdr-btn.settings:hover{border-color:rgba(56,130,246,.5);background:rgba(56,130,246,.1);color:#3882F6}
        .notif-badge{position:absolute;top:-5px;right:-5px;width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#7C3AED,#9333EA);border:1.5px solid rgba(5,7,15,.9);display:flex;align-items:center;justify-content:center;font-size:.5rem;font-weight:700;color:white;animation:badgePop .4s cubic-bezier(.34,1.56,.64,1) both;z-index:2}
        .user-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,rgba(56,130,246,.17),rgba(34,211,238,.11));border:1.5px solid rgba(56,130,246,.2);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:.75rem;font-weight:800;color:rgba(56,130,246,.85);flex-shrink:0}
        .meta-chips{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
        .meta-chip{padding:3px 9px;border-radius:999px;font-size:.6rem;font-weight:600;letter-spacing:.04em}
        .meta-chip.user{background:rgba(56,130,246,.09);border:1px solid rgba(56,130,246,.18);color:rgba(99,179,237,.82)}
        .meta-chip.date{background:rgba(100,116,139,.06);border:1px solid rgba(100,116,139,.13);color:rgba(100,116,139,.62)}
        .meta-chip.tag{border:1px solid;font-size:.57rem;display:inline-flex;align-items:center;gap:4px}
        .card-sep{height:1px;background:linear-gradient(90deg,transparent,rgba(56,130,246,.1),transparent);margin:0 clamp(14px,3vw,20px)}
        .messages-area{padding:clamp(11px,2vw,15px) clamp(14px,3vw,20px) clamp(12px,2.5vw,16px);display:flex;flex-direction:column;gap:9px}
        .msg-row{display:flex;align-items:flex-end;gap:8px}
        .msg-row.ai-row{justify-content:flex-end}
        .msg-av{width:25px;height:25px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .msg-av.u{background:rgba(56,130,246,.11);border:1px solid rgba(56,130,246,.17)}
        .msg-av.a{background:linear-gradient(135deg,#0f1e3c,#0a1628);border:1px solid rgba(56,130,246,.23)}
        .msg-bubble{max-width:min(78%,520px);padding:clamp(8px,1.8vw,11px) clamp(10px,2.2vw,14px);border-radius:14px;font-size:clamp(.76rem,2vw,.855rem);line-height:1.65}
        .msg-bubble.u-bub{background:rgba(56,130,246,.1);border:1px solid rgba(56,130,246,.17);border-bottom-left-radius:4px;color:rgba(226,232,248,.86);animation:msgIn .4s cubic-bezier(.16,1,.3,1) both}
        .msg-bubble.a-bub{background:linear-gradient(135deg,rgba(13,21,44,.96),rgba(10,17,36,.99));border:1px solid rgba(56,130,246,.12);border-bottom-right-radius:4px;color:rgba(226,232,248,.8);animation:msgInRight .4s cubic-bezier(.16,1,.3,1) .07s both;position:relative}
        .msg-bubble.a-bub::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(99,179,237,.16),transparent);border-radius:14px 14px 0 0}
        .ai-label{font-size:.57rem;color:rgba(56,130,246,.52);font-weight:600;letter-spacing:.07em;text-transform:uppercase;margin-bottom:5px;display:flex;align-items:center;gap:4px}
        .footer{position:relative;z-index:10;border-top:1px solid rgba(56,130,246,.09);padding:clamp(13px,3vw,18px) clamp(16px,5vw,40px);margin-top:auto}
        .footer-inner{max-width:860px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px}
        .footer-link{color:rgba(100,116,139,.48);font-size:.7rem;text-decoration:none;letter-spacing:.01em;white-space:nowrap;transition:color .2s ease}
        .footer-link:hover{color:#3882F6}
        .nav-icon-btn{position:relative}
.nav-icon-btn .tooltip{position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);background:rgba(13,21,38,.95);border:1px solid rgba(56,130,246,.2);color:rgba(226,232,248,.8);font-size:.6rem;font-weight:600;letter-spacing:.05em;padding:3px 8px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s ease;z-index:999999}
.nav-icon-btn:hover .tooltip{opacity:1}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#05070F}::-webkit-scrollbar-thumb{background:rgba(56,130,246,.22);border-radius:3px}
      `}</style>

      {/* <div className="c-dot" style={{ left: mouse.x, top: mouse.y }} />
      <div className="c-ring" style={{ left: ring.x, top: ring.y }} /> */}

      <div className="page-bg">
        <div className="au1" /><div className="au2" /><div className="au3" />
        <div className="grid-ov" />
        {STARS_BG.map(s => (
          <div key={s.id} className="star-bg" style={{ left:`${s.x}%`, top:`${s.y}%`, width:s.size, height:s.size, opacity:.11, animation:`starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
        ))}
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="nav-brand">
          <div className="nav-logo-ring-wrap">
            <div className="nav-ring-o" /><div className="nav-ring-i" />
            <div className="nav-core"><BirdLogo size={20} /></div>
          </div>
          <span className="brand-text">
            <span className="brand-futur">futur</span>
            <span className="brand-doom">DooM</span>
          </span>
        </a>
        <div style={{ display:'flex', gap:9, alignItems:'center' }}>
  <button className="nav-icon-btn" aria-label="Login">
    <UserRound className='h-6 w-6' />
    <span className="tooltip">Login</span>
  </button>
  <button className="nav-icon-btn" onClick={() => router.push('/')} aria-label="Close">
    <ArrowRightIcon />
    <span className="tooltip">Close</span>
  </button>
</div>
      </nav>

      {/* Main */}
      <div className="main-wrap">
        <div className="page-header">
          <div className="page-badge">
            <span style={{ display:'inline-block', width:5, height:5, borderRadius:'50%', background:'#22D3EE', boxShadow:'0 0 7px #22D3EE', animation:'dotPulse 2s ease-in-out infinite' }} />
            Chat History
          </div>
          <h1 className="page-title">
            <span className="title-light">Your </span>
            <span className="title-accent">Conversations</span>
          </h1>
        </div>

        {/* Search */}
        <div className="search-wrap">
          <div className="search-icon-el"><SearchIcon /></div>
          <input className="search-input" placeholder="Search messages, users, tags…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Filter chips */}
        <div className="filter-row">
          {tags.map(t => (
            <div key={t} className={`filter-chip ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</div>
          ))}
        </div>

        {/* Stats */}
        <div className="stats-row">
          {[
            { label: `${filtered.length} of ${CHATS.length} chats`, color: '#3882F6' },
            { label: `${CHATS.reduce((a,c) => a + c.messages.length, 0)} total messages`, color: '#22D3EE' },
            { label: 'Last active Mar 4', color: '#818CF8' },
          ].map((s, i) => (
            <div key={i} className="stat-pill">
              <div className="stat-dot" style={{ background: s.color, boxShadow: `0 0 5px ${s.color}` }} />
              {s.label}
            </div>
          ))}
        </div>

        {/* Chats — all pre-expanded */}
        <div className="chats-list">
          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'48px 20px', color:'rgba(100,116,139,.42)', fontSize:'.875rem' }}>
              No conversations match your search.
            </div>
          )}
          {filtered.map((chat, ci) => (
            <div key={chat.id} className="chat-card" style={{ animationDelay: `${0.06 + ci * 0.06}s` }}>

              {/* Header */}
              <div className="card-header">
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div className="hdr-btn close" onClick={() => router.push('/page')} title="Close → /page">
                    <CloseIcon />
                  </div>
                  <div className="hdr-btn settings" style={{ position:'relative' }}>
                    <SettingsIcon />
                    {chat.notif > 0 && <div className="notif-badge">{chat.notif}</div>}
                  </div>
                </div>

                <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, marginLeft:8, flexWrap:'wrap', minWidth:0 }}>
                  <div className="user-avatar">{chat.user.charAt(0)}</div>
                  <div className="meta-chips">
                    <span className="meta-chip user">{chat.user}</span>
                    <span className="meta-chip date">{chat.date}</span>
                    <span className="meta-chip tag" style={{ color: chat.tagColor, borderColor: `${chat.tagColor}35`, background: `${chat.tagColor}0c` }}>
                      <SparkleIcon />{chat.tag}
                    </span>
                  </div>
                </div>

                <span style={{ fontSize:'.6rem', color:'rgba(100,116,139,.38)', whiteSpace:'nowrap', flexShrink:0 }}>
                  {chat.messages.length} msg{chat.messages.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="card-sep" />

              {/* Messages always visible */}
              <div className="messages-area">
                {chat.messages.map((msg, mi) => (
                  <div key={mi} className={`msg-row ${msg.role === 'ai' ? 'ai-row' : ''}`}>
                    {msg.role === 'user' && (
                      <div className="msg-av u">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(56,130,246,.7)" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                    )}
                    <div
                      className={`msg-bubble ${msg.role === 'user' ? 'u-bub' : 'a-bub'}`}
                      style={{ animationDelay: `${0.06 + ci * 0.06 + mi * 0.05}s` }}
                    >
                      {msg.role === 'ai' && (
                        <div className="ai-label"><BirdLogo size={9} />futurDooM AI</div>
                      )}
                      {msg.role === 'ai' ? renderAiText(msg.text) : <span>{msg.text}</span>}
                    </div>
                    {msg.role === 'ai' && (
                      <div className="msg-av a"><BirdLogo size={14} /></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <nav style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
            {['Disclaimer','Visit Us','Contact Us'].map(l => <a key={l} href="#" className="footer-link">{l}</a>)}
          </nav>
          <nav style={{ display:'flex', gap:13, flexWrap:'wrap', alignItems:'center' }}>
            {['Privacy Policy','Terms & Conditions'].map(l => <a key={l} href="#" className="footer-link">{l}</a>)}
            <span className="footer-link">© 2026 futurDooM Platform, Inc. All rights reserved.</span>
          </nav>
        </div>
      </footer>
      <div className="c-dot" style={{ left: mouse.x, top: mouse.y }} />
      <div className="c-ring" style={{ left: ring.x, top: ring.y }} />
    </>
  )
}