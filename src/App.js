import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import '@fortawesome/fontawesome-free/css/all.min.css';

/* ─── BRUTALIST THEME ─────────────────────────────────────────────── */
const B = {
  black: '#0a0a0a',
  white: '#f5f0e8',
  yellow: '#f5e642',
  red: '#e63329',
  blue: '#1a1aff',
  border: '3px solid #0a0a0a',
  shadow: '6px 6px 0px #0a0a0a',
  shadowLg: '10px 10px 0px #0a0a0a',
};

/* ─── GLOBAL STYLES injected once ────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: ${B.white};
      color: ${B.black};
      font-family: 'Space Grotesk', sans-serif;
      overflow-x: hidden;
    }
    ::selection { background: ${B.yellow}; color: ${B.black}; }
    a { color: inherit; text-decoration: none; }
    button { cursor: pointer; background: none; border: none; font-family: inherit; }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: ${B.white}; }
    ::-webkit-scrollbar-thumb { background: ${B.black}; border: 2px solid ${B.white}; }

    /* ── Nav ── */
    .brut-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: ${B.yellow};
      border-bottom: ${B.border};
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 2rem;
      height: 64px;
      transition: background 0.2s;
    }
    .brut-nav.dark {
      background: ${B.black};
      border-color: ${B.yellow};
    }
    .logo-brut {
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      font-size: 1.3rem;
      letter-spacing: -1px;
      border: ${B.border};
      padding: 4px 12px;
      background: ${B.white};
      box-shadow: 3px 3px 0 ${B.black};
      cursor: pointer;
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .logo-brut:hover { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 ${B.black}; }
    .nav-links { display: flex; gap: 0; }
    .nav-link-brut {
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 8px 20px;
      border-left: ${B.border};
      background: transparent;
      color: ${B.black};
      transition: background 0.15s;
    }
    .dark .nav-link-brut { color: ${B.yellow}; border-color: ${B.yellow}; }
    .nav-link-brut:hover { background: ${B.black}; color: ${B.yellow}; }
    .dark .nav-link-brut:hover { background: ${B.yellow}; color: ${B.black}; }

    /* ── Sections ── */
    section { padding: 120px 2rem 80px; max-width: 1100px; margin: 0 auto; }

    /* ── Marquee ── */
    .marquee-wrap {
      overflow: hidden;
      border-top: ${B.border};
      border-bottom: ${B.border};
      background: ${B.black};
      padding: 12px 0;
    }
    .marquee-track {
      display: flex; gap: 40px;
      animation: marquee 18s linear infinite;
      width: max-content;
    }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .marquee-item {
      font-family: 'Space Mono', monospace;
      color: ${B.yellow};
      font-size: 1rem;
      font-weight: 700;
      white-space: nowrap;
      letter-spacing: 2px;
    }

    /* ── Cards ── */
    .project-card-brut {
      border: ${B.border};
      box-shadow: ${B.shadow};
      padding: 28px;
      background: ${B.white};
      transition: transform 0.15s, box-shadow 0.15s;
      cursor: default;
    }
    .project-card-brut:hover {
      transform: translate(-4px, -4px);
      box-shadow: ${B.shadowLg};
    }
    .tech-badge {
      display: inline-block;
      border: 2px solid ${B.black};
      padding: 2px 10px;
      font-family: 'Space Mono', monospace;
      font-size: 0.75rem;
      font-weight: 700;
      margin: 4px 4px 0 0;
      text-transform: uppercase;
    }
    .skill-tag-brut {
      display: inline-flex; align-items: center; gap: 6px;
      border: 2px solid ${B.black};
      padding: 5px 14px;
      font-weight: 700;
      font-size: 0.85rem;
      margin: 5px;
      background: ${B.white};
      box-shadow: 3px 3px 0 ${B.black};
    }

    /* ── Decorative lines ── */
    .h-rule { border: none; border-top: 3px solid ${B.black}; margin: 0; }

    /* ── Contact ── */
    .contact-block {
      border: ${B.border};
      box-shadow: ${B.shadowLg};
      padding: 60px 48px;
      background: ${B.yellow};
      text-align: center;
      position: relative;
    }
    .contact-btn-brut {
      display: inline-flex; align-items: center; gap: 10px;
      border: ${B.border};
      padding: 14px 36px;
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      background: ${B.black};
      color: ${B.yellow};
      box-shadow: 5px 5px 0 ${B.black};
      transition: transform 0.1s, box-shadow 0.1s;
      margin-top: 30px;
    }
    .contact-btn-brut:hover { transform: translate(-3px,-3px); box-shadow: 8px 8px 0 ${B.black}; }

    /* ── Footer ── */
    .footer-brut {
      border-top: ${B.border};
      background: ${B.black};
      color: ${B.yellow};
      padding: 32px 2rem;
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 16px;
    }
    .social-link-brut {
      display: inline-flex; align-items: center; justify-content: center;
      width: 44px; height: 44px;
      border: 2px solid ${B.yellow};
      color: ${B.yellow};
      font-size: 18px;
      box-shadow: 3px 3px 0 ${B.yellow};
      transition: transform 0.1s, box-shadow 0.1s, background 0.1s;
    }
    .social-link-brut:hover {
      transform: translate(-2px,-2px);
      box-shadow: 5px 5px 0 ${B.yellow};
      background: ${B.yellow};
      color: ${B.black};
    }

    /* ── Responsive ── */
    @media (max-width: 680px) {
      .nav-links { display: none; }
      .about-grid-brut { grid-template-columns: 1fr !important; }
      .projects-grid-brut { grid-template-columns: 1fr !important; }
      .contact-block { padding: 36px 20px; }
    }
  `}</style>
);

/* ─── PARALLAX HOOK ──────────────────────────────────────────────── */
function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const [elTop, setElTop] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (ref.current) {
        setElTop(ref.current.getBoundingClientRect().top + window.scrollY);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const y = useTransform(scrollY, [elTop - 800, elTop + 600], [-speed * 120, speed * 120]);
  const springY = useSpring(y, { stiffness: 80, damping: 20 });
  return { ref, springY };
}

/* ─── APP ────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <GlobalStyle />

      {/* Fixed noise texture overlay for brutalist grain */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 200,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: '200px',
        opacity: 0.5,
      }} />

      <Nav scrolled={scrolled} scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <Marquee />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

/* ─── NAV ────────────────────────────────────────────────────────── */
function Nav({ scrolled, scrollTo }) {
  return (
    <header className={`brut-nav ${scrolled ? 'dark' : ''}`}>
      <button className="logo-brut" onClick={() => scrollTo('hero')}>R.R.</button>
      <nav className="nav-links">
        {['about', 'projects', 'contact'].map(s => (
          <button key={s} className="nav-link-brut" onClick={() => scrollTo(s)}>
            {s}
          </button>
        ))}
      </nav>
    </header>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────── */
function Hero({ scrollTo }) {
  const { ref: bgRef, springY: bgY } = useParallax(0.5);
  const { ref: textRef, springY: textY } = useParallax(0.2);
  const { ref: decoRef, springY: decoY } = useParallax(0.7);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '100%',
      }}
    >
      {/* Parallax BG block */}
      <motion.div
        ref={bgRef}
        style={{
          position: 'absolute', top: 0, right: 0,
          width: '55%', height: '100%',
          background: B.black,
          y: bgY,
          zIndex: 0,
        }}
      />

      {/* Parallax deco shapes */}
      <motion.div ref={decoRef} style={{ position: 'absolute', top: '15%', right: '8%', y: decoY, zIndex: 1 }}>
        <div style={{ width: 180, height: 180, border: `4px solid ${B.yellow}`, borderRadius: '50%' }} />
      </motion.div>
      <motion.div style={{ position: 'absolute', bottom: '12%', right: '22%', y: decoY, zIndex: 1 }}>
        <div style={{ width: 80, height: 80, background: B.red, border: B.border }} />
      </motion.div>
      <motion.div style={{ position: 'absolute', top: '60%', right: '5%', y: decoY, zIndex: 1 }}>
        <div style={{ width: 50, height: 50, background: B.yellow, border: B.border }} />
      </motion.div>

      {/* Text content */}
      <motion.div
        ref={textRef}
        style={{ position: 'relative', zIndex: 2, y: textY, maxWidth: 700, paddingTop: 80 }}
      >
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.9rem',
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: B.black,
            marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <span style={{ display: 'inline-block', width: 40, height: 3, background: B.red }} />
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: -4,
            marginBottom: 24,
          }}
        >
          RISHI<br />
          <span style={{
            WebkitTextStroke: `3px ${B.black}`,
            color: 'transparent',
            display: 'block',
          }}>
            RATHEESH
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            background: B.yellow,
            border: B.border,
            boxShadow: B.shadow,
            padding: '14px 20px',
            maxWidth: 480,
            marginBottom: 32,
          }}
        >
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.6 }}>
            DIGITAL CRAFTSMAN & AI/ML ENTHUSIAST — BUILDING INTELLIGENT SYSTEMS THAT SOLVE REAL-WORLD PROBLEMS.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          whileHover={{ x: -3, y: -3, boxShadow: B.shadowLg }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: 2,
            border: B.border,
            padding: '14px 36px',
            background: B.black,
            color: B.yellow,
            boxShadow: B.shadow,
            cursor: 'pointer',
          }}
          onClick={() => scrollTo('projects')}
        >
          VIEW MY WORK →
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ─── MARQUEE ────────────────────────────────────────────────────── */
function Marquee() {
  const items = ['AI/ML', '★', 'REACT', '★', 'NODE.JS', '★', 'DATA STRUCTURES', '★', 'TYPESCRIPT', '★', 'JAVA', '★', 'COMPUTER VISION', '★', 'NLP', '★'];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────────── */
function About() {
  const { ref, springY } = useParallax(0.35);
  const skills = [
    { icon: 'fab fa-js', label: 'JavaScript' },
    { icon: 'fas fa-terminal', label: 'TypeScript' },
    { icon: 'fab fa-java', label: 'Java' },
    { icon: 'fab fa-react', label: 'React' },
    { icon: 'fab fa-node-js', label: 'Node.js' },
    { icon: 'fas fa-brain', label: 'AI/ML' },
    { icon: 'fas fa-database', label: 'Data Structures' },
  ];

  return (
    <section id="about" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 2rem' }}>
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        style={{ marginBottom: 48 }}
      >
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', fontWeight: 700,
          letterSpacing: 4, textTransform: 'uppercase', color: B.red, marginBottom: 8,
        }}>02 — About</p>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1, letterSpacing: -2 }}>
          WHO<br /><span style={{ WebkitTextStroke: `2px ${B.black}`, color: 'transparent' }}>AM I?</span>
        </h2>
      </motion.div>

      <div
        className="about-grid-brut"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}
      >
        {/* Text panel */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ border: B.border, boxShadow: B.shadow, padding: '36px', background: B.white }}
        >
          <h3 style={{ fontWeight: 900, fontSize: '1.3rem', marginBottom: 16 }}>
            CSE Student — AI/ML Specialisation
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: 16, color: '#222' }}>
            Hello! I'm Rishi Ratheesh — a CSE student specializing in Artificial Intelligence and Machine Learning. Passionate about building intelligent systems across computer vision, NLP, and MLOps.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 24, color: '#222' }}>
            The best error message is the one that never shows up. I believe in clean code, robust architectures, and systems that scale elegantly.
          </p>
          <div>
            {skills.map((s) => (
              <span key={s.label} className="skill-tag-brut">
                <i className={s.icon} style={{ fontSize: 14 }}></i>
                {s.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Parallax deco panel */}
        <motion.div
          ref={ref}
          style={{ y: springY }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Big accent block */}
          <div style={{
            border: B.border, boxShadow: B.shadowLg,
            background: B.black, color: B.yellow,
            padding: '36px', marginBottom: 24,
          }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
              Current focus
            </p>
            <p style={{ fontWeight: 900, fontSize: '1.8rem', lineHeight: 1.1 }}>
              MLOps &<br />Computer<br />Vision
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['4+', 'Projects'], ['3+', 'Languages'], ['1', 'University'], ['∞', 'Curiosity']].map(([val, label]) => (
              <div key={label} style={{
                border: B.border, boxShadow: B.shadow,
                padding: '20px 16px', background: B.yellow, textAlign: 'center',
              }}>
                <div style={{ fontWeight: 900, fontSize: '2.2rem', lineHeight: 1 }}>{val}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────────────── */
function Projects() {
  const projects = [
    {
      id: 1, num: '01',
      title: 'StocksPortfolio',
      description: 'Full-stack web application to manage and track stock portfolios with live data.',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      githubUrl: 'https://github.com/Rishirxt/StocksPortfolio',
      icon: 'fas fa-chart-line',
      accent: B.yellow,
    },
    {
      id: 2, num: '02',
      title: 'Coindex',
      description: 'Robust cryptocurrency tracking and indexing platform to monitor market trends.',
      technologies: ['TypeScript', 'React', 'API'],
      githubUrl: 'https://github.com/Rishirxt/Coindex',
      icon: 'fas fa-coins',
      accent: B.black,
    },
    {
      id: 3, num: '03',
      title: 'ChessBot',
      description: 'Intelligent chess engine built with Java, featuring move validation and standard algorithms.',
      technologies: ['Java', 'Algorithms', 'Chess Logic'],
      githubUrl: 'https://github.com/Rishirxt/ChessBot',
      icon: 'fas fa-chess-knight',
      accent: B.red,
    },
    {
      id: 4, num: '04',
      title: 'FraudDetection',
      description: 'ML-based system designed to flag and detect fraudulent activities in varied environments.',
      technologies: ['JavaScript', 'ML', 'Data Analysis'],
      githubUrl: 'https://github.com/Rishirxt/FraudDetection-System',
      icon: 'fas fa-shield-alt',
      accent: B.blue,
    },
  ];

  return (
    <section id="projects" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        style={{ marginBottom: 48 }}
      >
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', fontWeight: 700,
          letterSpacing: 4, textTransform: 'uppercase', color: B.red, marginBottom: 8,
        }}>03 — Projects</p>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1, letterSpacing: -2 }}>
          FEATURED<br /><span style={{ WebkitTextStroke: `2px ${B.black}`, color: 'transparent' }}>WORK</span>
        </h2>
      </motion.div>

      <div
        className="projects-grid-brut"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, delay }) {
  const { ref, springY } = useParallax(0.15);
  const accentText = (p.accent === B.black || p.accent === B.blue) ? B.yellow : B.black;

  return (
    <motion.div
      ref={ref}
      className="project-card-brut"
      style={{ y: springY }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{
          background: p.accent,
          color: accentText,
          border: B.border,
          width: 52, height: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
        }}>
          <i className={p.icon}></i>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', fontWeight: 700,
            color: '#888', letterSpacing: 1,
          }}>{p.num}</span>
          <motion.a
            href={p.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: -2, y: -2 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 40, height: 40,
              border: B.border,
              boxShadow: '3px 3px 0 #0a0a0a',
              fontSize: 18,
            }}
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </motion.a>
        </div>
      </div>

      <h3 style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: -0.5, marginBottom: 10 }}>
        {p.title}
      </h3>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#333', marginBottom: 20 }}>
        {p.description}
      </p>

      <div>
        {p.technologies.map(t => (
          <span
            key={t}
            className="tech-badge"
            style={{ background: p.accent === B.yellow ? B.yellow : 'transparent', color: p.accent === B.black || p.accent === B.blue ? B.black : B.black }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────────── */
function Contact() {
  const { ref, springY } = useParallax(0.25);

  return (
    <section id="contact" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 2rem' }}>
      <motion.div
        ref={ref}
        style={{ y: springY }}
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="contact-block"
      >
        {/* Corner decorations */}
        {[
          { top: -12, left: -12 }, { top: -12, right: -12 },
          { bottom: -12, left: -12 }, { bottom: -12, right: -12 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute', width: 24, height: 24,
            background: B.black, border: '2px solid #0a0a0a',
            ...pos,
          }} />
        ))}

        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', fontWeight: 700,
          letterSpacing: 4, textTransform: 'uppercase', color: B.red, marginBottom: 12,
        }}>04 — Contact</p>

        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900,
          lineHeight: 1, letterSpacing: -2, marginBottom: 20,
        }}>
          GET IN<br />TOUCH.
        </h2>

        <p style={{
          maxWidth: 500, margin: '0 auto',
          fontFamily: "'Space Mono', monospace", fontSize: '0.9rem', lineHeight: 1.8,
        }}>
          Currently seeking new opportunities in AI/ML and software engineering. Have a project idea or just want to say hi? I'll get back to you!
        </p>

        <a href="mailto:rishi.ratheesh10@gmail.com" className="contact-btn-brut">
          <i className="fas fa-envelope"></i>
          SAY HELLO
        </a>
      </motion.div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer-brut">
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', fontWeight: 700 }}>
        © 2026 RISHI RATHEESH
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { href: 'https://github.com/Rishirxt', icon: 'fab fa-github', label: 'GitHub' },
          { href: 'https://www.linkedin.com/in/rishi-ratheesh-85057a2a6/', icon: 'fab fa-linkedin', label: 'LinkedIn' },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link-brut" aria-label={s.label}>
            <i className={s.icon}></i>
          </a>
        ))}
      </div>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', opacity: 0.6 }}>
        BUILT WITH REACT & FRAMER MOTION
      </p>
    </footer>
  );
}