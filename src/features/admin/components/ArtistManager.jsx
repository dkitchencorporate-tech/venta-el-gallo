import React, { useState, useEffect } from 'react';
import { 
  Users2, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getArtists, addArtist, updateArtist, deleteArtist, resolveAssetUrl } from '../../../services/adminService';

const ROLES = [
  "Bailaor",
  "Bailaora",
  "Cantaor",
  "Cantaora",
  "Guitarrista",
  "Familia Flamenca",
  "Percusionista"
];

const ArtistManager = () => {
  const [artists, setArtists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);
  
  // Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('Bailaora');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setArtists(getArtists());
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleOpenCreate = () => {
    setEditingArtist(null);
    setFormName('');
    setFormRole('Bailaora');
    setFormImageUrl('');
    setFormDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (artist) => {
    setEditingArtist(artist);
    setFormName(artist.name);
    setFormRole(artist.role);
    setFormImageUrl(artist.imageUrl || '');
    setFormDescription(artist.description || '');
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a "${name}" del elenco?`)) {
      const updated = deleteArtist(id);
      setArtists(updated);
      showToast(`Artista "${name}" eliminado.`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingArtist) {
      const updated = updateArtist(editingArtist.id, {
        name: formName.trim(),
        role: formRole,
        imageUrl: formImageUrl.trim() || editingArtist.imageUrl,
        description: formDescription.trim()
      });
      setArtists(updated);
      showToast(`Artista "${formName}" actualizado.`);
    } else {
      const updated = addArtist({
        name: formName.trim(),
        role: formRole,
        imageUrl: formImageUrl.trim() || '',
        description: formDescription.trim()
      });
      setArtists(updated);
      showToast(`Nuevo artista "${formName}" añadido.`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 fade-in">
      
      {/* Header & Acción Crear */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-[1px] bg-sacromonte-red"></div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold">
              Elenco Flamenco
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] font-bold">
            Gestión de <span className="text-gold italic">Artistas</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1 font-light">
            Añade, edita o retira artistas de la página pública <strong className="text-stone-700 font-medium">/artistas</strong>.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-[#1A1A1A] hover:text-white text-black font-bold uppercase tracking-wider text-xs shadow-md transition-all"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Añadir Artista</span>
        </button>
      </div>

      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium shadow-sm"
          >
            <Check size={16} className="text-emerald-600" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid de Artistas con Tarjetas Luxury Uniformes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="rounded-3xl bg-white border border-stone-200/80 hover:border-gold/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_10px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)] group"
          >
            {/* Foto con Aspect Ratio Fijo y Gradiente Suave */}
            <div className="relative w-full aspect-[4/3] bg-[#0B0E14] overflow-hidden">
              <img
                src={resolveAssetUrl(artist.imageUrl)}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-gold border border-gold/30 text-[9px] font-bold uppercase tracking-widest">
                {artist.role}
              </span>
            </div>

            {/* Info y Acciones */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-lg text-[#1A1A1A] font-bold">{artist.name}</h3>
                <p className="text-xs text-stone-500 line-clamp-2 mt-1 font-light leading-relaxed">
                  {artist.description || 'Sin biografía detallada.'}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(artist)}
                  className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-gold hover:text-black text-stone-700 transition-colors text-xs flex items-center gap-1 font-medium"
                >
                  <Edit3 size={13} />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => handleDelete(artist.id, artist.name)}
                  className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-sacromonte-red/10 text-stone-600 hover:text-sacromonte-red transition-colors text-xs flex items-center gap-1 font-medium"
                >
                  <Trash2 size={13} />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Creación / Edición */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <h3 className="font-serif text-xl text-[#1A1A1A] font-bold">
                    {editingArtist ? 'Editar Artista' : 'Nuevo Artista'}
                  </h3>
                  <p className="text-xs text-stone-400">Actualiza los datos visibles en la web</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                    Nombre Artístico *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej: Curro Heredia"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                    Rol / Disciplina *
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold"
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                    URL o Imagen
                  </label>
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="URL externa o nombre del archivo"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                    Biografía / Trayectoria
                  </label>
                  <textarea
                    rows={4}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Escriba la biografía flamenca del artista..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gold hover:bg-[#1A1A1A] hover:text-white text-black font-bold uppercase tracking-wider text-xs shadow-md transition-colors"
                  >
                    {editingArtist ? 'Guardar Cambios' : 'Crear Artista'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ArtistManager;
