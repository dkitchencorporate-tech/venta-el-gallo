import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X, Info } from 'lucide-react';

const LuxuryConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirmar Acción", 
  message = "¿Estás seguro de continuar?", 
  confirmText = "Eliminar Definitivamente", 
  cancelText = "Cancelar",
  type = "danger"
}) => {
  const isDanger = type === 'danger';
  const isWarning = type === 'warning';

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.3)] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera con Icono y Badge Luxury */}
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                isDanger 
                  ? 'bg-rose-50 text-sacromonte-red border border-rose-200' 
                  : isWarning 
                    ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : 'bg-stone-50 text-gold border border-gold/30'
              }`}>
                {isDanger && <Trash2 size={22} className="text-sacromonte-red" />}
                {isWarning && <AlertTriangle size={22} className="text-amber-600" />}
                {!isDanger && !isWarning && <Info size={22} className="text-gold" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-[1px] bg-sacromonte-red"></div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold">
                    {isDanger ? 'Advertencia de Eliminación' : isWarning ? 'Aviso del Sistema' : 'Información'}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-[#1A1A1A] font-bold leading-snug">
                  {title}
                </h3>
              </div>

              <button 
                onClick={onClose}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                title="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mensaje */}
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-6">
              {message}
            </p>

            {/* Acciones */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
              {onConfirm ? (
                <>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
                  >
                    {cancelText}
                  </button>
                  <button
                    type="button"
                    onClick={() => { onConfirm(); onClose(); }}
                    className={`px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs shadow-md transition-all ${
                      isDanger
                        ? 'bg-sacromonte-red hover:bg-[#1A1A1A] text-white'
                        : 'bg-gold hover:bg-[#1A1A1A] hover:text-white text-black'
                    }`}
                  >
                    {confirmText}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-gold hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Entendido
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default LuxuryConfirmModal;
