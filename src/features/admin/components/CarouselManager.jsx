import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Trash2, AlertTriangle, X, CloudUpload } from 'lucide-react';
import { carouselImagesData as initialMockData } from '../../restaurant/components/GastronomyCarousel';

const MAX_IMAGES = 25;
const MAX_SIZE_MB = 0.5; // 500KB

const CarouselManager = () => {
  const [images, setImages] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  
  // Upload State
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadAlt, setUploadAlt] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImages(initialMockData);
  }, []);

  const handleDelete = (id) => {
    if(window.confirm('¿Estás seguro de que deseas eliminar esta imagen de forma permanente?')) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  const handleOpenModal = () => {
    if (images.length >= MAX_IMAGES) {
      setShowLimitModal(true);
    } else {
      setErrorMsg('');
      setSelectedFile(null);
      setUploadAlt('');
      setShowUploadModal(true);
    }
  };

  const handleFileChange = (e) => {
    setErrorMsg('');
    const file = e.target.files[0];
    if (!file) return;

    // Format validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Formato inválido. Solo se permite JPG, JPEG o WEBP.');
      return;
    }

    // Size validation
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > MAX_SIZE_MB) {
      setErrorMsg(`El archivo pesa ${(sizeInMB * 1024).toFixed(0)}KB. El límite estricto es 500KB para mantener la velocidad de la web.`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedFile({ file, previewUrl });
    e.target.value = null; // reset input
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if(!selectedFile) {
      setErrorMsg('Debes seleccionar una imagen primero.');
      return;
    }
    if(!uploadAlt.trim()) {
      setErrorMsg('El Atributo SEO (Alt Text) es obligatorio para el posicionamiento de la web.');
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const newImage = {
        id: Date.now(),
        src: selectedFile.previewUrl,
        alt: uploadAlt,
      };
      setImages([newImage, ...images]);
      setShowUploadModal(false);
      setSelectedFile(null);
      setUploadAlt('');
      setIsUploading(false);
    }, 1200);
  };

  const currentCount = images.length;
  const isLimitReached = currentCount >= MAX_IMAGES;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200 tracking-widest uppercase mb-2"
          >
            Gestión de Carrusel
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-white/50 text-sm tracking-wide"
          >
            Sube, elimina y optimiza las imágenes del menú de gastronomía.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="flex items-center gap-4 bg-[#141414] p-2 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl"
        >
          <div className="px-6 py-2 flex flex-col items-center justify-center border-r border-white/10">
            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Capacidad</span>
            <span className={`font-serif text-xl ${isLimitReached ? 'text-sacromonte-red' : 'text-gold'}`}>
              {currentCount} <span className="text-sm text-white/30">/ {MAX_IMAGES}</span>
            </span>
          </div>

          <button
            onClick={handleOpenModal}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_0_30px_rgba(220,38,38,0.2)] ${
              isLimitReached 
                ? 'bg-[#1a0f0f] text-sacromonte-red border border-sacromonte-red/30 cursor-not-allowed'
                : 'bg-sacromonte-red text-white hover:bg-red-700 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:-translate-y-1'
            }`}
          >
            <CloudUpload size={20} className={isLimitReached ? '' : 'animate-pulse'} />
            {isLimitReached ? 'Lleno' : 'Subir Imagen'}
          </button>
        </motion.div>
      </div>

      {/* Grid de Imágenes Premium */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
        <AnimatePresence>
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-[#121212] border border-white/10 hover:border-gold/40 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              <div className="relative h-56 w-full bg-[#0a0a0a] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/10 to-transparent z-10 opacity-80 group-hover:opacity-40 transition-opacity" />
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(img.id)}
                  className="absolute top-4 right-4 z-20 p-3 bg-black/50 backdrop-blur-md text-white/70 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-sacromonte-red hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                  title="Eliminar imagen"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-end bg-[#121212]">
                <h3 className="text-white text-sm font-medium leading-relaxed line-clamp-2 mb-2 group-hover:text-gold transition-colors" title={img.alt || 'Sin título'}>
                  {img.alt || 'Sin título'}
                </h3>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  Atributo SEO
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Ultra Premium Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => !isUploading && setShowUploadModal(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#141414] backdrop-blur-3xl border border-white/20 rounded-3xl w-full max-w-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 flex justify-between items-center bg-[#1a1a1a] border-b border-white/10">
                <div>
                  <h3 className="text-xl font-serif text-gold tracking-widest uppercase">Cargar Imagen</h3>
                  <p className="text-xs text-white/40 mt-1">Formatos: JPG, WEBP | Máx: 500KB</p>
                </div>
                <button 
                  onClick={() => !isUploading && setShowUploadModal(false)} 
                  className="w-10 h-10 bg-white/5 hover:bg-sacromonte-red/80 hover:text-white rounded-full flex items-center justify-center text-white/50 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                {errorMsg && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6">
                    <div className="p-4 bg-sacromonte-red/10 border border-sacromonte-red/30 rounded-xl flex items-center gap-3 text-sacromonte-red">
                      <AlertTriangle size={20} className="shrink-0" />
                      <p className="text-sm font-medium">{errorMsg}</p>
                    </div>
                  </motion.div>
                )}

                <form id="upload-form" onSubmit={handlePublish} className="space-y-6">
                  
                  {/* Dropzone / Preview */}
                  <div className="relative">
                    {!selectedFile ? (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-56 border-2 border-dashed border-white/20 rounded-2xl bg-[#0d0d0d] hover:border-gold/50 hover:bg-[#1a1a1a] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                          <Upload size={28} className="text-gold" />
                        </div>
                        <p className="text-sm font-medium text-white/70 group-hover:text-gold transition-colors">Selecciona una imagen</p>
                        <p className="text-xs text-white/30 mt-2">o arrástrala aquí</p>
                      </div>
                    ) : (
                      <div className="w-full h-64 rounded-2xl overflow-hidden border border-gold/30 relative group bg-deep-black">
                        <img src={selectedFile.previewUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setSelectedFile(null)}
                            className="bg-dark-charcoal border border-white/20 text-white px-6 py-2 rounded-lg text-sm uppercase tracking-widest hover:bg-sacromonte-red hover:border-transparent transition-all"
                          >
                            Cambiar Imagen
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      accept=".jpg,.jpeg,.webp"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* SEO Form */}
                  <AnimatePresence>
                    {selectedFile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <label className="block text-xs uppercase tracking-widest text-gold mb-3 font-medium">
                          Atributo SEO (Alt Text) *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={uploadAlt}
                          onChange={(e) => setUploadAlt(e.target.value)}
                          className="w-full bg-[#0a0a0a] border border-white/20 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all resize-none text-sm shadow-inner"
                          placeholder="Ej: Terraza del restaurante Venta el Gallo con vistas a la Alhambra..."
                        />
                        <p className="text-[11px] text-white/40 mt-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse" />
                          Vital para que Google entienda la imagen y la posicione.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 bg-[#121212] flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  disabled={isUploading}
                  className="px-6 py-3 text-xs font-bold text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  form="upload-form"
                  type="submit"
                  disabled={!selectedFile || isUploading}
                  className="bg-sacromonte-red text-white hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] px-10 py-3 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-deep-black/30 border-t-deep-black rounded-full animate-spin" />
                      Procesando
                    </>
                  ) : 'Guardar y Publicar'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Limit Reached Modal Premium */}
      <AnimatePresence>
        {showLimitModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setShowLimitModal(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-dark-charcoal border border-sacromonte-red/30 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(220,38,38,0.2)] p-10 text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sacromonte-red to-red-500" />
              
              <div className="w-20 h-20 bg-sacromonte-red/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-sacromonte-red/20">
                <AlertTriangle size={36} className="text-sacromonte-red" />
              </div>
              
              <h3 className="text-xl font-serif text-white tracking-widest mb-3">LÍMITE ALCANZADO</h3>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                Has alcanzado el límite estricto de <strong className="text-sacromonte-red">{MAX_IMAGES} imágenes</strong>. Esto es necesario para garantizar que la web cargue instantáneamente en móviles. Elimina fotos antiguas antes de subir nuevas.
              </p>
              
              <button
                onClick={() => setShowLimitModal(false)}
                className="w-full bg-sacromonte-red/10 hover:bg-sacromonte-red border border-sacromonte-red/50 text-sacromonte-red hover:text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs transition-all duration-300"
              >
                Entendido
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarouselManager;
