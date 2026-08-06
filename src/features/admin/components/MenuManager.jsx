import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Trash2, BookOpen, AlertTriangle, X, Check } from 'lucide-react';
import { menuCentralizado } from '../../../data/menuData';

// Map de nombres para Carta
const CARTA_CATEGORIES = [
  { id: 'entrantes', name: 'Entrantes' },
  { id: 'invierno', name: 'Sopas y Cremas (Invierno)' },
  { id: 'verano', name: 'Sopas y Cremas (Verano)' },
  { id: 'pescados', name: 'Pescados' },
  { id: 'carnes', name: 'Carnes' },
  { id: 'postres', name: 'Postres' },
  { id: 'bebidas1', name: 'Bebidas' },
  { id: 'bebidas2', name: 'Vinos' }
];

// Map de nombres para Menú
const MENU_CATEGORIES = [
  { id: 'entrantes', name: 'Entrantes al centro' },
  { id: 'primerPlato', name: 'Primer Plato' },
  { id: 'invierno', name: 'Primer Plato (Opciones de Invierno)' },
  { id: 'verano', name: 'Primer Plato (Opciones de Verano)' },
  { id: 'principal', name: 'Plato Principal' },
  { id: 'postres', name: 'Postres Caseros a elegir' }
];

const MenuManager = () => {
  const [activeTab, setActiveTab] = useState('carta'); // 'carta' or 'menu'
  const [activeCat, setActiveCat] = useState('entrantes');
  const [dishes, setDishes] = useState([]);
  
  // Sincronizar datos al montar o cambiar pestaña
  useEffect(() => {
    const dataObj = activeTab === 'carta' ? menuCentralizado.cartaData : menuCentralizado.menuData;
    const allDishes = [];
    Object.keys(dataObj).forEach(catKey => {
      dataObj[catKey].forEach(item => {
        allDishes.push({
          id: item.id || Math.random().toString(),
          catId: catKey,
          title: item.title,
          desc: item.desc || '',
          price: item.price || ''
        });
      });
    });
    setDishes(allDishes);
  }, [activeTab]);

  const categories = activeTab === 'carta' ? CARTA_CATEGORIES : MENU_CATEGORIES;
  const currentDishes = dishes.filter(d => d.catId === activeCat);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ title: '', desc: '', price: '' });
  const [errorMsg, setErrorMsg] = useState('');

  // When changing tab, auto select first category
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const firstCat = tab === 'carta' ? CARTA_CATEGORIES[0] : MENU_CATEGORIES[0];
    if (firstCat) setActiveCat(firstCat.id);
  };

  const handleOpenModal = (dish = null) => {
    setErrorMsg('');
    if (dish) {
      setEditingDish(dish);
      setFormData({ title: dish.title, desc: dish.desc || '', price: dish.price || '' });
    } else {
      setEditingDish(null);
      setFormData({ title: '', desc: '', price: '' });
    }
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if(window.confirm('¿Eliminar este plato permanentemente?')) {
      setDishes(dishes.filter(d => d.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (formData.title.length > 45) {
      setErrorMsg('El título es demasiado largo. Máximo 45 caracteres.');
      return;
    }

    if (editingDish) {
      setDishes(dishes.map(d => d.id === editingDish.id ? { ...d, ...formData } : d));
    } else {
      setDishes([...dishes, { id: Date.now(), catId: activeCat, ...formData }]);
    }
    setShowModal(false);
  };

  return (
    <div className="w-full">
      <div className="mb-10 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200 tracking-widest uppercase mb-2 flex items-center gap-4"
        >
          <BookOpen size={36} className="text-gold" />
          Gestión de Carta
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="text-white/50 text-sm tracking-wide"
        >
          Añade, edita y organiza los platos y menús. El diseño de la web pública se adaptará automáticamente.
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Lado Izquierdo: Controles */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex p-1 bg-dark-charcoal/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl">
            <button
              onClick={() => handleTabChange('carta')}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${activeTab === 'carta' ? 'bg-sacromonte-red text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'text-white/40 hover:text-white'}`}
            >
              Carta del Restaurante
            </button>
            <button
              onClick={() => handleTabChange('menu')}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${activeTab === 'menu' ? 'bg-sacromonte-red text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'text-white/40 hover:text-white'}`}
            >
              Nuestros Menús
            </button>
          </div>

          {/* Categorías */}
          <div className="bg-dark-charcoal/50 backdrop-blur-md rounded-2xl border border-white/5 p-4">
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-bold px-2">Categorías</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`w-full text-left px-5 py-3 rounded-xl transition-all duration-300 font-serif flex items-center justify-between group ${
                    activeCat === cat.id
                      ? 'bg-gold/10 text-gold border border-gold/20'
                      : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <span className="font-serif tracking-wide">{cat.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" style={{ opacity: activeCat === cat.id ? 1 : undefined }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lado Derecho: Contenido */}
        <div className="w-full lg:w-2/3">
          <div className="bg-dark-charcoal/50 backdrop-blur-md rounded-2xl border border-white/5 p-6 shadow-2xl min-h-[500px] flex flex-col">
            
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
              <h2 className="text-2xl font-serif text-gold tracking-widest">{categories.find(c => c.id === activeCat)?.name}</h2>
              <button
                onClick={() => handleOpenModal()}
                className="flex items-center gap-2 bg-sacromonte-red text-white hover:bg-red-700 px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all hover:-translate-y-0.5"
              >
                <Plus size={16} /> Añadir Plato
              </button>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <AnimatePresence>
                {currentDishes.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex items-center justify-center text-white/30 text-sm font-medium">
                    <p className="text-white/40 text-center font-light italic">No hay platos en esta categoría.</p>
                  </motion.div>
                )}
                {currentDishes.map((dish) => (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between p-4 bg-deep-black/30 border border-white/5 rounded-xl hover:border-gold/30 transition-colors group"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-lg text-white group-hover:text-gold transition-colors">{dish.title}</h4>
                          <p className="text-sm text-white/40 italic font-light truncate">{dish.desc}</p>
                        </div>
                        {activeTab === 'carta' && (
                          <div className="text-right ml-4">
                            <span className="font-bold text-sacromonte-red">{dish.price}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(dish)} className="p-2 bg-white/5 hover:bg-gold/20 text-white/60 hover:text-gold rounded-lg transition-colors">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDelete(dish.id)} className="p-2 bg-white/5 hover:bg-sacromonte-red/20 text-white/60 hover:text-sacromonte-red rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Edit/Add */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setShowModal(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-dark-charcoal/95 backdrop-blur-2xl border border-gold/20 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 flex justify-between items-center bg-white/5 border-b border-white/5">
                <h3 className="text-lg font-serif text-gold tracking-widest uppercase">{editingDish ? 'Editar Plato' : 'Añadir Plato'}</h3>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 hover:bg-sacromonte-red hover:text-white rounded-full flex items-center justify-center text-white/50 transition-all">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                {errorMsg && (
                  <div className="mb-4 p-3 bg-sacromonte-red/10 border border-sacromonte-red/30 rounded-xl flex items-center gap-3 text-sacromonte-red text-xs">
                    <AlertTriangle size={16} className="shrink-0" /> {errorMsg}
                  </div>
                )}

                <form id="dish-form" onSubmit={handleSave} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Título del Plato</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors shadow-inner"
                      placeholder="Ej. Habas con Jamón"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Descripción (Opcional)</label>
                    <textarea
                      rows={2}
                      maxLength={100}
                      value={formData.desc}
                      onChange={(e) => setFormData({...formData, desc: e.target.value})}
                      className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors resize-none shadow-inner"
                      placeholder="Ej. Receta casera..."
                    />
                  </div>

                  <AnimatePresence>
                    {activeTab === 'carta' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1"
                      >
                        <label className="text-[10px] uppercase tracking-widest text-white/40">Precio</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="w-full bg-[#111111] border border-white/10 rounded-xl pl-4 pr-10 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors shadow-inner"
                            placeholder="Ej. 14.50"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 font-serif">€</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              <div className="p-5 border-t border-white/5 bg-deep-black/50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  form="dish-form"
                  type="submit"
                  className="bg-sacromonte-red text-white hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] px-8 py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                >
                  <Check size={14} /> Guardar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuManager;
