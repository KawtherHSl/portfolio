"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================== Mouse Glow ================== */
const MouseGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setPos({ x: e.clientX, y: e.clientY });

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
        background: `radial-gradient(400px at ${pos.x}px ${pos.y}px, rgba(124,58,237,0.12), transparent 80%)`,
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

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
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
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124,58,237,0.5)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    />
  );
};

/* ================== Navbar ================== */
const Navbar = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      width: "100%",
      backdropFilter: "blur(8px)",
      background: "rgba(0,0,0,0.5)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      zIndex: 50,
    }}
  >
    <div
      style={{
        maxWidth: 1000,
        margin: "auto",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2 style={{ fontWeight: 600 }}>Kawther</h2>
      <div style={{ display: "flex", gap: 20, fontSize: 14 }}>
        <a href="#projects">Projets</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </div>
);

/* ================== Section ================== */
const Section = ({ children, id }: any) => (
  <section
    id={id}
    style={{
      padding: "100px 20px",
      maxWidth: 900,
      margin: "auto",
      position: "relative",
      zIndex: 10,
    }}
  >
    {children}
  </section>
);

/* ================== Project ================== */
const ProjectItem = ({ project, isOpen, onClick, index }: any) => (
  <motion.div
    onClick={onClick}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    style={{
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      padding: "20px 0",
      cursor: "pointer",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <h3>{project.title}</h3>
        <p style={{ color: "#aaa", fontSize: 14 }}>{project.short}</p>
      </div>
      <span>{isOpen ? "−" : "+"}</span>
    </div>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ marginTop: 10 }}
        >
          <p>{project.desc}</p>
          <p style={{ color: "#a78bfa", fontSize: 13 }}>
            {project.tech}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

/* ================== MAIN ================== */
export default function Portfolio() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const projects = [
    {
      title: "SignifyAI",
      short: "Reconnaissance langue des signes",
      desc: "Mediapipe + LSTM + NLP",
      tech: "TensorFlow · NLP",
    },
    {
      title: "Pepper",
      short: "Assistant conversationnel",
      desc: "Assistant vocal intelligent",
      tech: "Python · RASA",
    },
    {
      title: "Automation",
      short: "Emails intelligents",
      desc: "Automatisation des emails",
      tech: "Python",
    },
    {
      title: "YOLOv8",
      short: "Détection objets",
      desc: "Détection temps réel",
      tech: "Computer Vision",
    },
  ];

  return (
    <div style={{ background: "#0B0F19", color: "white" }}>
      <Particles />
      <MouseGlow />
      <Navbar />

      {/* HERO */}
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 48 }}>
          Kawther Halima Salem
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "#a78bfa", marginTop: 10 }}>
          AI Engineer · Machine Learning · Automation
        </motion.p>
      </div>

      {/* PROJECTS */}
      <Section id="projects">
        <h2 style={{ marginBottom: 30 }}>Projets</h2>
        {projects.map((p, i) => (
          <ProjectItem
            key={i}
            index={i}
            project={p}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </Section>

      {/* LANGUAGES */}
      <Section id="languages">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-10">Langues</motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{ name: "Arabe", lvl: "Langue maternelle" }, { name: "Français", lvl: "Bilingue" }, { name: "Anglais", lvl: "Professionnel" }].map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition">
              <p className="text-xl font-semibold">{l.name}</p>
              <p className="text-gray-400 text-sm mt-2">{l.lvl}</p>
            </motion.div>
          ))}
        </div>
      </Section>


      {/* INTERESTS */}
      <Section id="interests">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-10">Centres d’intérêt</motion.h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {["Natation", "Cuisine", "Mode & stylisme", "Voyage", "Culture"].map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }} className="px-5 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 rounded-full">
              {c}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-10">Compétences</motion.h2>
        <div className="flex flex-wrap gap-4">
          {["TensorFlow", "PyTorch", "Transformers", "YOLOv8", "Python", "NodeJS", "SQL"].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-purple-500/10">
              {s}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Travaillons ensemble</h2>
          <p className="text-gray-400 mb-6">Disponible pour alternance IA</p>
          <div className="flex justify-center gap-4">
            <a href="mailto:halimasalemkawther@gmail.com" className="px-6 py-3 bg-purple-600 rounded-xl">Email</a>
            <a href="#" className="px-6 py-3 border border-white/20 rounded-xl">LinkedIn</a>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}