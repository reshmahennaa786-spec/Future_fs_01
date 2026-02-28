import { useState, useEffect, useRef } from "react";
import "./App.css";

import doodle from "./assets/works-doodle.svg";
import sitting from "./assets/sitting.png";
import thinking from "./assets/thinking.png";
import standingLaptop from "./assets/standing-laptop.png";
import standing from "./assets/standing.png";

import worksAll1 from "./assets/works-all-1.png";
import worksAll2 from "./assets/works-all-2.png";
import worksAll3 from "./assets/works-all-3.png";
import worksUi from "./assets/works-ui.png";
import worksWeb from "./assets/works-web.png";

const ALL_WORKS = [
  { id: 1, img: worksAll1, title: "UI/UX Course Platform", type: "All" },
  { id: 2, img: worksAll2, title: "Travel Web App",        type: "All" },
  { id: 3, img: worksAll3, title: "Solar System App",      type: "All" },
  { id: 4, img: worksUi,   title: "Mobile UI Designs",     type: "UI"  },
  { id: 5, img: worksWeb,  title: "Web Design Projects",   type: "Web" },
];

/* ── Reusable animated wrapper ── */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Work card ── */
function WorkCard({ img, title, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="work-card">
        <img src={img} alt={title} />
        <div className="work-overlay">
          <span className="work-title">{title}</span>
        </div>
      </div>
    </Reveal>
  );
}

function App() {
  const [active, setActive]     = useState("All");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("SUMBIT FIRED");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Message sent successfully 🚀");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert(data.error || "Something went wrong ❌");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Server error ❌");
  }
};

  const filtered =
    active === "All"
      ? ALL_WORKS
      : ALL_WORKS.filter((w) => w.type === active);

  return (
    <div className="app">

      {/* ── NAV ── */}
      <nav className="nav">
        {["home","about","skills","works","contact"].map((id) => (
          <span key={id} onClick={() => scrollTo(id)}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </span>
        ))}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="hero">

        <Reveal className="hero-buttons-wrap">
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollTo("contact")}>
              Hire Me
            </button>
            <a className="btn-secondary" href="/cv.jpeg" download>
              Download CV ↓
            </a>
          </div>
        </Reveal>

        <div className="hero-main">
          <Reveal delay={100}>
            <div className="hero-left">
              <h1>UI UX</h1>
              <h1 className="teal">DESIGNER</h1>
            </div>
          </Reveal>

          <Reveal delay={200} className="hero-illustration">
            <img src={doodle}  alt="" className="doodle-bg" />
            <img src={sitting} alt="" className="girl-img"  />
          </Reveal>

          <Reveal delay={300}>
            <div className="hero-right">
              <h1>FULL STACK</h1>
              <h1 className="teal">DEVELOPER</h1>
            </div>
          </Reveal>
        </div>

      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="two-col">

        <div className="col-text">
          <Reveal>
            <h2 className="section-title">About <span>me</span></h2>
          </Reveal>
          <Reveal delay={100}>
            <p>
              I am Reshma Henna — a passionate UI/UX designer and full-stack
              developer who enjoys transforming ideas into meaningful digital
              experiences. With a strong focus on user-centered design, I believe
              every pixel has a purpose and every interaction should feel effortless.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p>
              As a designer, I explore layouts, micro-interactions, and visual
              storytelling to craft smooth user journeys — from onboarding to
              task completion. I pay close attention to typography, color, spacing,
              and motion to ensure each design feels polished and intentional.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p>
              As a developer, I build scalable and responsive applications using
              modern technologies, bridging the gap between design and
              implementation. I write clean, maintainable code and enjoy turning
              complex problems into simple, elegant solutions.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <p>
              Whether it's a mobile app, a web platform, or a design system —
              I bring both the creative vision and the technical skills to make
              it real. I'm always learning, always building, and always looking
              for the next challenge.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="illustration">
          <img src={doodle}   alt="" className="doodle-bg" />
          <img src={thinking} alt="" className="girl-img"  />
        </Reveal>

      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="two-col">

        <div className="col-text">
          <Reveal>
            <h2 className="section-title">My <span>Skills</span></h2>
          </Reveal>
          <ul className="skills-list">
            {["HTML","CSS","JAVA","UI / UX","DESIGN SYSTEMS"].map((s, i) => (
              <Reveal key={s} delay={i * 100}>
                <li>{s}</li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={200} className="illustration">
          <img src={doodle}         alt="" className="doodle-bg" />
          <img src={standingLaptop} alt="" className="girl-img"  />
        </Reveal>

      </section>

      {/* ── WORKS ── */}
      <section id="works" className="works-section">
        <div className="works-doodle-wrap">
          <img src={doodle} alt="" className="works-doodle" />
        </div>

        <Reveal>
          <h2 className="section-title">My recent <span>works</span></h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="filters">
            {["All", "UI", "Web"].map((type) => (
              <button
                key={type}
                className={active === type ? "filter-btn active" : "filter-btn"}
                onClick={() => setActive(type)}
              >
                {type === "Web" ? "Web Design" : type}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="work-grid">
          {filtered.map((w, i) => (
            <WorkCard key={w.id} img={w.img} title={w.title} delay={i * 120} />
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="two-col contact-section">

        <div className="col-text">
          <Reveal>
            <h2 className="section-title">
              Got a project in <span>mind?</span>
            </h2>
          </Reveal>
          <Reveal delay={150} className="illustration contact-illustration">
            <img src={doodle}   alt="" className="doodle-bg small" />
            <img src={standing} alt="" className="girl-img"        />
          </Reveal>
        </div>

        <Reveal delay={200}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your name</label>
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Your email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Your Message</label>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Send Message ➤
            </button>
          </form>
        </Reveal>

      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <Reveal>
          <div className="footer-nav">
            {[
              { icon: "fa-house",  label: "Home",     id: "home"    },
              { icon: "fa-user",   label: "About me", id: "about"   },
              { icon: "fa-phone",  label: "Contact",  id: "contact" },
            ].map(({ icon, label, id }) => (
              <span key={id} onClick={() => scrollTo(id)}>
                <i className={`fa-solid ${icon}`} /> {label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="socials">
            {["facebook-f","instagram","twitter","youtube"].map((s) => (
              <a key={s} href="#" className="social-icon">
                <i className={`fa-brands fa-${s}`} />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="footer-copy">Terms of Service – Privacy Policy</p>
        </Reveal>
      </footer>

    </div>
  );
}

export default App;