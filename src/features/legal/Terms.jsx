import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
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
            Términos de <span className="text-gold">Reserva</span>
          </h1>
          
          <div className="prose prose-invert prose-gold max-w-none font-light leading-relaxed text-gray-400">
            <h3 className="text-xl font-serif text-white mb-4">1. Proceso de Reserva</h3>
            <p className="mb-6">
              Las reservas se gestionan a través de nuestro motor integrado (Regiondo). Al confirmar una reserva, el cliente acepta las condiciones de servicio proporcionadas durante el flujo de compra. La confirmación final está sujeta a la disponibilidad del aforo en la cueva.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">2. Pagos y Depósitos</h3>
            <p className="mb-6">
              El pago se realiza mediante las pasarelas seguras habilitadas en nuestro widget de reservas. Los precios mostrados incluyen el IVA aplicable. Para eventos de grupos grandes, es posible que nos pongamos en contacto para requerir un depósito previo.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">3. Modificaciones y Cancelaciones</h3>
            <p className="mb-6">
              Las cancelaciones o modificaciones deben comunicarse con al menos 48 horas de antelación para optar a un reembolso o cambio de fecha, dependiendo del tipo de billete adquirido. Fuera de este plazo, no se garantizará la devolución del importe abonado.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">4. Derecho de Admisión</h3>
            <p className="mb-6">
              Venta El Gallo se reserva el derecho de admisión. El comportamiento inapropiado o que altere el desarrollo del espectáculo flamenco (Zambra) podrá ser motivo de expulsión sin derecho a reembolso, para garantizar la experiencia del resto de los asistentes.
            </p>

            <h3 className="text-xl font-serif text-white mb-4">5. Datos Personales en Reservas</h3>
            <p className="mb-6">
              La gestión de los datos proporcionados durante la reserva es administrada conjuntamente con la plataforma Regiondo, exclusivamente con el fin de tramitar la compra, emitir las entradas y gestionar el acceso. Para cualquier solicitud de eliminación de datos, diríjase a info@ventaelgallo.com.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
