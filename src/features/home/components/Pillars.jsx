import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Real Raw Assets
import showImg from '../../../assets/raw/Venta-El-Gallo-1-1280x961-2.jpg';
import restaurantImg from '../../../assets/raw/Restaurante-Venta-El-Gallo-Alhambra-de-Granada-1-1.jpg';
import eventsImg from '../../../assets/raw/Cueva-Venta-El-Gallo-6-Julio-2-1280x914-2.jpg';
import locationImg from '../../../assets/raw/Venta-El-Gallo-38-1.jpg';

const Pillars = () => {
  const { t } = useTranslation();

  const entryPoints = [
    { 
      title: t('pillars.items.zambra.title'), 
      desc: t('pillars.items.zambra.desc'), 
      img: showImg,
      link: '/artistas',
      num: '01'
    },
    { 
      title: t('pillars.items.gastronomy.title'), 
      desc: t('pillars.items.gastronomy.desc'), 
      img: restaurantImg,
      link: '/restaurante',
      num: '02'
    },
    { 
      title: t('pillars.items.events.title'), 
      desc: t('pillars.items.events.desc'), 
      img: eventsImg,
      link: '/agencias',
      num: '03'
    },
    { 
      title: t('pillars.items.views.title'), 
      desc: t('pillars.items.views.desc'), 
      img: locationImg,
      link: '/contacto',
      num: '04'
    }
  ];

  return (
    <section className="bg-deep-black text-metallic-white relative z-20">
      {/* Fluid Ecosystem Grid - No borders, just pure imagery and gradients */}
      <div className="flex flex-col md:flex-row w-full h-auto min-h-[60vh]">
        {entryPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex-1 relative group min-h-[500px] md:h-auto overflow-hidden cursor-pointer border-b md:border-b-0 border-white/5"
          >
            {/* Background Image: Starts dark and colored, brightens on hover */}
            <img 
              src={point.img} 
              alt={point.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 md:opacity-40 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-110" 
            />
            
            {/* Permanent Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black/95 via-deep-black/40 to-deep-black/10"></div>
            
            <div className="absolute inset-0 bg-deep-black/20 group-hover:bg-transparent transition-colors duration-700"></div>

            {/* Always Visible Layout Numbers */}
            <div className="absolute top-10 left-10 overflow-hidden">
               <span className="block text-5xl font-serif text-white/40 group-hover:text-gold transition-colors duration-500 transform group-hover:translate-x-2">{point.num}</span>
            </div>

            {/* Highly Legible Actionable Content Layer */}
            <div className="absolute bottom-10 left-8 right-8 z-20 flex flex-col items-start justify-end h-full">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-3 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] leading-tight">{point.title}</h3>
              <p className="text-[10px] md:text-xs uppercase font-black tracking-[0.2em] text-gold mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-100 md:opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                {point.desc}
              </p>
              
              <Link 
                to={point.link} 
                className="btn-gold flex items-center gap-3 text-[9px] uppercase tracking-widest px-6 py-3 shadow-lg transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
              >
                {t('pillars.cta')} <ArrowRight size={14} />
              </Link>
            </div>
            
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Pillars;
