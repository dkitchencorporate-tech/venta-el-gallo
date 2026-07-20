import React from 'react';
import { motion } from 'framer-motion';

import juanilloImg from '../../../assets/raw/juanillo-solo.jpeg';
import zambraImg from '../../../assets/raw/Venta-El-Gallo-1-1280x961-2.jpg';
import exteriorImg from '../../../assets/raw/Cueva-Venta-El-Gallo-6-Julio-7-1.jpg';
import daughtersImg from '../../../assets/raw/Venta-El-Gallo-15-1.jpg';

const events = [
  { 
    year: "1996", 
    title: "El Origen en la Roca", 
    desc: "Juanillo Heredia adquiere la cueva en el mítico barranco de los Negros. Lo que comenzó excavando la roca, pronto se convertiría en un santuario del cante y el baile puro, cimentando nuestra leyenda.",
    img: juanilloImg,
    isCircle: true,
    filter: "contrast-[1.1] saturate-[1.2]",
    objectPosition: "object-top",
    align: "left"
  },
  { 
    year: "1970s", 
    title: "El Origen de la Zambra", 
    desc: "Definimos nuestro formato de 'Zambra Gitana'. El boca a boca, el sudor y la pasión atraen a personalidades de todo el mundo. La acústica natural de la cal y la roca se revela como nuestro mayor tesoro.",
    img: zambraImg,
    isCircle: false,
    filter: "contrast-100",
    align: "right"
  },
  { 
    year: "2001", 
    title: "Galardón de Prestigio", 
    desc: "Venta El Gallo recibe el Premio al Prestigio Turístico de Granada. Un reconocimiento oficial que valida décadas de dedicación ininterrumpida a la preservación del arte flamenco en su estado más visceral.",
    img: exteriorImg,
    isCircle: false,
    filter: "contrast-[1.05]",
    align: "left"
  },
  { 
    year: "Legado", 
    title: "La Sangre Continúa", 
    desc: "Hoy, las herederas directas velan por el fuego. No solo custodian el origen, sino que imponen su respeto sobre el escenario cada noche, fundiendo la tradición intransigente con la más alta gastronomía.",
    img: daughtersImg,
    isCircle: false,
    filter: "contrast-100",
    align: "right"
  }
];

const MuseumCard = ({ event, index }) => {
  const isImageLeft = event.align === 'left';

  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto mb-20 md:mb-32 group`}>
       
       {/* Central Subtle Track for Desktop */}
       <div className="hidden md:block absolute left-1/2 top-0 bottom-[-8rem] w-[1px] bg-gradient-to-b from-gray-200 via-gray-300 to-transparent transform -translate-x-1/2 z-0"></div>
       
       {/* Dot on the track */}
       <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10 items-center justify-center">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-1.5 h-1.5 rounded-full bg-gold/50"
          />
       </div>

       {/* Subdued Elegant Image */}
       <div className={`w-full md:w-1/2 flex justify-center items-center relative z-10 ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className={`overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.08)] bg-gray-50 flex items-center justify-center ${
              event.isCircle 
                ? 'w-56 h-56 md:w-64 md:h-64 rounded-full border border-gray-100 p-2 bg-white' 
                : 'w-[85%] md:w-80 h-[400px] md:h-96 rounded-2xl'
            }`}
          >
            <div className={`w-full h-full overflow-hidden ${event.isCircle ? 'rounded-full' : 'rounded-2xl'}`}>
              <img 
                src={event.img} 
                alt={event.title} 
                className={`w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105 ${event.filter} ${event.objectPosition || 'object-center'}`} 
              />
            </div>
          </motion.div>
       </div>

       {/* Extremely Clean, Reduced Typography Block */}
       <div className={`w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 mt-10 md:mt-0 relative z-10 ${isImageLeft ? 'md:order-2 md:justify-start' : 'md:order-1 md:justify-end'}`}>
          <motion.div 
            initial={{ opacity: 0, x: isImageLeft ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className={`max-w-sm flex flex-col ${isImageLeft ? 'md:items-start text-center md:text-left' : 'md:items-end text-center md:text-right'}`}
          >
             <span className="text-sacromonte-red font-bold tracking-[0.25em] text-[10px] uppercase mb-4 inline-block">
                {event.year}
             </span>
             
             {/* The title size is strictly controlled here (text-2xl to 3xl max) */}
             <h3 className="text-2xl md:text-3xl font-serif text-deep-black leading-tight tracking-tight mb-5">
                {event.title}
             </h3>
             
             <p className="text-[13px] md:text-sm text-gray-500 font-light leading-[1.8] max-w-xs">
                {event.desc}
             </p>
          </motion.div>
       </div>

    </div>
  );
};

const Timeline = () => {
  return (
    <div className="relative z-20 mt-4 lg:mt-8 mx-4 sm:mx-8 lg:mx-20 rounded-[40px] lg:rounded-[60px] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-gray-100/50 mb-8 lg:mb-12 overflow-hidden">
        
        {/* Gallery Intro */}
        <div className="max-w-2xl mx-auto text-center py-24 md:py-32 px-6">
           <div className="inline-block px-4 py-1.5 border border-sacromonte-red/20 text-sacromonte-red bg-transparent text-[9px] uppercase tracking-[0.3em] font-bold mb-6 rounded-sm">
             Nuestro Mapa del Tiempo
           </div>
           
           {/* Greatly reduced Intro Header */}
           <h2 className="text-3xl md:text-4xl font-serif text-deep-black leading-[1.2] tracking-tight">
             Piedra, sudor y <br className="hidden md:block"/>
             <span className="italic text-sacromonte-red font-light">tradición intacta.</span>
           </h2>
        </div>

        {/* Minimalist Cards Flow */}
        <div className="w-full px-4 md:px-8 pb-32">
           {events.map((evt, idx) => (
             <MuseumCard key={idx} event={evt} index={idx} />
           ))}
        </div>
        
    </div>
  );
};

export default Timeline;
