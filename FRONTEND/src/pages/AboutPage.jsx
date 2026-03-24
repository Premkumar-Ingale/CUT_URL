import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { pixelStarfield, pixelCat, gifB, gifC, hoverSound, bgMusic } from '../assets/index.js';


const TECH_BADGES = [
  { label: 'React', emoji: '⚛', color: 'bg-[#b4d3d9]' },
  { label: 'Express', emoji: '🚂', color: 'bg-[#bda6ce]' },
  { label: 'MongoDB', emoji: '🍃', color: 'bg-[#b4d3d9]' },
  { label: 'Redux', emoji: '🔮', color: 'bg-[#bda6ce]' },
  { label: 'TanStack', emoji: '⚡', color: 'bg-[#ffeb3b]' },
  { label: 'Tailwind', emoji: '🎨', color: 'bg-[#b4d3d9]' },
];

const AboutPage = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const [toast, setToast] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef(null);
  const hoverAudioRef = useRef(null);
  const bgMusicRef = useRef(null);

  // Auto-start bg music on mount, stop on unmount
  useEffect(() => {
    const startMusic = () => {
      if (!bgMusicRef.current) {
        bgMusicRef.current = new Audio(bgMusic);
        bgMusicRef.current.loop = true;
        bgMusicRef.current.volume = 0.3;
      }
      bgMusicRef.current.play().catch(() => {});
    };
    // Browsers block autoplay until a user gesture — fire on first click
    window.addEventListener('click', startMusic, { once: true });
    return () => {
      // Stop music when navigating away from About page
      window.removeEventListener('click', startMusic);
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    };
  }, []);

  const cardClass = `border-4 border-black p-5 shadow-[6px_6px_0_var(--shadow-color,#000)] ${isDark ? 'bg-[#0e1038] text-[#c8c8ff]' : 'bg-white text-black'
    }`;

  // ── Hover sound on tech badges ───────────────────────────
  const handleBadgeHover = useCallback(() => {
    try {
      if (!hoverAudioRef.current) hoverAudioRef.current = new Audio(hoverSound);
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.volume = 0.4;
      hoverAudioRef.current.play().catch(() => {});
    } catch {
      // Audio blocked by browser policy — silently ignore
    }
  }, []);

  // ── Speaker button → NaaS joke (music cannot be stopped) ──
  const handleSpeakerClick = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/create/no', { credentials: 'include' });
      const data = await res.json();
      showToast(data.reason || 'No.');
    } catch {
      showToast("NO. MUSIC STAYS.");
    }
  };

  const showToast = (message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    setToastVisible(true);
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 4000);
  };


  return (
    <div className="flex flex-col gap-8 relative pb-20">

      {/* ── HERO ─────────────────────────────── */}
      <div className={`${cardClass} text-center relative overflow-hidden`}>
        <img
          src={pixelStarfield}
          alt="pixel starfield"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />
        <div className="relative z-10">
          <h1
            className={`text-3xl sm:text-5xl font-bold tracking-[0.2em] sm:tracking-[0.3em] ${isDark ? 'text-[#00eaff]' : 'text-[#9b8ec7]'}`}
            style={{ animation: 'pixelBlink 1.5s steps(2) infinite' }}
          >
            &gt; URL.CUTTER
          </h1>
          <p className="text-2xl mt-2">A LINK SHORTENER FOR THE DIGITAL AGE</p>
          <p className={`text-xl mt-1 ${isDark ? 'text-[#9090cc]' : 'text-gray-600'}`}>
            v1.0.0 · BUILT WITH ♥ AND CAFFEINE
          </p>
        </div>
      </div>

      {/* ── GIF B ───────────────────────────── */}
      <div className={`${cardClass} h-44 sm:h-64 p-0 overflow-hidden`}>
        <img
          src={gifB}
          alt="gif b"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── WHAT IS THIS? ────────────────────── */}
      <div className={cardClass}>
        <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-[#00eaff]' : 'text-[#9b8ec7]'}`}>
          // WHAT IS THIS?
        </h2>
        <p className="text-xl leading-relaxed">
          URL.CUTTER IS A FULL-STACK URL SHORTENER WITH A RETRO NEO-BRUTALIST AESTHETIC.
          PASTE A LONG LINK, GET A SHORT ONE. SHARE IT. TRACK CLICKS. LOOK COOL DOING IT.
        </p>
        <p className="text-xl mt-3 leading-relaxed">
          LOGGED-IN USERS CAN CREATE CUSTOM SLUG ALIASES, VIEW THEIR LINK DASHBOARD.
        </p>
      </div>

      {/* ── GIF C ───────────────────────────── */}
      <div className={`${cardClass} h-44 sm:h-64 p-0 overflow-hidden`}>
        <img
          src={gifC}
          alt="gif c"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── PIXEL CAT MASCOT ─────────────────── */}
      <div className={`${cardClass} flex flex-col sm:flex-row items-center gap-6`}>
        <img
          src={pixelCat}
          alt="pixel cat mascot"
          className="w-35 h-32 object-contain border-4 border-black shadow-[4px_4px_0_#000]"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="flex-1">
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-[#00eaff]' : 'text-[#9b8ec7]'}`}>
            MEET ME,
          </h2>
          <p className="text-xl leading-relaxed">
            ME IS CREATOR. HE GUARDS THE LINKS AND WEARS SUNGLASSES BECAUSE HE'S THAT COOL.
            HE ALSO REFUSES TO STOP PLAING MUSIC. DON'T ASK.
          </p>
        </div>
      </div>
      {/* ── BUILT WITH ───────────────────────── */}
      <div className={cardClass}>
        <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-[#00eaff]' : 'text-[#9b8ec7]'}`}>
          // BUILT WITH
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TECH_BADGES.map((b) => (
            <div
              key={b.label}
              onMouseEnter={handleBadgeHover}
              className={`${b.color} border-4 border-black p-3 text-center shadow-[4px_4px_0_#000]
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]
                hover:scale-105 transition-all cursor-pointer select-none`}
            >
              <div className="text-3xl">{b.emoji}</div>
              <div className="text-xl font-bold text-black">{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FUN FACTS ────────────────────────── */}
      <div className={cardClass}>
        <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-[#00eaff]' : 'text-[#9b8ec7]'}`}>
          // FUN FACTS
        </h2>
        <ul className="text-xl space-y-2 list-none">
          <li>» TOTALLY DID NOT USE AI TO BUILD</li>
          <li>» EXPECT FOR LAST PART THOUGH</li>
          <li>» BUILT ON A FRIDAY NIGHT FUELLED BY INSTANT NOODLES</li>
          <li>» EMAILS ARE NOT VERIFIED SO YOU CAN PUT ANY STRING AND YOU ARE IN FOR A FUN RIDE</li>
          <li>» I TOTSLLY CAN NOT SEE YOUR LINKS!! PROMISS</li>
        </ul>
      </div>

      {/* ── FIXED SPEAKER BUTTON ─────────────── */}
      <button
        onClick={handleSpeakerClick}
        title="Stop music (good luck)"
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 text-3xl sm:text-4xl px-3 py-2 sm:px-4 sm:py-3 border-4 border-black
          shadow-[6px_6px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]
          hover:shadow-[2px_2px_0_#000] transition-all active:shadow-none
          ${isDark ? 'bg-[#0e1038] text-yellow-300' : 'bg-[#ffeb3b] text-black'}`}
      >
        🔊
      </button>

      {/* ── NAAS TOAST NOTIFICATION ──────────── */}
      {toast && (
        <div
          className={`fixed bottom-24 right-4 left-4 sm:left-auto sm:max-w-sm z-50
            border-4 border-black p-4 shadow-[6px_6px_0_#000] transition-all duration-500
            ${isDark ? 'bg-[#120c3a] text-[#00eaff]' : 'bg-[#ef4444] text-white'}
            ${toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="text-sm font-bold uppercase tracking-widest mb-1 opacity-70">
            🔇 STOP MUSIC SYSTEM RESPONSE:
          </div>
          <div className="text-xl font-bold leading-tight">{toast}</div>
        </div>
      )}

    </div>
  );
};

export default AboutPage;
