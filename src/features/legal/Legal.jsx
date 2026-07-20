import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Legal = () => {
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
            Aviso <span className="text-gold">Legal</span>
          </h1>
          
          <div className="prose prose-invert prose-gold max-w-none font-light leading-relaxed text-gray-400">
            <h3 className="text-xl font-serif text-white mb-4">1. Datos Identificativos</h3>
            <p className="mb-6">
              En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI), le indicamos que Venta El Gallo opera en este dominio web. 
              <strong>Domicilio:</strong> Camino del Sacromonte 70, Granada, España.
              <strong>Email:</strong> info@cuevaventaelgallo.es.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">2. Condiciones de Uso</h3>
            <p className="mb-6">
              El uso de este sitio web otorga la condición de Usuario e implica la aceptación plena de todas las cláusulas y condiciones de uso incluidas en esta página web.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">3. Propiedad Intelectual e Industrial</h3>
            <p className="mb-6">
              Venta El Gallo por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo: imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, etc.).
              <br /><br />
              Todos los derechos reservados. Quedan expresamente prohibidas la reproducción, distribución y comunicación pública de la totalidad o parte de los contenidos de esta página web con fines comerciales sin la autorización expresa de Venta El Gallo.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">4. Exclusión de Garantías y Responsabilidad</h3>
            <p className="mb-6">
              Venta El Gallo no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">5. Modificaciones</h3>
            <p className="mb-6">
              Nos reservamos el derecho de efectuar sin previo aviso las modificaciones que consideremos oportunas en la página web, pudiendo cambiar, suprimir o añadir contenidos y servicios que se presten a través de la misma.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legal;
