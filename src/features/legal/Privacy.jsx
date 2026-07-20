import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fade-in min-h-screen bg-deep-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-8">
            Política de <span className="text-gold">Privacidad</span>
          </h1>
          
          <div className="prose prose-invert prose-gold max-w-none font-light leading-relaxed text-gray-400">
            <h3 className="text-xl font-serif text-white mb-4">1. Información de contacto</h3>
            <p className="mb-6">
              De acuerdo con el Reglamento General de Protección de Datos (RGPD), le informamos que el responsable del tratamiento de los datos personales recogidos en este sitio web es Venta El Gallo. Puede contactarnos en <strong>info@ventaelgallo.com</strong>.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">2. Recogida de datos</h3>
            <p className="mb-6">
              Recopilamos información personal cuando usted realiza una reserva, se suscribe a nuestro boletín, rellena un formulario de contacto o interactúa con nuestra web. La información puede incluir su nombre, dirección de correo electrónico, número de teléfono y detalles de la reserva.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">3. Finalidad del tratamiento</h3>
            <p className="mb-6">
              Utilizamos sus datos personales exclusivamente para:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Gestionar sus reservas y proveer nuestros servicios.</li>
              <li>Responder a sus consultas y proporcionar servicio al cliente.</li>
              <li>Mejorar nuestra página web y la experiencia del usuario.</li>
              <li>Enviar comunicaciones comerciales, siempre que tengamos su consentimiento explícito.</li>
            </ul>

            <h3 className="text-xl font-serif text-white mb-4">4. Retención de datos</h3>
            <p className="mb-6">
              Conservaremos sus datos personales solo durante el tiempo necesario para cumplir con los fines para los que fueron recopilados, incluidos los requisitos legales, contables o de información.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">5. Derechos del usuario</h3>
            <p className="mb-6">
              Usted tiene derecho a acceder, rectificar, borrar, restringir u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, por favor envíe un correo a info@ventaelgallo.com adjuntando una copia de su DNI.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
