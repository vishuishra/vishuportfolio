import { useEffect, useMemo, useState } from "react";
import "./App.css";
import MoleculeBackground from "./components/MoleculeBackground";
import {
  certifications,
  experiences,
  profile,
  projects,
  skills,
} from "./data/portfolioData";

const navLinks = [
  { label: "~/about", href: "#about" },
  { label: "~/skills", href: "#skills" },
  { label: "~/experience", href: "#experience" },
  { label: "~/projects", href: "#projects" },
  { label: "~/certs", href: "#certifications" },
  { label: "~/contact", href: "#contact" },
];

function LinkIcon({ type }) {
  if (type === "github") {
    return (
      <svg className="link-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }
  if (type === "linkedin") {
    return (
      <svg className="link-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (type === "email") {
    return (
      <svg className="link-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    );
  }
  return null;
}

function App() {
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [revealedSections, setRevealedSections] = useState(() => new Set([0]));
  const [activeSection, setActiveSection] = useState("about");
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error
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
        <div className="nav-social">
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="nav-social-link"
              title={link.label}
            >
              <LinkIcon type={link.icon} />
            </a>
          ))}
        </div>
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
              <div className="term-output">
                <h1 className="glitch-name">{profile.name}</h1>
                <div className="name-underline" />
                <p className="hero-role">
                  <span className="string">
                    {typedText}
                    <span className="cursor">▮</span>
                  </span>
                </p>
              </div>
              <div className="term-output bio">
                {profile.intro.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div className="term-links">
                {profile.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="dev-link"
                  >
                    <LinkIcon type={link.icon} />
                    {link.label}
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
            <span className="heading-symbol">#</span> Skills & Technologies
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
            <span className="heading-symbol">#</span> Work Experience
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
            <span className="heading-symbol">#</span> Projects
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
            <span className="heading-symbol">#</span> Certifications
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
            <span className="heading-symbol">#</span> Get In Touch
          </h2>
          <div className="contact-block">
            <div className="contact-cta">
              <p className="term-line">
                <span className="prompt">$</span> Let's build something
                together
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
                    <LinkIcon type={link.icon} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <form
              className="contact-form"
              onSubmit={async (e) => {
                e.preventDefault();
                setFormStatus("sending");
                try {
                  const res = await fetch("https://formspree.io/f/mgorgrpy", {
                    method: "POST",
                    body: new FormData(e.target),
                    headers: { Accept: "application/json" },
                  });
                  if (res.ok) {
                    setFormStatus("success");
                    e.target.reset();
                    setTimeout(() => setFormStatus("idle"), 4000);
                  } else {
                    setFormStatus("error");
                    setTimeout(() => setFormStatus("idle"), 4000);
                  }
                } catch {
                  setFormStatus("error");
                  setTimeout(() => setFormStatus("idle"), 4000);
                }
              }}
            >
              <div className="form-row">
                <label className="form-label">
                  <span className="keyword">Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  <span className="keyword">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="form-input"
                  />
                </label>
              </div>
              <label className="form-label">
                <span className="keyword">Message</span>
                <textarea
                  name="message"
                  required
                  rows="4"
                  placeholder="What do you want to build?"
                  className="form-input form-textarea"
                />
              </label>
              <button
                type="submit"
                className="form-submit"
                disabled={formStatus === "sending"}
              >
                <span className="prompt">$</span>{" "}
                {formStatus === "sending" ? "sending..." : "send --now"}
              </button>
              {formStatus === "success" && (
                <p className="form-message success">&#47;&#47; transmission complete — talk soon.</p>
              )}
              {formStatus === "error" && (
                <p className="form-message error">&#47;&#47; error: transmission failed. retry.</p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
