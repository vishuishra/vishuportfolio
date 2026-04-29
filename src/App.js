import { useEffect, useMemo, useState } from "react";
import "./App.css";
import MoleculeBackground from "./components/MoleculeBackground";
import {
  CAREER_START_DATE,
  certifications,
  experiences,
  profile,
  projects,
  skills,
} from "./data/portfolioData";
import { getYearsOfExperience } from "./utils/experience";

const navLinks = [
  { label: "~/about", href: "#about" },
  { label: "~/skills", href: "#skills" },
  { label: "~/experience", href: "#experience" },
  { label: "~/projects", href: "#projects" },
  { label: "~/certs", href: "#certifications" },
  { label: "~/contact", href: "#contact" },
];

function App() {
  const yearsOfExperience = getYearsOfExperience(CAREER_START_DATE);
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [revealedSections, setRevealedSections] = useState(() => new Set([0]));
  const [activeSection, setActiveSection] = useState("about");
  const rotatingTitles = useMemo(
    () => profile.rotatingTitles ?? [profile.title],
    []
  );
  const navSectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")),
    []
  );

  useEffect(() => {
    const currentTitle = rotatingTitles[activeTitleIndex];
    const isTypingDone = typedText === currentTitle;
    const isDeletingDone = typedText === "";

    let delay = isDeleting ? 36 : 55;
    if (isTypingDone && !isDeleting) delay = 1100;
    if (isDeletingDone && isDeleting) delay = 350;

    const timer = setTimeout(() => {
      if (!isDeleting && !isTypingDone) {
        setTypedText(currentTitle.slice(0, typedText.length + 1));
      } else if (!isDeleting && isTypingDone) {
        setIsDeleting(true);
      } else if (isDeleting && !isDeletingDone) {
        setTypedText(currentTitle.slice(0, typedText.length - 1));
      } else {
        setIsDeleting(false);
        setActiveTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [activeTitleIndex, isDeleting, rotatingTitles, typedText]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-section-id"));
            setRevealedSections((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.18 }
    );

    const sections = document.querySelectorAll("[data-section-id]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-34% 0px -52% 0px",
        threshold: 0.01,
      }
    );

    const sectionElements = navSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navSectionIds]);

  return (
    <div className="app-root">
      <MoleculeBackground />

      {/* Terminal-style sidebar nav */}
      <nav className="side-nav">
        <div className="nav-header">
          <span className="nav-dot red" />
          <span className="nav-dot yellow" />
          <span className="nav-dot green" />
          <span className="nav-title">explorer</span>
        </div>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`nav-link ${
              activeSection === link.href.replace("#", "") ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(link.href.replace("#", ""));
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="nav-icon">{">"}</span>
            {link.label}
          </a>
        ))}
        <div className="nav-footer">
          <span className="status-dot" />
          <span>v1.0.0 — online</span>
        </div>
      </nav>

      <main className="app-shell">
        {/* HERO / ABOUT */}
        <section
          className={`section hero reveal ${
            revealedSections.has(0) ? "is-visible" : ""
          }`}
          data-section-id="0"
          id="about"
        >
          <div className="terminal-window">
            <div className="terminal-bar">
              <span className="term-dot red" />
              <span className="term-dot yellow" />
              <span className="term-dot green" />
              <span className="term-tab">vishu@portfolio:~</span>
            </div>
            <div className="terminal-body">
              <p className="term-line">
                <span className="prompt">$</span> cat ./README.md
              </p>
              <div className="term-output">
                <h1 className="glitch-name">{profile.name}</h1>
                <p className="hero-role">
                  <span className="keyword">const</span>{" "}
                  <span className="fn">role</span> ={" "}
                  <span className="string">
                    "{typedText}
                    <span className="cursor">▮</span>"
                  </span>
                </p>
              </div>
              <p className="term-line">
                <span className="prompt">$</span> echo $BIO
              </p>
              <p className="term-output bio">{profile.intro}</p>
              <p className="term-line">
                <span className="prompt">$</span> echo $STATUS
              </p>
              <p className="term-output meta">
                <span className="comment">
                  {"//"} {yearsOfExperience}+ years building systems
                </span>
              </p>
              <div className="term-links">
                {profile.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="dev-link"
                  >
                    [{link.label}]
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="scroll-hint">
            <span>scroll</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </section>

        {/* SKILLS */}
        <section
          className={`section reveal ${
            revealedSections.has(1) ? "is-visible" : ""
          }`}
          data-section-id="1"
          id="skills"
        >
          <h2 className="section-heading">
            <span className="heading-symbol">#</span> tech_stack
          </h2>
          <div className="skill-grid">
            {skills.map((skillGroup, index) => (
              <div
                key={skillGroup.category}
                className="skill-block reveal-item"
                style={{ "--stagger-delay": `${index * 100}ms` }}
              >
                <h3 className="skill-category">
                  <span className="bracket">{"{"}</span> {skillGroup.category}{" "}
                  <span className="bracket">{"}"}</span>
                </h3>
                <div className="skill-tags">
                  {skillGroup.items.map((item) => (
                    <span key={item} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          className={`section reveal ${
            revealedSections.has(2) ? "is-visible" : ""
          }`}
          data-section-id="2"
          id="experience"
        >
          <h2 className="section-heading">
            <span className="heading-symbol">#</span> git_log --oneline
          </h2>
          <div className="exp-timeline">
            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.duration}`}
                className="exp-commit reveal-item"
                style={{ "--stagger-delay": `${index * 140}ms` }}
              >
                <div className="commit-hash">{exp.duration}</div>
                <div className="commit-body">
                  <h3 className="commit-msg">
                    <span className="fn">{exp.role}</span>
                    <span className="commit-at"> @ {exp.company}</span>
                  </h3>
                  <ul className="commit-details">
                    {exp.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          className={`section reveal ${
            revealedSections.has(3) ? "is-visible" : ""
          }`}
          data-section-id="3"
          id="projects"
        >
          <h2 className="section-heading">
            <span className="heading-symbol">#</span> ls ./projects
          </h2>
          <div className="project-grid">
            {projects.map((project, index) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="project-card reveal-item"
                style={{ "--stagger-delay": `${index * 120}ms` }}
              >
                <div className="project-header">
                  <span className="file-icon">📁</span>
                  <h3>{project.title}</h3>
                  <span className="link-arrow">↗</span>
                </div>
                <p className="project-impact">{project.impact}</p>
                <div className="project-stack">
                  {project.stack.map((tech) => (
                    <code key={tech}>{tech}</code>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section
          className={`section reveal ${
            revealedSections.has(4) ? "is-visible" : ""
          }`}
          data-section-id="4"
          id="certifications"
        >
          <h2 className="section-heading">
            <span className="heading-symbol">#</span> cat ./certs.json
          </h2>
          <div className="cert-list">
            <pre className="cert-json">
              <span className="bracket">{"["}</span>
              {"\n"}
              {certifications.map((cert, i) => (
                <span
                  key={cert}
                  className="reveal-item"
                  style={{ "--stagger-delay": `${i * 100}ms` }}
                >
                  {"  "}
                  <span className="string">"{cert}"</span>
                  {i < certifications.length - 1 ? "," : ""}
                  {"\n"}
                </span>
              ))}
              <span className="bracket">{"]"}</span>
            </pre>
          </div>
        </section>

        {/* CONTACT */}
        <section
          className={`section reveal ${
            revealedSections.has(5) ? "is-visible" : ""
          }`}
          data-section-id="5"
          id="contact"
        >
          <h2 className="section-heading">
            <span className="heading-symbol">#</span> send_message()
          </h2>
          <div className="contact-block">
            <div className="contact-cta">
              <p className="term-line">
                <span className="prompt">$</span> echo "Let's build something
                together"
              </p>
              <div className="term-links">
                {profile.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="dev-link"
                  >
                    [{link.label}]
                  </a>
                ))}
              </div>
            </div>
            <form
              className="contact-form"
              action="https://formspree.io/f/mgorgrpy"
              method="POST"
            >
              <div className="form-row">
                <label className="form-label">
                  <span className="keyword">name</span>:
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder='"your name"'
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  <span className="keyword">email</span>:
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder='"you@example.com"'
                    className="form-input"
                  />
                </label>
              </div>
              <label className="form-label">
                <span className="keyword">message</span>:
                <textarea
                  name="message"
                  required
                  rows="4"
                  placeholder='"what do you want to build?"'
                  className="form-input form-textarea"
                />
              </label>
              <button type="submit" className="form-submit">
                <span className="prompt">$</span> send --now
              </button>
            </form>
          </div>
          <p className="footer-sig">
            <span className="comment">
              {"/* crafted with React, Canvas & caffeine */"}
            </span>
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
