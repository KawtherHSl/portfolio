"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================== Mouse Glow ================== */
const MouseGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, var(--primary-glow), transparent 40%)`,
      }}
    />
  );
};

/* ================== Particles ================== */
const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.5 + 0.5,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167, 139, 250, 0.4)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
};

/* ================== Navbar ================== */
const Navbar = () => (
  <nav className="navbar">
    <div className="container flex justify-between items-center">
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-main)" }}>Kawther<span style={{color: "var(--text-accent)"}}>.</span></h2>
      <div className="nav-links">
        <a href="#projects">Projets</a>
        <a href="#skills">Compétences</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </nav>
);

/* ================== MAIN ================== */
export default function Portfolio() {
  const projects = [
    {
      title: "SignifyAI",
      short: "Reconnaissance de la langue des signes via flux vidéo",
      desc: "Développement d'un modèle de Deep Learning capable de traduire la langue des signes en temps réel. Combinaison d'extraction de landmarks spatiaux et d'analyse temporelle pour une précision maximale.",
      tech: ["MediaPipe", "LSTM", "TensorFlow", "NLP"],
      link: "#"
    },
    {
      title: "Pepper l'Assistant",
      short: "Assistant vocal et conversationnel intelligent",
      desc: "Création d'un agent conversationnel avancé avec reconnaissance vocale, compréhension du langage naturel (NLU) et synthèse vocale pour des interactions humaines fluides.",
      tech: ["Python", "RASA", "Speech-to-Text"],
      link: "#"
    },
    {
      title: "Automatisation RH",
      short: "Outil intelligent de gestion des candidatures",
      desc: "Pipeline de traitement des emails avec extraction automatique d'informations clés depuis les CV (parsing) et génération de réponses contextuelles.",
      tech: ["Python", "Spacy", "API Outlook"],
      link: "#"
    },
    {
      title: "Surveillance YOLOv8",
      short: "Détection d'objets en temps réel",
      desc: "Système de vision par ordinateur pour la détection et le suivi d'objets dans des flux vidéo de sécurité avec une haute fréquence d'images.",
      tech: ["Computer Vision", "YOLOv8", "OpenCV"],
      link: "#"
    },
  ];

  return (
    <>
      <Particles />
      <MouseGlow />
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="container" style={{ position: "relative", zIndex: 10 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ display: "inline-block", marginBottom: "20px" }}>
              <span className="badge">Disponible pour Alternance IA</span>
            </motion.div>
            
            <motion.h1 className="hero-title animate-fade-up">
              Je suis <span style={{ color: "var(--text-accent)" }}>Kawther Halima Salem</span>
            </motion.h1>
            
            <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              Ingénieure en Intelligence Artificielle et Machine Learning. Je transforme des données complexes en solutions intelligentes et automatisées.
            </motion.p>
            
            <motion.div className="flex justify-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
              <a href="#projects" className="btn-primary">Voir mes projets</a>
              <a href="#contact" className="btn-secondary">Me contacter</a>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section container">
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Projets Sélectifs
          </motion.h2>
          
          <div className="grid grid-cols-2">
            {projects.map((project, i) => (
              <motion.div 
                key={i} 
                className="glass-panel" 
                style={{ padding: "32px", display: "flex", flexDirection: "column", height: "100%" }}
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "8px" }}>{project.title}</h3>
                  <p style={{ color: "var(--text-accent)", fontWeight: 500, marginBottom: "16px" }}>{project.short}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "24px", lineHeight: "1.6" }}>{project.desc}</p>
                </div>
                
                <div className="flex" style={{ flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "16px", borderTop: "1px solid var(--border-light)" }}>
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="badge" style={{ fontSize: "0.75rem", padding: "4px 12px" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="section container">
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Compétences Techniques
          </motion.h2>
          
          <div className="flex justify-center" style={{ flexWrap: "wrap", gap: "16px", maxWidth: "800px", margin: "0 auto" }}>
            {["TensorFlow", "PyTorch", "Transformers", "YOLOv8", "Computer Vision", "NLP", "Python", "NodeJS", "React", "SQL", "Git"].map((s, i) => (
              <motion.div 
                key={i} 
                className="glass-panel" 
                style={{ padding: "12px 24px", fontSize: "1.1rem", fontWeight: 500, color: "white" }}
                initial={{ opacity: 0, scale: 0.8 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ delay: i * 0.05, type: "spring" }}
                viewport={{ once: true }}
              >
                {s}
              </motion.div>
            ))}
          </div>
        </section>

        {/* INFO SECTION */}
        <section className="section container">
          <div className="grid grid-cols-2" style={{ gap: "40px" }}>
            {/* Languages */}
            <motion.div className="glass-panel" style={{ padding: "40px" }} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "24px", color: "white" }}>Langues</h3>
              <div className="flex flex-col gap-4">
                {[{ name: "Arabe", lvl: "Langue maternelle" }, { name: "Français", lvl: "Bilingue" }, { name: "Anglais", lvl: "Professionnel" }].map((l, i) => (
                  <div key={i} className="flex justify-between items-center" style={{ paddingBottom: "16px", borderBottom: "1px solid var(--border-light)" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 500 }}>{l.name}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{l.lvl}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div className="glass-panel" style={{ padding: "40px" }} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "24px", color: "white" }}>Centres d’intérêt</h3>
              <div className="flex" style={{ flexWrap: "wrap", gap: "12px" }}>
                {["Natation", "Cuisine", "Mode & Création", "Voyages", "Culture"].map((c, i) => (
                  <span key={i} className="badge" style={{ padding: "10px 20px", fontSize: "1rem" }}>
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section container">
          <motion.div 
            className="glass-panel text-center" 
            style={{ padding: "80px 40px", display: "flex", flexDirection: "column", alignItems: "center", background: "linear-gradient(to bottom, var(--bg-card), transparent)" }}
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: "3rem", fontWeight: 700, color: "white", marginBottom: "16px" }}>Travaillons Ensemble</h2>
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: "500px", marginBottom: "40px", lineHeight: "1.6" }}>
              Je suis actuellement à la recherche d'une alternance en Intelligence Artificielle. N'hésitez pas à me contacter pour discuter d'opportunités.
            </p>
            
            <div className="flex gap-4" style={{ flexWrap: "wrap", justifyContent: "center" }}>
              <a href="mailto:halimasalemkawther@gmail.com" className="btn-primary">Envoyer un Email</a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="btn-secondary">Voir mon LinkedIn</a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid var(--border-light)", padding: "40px 0", textAlign: "center", color: "var(--text-muted)", position: "relative", zIndex: 10 }}>
        <p>© {new Date().getFullYear()} Kawther Halima Salem. Tous droits réservés.</p>
      </footer>
    </>
  );
}