import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, MapPin, Phone, Mail, FileText } from 'lucide-react';
import heroBg from '../../assets/raw/Venta-El-Gallo-15-1.jpg';

const Agencias = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fade-in min-h-screen bg-deep-black">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30 filter grayscale" style={{ backgroundImage: `url(${heroBg})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/60 to-deep-black/90"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-md mb-8"
          >
            <Building2 size={14} className="text-gold" />
            <span className="text-gold text-[10px] font-black uppercase tracking-[0.3em]">
              Eventos y Profesionales
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tighter shadow-black drop-shadow-2xl"
          >
            Eventos con <span className="italic text-gold">Alma</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed"
          >
            ¿Buscas un lugar con magia para tu próximo evento? En nuestra cueva del Sacromonte, donde el flamenco nace y la historia se respira en cada rincón, creamos momentos únicos que quedan grabados para siempre.
          </motion.p>
        </div>
      </section>

      {/* Main Content & Value Prop - Luminous Background */}
      <section className="py-20 bg-[#faf9f6] relative z-20 -mt-10">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl shadow-gold/5 max-w-5xl mx-auto border border-gold/10 relative overflow-hidden group">
            
            {/* Subtle Golden Glow inside card */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-100 blur-3xl"></div>

            <div className="flex flex-col md:flex-row items-start gap-12 md:gap-20">
              <div className="flex-1 z-10">
                <span className="inline-block px-4 py-1 text-sacromonte-red border border-sacromonte-red/30 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                  Celebraciones Únicas
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-deep-black mb-6 leading-[1.1] tracking-tight">
                  ¿Quieres celebrar un evento especial con <span className="italic text-gold">nosotros?</span>
                </h2>
                <p className="text-gray-700 font-light text-lg mb-8 leading-relaxed">
                  Celebraciones especiales, cenas de empresa, viajes con amigos o encuentros culturales… Sea cual sea la ocasión, la convertimos en una experiencia inolvidable. Combinamos lo mejor de la gastronomía andaluza con el arte más auténtico del flamenco, en un entorno incomparable con vistas a la Alhambra y el embrujo de Granada.
                </p>
                
                <h3 className="text-xl font-serif text-sacromonte-red mb-4">Nuestros Servicios para Eventos:</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <MapPin size={18} className="text-gold shrink-0" /> 
                    <span><strong>Espacios con encanto:</strong> Terraza con vistas, salones en cueva y zonas privadas.</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <FileText size={18} className="text-gold shrink-0" /> 
                    <span><strong>Gastronomía personalizada:</strong> Menú o carta adaptada a cada tipo de evento.</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <Users size={18} className="text-gold shrink-0" /> 
                    <span><strong>Flamenco en vivo:</strong> Para dar ese toque de emoción y autenticidad.</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <Building2 size={18} className="text-gold shrink-0" /> 
                    <span><strong>Organización integral:</strong> Para que tú solo te preocupes de disfrutar.</span>
                  </li>
                </ul>

                <p className="text-xl font-serif italic text-deep-black mt-8">
                  Haz que tu evento tenga alma, sabor… y arte.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Contact Team Block */}
      <section className="py-20 bg-[#faf9f6] border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            
            {/* Paco Contact Block - Principal */}
            <div className="relative bg-white border border-gold/10 shadow-xl shadow-gold/5 rounded-3xl p-8 md:p-12 overflow-hidden flex-1 group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-deep-black mb-2">Contacto Directo</h3>
                  <p className="text-gray-500 text-sm md:text-base font-light mb-6">
                    Atención exclusiva para profesionales del sector turístico y corporativo.
                  </p>
                  <div className="inline-flex items-center gap-3 bg-[#faf9f6] border border-gray-100 px-6 py-3 rounded-full mb-8 shadow-sm">
                    <span className="text-deep-black font-serif text-xl">Paco</span>
                    <span className="text-gold text-[10px] font-black uppercase tracking-widest bg-gold/10 px-2 py-0.5 rounded-sm">Operaciones B2B</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <a href="tel:+34958049461" className="flex items-center gap-6 bg-[#faf9f6] hover:bg-white border border-gray-100 hover:border-gold/30 p-4 rounded-2xl transition-all shadow-sm hover:shadow-md group/btn">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover/btn:scale-110 transition-transform">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[9px] uppercase tracking-widest font-bold">Fijo</span>
                      <span className="text-deep-black font-serif text-lg tracking-wider">+34 958 049 461</span>
                    </div>
                  </a>

                  <a href="tel:+34606739990" className="flex items-center gap-6 bg-[#faf9f6] hover:bg-white border border-gray-100 hover:border-gold/30 p-4 rounded-2xl transition-all shadow-sm hover:shadow-md group/btn">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover/btn:scale-110 transition-transform">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[9px] uppercase tracking-widest font-bold">Móvil / WhatsApp</span>
                      <span className="text-deep-black font-serif text-lg tracking-wider">+34 606 739 990</span>
                    </div>
                  </a>

                  <a href="mailto:info@cuevaventaelgallo.es" className="flex items-center gap-6 bg-[#faf9f6] hover:bg-white border border-gray-100 hover:border-gold/30 p-4 rounded-2xl transition-all shadow-sm hover:shadow-md group/btn">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover/btn:scale-110 transition-transform">
                      <Mail size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[9px] uppercase tracking-widest font-bold">Email General</span>
                      <span className="text-deep-black font-serif text-lg tracking-wider">info@cuevaventaelgallo.es</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Germán Contact Block - Secundario */}
            <div className="relative bg-white border border-gray-100 shadow-lg rounded-3xl p-8 overflow-hidden lg:w-1/3 flex flex-col justify-center">
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-sacromonte-red/5 flex items-center justify-center text-sacromonte-red mx-auto mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-serif text-deep-black mb-1">Germán</h3>
                <span className="inline-block text-sacromonte-red text-[9px] font-black uppercase tracking-widest bg-sacromonte-red/5 px-2 py-0.5 rounded-sm mb-4">Marketing Digital</span>
                <p className="text-gray-500 text-xs font-light mb-6 px-4">
                  Colaboraciones, marketing y alianzas estratégicas.
                </p>
                <a href="tel:+34624050842" className="inline-flex items-center justify-center gap-3 w-full bg-[#faf9f6] hover:bg-white border border-gray-100 hover:border-sacromonte-red/30 py-3 rounded-xl transition-all shadow-sm hover:shadow-md group/btn">
                  <Phone size={14} className="text-sacromonte-red group-hover/btn:scale-110 transition-transform" />
                  <span className="text-deep-black font-serif tracking-wider">+34 624 050 842</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form Section - Luminous */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-deep-black mb-4">Solicitud de <span className="italic text-sacromonte-red">Eventos</span></h2>
            <p className="text-gray-600 font-light">
              Envíanos los detalles de tu evento y prepararemos una propuesta a medida.
            </p>
          </div>
          
          <form 
            action="mailto:info@cuevaventaelgallo.es" 
            method="POST" 
            encType="text/plain"
            className="bg-[#faf9f6] border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Nombre / Agencia</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-deep-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all shadow-sm" placeholder="Tu nombre o empresa" required />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Email</label>
                <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-deep-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all shadow-sm" placeholder="correo@ejemplo.com" required />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Detalles del Evento</label>
              <textarea 
                rows="5" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-deep-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all shadow-sm resize-none" 
                placeholder="Indícanos fechas, número de personas, menús deseados y cualquier requerimiento especial..."
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-deep-black text-white px-12 py-4 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-gold transition-colors shadow-lg"
              >
                Organizar Evento
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Agencias;
