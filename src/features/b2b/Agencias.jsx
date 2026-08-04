import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, MapPin, Phone, Mail, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heroBg from '../../assets/raw/Venta-El-Gallo-15-1.jpg';

const Agencias = () => {
  const { t } = useTranslation();
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
              {t('agencias_page.hero.tag')}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tighter shadow-black drop-shadow-2xl"
          >
            {t('agencias_page.hero.title_1')}<span className="italic text-gold">{t('agencias_page.hero.title_2')}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {t('agencias_page.hero.desc')}
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
                  {t('agencias_page.services.tag')}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-deep-black mb-6 leading-[1.1] tracking-tight">
                  {t('agencias_page.services.title_1')}<span className="italic text-gold">{t('agencias_page.services.title_2')}</span>
                </h2>
                <p className="text-gray-700 font-light text-lg mb-8 leading-relaxed">
                  {t('agencias_page.services.desc')}
                </p>
                
                <h3 className="text-xl font-serif text-sacromonte-red mb-4">{t('agencias_page.services.subtitle')}</h3>
                <ul className="space-y-4 mb-8">
                  {t('agencias_page.services.list', { returnObjects: true })?.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      {[<MapPin key={0} size={18} className="text-gold shrink-0" />, <FileText key={1} size={18} className="text-gold shrink-0" />, <Users key={2} size={18} className="text-gold shrink-0" />, <Building2 key={3} size={18} className="text-gold shrink-0" />][i % 4]}
                      <span><strong>{item.title}</strong> {item.desc}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xl font-serif italic text-deep-black mt-8">
                  {t('agencias_page.services.footer')}
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
            
            {/* Francisco Contact Block - Principal */}
            <div className="relative bg-white border border-gold/10 shadow-xl shadow-gold/5 rounded-3xl p-8 md:p-12 overflow-hidden max-w-2xl mx-auto w-full group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-deep-black mb-2">{t('agencias_page.contact.title')}</h3>
                  <p className="text-gray-500 text-sm md:text-base font-light mb-6">
                    {t('agencias_page.contact.desc')}
                  </p>
                  <div className="inline-flex items-center gap-3 bg-[#faf9f6] border border-gray-100 px-6 py-3 rounded-full mb-8 shadow-sm">
                    <span className="text-deep-black font-serif text-xl">Francisco</span>
                    <span className="text-gold text-[10px] font-black uppercase tracking-widest bg-gold/10 px-2 py-0.5 rounded-sm">{t('agencias_page.contact.paco_tag')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Fijo */}
                  <a href="tel:+34958049461" className="flex items-center gap-4 bg-[#faf9f6] hover:bg-white border border-gray-100 hover:border-gold/30 p-4 rounded-2xl transition-all shadow-sm hover:shadow-md group/btn">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover/btn:scale-110 transition-transform shrink-0">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[9px] uppercase tracking-widest font-bold">{t('agencias_page.contact.fijo')}</span>
                      <span className="text-deep-black font-serif text-base tracking-wider">+34 958 049 461</span>
                    </div>
                  </a>

                  {/* WhatsApp / Móvil */}
                  <a href="https://wa.me/34606739990" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[#faf9f6] hover:bg-white border border-gray-100 hover:border-[#25D366]/40 p-4 rounded-2xl transition-all shadow-sm hover:shadow-md group/btn">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover/btn:scale-110 transition-transform shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div class="flex flex-col">
                      <span className="text-[#25D366] text-[9px] uppercase tracking-widest font-bold">{t('agencias_page.contact.movil')}</span>
                      <span className="text-deep-black font-serif text-base tracking-wider">+34 606 739 990</span>
                    </div>
                  </a>

                  {/* Email General / Reservas */}
                  <a href="mailto:reservas@cuevaventaelgallo.es" className="md:col-span-2 flex items-center gap-4 bg-[#faf9f6] hover:bg-white border border-gray-100 hover:border-gold/30 p-4 rounded-2xl transition-all shadow-sm hover:shadow-md group/btn min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover/btn:scale-110 transition-transform shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="flex flex-col min-w-0 overflow-hidden">
                      <span className="text-gray-400 text-[9px] uppercase tracking-widest font-bold">{t('agencias_page.contact.email_general')}</span>
                      <span className="text-deep-black font-serif text-xs sm:text-sm md:text-base tracking-tight sm:tracking-wider truncate max-w-full">reservas@cuevaventaelgallo.es</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form Section - Luminous */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-deep-black mb-4">{t('agencias_page.form.title_1')}<span className="italic text-sacromonte-red">{t('agencias_page.form.title_2')}</span></h2>
            <p className="text-gray-600 font-light">
              {t('agencias_page.form.desc')}
            </p>
          </div>
          
          <form 
            action="mailto:reservas@cuevaventaelgallo.es" 
            method="POST" 
            encType="text/plain"
            className="bg-[#faf9f6] border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">{t('agencias_page.form.name_label')}</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-deep-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all shadow-sm" placeholder={t('agencias_page.form.name_placeholder')} required />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">{t('agencias_page.form.email_label')}</label>
                <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-deep-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all shadow-sm" placeholder={t('agencias_page.form.email_placeholder')} required />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">{t('agencias_page.form.details_label')}</label>
              <textarea 
                rows="5" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-deep-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all shadow-sm resize-none" 
                placeholder={t('agencias_page.form.details_placeholder')}
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-deep-black text-white px-12 py-4 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-gold transition-colors shadow-lg"
              >
                {t('agencias_page.form.button')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Agencias;
