import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

// The faqData will be moved inside the component to use the t() function

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`border ${isOpen ? 'border-gold bg-white/5 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-white/10 bg-transparent hover:border-white/30'} rounded-2xl overflow-hidden transition-all duration-300 mb-4`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-6 flex justify-between items-center group focus:outline-none"
      >
        <h4 className={`text-lg md:text-xl font-serif pr-8 transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-white'}`}>
          {faq.question}
        </h4>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-gold bg-gold/10 text-gold' : 'border-white/20 text-white/50 group-hover:border-white/60 group-hover:text-white'}`}>
          <ChevronDown size={16} className={`transform transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-6 pb-8 pt-0 text-white/70 font-light leading-relaxed text-sm md:text-base border-t border-white/5 mt-2 pt-6">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const { t } = useTranslation();
  
  const faqData = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') }
  ];

  return (
    <section className="relative py-24 md:py-32 bg-deep-black text-white w-full z-10">
      {/* Seamless transition into footer - no sharp lines */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-deep-black via-transparent to-transparent pointer-events-none opacity-50 z-0"></div>
      
      <div className="section-container relative z-10 max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 border border-white/20 text-white/60 text-[8px] uppercase tracking-[0.3em] font-black mb-6">{t('faq.badge')}</div>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            {t('faq.title_1')} <span className="italic text-gold">{t('faq.title_2')}</span>
          </h2>
          <p className="text-white/50 font-light max-w-lg mx-auto text-sm md:text-base">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          {faqData.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
