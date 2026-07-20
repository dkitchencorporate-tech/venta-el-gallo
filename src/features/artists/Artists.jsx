import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArtistsHero from './components/ArtistsHero';
import ArtistCard from './components/ArtistCard';
import BiographyModal from './components/BiographyModal';
import { useBooking } from '../../context/BookingContext';

// Real Asset Imports
import daughtersGroupImg from '../../assets/raw/Venta-El-Gallo-15-1.jpg';
import antoniaImg from '../../assets/raw/antonia-ready.jpg';
import jaraImg from '../../assets/raw/jara-heredia-portrait.jpg';
import chonicoImg from '../../assets/raw/Antonio-el-Chonico-guitarra-Venta-el-Gallo.jpg';
import miguelImg from '../../assets/raw/Miguel-Angel-Cortes-Venta-el-Gallo-guitarra.webp';
import coralImg from '../../assets/raw/13-1.webp';
import pacoImg from '../../assets/raw/Artista-1.jpg';
import rayImg from '../../assets/raw/Raimundo.jpg';
import agustinImg from '../../assets/raw/Venta-El-Gallo-37-1.jpg';
import antonioCantaorImg from '../../assets/raw/antonio-heredia-cantaor.jpg';

const artistsData = [
  {
    name: "Jara Heredia",
    role: "DIRECCIÓN ARTÍSTICA",
    imageUrl: jaraImg,
    description: "Jara Heredia comenzó su carrera artística con profesores como Angustillas Ruiz “la mona” Manolete, Eva Garrido “la Yerbabuena”, Antonio Canales, Farruquito, Manuela Carrasco…… formando parte de la escuela escénica de Mario Maya. Actúa en varias ocasiones para S. M el rey D. Juan Carlos y en los Ángeles en casa de Antonio Banderas, Festival internacional de música y danza de Granada, festival del premio Lorca de poesía en Nueva York 2004, festival USA 2010, festival internacional de Carthage."
  },
  {
    name: "Antonia Heredia",
    role: "Bailaora",
    imageUrl: antoniaImg,
    description: "Antonia Heredia comenzó su carrera artística con la bailaora Angustias Ruiz y con su hermana Jara Heredia. Más tarde comienza a formarse profesionalmente con profesores como Mario Maya, Eduardo Serrano «guiri», Belén Maya, Rafaela Carrasco, Manuel Liñán… Comienza a actuar en los tablaos flamencos de Granada a los 12 años. Actuó en los festivales de música y danza de Granada. Ha actuado con artistas como Juan Moneo «El tortas» en el festival de Almuñécar, Pepe Habichuela y Josemi Carmona en una gira por toda India y Festival de Mont de Marsan con Pepe Luis Carmona en numerosos festivales. Participa con Antonio Canales en el corral del carbón en varios videoclips de la talla de «Manzanita, Remedios Amaya, Antonio Carmona, Pepe Luis Carmona…»"
  },
  {
    name: "Dinastía Heredia",
    role: "Hijas del Fundador",
    imageUrl: daughtersGroupImg,
    description: "El alma femenina de la Venta El Gallo. Las hijas de Juan Heredia representan la continuidad histórica y el compromiso inquebrantable con el arte puro que su padre inició."
  },
  {
    name: "Antonio Heredia «El Chonico»",
    role: "Maestro Guitarrista",
    imageUrl: chonicoImg,
    description: "Referente absoluto del toque granadino. Su guitarra es el latido indómito de la cueva, combinando una técnica depurada con el eco ancestral del barrio del Sacromonte."
  },
  {
    name: "Miguel Ángel Cortés",
    role: "Guitarra Concertista",
    imageUrl: miguelImg,
    description: "Virtuosismo y sensibilidad reconocidos internacionalmente. Premiado con el Bordón Minero, es uno de los guitarristas más influyentes de su generación en el panorama flamenco."
  },
  {
    name: "Paco Fernández",
    role: "Bailaor",
    imageUrl: pacoImg,
    description: "Fuerza y carisma en el tablao. Siguiendo los pasos de grandes maestros, Paco imprime una energía visceral que hace vibrar los cimientos de la Zambra en cada actuación."
  },
  {
    name: "Coral Fernández",
    role: "Bailaora",
    imageUrl: coralImg,
    description: "Elegancia y técnica depurada. Formada en las mejores escuelas de flamencología, su baile es una oda a la estética granadina, llena de temperamento y precisión absoluta."
  },
  {
    name: "Raimundo Benítez",
    role: "Bailaor y Coreógrafo",
    imageUrl: rayImg,
    description: "Maestro del movimiento. Su trayectoria en compañías internacionales le permite aportar una profundidad interpretativa que eleva el baile hacia nuevas cotas de expresión."
  },
  {
    name: "Antonio Heredia",
    role: "Cantaor",
    imageUrl: antonioCantaorImg,
    description: "Antonio Heredia es un cantaor granadino con raíces flamencas profundas, nacido en una familia de artistas donde el cante siempre fue una forma de vida. Desde joven mostró un talento innato, empapándose de los cantes tradicionales y desarrollando una voz poderosa y expresiva. A los 19 años inició su carrera profesional en los tablaos de Granada, destacando por su versatilidad y su capacidad para emocionar al público.\n\nHa trabajado con grandes figuras del flamenco, como Los Farruco y Belén López, y ha participado en festivales tanto en España como a nivel internacional. En 2021 lanzó el álbum Hasta La Eternidad, disponible en plataformas digitales, y ha formado parte de espectáculos junto a artistas como Sergio Gómez \"El Colorao\" y Alicia Morales. Su cante, lleno de sentimiento y autenticidad, fusiona la tradición con un estilo personal que lo ha consolidado como una de las voces más respetadas del flamenco actual."
  }
];

const Artists = () => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const { openBooking } = useBooking();

  const handleNext = () => {
    setSelectedIdx((prev) => (prev + 1) % artistsData.length);
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev - 1 + artistsData.length) % artistsData.length);
  };

  return (
    <div className="fade-in min-h-screen bg-deep-black pb-0">
      <ArtistsHero />
      
      <div className="container mx-auto px-6 -mt-10 lg:-mt-20 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
           {artistsData.map((artist, idx) => (
             <ArtistCard 
               key={idx} 
               name={artist.name} 
               role={artist.role} 
               imageUrl={artist.imageUrl}
               description={artist.description}
               onOpenBiography={() => setSelectedIdx(idx)}
             />
           ))}
        </div>
      </div>

      <BiographyModal 
        isOpen={selectedIdx !== null}
        artist={selectedIdx !== null ? artistsData[selectedIdx] : null}
        onClose={() => setSelectedIdx(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Brutal VIP Booking CTA */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 mt-16 md:mt-24 mb-12">
        <div className="relative bg-[#FAFAFA] rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden text-center border border-gold/20 group hover:border-gold/50 transition-colors duration-1000">
          
          {/* Fondo Radial Sutil para Efecto Volumen */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-[#F0EBE1] opacity-70"></div>
          
          {/* Esquinas Doradas (VIP Card Feel) */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-gold/50 rounded-tl-[3rem] opacity-50 m-4 md:m-8"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-gold/50 rounded-br-[3rem] opacity-50 m-4 md:m-8"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            
            <div className="mb-6 md:mb-8 flex items-center justify-center gap-4">
              <div className="h-[2px] w-8 md:w-16 bg-gold/50"></div>
              <span className="text-gold text-[10px] md:text-sm font-black uppercase tracking-[0.4em]">Reserva Exclusiva</span>
              <div className="h-[2px] w-8 md:w-16 bg-gold/50"></div>
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-deep-black mb-6 md:mb-8 tracking-tighter leading-[0.9]">
              Siente la <span className="text-sacromonte-red italic pr-2">Zambra</span> <br/> en tu Piel.
            </h2>
            
            <p className="text-base md:text-xl text-gray-700 mb-10 md:mb-12 font-light max-w-2xl leading-relaxed">
              Las plazas para nuestra zambra son <strong className="font-bold text-deep-black">estrictamente limitadas</strong>. No pierdas la oportunidad de vivir el verdadero arte flamendo desde la primera fila.
            </p>
            
            {/* Botón CTA con Estilo Oro Puro y Transición Suave */}
            <button onClick={() => openBooking({from: 'artists'})} className="group relative inline-flex items-center justify-center px-12 md:px-16 py-5 md:py-6 bg-deep-black border border-gold/50 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] hover:border-gold hover:-translate-y-1 transition-all duration-500">
              <span className="relative z-10 text-gold font-extrabold uppercase tracking-[0.3em] text-[10px] md:text-sm drop-shadow-md group-hover:text-gold/80 group-hover:scale-105 transition-all duration-500">
                Reservar
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Immersive closer strictly tucked near footer */}
      <div className="text-center pb-8 px-6">
        <p className="text-gold-500/20 font-serif italic text-xs md:text-sm max-w-lg mx-auto">
          "El flamenco en la Venta El Gallo no se ensaya, se hereda."
        </p>
      </div>
    </div>
  );
};

export default Artists;
