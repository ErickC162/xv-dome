import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, MapPin, Play, Pause, Music } from 'lucide-react';
import './InvitationPage.css';
import cancion from '/thinking_out_loud.mp3';
import foto from '/letra_D.png';
import flor from '/flor_azul.png';

const InvitationPage = () => {
  const linkWhatsApp = "https://wa.me/593986875274?text=¡Hola!%20Confirmo%20mi%20asistencia%20a%20los%20XV%20de%20Dome.";
  const linkUbicacion = "https://maps.app.goo.gl/ymLuotCYdkqbeXVW8";
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Usamos una referencia para mantener el objeto Audio vivo después del inicio
  const audioRef = useRef(null);

  const handleStart = () => {
    // Inicializamos el audio localmente al momento del clic
    const audio = new Audio('/thinking_out_loud.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    
    audio.play()
      .then(() => {
        audioRef.current = audio;
        setIsPlaying(true);
        setHasInteracted(true);
      })
      .catch((err) => {
        console.error("Error al iniciar:", err);
        setHasInteracted(true);
      });
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Pantalla de bienvenida
  if (!hasInteracted) {
    return (
      <div className="welcome-overlay" onClick={handleStart}>
        <div className="welcome-content">
          <p className="welcome-text">BIENVENIDO A MIS XV</p>
          <button className="enter-button">TOCA PARA CONTINUAR</button>
        </div>
      </div>
    );
  }

  return (
    <div className="invitation-container">
      
      {/* =========================================
         CAPAS DE ESTRELLAS DINÁMICAS Y CAMBIANTES
         ========================================= */}
      <div className="stars-background">
        <div className="stars-layer stars-layer-1"></div>
        <div className="stars-layer stars-layer-2"></div>
        <div className="stars-layer stars-layer-3"></div>
      </div>

      <img src={flor} alt="" className="flower-decor flower-top-right" />
      <img src={flor} alt="" className="flower-decor flower-bottom-left" style={{ transform: 'scaleX(-1)' }} />

      <button className={`music-btn ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic}>
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      <div className="content-wrapper">
        
        {/* ================= SECCIÓN 1: HERO (Portada) ================= */}
        <section className="hero-section fade-in-up">
          <p className="pre-title">Te invito a</p>
          <h1 className="main-title">MY XV</h1>
          <h2 className="sub-title">Birthday</h2>
          <img src={foto} alt="Protagonista" className="photo-floating" />
        </section>

        {/* ================= SECCIÓN 2: ACCIONES (Botones) ================= */}
        <section className="actions-section fade-in-up delay-1">
          <div className="section-header">
            <h3 className="section-title">Acompáñame</h3>
            <div className="divider"></div>
          </div>
          
          <div className="buttons-container">
            <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="action-item">
              <span className="action-label">Confirma tu<br/>asistencia</span>
              <div className="action-btn">
                <MessageCircle size={30} strokeWidth={1.5} />
              </div>
              <span className="action-text">WhatsApp</span>
            </a>

            <a href={linkUbicacion} target="_blank" rel="noopener noreferrer" className="action-item">
              <span className="action-label">Te espero<br/>en</span>
              <div className="action-btn">
                <MapPin size={30} strokeWidth={1.5} />
              </div>
              <span className="action-text">Ubicación</span>
            </a>
          </div>
        </section>

        {/* ================= SECCIÓN 3: ITINERARIO (Timeline) ================= */}
        <section className="timeline-section fade-in-up delay-2">
          <div className="timeline-header">
            <span className="timeline-cursive">Itinerario</span>
            <h3 className="section-title timeline-sparkle">Cronograma de la noche</h3>
            <div className="divider" style={{margin: '15px auto 0 auto'}}></div>
          </div>

          <div className="timeline-container">
            
            <div className="timeline-event">
              <div className="timeline-dot"></div>
              <span className="event-time">6:00 PM</span>
              <h4 className="event-title">RECEPCIÓN</h4>
              <p className="event-desc">Bienvenida con cóctel</p>
            </div>

            <div className="timeline-event">
              <div className="timeline-dot"></div>
              <span className="event-time">7:00 PM</span>
              <h4 className="event-title">CEREMONIA</h4>
              <p className="event-desc">Misa de acción de gracias</p>
            </div>

            <div className="timeline-event">
              <div className="timeline-dot"></div>
              <span className="event-time">8:30 PM</span>
              <h4 className="event-title">VALS</h4>
              <p className="event-desc">Baile principal</p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default InvitationPage;