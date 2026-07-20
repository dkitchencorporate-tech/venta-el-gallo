import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Star, ExternalLink, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import InstagramReels from './InstagramReels';

// The fake reviews array is moved inside the component to use translations.

const Reviews = () => {
  const { t } = useTranslation();
  
  const FAKE_REVIEWS = [
    {
      author: "Elena M.",
      date: t('reviews.fake.r1.date'),
      text: t('reviews.fake.r1.text'),
      rating: 5
    },
    {
      author: "James D. (UK)",
      date: t('reviews.fake.r2.date'),
      text: t('reviews.fake.r2.text'),
      rating: 5
    },
    {
      author: "Sofía C.",
      date: t('reviews.fake.r3.date'),
      text: t('reviews.fake.r3.text'),
      rating: 5
    },
    {
      author: "Carlos T.",
      date: t('reviews.fake.r4.date'),
      text: t('reviews.fake.r4.text'),
      rating: 5
    }
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden text-deep-black bg-gradient-to-br from-white via-metallic-white to-gray-200 rounded-[40px] md:rounded-[60px] mx-4 md:mx-10 shadow-[0_0_80px_rgba(255,255,255,0.08)] z-20 my-8">
      
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
        <Quote size={200} />
      </div>

      <div className="section-container relative z-10 w-full max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 border border-gold/40 text-gold-700 bg-gold/5 text-[8px] uppercase tracking-widest font-black mb-6 rounded-sm shadow-sm">
             Google Reviews (+1.5k)
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-deep-black mb-6 leading-tight">
            {t('reviews.title_1')}<span className="italic text-sacromonte-red">{t('reviews.title_2')}</span>
          </h2>
          <p className="text-gray-600 font-light max-w-xl mx-auto text-sm md:text-base">
            {t('reviews.subtitle')}
          </p>
        </div>

        {/* Marquee Container (Prepped for future API integration) */}
        <div className="relative w-full overflow-hidden py-10" id="google-reviews-dynamic-container">
          
          {/* Gradient Masking for smooth edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-metallic-white to-transparent z-10"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-metallic-white to-transparent z-10"></div>

          {/* Marquee Track */}
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex gap-6 w-max"
          >
            {/* We duplicate the array to create a seamless infinite loop */}
            {[...FAKE_REVIEWS, ...FAKE_REVIEWS, ...FAKE_REVIEWS].map((review, i) => (
              <div key={i} className="w-[300px] md:w-[400px] flex-shrink-0 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-2xl p-8 border border-gray-100 flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)] hover:-translate-y-2 transition-all duration-500">
                <div>
                   <div className="flex justify-between items-start mb-4">
                     <div>
                       <h4 className="font-bold text-deep-black">{review.author}</h4>
                       <span className="text-[10px] text-gray-400">{review.date}</span>
                     </div>
                     <div className="flex gap-1 text-gold">
                       {[...Array(review.rating)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                     </div>
                   </div>
                   <p className="text-sm text-gray-600 italic leading-relaxed">"{review.text}"</p>
                </div>
                
                <div className="mt-6 flex items-center justify-between opacity-50">
                   <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                   <span className="text-[9px] uppercase font-bold tracking-widest border border-gray-200 px-2 py-1 rounded">{t('reviews.verified')}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Instagram Reels Component */}
        <InstagramReels />

        {/* Social Ecosystem */}
        <div className="mt-20 pt-16 border-t border-gray-200/60 w-full flex flex-col items-center">
           
           <div className="text-center mb-10">
             <h3 className="text-3xl lg:text-4xl font-serif text-deep-black mb-4">{t('reviews.social_title')}</h3>
             <p className="text-sm md:text-base text-gray-500 font-light max-w-lg mx-auto">
               {t('reviews.social_subtitle')}
             </p>
           </div>
           
           <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full">
             <a href="https://instagram.com/ventaelgalloficial" target="_blank" rel="noopener noreferrer" className="flex flex-1 min-w-[200px] max-w-[280px] items-center gap-4 bg-white px-6 py-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(225,48,108,0.2)] hover:bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:text-white transition-all duration-500 border border-gray-100 group">
               <Instagram size={28} className="text-gray-800 group-hover:text-white group-hover:scale-110 transition-all duration-500"/>
               <div>
                  <div className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 group-hover:text-white/80 transition-colors">{t('reviews.community')}</div>
                  <div className="font-bold text-base text-deep-black group-hover:text-white transition-colors">{t('reviews.instagram')}</div>
               </div>
             </a>

             <a href="https://www.tiktok.com/@cuevaventaelgallo" target="_blank" rel="noopener noreferrer" className="flex flex-1 min-w-[200px] max-w-[280px] items-center gap-4 bg-white px-6 py-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-[#000000] hover:text-white transition-all duration-500 border border-gray-100 group">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-gray-800 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.27 6.32 6.32 6.32 0 0 0 6.16-5.38v-5.65a8.42 8.42 0 0 0 2.16.29v-3.45a5.53 5.53 0 0 1-2-.1z"/>
               </svg>
               <div>
                  <div className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 group-hover:text-white/80 transition-colors">{t('reviews.trends')}</div>
                  <div className="font-bold text-base text-deep-black group-hover:text-white transition-colors">{t('reviews.tiktok')}</div>
               </div>
             </a>

             <a href="https://www.facebook.com/ventaelgalloficial" target="_blank" rel="noopener noreferrer" className="flex flex-1 min-w-[200px] max-w-[280px] items-center gap-4 bg-white px-6 py-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(24,119,242,0.2)] hover:bg-[#1877F2] hover:text-white transition-all duration-500 border border-gray-100 group">
               <Facebook size={28} className="text-gray-800 group-hover:text-white group-hover:scale-110 transition-all duration-500"/>
               <div>
                  <div className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 group-hover:text-white/80 transition-colors">{t('reviews.follow_us')}</div>
                  <div className="font-bold text-base text-deep-black group-hover:text-white transition-colors">{t('reviews.facebook')}</div>
               </div>
             </a>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Reviews;
