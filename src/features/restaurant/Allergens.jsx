import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Allergens = () => {
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
            Información de <span className="text-gold">Alérgenos</span>
          </h1>
          
          <div className="prose prose-invert prose-gold max-w-none font-light leading-relaxed">
            <p className="text-gray-300 text-lg mb-8">
              En Venta El Gallo, la seguridad y bienestar de nuestros clientes es una prioridad. 
              De acuerdo con el Reglamento (UE) Nº 1169/2011, ponemos a su disposición la información 
              sobre alérgenos presentes en nuestros platos.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">Declaración General</h3>
            <p className="text-gray-400 mb-8">
              A pesar de que tomamos precauciones rigurosas para evitar la contaminación cruzada, 
              nuestros platos se preparan en una cocina donde se manipulan diversos alérgenos. 
              Por tanto, no podemos garantizar la ausencia total de trazas de los mismos.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">Procedimiento para Clientes con Alergias</h3>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-2">
              <li>Por favor, <strong>informe a nuestro personal</strong> de sala sobre cualquier alergia o intolerancia alimentaria antes de realizar su pedido.</li>
              <li>Al realizar una reserva, le rogamos que nos lo comunique en el apartado de observaciones.</li>
              <li>Podemos adaptar algunos de nuestros platos según sus necesidades dietéticas si nos avisa con antelación.</li>
            </ul>

            <h3 className="text-xl font-serif text-white mb-4">Alergenos Comunes en nuestra Cocina</h3>
            <p className="text-gray-400 mb-4">
              A continuación, detallamos algunos de los alérgenos más comunes presentes en nuestras elaboraciones:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400 mb-8">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Gluten:</strong> Presente en panes, rebozados y algunas salsas.</li>
                <li><strong>Lácteos:</strong> Presente en postres, quesos y salsas cremosas.</li>
                <li><strong>Huevos:</strong> Presente en postres, tortillas y rebozados.</li>
                <li><strong>Pescado y Mariscos:</strong> Presente en nuestros platos del mar.</li>
              </ul>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Frutos de cáscara:</strong> Presente en salsas (como almendras) y postres.</li>
                <li><strong>Soja y Sulfitos:</strong> Presentes en algunos aderezos y vinos.</li>
                <li><strong>Mostaza y Apio:</strong> Utilizados en caldos y marinados.</li>
              </ul>
            </div>

            <div className="p-6 bg-sacromonte-red/10 border border-sacromonte-red/20 rounded-xl mt-8">
              <p className="text-sacromonte-red text-sm m-0">
                Esta información tiene carácter orientativo. Para información exacta sobre los ingredientes de cada plato el día de su visita, consulte directamente con el encargado o nuestro chef.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Allergens;
