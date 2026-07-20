import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import daughtersImg from '../../../assets/raw/Venta-El-Gallo-15-1.jpg';
import juanilloImg from '../../../assets/raw/Juanillo-Heredia.webp';

const Legacy = () => {
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section className="relative py-16 md:py-24 bg-metallic-white overflow-hidden text-deep-black rounded-[40px] md:rounded-[60px] mx-4 md:mx-10 shadow-[0_0_80px_rgba(248,249,250,0.08)] -mt-16 z-20">
      <div className="section-container relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Legacy Imagery (Fixed Aspect Ratio to avoid crop) */}
          <div className="flex-1 w-full flex justify-center lg:justify-start">
            <div className="relative w-full aspect-[4/5] max-w-md rounded-t-[100px] overflow-hidden shadow-2xl group">
              <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-[120%]">
                <img 
                  src={daughtersImg} 
                  alt="Las Hijas de Juanillo - Venta El Gallo" 
                  className="w-full h-full object-cover origin-top"
                />
              </motion.div>
              
              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/20 to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-10 left-8 right-8 z-20 text-white pointer-events-none">
                 <span className="inline-block px-4 py-1 border border-gold/50 text-gold text-[8px] uppercase tracking-[0.3em] font-black mb-4">El Ritmo en la Sangre</span>
                 <h3 className="text-4xl lg:text-5xl font-serif leading-none mb-3">El Legado Continúa</h3>
                 <p className="text-xs text-white/70 font-light hidden md:block max-w-[90%]">Hijas del fundador, bailarinas principales y guardianas de la autenticidad.</p>
              </div>
            </div>
          </div>

          {/* Historical Narrative */}
          <div className="flex-1 flex flex-col justify-center">
            
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex items-center gap-6 mb-10">
                <img src={juanilloImg} alt="Juanillo Heredia" className="w-16 h-16 rounded-full grayscale border border-gray-300 shadow-xl object-cover" />
                <div>
                   <h4 className="font-serif text-xl">Juanillo Heredia</h4>
                   <p className="text-[9px] uppercase font-bold tracking-widest text-sacromonte-red/80">Fundador Visionario</p>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-deep-black mb-8 leading-tight">
                Una dinastía de <br />
                <span className="italic text-gold">arte y pasión.</span>
              </h2>
              
              <div className="w-10 h-px bg-gray-300 mb-8"></div>
              
              <p className="text-base text-gray-600 font-light leading-relaxed mb-6">
                Fundada por el legendario Juanillo Heredia, la Cueva Venta El Gallo es más que un tablao; es una casa. Hoy, sus tres hijas son las herederas directas de ese linaje inquebrantable.
              </p>
              
              <p className="text-base text-gray-600 font-light leading-relaxed mb-10">
                No solo dirigen este origen, sino que despliegan su poderío en el escenario cada noche, asegurando que la fuerza y la técnica mantengan el prestigioso estándar que estableció su padre.
              </p>
              
              <div className="flex gap-6 items-center">
                <Link to="/historia" className="text-[10px] uppercase tracking-widest font-bold text-deep-black hover:text-sacromonte-red transition-colors duration-300 relative group">
                  Conoce nuestra historia
                  <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-sacromonte-red transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Legacy;
