import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <div className="App">
      <div className="bg-orbs">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
        <div className="orb-3"></div>
      </div>
      
      <Header 
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        scrollToSection={scrollToSection}
        scrolled={scrolled}
      />
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

const Header = ({ menuOpen, toggleMenu, scrollToSection, scrolled }) => {
  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <button className="logo" onClick={() => scrollToSection('hero')}>R.R.</button>
        
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <i className="fas fa-times" style={{fontSize: '28px'}}></i> : <i className="fas fa-bars" style={{fontSize: '28px'}}></i>}
        </button>
        
        <AnimatePresence>
          {(menuOpen || window.innerWidth > 768) && (
            <motion.ul 
              className={`nav-menu ${menuOpen ? 'active' : ''}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <li>
                <button className="nav-link" onClick={() => scrollToSection('about')}>About</button>
              </li>
              <li>
                <button className="nav-link" onClick={() => scrollToSection('projects')}>Projects</button>
              </li>
              <li>
                <button className="nav-link" onClick={() => scrollToSection('contact')}>Contact</button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

const Hero = ({ scrollToSection }) => {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="hero">
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVars} className="hero-subtitle">Hello, I'm</motion.p>
        <motion.h1 variants={itemVars} className="hero-title">
          Rishi<br />
          <span className="gradient-text">Ratheesh</span>
        </motion.h1>
        <motion.p variants={itemVars} className="hero-desc">
          Digital Craftsman & AI/ML Enthusiast. I build intelligent systems and leverage data to solve real-world problems.
        </motion.p>
        <motion.button 
          variants={itemVars}
          className="hero-cta" 
          onClick={() => scrollToSection('projects')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Work
        </motion.button>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        About <span>Me</span>
      </motion.h2>
      
      <div className="about-grid">
        <motion.div 
          className="about-text glass"
          style={{ padding: '40px', borderRadius: '30px' }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h3>Computer Science & Engineering Student</h3>
          <p>
            Hello! I'm Rishi Ratheesh — a CSE student specializing in Artificial Intelligence and Machine Learning (AI/ML). 
            I’m passionate about building intelligent systems and leveraging data to solve real-world problems across computer vision, NLP, and MLOps.
          </p>
          <p>
            The best error message is the one that never shows up. I believe in clean code, robust architectures, and systems that scale elegantly.
          </p>
          
          <div className="skills-container">
            <span className="skill-tag glass"><i className="fab fa-js" style={{color: 'var(--primary)'}}></i> JavaScript</span>
            <span className="skill-tag glass"><i className="fas fa-terminal" style={{color: 'var(--primary)'}}></i> TypeScript</span>
            <span className="skill-tag glass"><i className="fab fa-java" style={{color: 'var(--primary)'}}></i> Java</span>
            <span className="skill-tag glass"><i className="fab fa-react" style={{color: 'var(--secondary)'}}></i> React</span>
            <span className="skill-tag glass"><i className="fab fa-node-js" style={{color: 'var(--secondary)'}}></i> Node.js</span>
            <span className="skill-tag glass"><i className="fas fa-brain" style={{color: 'var(--tertiary)'}}></i> AI/ML</span>
            <span className="skill-tag glass"><i className="fas fa-database" style={{color: 'var(--tertiary)'}}></i> Data Structures</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="about-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* Abstract geometric representation of AI/ML focus */}
          <div style={{ position: 'relative', width: '300px', height: '300px', perspective: '1000px' }}>
            <motion.div 
              animate={{ rotateY: 360, rotateX: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              style={{ width: '100%', height: '100%', border: '2px solid var(--primary)', borderRadius: '50%', position: 'absolute' }}
            />
            <motion.div 
              animate={{ rotateY: -360, rotateZ: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              style={{ width: '80%', height: '80%', border: '2px solid var(--secondary)', margin: '10%', borderRadius: '50%', position: 'absolute' }}
            />
            <motion.div 
              animate={{ rotateX: 360, rotateZ: -360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              style={{ width: '60%', height: '60%', border: '2px dashed var(--tertiary)', margin: '20%', borderRadius: '50%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <i className="fas fa-microchip" style={{color: 'var(--tertiary)', fontSize: '40px'}}></i>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "StocksPortfolio",
      description: "A full-stack web application to manage and track stock portfolios.",
      technologies: ["JavaScript", "HTML", "CSS"],
      githubUrl: "https://github.com/Rishirxt/StocksPortfolio",
      icon: "fas fa-chart-line"
    },
    {
      id: 2,
      title: "Coindex",
      description: "A robust cryptocurrency tracking and indexing platform to monitor market trends.",
      technologies: ["TypeScript", "React", "API"],
      githubUrl: "https://github.com/Rishirxt/Coindex",
      icon: "fas fa-coins"
    },
    {
      id: 3,
      title: "ChessBot",
      description: "intelligent chess engine and bot built with Java, featuring move validation and standard algorithms.",
      technologies: ["Java", "Algorithms", "Chess Logic"],
      githubUrl: "https://github.com/Rishirxt/ChessBot",
      icon: "fas fa-chess-knight"
    },
    {
      id: 4,
      title: "FraudDetection-System",
      description: "An ML-based system designed to flag and detect fraudulent activities in varied environments.",
      technologies: ["JavaScript", "ML concepts", "Data Analysis"],
      githubUrl: "https://github.com/Rishirxt/FraudDetection-System",
      icon: "fas fa-shield-alt"
    }
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  
  const itemVars = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="projects">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Featured <span>Projects</span>
      </motion.h2>
      
      <motion.div 
        className="projects-grid"
        variants={containerVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVars} className="project-card glass">
            <div className="project-header">
              <div className="folder-icon"><i className={project.icon} style={{fontSize: '24px'}}></i></div>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="github-link" aria-label="GitHub Link">
                <i className="fab fa-github" style={{fontSize: '24px'}}></i>
              </a>
            </div>
            
            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            
            <div className="project-tech">
              {project.technologies.map((tech, i) => (
                <span key={i} className="tech-item">{tech}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact">
      <motion.div 
        className="contact-wrapper glass"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title" style={{ marginBottom: '20px' }}>Get In <span>Touch</span></h2>
        <p>
          I'm currently looking for new opportunities in AI/ML and software engineering. 
          Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <a href="mailto:rishi.ratheesh10@gmail.com" className="contact-btn">
          <i className="fas fa-envelope"></i>
          Say Hello
        </a>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="social-links">
        <a href="https://github.com/Rishirxt" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
          <i className="fab fa-github" style={{fontSize: '24px'}}></i>
        </a>
        <a href="https://www.linkedin.com/in/rishi-ratheesh-85057a2a6/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
          <i className="fab fa-linkedin" style={{fontSize: '24px'}}></i>
        </a>
      </div>
      <p className="footer-text">&copy; 2026 Rishi Ratheesh. Built with React & Framer Motion.</p>
    </footer>
  );
};

export default App;