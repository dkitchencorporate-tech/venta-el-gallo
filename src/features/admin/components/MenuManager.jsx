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

  if (!menuState) return <div className="p-8 text-stone-700">Cargando carta...</div>;

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-[1px] bg-sacromonte-red"></div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold">
              Gastronomía Andaluza
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] font-bold">
            Carta & <span className="text-gold italic">Menús</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1 font-light">
            Edita platos, precios, temporadas (invierno/verano) y alérgenos de la normativa europea.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-1 bg-stone-100 rounded-full flex items-center gap-1">
            <button
              onClick={() => { setActiveTab('carta'); setActiveCat('entrantes'); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'carta'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-stone-500 hover:text-black'
              }`}
            >
              Carta Completa
            </button>
            <button
              onClick={() => { setActiveTab('menu'); setActiveCat('entrantes'); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'menu'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-stone-500 hover:text-black'
              }`}
            >
              Menú Degustación
            </button>
          </div>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold hover:bg-[#1A1A1A] hover:text-white text-black font-bold uppercase tracking-wider text-xs shadow-md transition-all"
          >
            <Plus size={16} strokeWidth={2.5} />
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
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium shadow-sm"
          >
            <Check size={16} className="text-emerald-600" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selector de Categorías */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {currentCategories.map(cat => {
          const isWinter = cat.id === 'invierno';
          const isSummer = cat.id === 'verano';
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                activeCat === cat.id
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
              }`}
            >
              {isWinter && <Snowflake size={13} className="text-sky-400" />}
              {isSummer && <Sun size={13} className="text-amber-400" />}
              <span>{cat.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-600 font-mono">
                {currentDishesObj[cat.id]?.length || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid de Platos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentDishes.map((dish, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-stone-200/80 hover:border-gold/50 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-[0_10px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.08)] group"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg text-[#1A1A1A] font-bold group-hover:text-gold transition-colors">
                  {dish.name}
                </h4>
                {dish.description && (
                  <p className="text-xs text-stone-500 mt-1 font-light leading-relaxed">
                    {dish.description}
                  </p>
                )}
              </div>
              {dish.price && (
                <span className="text-sm font-mono font-bold text-[#1A1A1A] px-3 py-1 rounded-full bg-gold/15 border border-gold/30 flex-shrink-0">
                  {dish.price}
                </span>
              )}
            </div>

            {/* Alérgenos */}
            {dish.allergens && dish.allergens.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {dish.allergens.map((alg, aIdx) => (
                  <span key={aIdx} className="text-[9px] px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
                    {alg}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(dish, idx)}
                className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-gold hover:text-black text-stone-700 transition-colors text-xs flex items-center gap-1 font-medium"
              >
                <Edit3 size={13} />
                <span>Editar</span>
              </button>
              <button
                onClick={() => handleDelete(idx, dish.name)}
                className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-sacromonte-red/10 text-stone-600 hover:text-sacromonte-red transition-colors text-xs flex items-center gap-1 font-medium"
              >
                <Trash2 size={13} />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        ))}

        {currentDishes.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-3xl border border-dashed border-stone-200 text-stone-400 bg-white">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <h3 className="font-serif text-xl text-[#1A1A1A] font-bold">
                    {editingDish ? 'Editar Plato' : 'Nuevo Plato'}
                  </h3>
                  <p className="text-xs text-stone-400">Categoría: {currentCategories.find(c => c.id === activeCat)?.name}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">Nombre del Plato *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej: Jamón Ibérico de Bellota"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">Descripción / Ingredientes</label>
                  <textarea
                    rows={3}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Detalles sobre elaboración, guarnición o procedencia..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">Precio (€)</label>
                  <input
                    type="text"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="Ej: 24.50"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-semibold">Alérgenos Presentes (Normativa UE)</label>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto custom-scrollbar p-3 rounded-2xl bg-stone-50 border border-stone-200">
                    {ALLERGEN_LIST.map(alg => {
                      const selected = formAllergens.includes(alg);
                      return (
                        <button
                          type="button"
                          key={alg}
                          onClick={() => toggleAllergen(alg)}
                          className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all ${
                            selected
                              ? 'bg-gold text-black font-bold shadow-sm'
                              : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          {alg}
                        </button>
                      );
                    })}
                  </div>
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
