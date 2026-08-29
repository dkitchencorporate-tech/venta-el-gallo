import React, { useState, useEffect } from 'react';
import { 
  Users2, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Save, 
  Sparkles, 
  Image as ImageIcon, 
  Check, 
  AlertCircle
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
      showToast(`Artista "${name}" eliminado correctamente.`);
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
      showToast(`Nuevo artista "${formName}" añadido al elenco.`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 fade-in">
      
      {/* Header & Acción Crear */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-black text-xs uppercase font-black tracking-widest mb-1">
            <div className="w-2 h-2 rounded-full bg-sacromonte-red"></div>
            <Users2 size={16} className="text-gold" />
            <span>Gestor de Elenco Flamenco</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif text-black uppercase tracking-tight font-black">
            Artistas & <span className="text-gold">Biografías</span>
          </h1>
          <p className="text-slate-700 text-xs md:text-sm mt-1 font-medium">
            Añade, edita o retira artistas de la página pública <code className="text-black bg-gold/20 px-1.5 py-0.5 rounded font-bold">/artistas</code> manteniendo el formato y diseño de tarjetas.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold via-[#e8cd6e] to-gold hover:from-black hover:to-black hover:text-gold text-black font-black uppercase tracking-wider text-xs shadow-lg transition-all transform active:scale-95 border border-black"
        >
          <Plus size={18} strokeWidth={3} />
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
            className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-xs flex items-center gap-2 shadow-md font-bold"
          >
            <Check size={18} className="text-emerald-600" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid de Artistas con Medidas Rigurosamente Idénticas y Marco Negro */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="rounded-[2rem] bg-white border-2 border-black hover:border-gold transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] hover:-translate-y-1.5 group h-full min-h-[380px]"
          >
            {/* Foto del Artista con Aspect Ratio Fijo */}
            <div className="relative w-full aspect-[4/3] bg-[#0B0E14] overflow-hidden border-b-2 border-black">
              <img
                src={resolveAssetUrl(artist.imageUrl)}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
              
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black text-gold border border-gold/50 text-[10px] font-black uppercase tracking-widest shadow-md">
                {artist.role}
              </span>
            </div>

            {/* Info y Acciones con Alturas Controladas */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-[2px] bg-sacromonte-red"></div>
                  <h3 className="font-serif text-xl text-black font-black tracking-tight">{artist.name}</h3>
                </div>
                <p className="text-xs text-slate-700 line-clamp-3 mt-1.5 font-medium leading-relaxed">
                  {artist.description || 'Sin descripción detallada.'}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => handleOpenEdit(artist)}
                  className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-gold hover:text-black text-slate-900 border border-stone-300 transition-all text-xs flex items-center gap-1.5 font-black uppercase tracking-wider"
                >
                  <Edit3 size={14} />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => handleDelete(artist.id, artist.name)}
                  className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-sacromonte-red hover:text-white text-slate-800 border border-stone-300 transition-all text-xs flex items-center gap-1.5 font-black uppercase tracking-wider"
                >
                  <Trash2 size={14} />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white border-2 border-black rounded-[2.5rem] p-6 md:p-8 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b-2 border-stone-200 mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-black font-black">
                    {editingArtist ? 'Editar Ficha de Artista' : 'Nuevo Artista del Elenco'}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">Actualiza los datos visibles en la web pública</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-black p-1">
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-black mb-1.5 font-black">
                    Nombre Artístico *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej: Curro Heredia"
                    className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black font-bold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-black mb-1.5 font-black">
                    Rol / Disciplina Flamenca *
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black font-bold focus:outline-none focus:border-black"
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-black mb-1.5 font-black">
                    URL o Nombre de la Imagen
                  </label>
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="URL externa o nombre de archivo"
                    className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black font-bold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-black mb-1.5 font-black">
                    Biografía / Descripción
                  </label>
                  <textarea
                    rows={4}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Escriba la biografía o trayectoria flamenca del artista..."
                    className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl p-4 text-sm text-black font-medium focus:outline-none focus:border-black custom-scrollbar"
                  />
                </div>

                <div className="pt-4 border-t-2 border-stone-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-black text-xs font-black uppercase tracking-wider"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold via-[#e8cd6e] to-gold hover:from-black hover:to-black hover:text-gold text-black font-black uppercase tracking-wider text-xs shadow-lg transition-all border border-black"
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
