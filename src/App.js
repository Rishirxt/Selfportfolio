// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Set black and white theme
    document.body.classList.add('bw-mode');
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <div className="App">
      <div className="bw-background"></div>
      <Header 
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        scrollToSection={scrollToSection}
      />
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

const Header = ({ menuOpen, toggleMenu, scrollToSection }) => {
  return (
    <header>
      <div className="container nav-container">
        <button className="logo" onClick={() => scrollToSection('hero')}>R.R.</button>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollToSection('about')}>About</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollToSection('projects')}>Projects</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollToSection('contact')}>Contact</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

const Hero = ({ scrollToSection }) => {
  return (
    <section id="hero">
      <div className="container hero-content">
        <h1 className="hero-title">Rishi Ratheesh</h1>
        <p className="hero-subtitle">Full Stack Developer</p>
        <div className="hero-divider"></div>
        <p>I create elegant digital solutions with clean code and thoughtful design.</p>
        <button className="hero-cta" onClick={() => scrollToSection('projects')}>View My Work</button>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <h3>Crafting Digital Experiences</h3>
            <p>I'm a passionate full stack developer with over 3 years of experience building responsive and user-friendly web applications. My journey in web development started during my computer science studies, and I've been hooked ever since.</p>
            
            <p>I specialize in creating modern web applications using React, Node.js, and various databases. I have a strong focus on writing clean, maintainable code and creating intuitive user interfaces that provide exceptional user experiences.</p>
            
            <p>What drives me is the ability to solve complex problems with elegant solutions. I enjoy the entire development process, from conceptualization and design to implementation and deployment. I'm constantly learning new technologies and techniques to stay at the forefront of web development.</p>
            
            <div className="skills">
              <span className="skill">HTML5</span>
              <span className="skill">CSS3</span>
              <span className="skill">JavaScript</span>
              <span className="skill">React</span>
              <span className="skill">Node.js</span>
              <span className="skill">Express</span>
              <span className="skill">MongoDB</span>
              <span className="skill">PostgreSQL</span>
              <span className="skill">Git</span>
              <span className="skill">RESTful APIs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Sorting Visualizer",
      description: "A sleek, interactive web app to see sorting algorithms in action. Learn how Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and more actually work—step by step, with live animations! Perfect for students, developers, or anyone curious about how algorithms organize data.",
      technologies: ["React", "Node.js", "CSS",],
      githubUrl: "https://github.com/Rishirxt/Sorting-Visualizer"
    },
    {
      id: 2,
      title: "Stocks-Portfolio",
      description: "A full-stack web application to manage and track stock portfolios..",
      technologies: ["React", "Express.js", "PostgreSQL", "REST APIs"],
      githubUrl: "https://github.com/Rishirxt/Stocks-Portfolio"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather application that displays current conditions and forecasts for locations worldwide. Features interactive charts, location search, and temperature unit conversion.",
      technologies: ["JavaScript","Weather API", "CSS3", "HTML5"],
      githubUrl: "https://github.com/Rishirxt/Weatherwebapp"
    },
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-number">0{project.id}</div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        
        {isHovered && (
          <div className="project-links">
            <a 
              href={project.githubUrl} 
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i> View on GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Simulate form submission
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just show success message
      // In a real implementation, you would send the data to your backend
      console.log("Form submitted:", formData);
      setSubmissionStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope contact-icon"></i>
              <div>
                <h3>Email</h3>
                <p>rishi.ratheesh10@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone contact-icon"></i>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt contact-icon"></i>
              <div>
                <h3>Location</h3>
                <p>Bengaluru, Karnataka</p>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                className="form-input" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                className="form-input" 
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submissionStatus === 'success' && <p className="submission-message success">Message sent successfully! 🎉</p>}
            {submissionStatus === 'error' && <p className="submission-message error">Failed to send message. Please try again. 😢</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="social-links">
          <a href="#github" className="social-link" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="#linkedin" className="social-link" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#twitter" className="social-link" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <p>&copy; 2025 Rishi Ratheesh. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default App;