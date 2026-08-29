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
  AlertCircle,
  Eye
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs uppercase font-bold tracking-widest mb-1">
            <Users2 size={16} />
            <span>Gestor de Elenco Flamenco</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-slate-900 uppercase tracking-tight font-bold">
            Artistas & <span className="text-gold">Biografías</span>
          </h1>
          <p className="text-slate-600 text-xs mt-1 font-normal">
            Añade, edita o retira artistas de la página pública <code className="text-gold font-bold">/artistas</code> manteniendo el formato y diseño de tarjetas.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold via-[#e8cd6e] to-gold hover:from-black hover:to-black hover:text-gold text-black font-extrabold uppercase tracking-wider text-xs shadow-md transition-all transform active:scale-95"
        >
          <Plus size={16} strokeWidth={3} />
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
            className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 shadow-sm font-medium"
          >
            <Check size={16} className="text-emerald-600" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid de Artistas Administrables con Cards Blancas Aperladas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="rounded-2xl bg-white border border-stone-200 hover:border-gold/60 transition-all duration-300 overflow-hidden flex flex-col group shadow-sm hover:shadow-lg"
          >
            {/* Foto del Artista */}
            <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
              <img
                src={resolveAssetUrl(artist.imageUrl)}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold/40 text-[9px] font-bold uppercase tracking-widest text-gold">
                {artist.role}
              </span>
            </div>

            {/* Info y Acciones */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-lg text-slate-900 font-bold tracking-tight">{artist.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-normal leading-relaxed">
                  {artist.description || 'Sin descripción detallada.'}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(artist)}
                  className="px-3 py-1.5 rounded-lg bg-stone-50 hover:bg-gold/20 text-slate-700 hover:text-black border border-stone-200 transition-colors text-xs flex items-center gap-1.5 font-medium"
                >
                  <Edit3 size={13} />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => handleDelete(artist.id, artist.name)}
                  className="px-3 py-1.5 rounded-lg bg-stone-50 hover:bg-sacromonte-red/10 text-slate-600 hover:text-sacromonte-red border border-stone-200 transition-colors text-xs flex items-center gap-1.5 font-medium"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white border border-stone-300 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
                <div>
                  <h3 className="font-serif text-xl text-slate-900 font-bold">
                    {editingArtist ? 'Editar Ficha de Artista' : 'Nuevo Artista del Elenco'}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">Actualiza los datos visibles en la web pública</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-700 mb-1.5 font-bold">
                    Nombre Artístico *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej: Curro Heredia"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-700 mb-1.5 font-bold">
                    Rol / Disciplina Flamenca *
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-gold"
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-700 mb-1.5 font-bold">
                    URL o Imagen
                  </label>
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="URL externa o nombre del archivo"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-700 mb-1.5 font-bold">
                    Biografía / Descripción
                  </label>
                  <textarea
                    rows={4}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Escriba la biografía o trayectoria flamenca del artista..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:border-gold custom-scrollbar"
                  />
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gold hover:bg-black hover:text-gold text-black font-extrabold uppercase tracking-wider text-xs shadow-md transition-colors"
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
