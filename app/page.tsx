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
      <div className="nav-links" style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: "10px" }}>
        <a href="#about">Moi</a>
        <a href="#experiences">Parcours</a>
        <a href="#projects">Projets</a>
        <a href="#skills">Compétences</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </nav>
);

/* ================== Chatbot ================== */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: "Bonjour ! Je suis l'assistant IA de Kawther. Avez-vous des questions sur ses compétences, ses projets ou ses expériences ?" }]);
  const [input, setInput] = useState('');
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let botResponse = "Je n'ai pas bien compris. Pouvez-vous reformuler ? (Essayez avec : expérience, compétences, projets, contact, alternance)";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes("expérience") || lower.includes("experience") || lower.includes("stage")) {
        botResponse = "Forte d'une expérience concrète, Kawther a notamment construit un dataset ciblé sur la langue des signes et a modélisé des architectures web backend solides en mode Scrum.";
      } else if (lower.includes("compétence") || lower.includes("competence") || lower.includes("langage") || lower.includes("skill")) {
        botResponse = "C'est une véritable architecte de données ! Elle manipule Python ou Java d'une main, et forge des modèles IA robustes (PyTorch, TensorFlow, Transformers) de l'autre.";
      } else if (lower.includes("projet") || lower.includes("realisation")) {
        botResponse = "Elle est créatrice de SignifyAI (traduction innovante de signes) mais aussi familière avec la robotique interactive (Pepper) et l'automatisation de tâches de fond.";
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("mail") || lower.includes("tel")) {
        botResponse = "Vous pouvez l'appeler au +33 758 494 838 ou lui écrire à halimasalemkawther@gmail.com !";
      } else if (lower.includes("bonjour") || lower.includes("salut") || lower.includes("hello")) {
        botResponse = "Prenez le temps d'explorer l'univers IA de Kawther. Que désirez-vous découvrir ?";
      } else if (lower.includes("alternance") || lower.includes("recherche") || lower.includes("dispo")) {
        botResponse = "Absolument ! Kawther est disponible à partir de septembre 2026 pour rejoindre une équipe audacieuse en tant qu'alternante IA.";
      } else if (lower.includes("formation") || lower.includes("etude") || lower.includes("master")) {
        botResponse = "Dotée d'un bagage solide en Systèmes d'Information (Ingénieure ENPO), elle spécialise aujourd'hui sa pensée analytique à l'Université d'Avignon (Master 1 IA).";
      }
      
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>🤖</button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="chat-window">
            <div className="chat-header">
              <span>🤖 Assistant IA Kawther</span>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: "1.2rem" }}>✖</button>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
              {messages.map((m, i) => (
                <div key={i} className={`chat-bubble ${m.sender}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="chat-input-wrapper">
              <input type="text" placeholder="Posez votre question..." value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
              <button onClick={handleSend}>&rarr;</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ================== Parcours Component ================== */
const ParcoursInteractive = ({ formations, experiences }: {formations: any[], experiences: any[]}) => {
  const [activeTab, setActiveTab] = useState<'formations' | 'experiences'>('formations');
  const items = activeTab === 'formations' ? formations : experiences;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "40px" }}>
        <button 
          onClick={() => setActiveTab('formations')} 
          className={activeTab === 'formations' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: "12px 24px", transition: "all 0.3s" }}
        >
          Cursus Académique
        </button>
        <button 
          onClick={() => setActiveTab('experiences')} 
          className={activeTab === 'experiences' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: "12px 24px", transition: "all 0.3s" }}
        >
          Expérience Terrain
        </button>
      </div>

      <div style={{ minHeight: "350px" }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab} 
            className="grid grid-cols-2" 
            style={{ gap: "24px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item, i) => (
              <motion.div 
                key={i} 
                className="glass-panel"
                style={{ padding: "32px", display: "flex", flexDirection: "column" }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 style={{ color: "var(--text-accent)", fontSize: "1.3rem", marginBottom: "8px" }}>{item.title}</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "16px", letterSpacing: "1px", textTransform: "uppercase" }}>{item.date} | {item.company || item.school}</span>
                <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "white" }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ================== MAIN ================== */
export default function Portfolio() {
  const experiences = [
    {
      title: "Recherche & Ingénierie IA (Stage)",
      date: "2024",
      company: "École pour les Enfants Handicapés Auditifs",
      desc: "Création et annotation d'un jeu de données (dataset) de la langue des signes. Ce travail a servi de base pour l'entraînement d'un modèle d'apprentissage profond pour la reconnaissance gestuelle en temps réel."
    },
    {
      title: "Développement Logiciel Scrum (Stage)",
      date: "2022 -- 2023",
      company: "HYPROC SHIPPING Company",
      desc: "Développement en méthode Agile (Scrum) d'une application web interne. Conception (UML/Merise) et déploiement pour la gestion administrative."
    },
    {
      title: "Double Immersion Architectures (Stages)",
      date: "2021 -- 2022",
      company: "CDS & SORFERT ALGERIE SPA",
      desc: "Découverte des infrastructures serveurs : bases de la virtualisation, gestion du stockage sécurisé des données, réseaux d'entreprise et sécurité informatique."
    }
  ];

  const formations = [
    {
      title: "Master 1 -- Intelligence Artificielle",
      date: "2024 -- 2026",
      school: "Université d'Avignon, France",
      desc: "Spécialisation en Deep Learning, Traitement du Langage Naturel (NLP) et Vision par Ordinateur. Étude des modèles neuronaux et de l'apprentissage stochastique."
    },
    {
      title: "Diplôme d'Ingénieur SI",
      date: "2019 -- 2024 / 2025",
      school: "ENPO Maurice Audin",
      desc: "Formation complète en informatique (Top 7% au concours national) : développement logiciel, algorithmique avancée, bases de données et gestion des SI."
    }
  ];

  const projects = [
    {
      title: "SignifyAI",
      short: "Reconnaissance de la langue des signes",
      desc: "Système de traduction en temps réel. Entraînement de modèles LSTM et Transformers, intégration de MediaPipe pour la détection du squelette, et fine-tuning de GPT-Neo. (Label Projet Innovant).",
      tech: ["MediaPipe", "LSTM", "TensorFlow", "Transformers", "GPT-Neo"]
    },
    {
      title: "Pepper en EHPAD",
      short: "Robot assistant conversationnel",
      desc: "Développement d'un agent pour le robot Pepper destiné aux EHPAD. Mise en place de la reconnaissance vocale, compréhension du langage naturel (NLU) et synthèse vocale.",
      tech: ["Python", "RASA", "Choregraphe", "Robotique"]
    },
    {
      title: "ALPAGA Vision",
      short: "Suivi d'objets en temps réel",
      desc: "Détection et suivi d'objets sur des flux vidéo de sécurité. Configuration, entraînement et évaluation des performances du modèle YOLOv8.",
      tech: ["Python", "YOLOv8", "Computer Vision"]
    },
    {
      title: "Pipeline RH Automatisé",
      short: "Outil d'analyse sémantique",
      desc: "Script d'automatisation pour le traitement des candidatures. Utilisation de la bibliothèque Spacy en Python pour extraire les informations clés des CV reçus par e-mail.",
      tech: ["Python", "Spacy", "NLP", "API"]
    },
    {
      title: "Stage Space",
      short: "Plateforme de gestion de stages",
      desc: "Application web full-stack développée pour la gestion administrative des stages des étudiants à l'ENPO. Implémentée avec une architecture robuste et une arborescence claire.",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"]
    }
  ];

  return (
    <>
      <Particles />
      <MouseGlow />
      <Navbar />
      <Chatbot />

      <main>
        {/* HERO SECTION */}
        <section id="about" className="hero">
          <div className="container" style={{ position: "relative", zIndex: 10 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ display: "inline-block", marginBottom: "20px" }}>
              <span className="badge">Alternance en Intelligence Artificielle – Septembre 2026</span>
            </motion.div>
            
            <motion.h1 className="hero-title animate-fade-up">
              Kawther <span style={{ color: "var(--text-accent)" }}>Halima Salem</span>
            </motion.h1>
            
            <motion.div className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              <div style={{ color: "var(--text-main)", fontWeight: 600, marginBottom: "12px", fontSize: "1.1rem" }}>
                Étudiante en Master 1 IA | Ingénieure en Systèmes d’Information
              </div>
              <div style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                Je conçois des solutions d’intelligence artificielle orientées résultats, avec une approche rigoureuse de la modélisation et du développement.
              </div>
            </motion.div>
            
            <motion.div className="flex justify-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
              <a href="#experiences" className="btn-primary">Mon Parcours</a>
              <a href="#contact" className="btn-secondary">Contact</a>
            </motion.div>
          </div>
        </section>

        {/* PARCOURS SECTION */}
        <section id="experiences" className="section container">
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Parcours
          </motion.h2>
          
          <ParcoursInteractive formations={formations} experiences={experiences} />

        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section container">
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Projets
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
            Compétences
          </motion.h2>
          
          <div className="flex justify-center" style={{ flexWrap: "wrap", gap: "12px", maxWidth: "1000px", margin: "0 auto" }}>
            <h3 style={{ width: "100%", textAlign: "center", marginBottom: "8px", fontSize: "1.2rem", color: "white" }}>ML / IA</h3>
            {["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "HuggingFace Transformers", "YOLOv8", "Pandas", "NumPy", "OpenCV", "Mediapipe"].map((s, i) => (
              <motion.div key={`ml-${i}`} className="glass-panel" style={{ padding: "8px 16px", color: "white", fontSize: "0.95rem" }}>{s}</motion.div>
            ))}
            
            <h3 style={{ width: "100%", textAlign: "center", margin: "16px 0 8px", fontSize: "1.2rem", color: "white" }}>Langages</h3>
            {["Python", "Java", "C", "JavaScript"].map((s, i) => (
              <motion.div key={`lang-${i}`} className="glass-panel" style={{ padding: "8px 16px", color: "var(--text-accent)", fontSize: "0.95rem" }}>{s}</motion.div>
            ))}

            <h3 style={{ width: "100%", textAlign: "center", margin: "16px 0 8px", fontSize: "1.2rem", color: "white" }}>Bases de données, Web & DataViz</h3>
            {["SQL", "Oracle", "PostgreSQL", "MongoDB", "NodeJS", "Express", "Power BI"].map((s, i) => (
              <motion.div key={`db-${i}`} className="glass-panel" style={{ padding: "8px 16px", color: "white", fontSize: "0.95rem" }}>{s}</motion.div>
            ))}

            <h3 style={{ width: "100%", textAlign: "center", margin: "16px 0 8px", fontSize: "1.2rem", color: "white" }}>Outils, Modélisation & Méthodes</h3>
            {["Git", "Linux", "Jupyter", "Docker", "UML", "Merise", "BPMN", "Scrum", "Agile", "ITIL"].map((s, i) => (
              <motion.div key={`tools-${i}`} className="glass-panel" style={{ padding: "8px 16px", color: "var(--text-muted)", fontSize: "0.95rem" }}>{s}</motion.div>
            ))}
          </div>
        </section>

        {/* INFO SECTION */}
        <section className="section container">
          <div className="grid grid-cols-2" style={{ gap: "30px", maxWidth: "800px", margin: "0 auto" }}>
            {/* Languages */}
            <motion.div className="glass-panel" style={{ padding: "30px" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "white" }}>Langues</h3>
              <div className="flex flex-col gap-4">
                {[{ name: "Arabe", lvl: "Natif" }, { name: "Français", lvl: "Avancé" }, { name: "Anglais", lvl: "Professionnel" }].map((l, i) => (
                  <div key={i} className="flex flex-col" style={{ paddingBottom: "12px", borderBottom: "1px solid var(--border-light)" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 500 }}>{l.name}</span>
                    <span style={{ color: "var(--text-accent)", fontSize: "0.85rem" }}>{l.lvl}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Extras */}
            <motion.div className="glass-panel" style={{ padding: "30px" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: "1.5rem", margin: "0 0 12px 0", color: "white" }}>Engagement</h3>
              
              <div style={{ margin: "0 0 12px 0" }}>
                <div style={{ color: "white", fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 0 2px 0" }}>
                  <span>BERRY — Club Informatique</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "normal" }}>2022 -- 2024</span>
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-accent)", margin: 0 }}>Design, cybersécurité, développement web / mobile.</div>
              </div>
              
              <div style={{ margin: 0 }}>
                <div style={{ color: "white", fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 0 2px 0" }}>
                  <span>CREATIVUM — Club Culturel</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "normal" }}>2019 -- 2020</span>
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-accent)", margin: 0 }}>Ateliers, événements artistiques, débats.</div>
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
            <h2 style={{ fontSize: "3rem", fontWeight: 700, color: "white", marginBottom: "16px" }}>Contact</h2>
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: "800px", marginBottom: "40px", lineHeight: "1.6" }}>
              Disponible pour une alternance en intelligence artificielle à partir de septembre 2026, je suis ouverte à toute opportunité me permettant de contribuer à des projets innovants.
            </p>
            
            <div className="flex gap-4" style={{ flexWrap: "wrap", justifyContent: "center" }}>
              <a href="mailto:halimasalemkawther@gmail.com" className="btn-primary">Email</a>
              <a href="tel:+33758494838" className="btn-secondary" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>Téléphone</a>
              <a href="https://www.linkedin.com/in/kawther-halima-salem-82538925a/" target="_blank" rel="noreferrer" className="btn-secondary">LinkedIn</a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid var(--border-light)", padding: "40px 0", textAlign: "center", color: "var(--text-muted)", position: "relative", zIndex: 10 }}>
        <p>© {new Date().getFullYear()} Kawther Halima Salem. Tous droits réservés.</p>
        <p style={{ fontSize: "0.85rem", marginTop: "8px" }}>+33 758 494 838 | halimasalemkawther@gmail.com</p>
      </footer>
    </>
  );
}