import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Sun, 
  Snowflake, 
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMenuData, saveMenuData } from '../../../services/adminService';

const ALLERGEN_LIST = [
  "Gluten", "Crustáceos", "Huevos", "Pescado", "Cacahuetes", 
  "Soja", "Lácteos", "Frutos de cáscara", "Apio", "Mostaza", 
  "Sésamo", "Dióxido de azufre y sulfitos", "Altramuces", "Moluscos"
];

const CARTA_CATEGORIES = [
  { id: 'entrantes', name: 'Entrantes' },
  { id: 'invierno', name: 'Sopas y Cremas (Invierno)' },
  { id: 'verano', name: 'Sopas y Cremas (Verano)' },
  { id: 'pescados', name: 'Pescados' },
  { id: 'carnes', name: 'Carnes' },
  { id: 'postres', name: 'Postres Caseros' },
  { id: 'bebidas1', name: 'Bebidas' },
  { id: 'bebidas2', name: 'Vinos y Bodega' }
];

const MENU_CATEGORIES = [
  { id: 'entrantes', name: 'Entrantes al centro' },
  { id: 'primerPlato', name: 'Primer Plato' },
  { id: 'invierno', name: 'Primer Plato (Invierno)' },
  { id: 'verano', name: 'Primer Plato (Verano)' },
  { id: 'principal', name: 'Plato Principal' },
  { id: 'postres', name: 'Postres a elegir' }
];

const MenuManager = () => {
  const [activeTab, setActiveTab] = useState('carta');
  const [activeCat, setActiveCat] = useState('entrantes');
  const [menuState, setMenuState] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  
  // Form State
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formAllergens, setFormAllergens] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    setMenuState(getMenuData());
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  if (!menuState) return <div className="p-8 text-slate-800 font-bold">Cargando menú...</div>;

  const currentCategories = activeTab === 'carta' ? CARTA_CATEGORIES : MENU_CATEGORIES;
  const currentDishesObj = activeTab === 'carta' ? (menuState.cartaData || {}) : (menuState.menuData || {});
  const currentDishes = currentDishesObj[activeCat] || [];

  const handleOpenCreate = () => {
    setEditingDish(null);
    setFormName('');
    setFormDesc('');
    setFormPrice('');
    setFormAllergens([]);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dish, index) => {
    setEditingDish({ ...dish, index });
    setFormName(dish.name || '');
    setFormDesc(dish.description || '');
    setFormPrice(dish.price || '');
    setFormAllergens(dish.allergens || []);
    setIsModalOpen(true);
  };

  const handleDelete = (index, dishName) => {
    if (window.confirm(`¿Eliminar "${dishName}" de esta categoría?`)) {
      const updatedList = currentDishes.filter((_, idx) => idx !== index);
      const updatedMenu = {
        ...menuState,
        [activeTab === 'carta' ? 'cartaData' : 'menuData']: {
          ...currentDishesObj,
          [activeCat]: updatedList
        }
      };
      setMenuState(updatedMenu);
      saveMenuData(updatedMenu);
      showToast(`Plato "${dishName}" eliminado.`);
    }
  };

  const toggleAllergen = (allergen) => {
    if (formAllergens.includes(allergen)) {
      setFormAllergens(formAllergens.filter(a => a !== allergen));
    } else {
      setFormAllergens([...formAllergens, allergen]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newDish = {
      name: formName.trim(),
      description: formDesc.trim(),
      price: formPrice ? `${formPrice}€` : '',
      allergens: formAllergens
    };

    let updatedList = [...currentDishes];
    if (editingDish !== null && editingDish.index !== undefined) {
      updatedList[editingDish.index] = newDish;
      showToast(`Plato "${formName}" actualizado.`);
    } else {
      updatedList.push(newDish);
      showToast(`Nuevo plato "${formName}" añadido.`);
    }

    const updatedMenu = {
      ...menuState,
      [activeTab === 'carta' ? 'cartaData' : 'menuData']: {
        ...currentDishesObj,
        [activeCat]: updatedList
      }
    };

    setMenuState(updatedMenu);
    saveMenuData(updatedMenu);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 fade-in">
      
      {/* Header & Switch Carta/Menú */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-black text-xs uppercase font-black tracking-widest mb-1">
            <div className="w-2 h-2 rounded-full bg-sacromonte-red"></div>
            <UtensilsCrossed size={16} className="text-gold" />
            <span>Gestión Gastronómica</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif text-black uppercase tracking-tight font-black">
            Carta & <span className="text-gold">Menús Degustación</span>
          </h1>
          <p className="text-slate-700 text-xs md:text-sm mt-1 font-medium">
            Edita platos, precios, temporadas de verano/invierno y los 14 alérgenos de la normativa europea.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#FBFBFA] border-2 border-black rounded-2xl flex items-center gap-1 shadow-sm">
            <button
              onClick={() => { setActiveTab('carta'); setActiveCat('entrantes'); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'carta'
                  ? 'bg-black text-gold shadow-md'
                  : 'text-slate-700 hover:text-black'
              }`}
            >
              Carta Completa
            </button>
            <button
              onClick={() => { setActiveTab('menu'); setActiveCat('entrantes'); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'menu'
                  ? 'bg-black text-gold shadow-md'
                  : 'text-slate-700 hover:text-black'
              }`}
            >
              Menú Degustación
            </button>
          </div>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold via-[#e8cd6e] to-gold hover:from-black hover:to-black hover:text-gold text-black font-black uppercase tracking-wider text-xs shadow-lg transition-all border border-black"
          >
            <Plus size={18} strokeWidth={3} />
            <span>Añadir Plato</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-xs flex items-center gap-2 shadow-md font-bold"
          >
            <Check size={18} className="text-emerald-600" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selector de Categorías */}
      <div className="flex items-center gap-2.5 overflow-x-auto custom-scrollbar pb-3">
        {currentCategories.map(cat => {
          const isWinter = cat.id === 'invierno';
          const isSummer = cat.id === 'verano';
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
                activeCat === cat.id
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white text-slate-800 border-stone-300 hover:border-black'
              }`}
            >
              {isWinter && <Snowflake size={14} className="text-sky-400" />}
              {isSummer && <Sun size={14} className="text-amber-400" />}
              <span>{cat.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-200 text-black font-mono font-bold">
                {currentDishesObj[cat.id]?.length || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid de Platos con Cards Blancas y Marco Negro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {currentDishes.map((dish, idx) => (
          <div
            key={idx}
            className="p-6 rounded-[2rem] bg-white border-2 border-black hover:border-gold transition-all duration-300 flex flex-col justify-between space-y-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.15)] group min-h-[220px]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2.5 h-[2px] bg-sacromonte-red"></div>
                  <h4 className="font-serif text-lg text-black font-black group-hover:text-gold transition-colors leading-tight">
                    {dish.name}
                  </h4>
                </div>
                {dish.description && (
                  <p className="text-xs text-slate-700 mt-1 font-medium leading-relaxed">
                    {dish.description}
                  </p>
                )}
              </div>
              {dish.price && (
                <span className="text-sm font-mono font-black text-black px-3 py-1 rounded-xl bg-gold/20 border border-gold/50 flex-shrink-0 shadow-sm">
                  {dish.price}
                </span>
              )}
            </div>

            {/* Alérgenos */}
            {dish.allergens && dish.allergens.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {dish.allergens.map((alg, aIdx) => (
                  <span key={aIdx} className="text-[9px] px-2.5 py-1 rounded-full bg-stone-100 border border-stone-300 text-slate-800 font-bold">
                    {alg}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(dish, idx)}
                className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-gold hover:text-black text-slate-900 border border-stone-300 text-xs flex items-center gap-1.5 font-black uppercase tracking-wider"
              >
                <Edit3 size={13} />
                <span>Editar</span>
              </button>
              <button
                onClick={() => handleDelete(idx, dish.name)}
                className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-sacromonte-red hover:text-white text-slate-800 border border-stone-300 text-xs flex items-center gap-1.5 font-black uppercase tracking-wider"
              >
                <Trash2 size={13} />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        ))}

        {currentDishes.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-[2rem] border-2 border-dashed border-stone-300 text-slate-600 bg-[#FBFBFA] font-bold">
            No hay platos registrados en esta sección. Haz clic en "Añadir Plato".
          </div>
        )}
      </div>

      {/* Modal Añadir / Editar Plato */}
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
              className="w-full max-w-lg bg-white border-2 border-black rounded-[2.5rem] p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b-2 border-stone-200 mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-black font-black">
                    {editingDish ? 'Editar Plato' : 'Nuevo Plato'}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">Categoría: {currentCategories.find(c => c.id === activeCat)?.name}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-black p-1">
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-black mb-1 font-black">Nombre del Plato *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej: Jamón Ibérico de Bellota con Tomate y Pan de Pueblo"
                    className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black font-bold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-black mb-1 font-black">Descripción / Ingredientes</label>
                  <textarea
                    rows={3}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Detalles sobre elaboración, guarnición o procedencia..."
                    className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl p-3.5 text-sm text-black font-medium focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-black mb-1 font-black">Precio (€)</label>
                  <input
                    type="text"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="Ej: 24.50"
                    className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black font-bold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-black mb-2 font-black">Alérgenos Presentes (Normativa UE)</label>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto custom-scrollbar p-3 rounded-2xl bg-[#FBFBFA] border-2 border-stone-200">
                    {ALLERGEN_LIST.map(alg => {
                      const selected = formAllergens.includes(alg);
                      return (
                        <button
                          type="button"
                          key={alg}
                          onClick={() => toggleAllergen(alg)}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                            selected
                              ? 'bg-black text-gold shadow-sm'
                              : 'bg-white text-slate-700 border border-stone-300 hover:border-black'
                          }`}
                        >
                          {alg}
                        </button>
                      );
                    })}
                  </div>
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
                    {editingDish ? 'Guardar Cambios' : 'Añadir a la Carta'}
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

export default MenuManager;
