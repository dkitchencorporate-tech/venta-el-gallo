import React, { useEffect, useState } from 'react';

const BookingAgent = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Retraso de 400ms: Permite que la animación de apertura del modal (Framer Motion) 
    // termine a 60fps de forma totalmente fluida antes de inyectar el widget pesado.
    const timer = setTimeout(() => {
      setShouldRender(true);
      
      if (!document.querySelector('script[src="https://widgets.regiondo.net/product/v1/product-widget.min.js"]')) {
        const script = document.createElement('script');
        script.src = "https://widgets.regiondo.net/product/v1/product-widget.min.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-white relative flex items-center justify-center">
      {/* Estado de Carga (Spinner elegante) mientras se espera el retraso */}
      {!shouldRender && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 transition-opacity duration-300">
          <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-serif">Conectando...</p>
        </div>
      )}

      {/* Renderizado real del widget */}
      {shouldRender && (
        <div className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar bg-white animate-in fade-in duration-500">
          <product-details-widget 
            widget-id="72b2cb3a-bb73-4bf2-b3b5-143efe0946fe"
          ></product-details-widget>
        </div>
      )}
    </div>
  );
};

export default BookingAgent;
