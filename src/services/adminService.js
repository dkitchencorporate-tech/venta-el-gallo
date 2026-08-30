/**
 * Servicio Central de Administración & Sincronización Atómica con SQLite
 * Venta El Gallo - Cueva Milenaria Sacromonte
 */

import { menuCentralizado } from '../data/menuData';

// Assets oficiales
import dinastiaHerediaImg from '../assets/raw/Dinastia-Heredia.jpeg';
import antoniaImg from '../assets/raw/antonia-ready.jpg';
import jaraImg from '../assets/raw/jara-heredia-portrait.jpg';
import chonicoImg from '../assets/raw/Antonio-el-Chonico-guitarra-Venta-el-Gallo.jpg';
import miguelImg from '../assets/raw/Miguel-Angel-Cortes-Venta-el-Gallo-guitarra.webp';
import coralImg from '../assets/raw/13-1.webp';
import pacoImg from '../assets/raw/Artista-1.jpg';
import rayImg from '../assets/raw/Raimundo.jpg';
import antonioCantaorImg from '../assets/raw/antonio-heredia-cantaor.jpg';

const STORAGE_KEYS = {
  ARTISTS: 'veg_artists_data_v2',
  MENU_DATA: 'veg_menu_data_v2',
  CAROUSEL: 'veg_carousel_images_v2',
  PASES_CONFIG: 'veg_pases_config_v2'
};

export const resolveAssetUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) {
    return url;
  }
  const isGhPages = window.location.hostname.includes('github.io');
  const base = isGhPages ? '/venta-el-gallo/' : '/';
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  if (cleanUrl.startsWith('venta-el-gallo/')) {
    return '/' + cleanUrl;
  }
  return base + cleanUrl;
};

// 1. Datos iniciales canónicos de artistas
export const initialArtists = [
  {
    id: 'art-1',
    name: "Jara Heredia",
    role: "Bailaora",
    imageUrl: jaraImg,
    description: "Heredera de una de las dinastías flamencas más puras del Sacromonte, Jara transmite en cada desplante la fuerza ancestral del baile gitano. Con una técnica impecable y una fuerza magnética, cada movimiento rinde homenaje a sus raíces."
  },
  {
    id: 'art-2',
    name: "Antonia Heredia",
    role: "Bailaora",
    imageUrl: antoniaImg,
    description: "Elegancia, compás y duende definen la presencia escénica de Antonia. Formada desde la infancia en las cuevas del Sacromonte, su baile es un diálogo visceral con el cante y la guitarra flamenca."
  },
  {
    id: 'art-3',
    name: "Dinastía Heredia",
    role: "Familia Flamenca",
    imageUrl: dinastiaHerediaImg,
    description: "Sello inconfundible de Venta El Gallo. Cuatro generaciones dedicadas a preservar el patrimonio inmaterial de la Zambra gitana en su máxima pureza y autenticidad histórica."
  },
  {
    id: 'art-4',
    name: "Antonio Heredia «El Chonico»",
    role: "Guitarrista",
    imageUrl: chonicoImg,
    description: "Maestro del toque sacromontano, su soniquete y sensibilidad acompañan cada quejío con la maestría de quien lleva el compás flamenco en la sangre desde su nacimiento."
  },
  {
    id: 'art-5',
    name: "Miguel Ángel Cortés",
    role: "Guitarrista",
    imageUrl: miguelImg,
    description: "Figura imprescindible de la guitarra flamenca contemporánea. Su toque virtuoso aúna el respeto a la tradición más jonda con una exquisita armonía musical reconocida internacionalmente."
  },
  {
    id: 'art-6',
    name: "Paco Fernández",
    role: "Cantaor",
    imageUrl: pacoImg,
    description: "Voz desgarradora y jonda que recorre los palos más antiguos de Granada. Su cante traspasa el alma y evoca las noches más auténticas del Sacromonte."
  },
  {
    id: 'art-7',
    name: "Coral Fernández",
    role: "Cantaora",
    imageUrl: coralImg,
    description: "Dulzura y temperamento en un quejío único. Coral aporta la pasión y el lirismo necesarios para elevar cada cuadro flamenco a una experiencia inolvidable."
  },
  {
    id: 'art-8',
    name: "Raimundo Benítez",
    role: "Bailaor",
    imageUrl: rayImg,
    description: "Fuerza, desplante y elegancia masculina sobre las tablas. Su zapateado rítmico y temperamento imponente marcan el pulso de la cueva con autenticidad."
  },
  {
    id: 'art-9',
    name: "Antonio Heredia",
    role: "Cantaor",
    imageUrl: antonioCantaorImg,
    description: "Guateque, fiesta y compás puro. Antonio llena el escenario de alegría gitana y sabiduría flamenca, transmitiendo la esencia viva del Sacromonte."
  }
];

// 2. Datos iniciales del carrusel
export const initialCarousel = [
  { id: 'carrusel-1', src: 'images/carrusel/cena-espectaculo-flamenco-granada.jpeg', alt: 'Cena con Espectáculo Flamenco en Granada', title: 'Cena y Show Flamenco en Cueva' },
  { id: 'carrusel-2', src: 'images/carrusel/cenar-en-cueva-flamenca.jpeg', alt: 'Cenar en una Cueva Flamenca en el Sacromonte', title: 'Ambiente Único en Cueva Milenaria' },
  { id: 'carrusel-3', src: 'images/carrusel/experiencia-culinaria-granada.jpeg', alt: 'Experiencia Culinaria Tradicional Andaluza', title: 'Gastronomía Andaluza de Autor' },
  { id: 'carrusel-4', src: 'images/carrusel/gastronomia-andaluza-sacromonte.jpeg', alt: 'Gastronomía Andaluza en el Sacromonte', title: 'Sabores Auténticos de Granada' },
  { id: 'carrusel-5', src: 'images/carrusel/menu-degustacion-sacromonte.jpeg', alt: 'Menú Degustación en Cueva Flamenca', title: 'Menú Degustación Sacromonte' },
  { id: 'carrusel-6', src: 'images/carrusel/platos-tradicionales-flamenco.jpeg', alt: 'Platos Tradicionales y Espectáculo de Flamenco', title: 'Tradición y Vanguardia Culinaria' },
  { id: 'carrusel-7', src: 'images/carrusel/restaurante-flamenco-andaluz.jpeg', alt: 'Restaurante Flamenco Andaluz en Granada', title: 'Restaurante Venta El Gallo' },
  { id: 'carrusel-8', src: 'images/carrusel/restaurante-sacromonte-granada-vistas.jpeg', alt: 'Restaurante en el Sacromonte con Vistas a la Alhambra', title: 'Vistas Privilegiadas a la Alhambra' },
  { id: 'carrusel-9', src: 'images/carrusel/tapas-premium-venta-el-gallo.jpeg', alt: 'Tapas Premium y Gastronomía en Venta El Gallo', title: 'Tapas y Raciones Selectas' },
  { id: 'carrusel-10', src: 'images/carrusel/terraza-con-encanto-granada.jpeg', alt: 'Terraza con Encanto en el Sacromonte Granada', title: 'Terraza Panorámica Exclusiva' },
  { id: 'carrusel-11', src: 'images/carrusel/terraza-venta-el-gallo-alhambra.jpeg', alt: 'Terraza Venta El Gallo Frente a la Alhambra', title: 'Atardeceres frente a la Alhambra' }
];

// Helper para sincronizar datos con el servidor backend SQLite
const syncWithBackend = async (type, data) => {
  try {
    const isProduction = window.location.hostname.includes('cuevaventaelgallo.es');
    if (!isProduction) return;

    const token = localStorage.getItem('veg_auth_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    await fetch(`/api/content.php?type=${type}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data })
    });
  } catch (err) {
    console.warn(`[Sync Warning] No se pudo guardar ${type} en SQLite remoto:`, err);
  }
};

// Sincronización Inicial Asíncrona desde SQLite para todos los visitantes
export const initRemoteContentSync = async () => {
  try {
    const isProduction = window.location.hostname.includes('cuevaventaelgallo.es');
    if (!isProduction) return;

    const res = await fetch('/api/content.php?type=all');
    if (!res.ok) return;

    const remote = await res.json();
    if (!remote.success) return;

    if (remote.artists && Array.isArray(remote.artists) && remote.artists.length > 0) {
      localStorage.setItem(STORAGE_KEYS.ARTISTS, JSON.stringify(remote.artists));
      window.dispatchEvent(new CustomEvent('veg_artists_updated', { detail: remote.artists }));
    }

    if (remote.menu && typeof remote.menu === 'object') {
      localStorage.setItem(STORAGE_KEYS.MENU_DATA, JSON.stringify(remote.menu));
      window.dispatchEvent(new CustomEvent('veg_menu_updated', { detail: remote.menu }));
    }

    if (remote.carousel && Array.isArray(remote.carousel) && remote.carousel.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CAROUSEL, JSON.stringify(remote.carousel));
      window.dispatchEvent(new CustomEvent('veg_carousel_updated', { detail: remote.carousel }));
    }
  } catch (e) {
    console.warn('[Remote Sync] Usando caché local offline:', e);
  }
};

// Auto-inicializar sincronización al cargar el script
if (typeof window !== 'undefined') {
  initRemoteContentSync();
}

// ==========================================
// 1. ARTISTAS (CRUD ATÓMICO + SYNC)
// ==========================================
export const getArtists = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ARTISTS);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Error reading artists from localStorage:', e);
  }
  return initialArtists;
};

export const saveArtists = (artists) => {
  localStorage.setItem(STORAGE_KEYS.ARTISTS, JSON.stringify(artists));
  window.dispatchEvent(new CustomEvent('veg_artists_updated', { detail: artists }));
  syncWithBackend('artists', artists);
};

export const addArtist = (artist) => {
  const current = getArtists();
  const newArtist = {
    id: `art-${Date.now()}`,
    name: artist.name,
    role: artist.role || "Elenco Principal",
    imageUrl: artist.imageUrl || "",
    description: artist.description || ""
  };
  const updated = [newArtist, ...current];
  saveArtists(updated);
  return newArtist;
};

export const updateArtist = (id, updatedFields) => {
  const current = getArtists();
  const updated = current.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  saveArtists(updated);
  return updated;
};

export const deleteArtist = (id) => {
  const current = getArtists();
  const updated = current.filter(item => item.id !== id);
  saveArtists(updated);
  return updated;
};

// ==========================================
// 2. CARTA & MENÚ DEGUSTACIÓN (CRUD ATÓMICO)
// ==========================================
export const getMenuData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.MENU_DATA);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) {
    console.warn('Error reading menu data from localStorage:', e);
  }
  return menuCentralizado;
};

export const saveMenuData = (data) => {
  localStorage.setItem(STORAGE_KEYS.MENU_DATA, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('veg_menu_updated', { detail: data }));
  syncWithBackend('menu', data);
  return data;
};

export const saveDishAtomic = ({ scope, category, dish, isEdit = false, editId = null }) => {
  const currentMenu = getMenuData();
  const branchKey = scope === 'carta' ? 'cartaData' : 'menuData';
  const currentBranch = { ...(currentMenu[branchKey] || {}) };
  const currentCategoryList = [...(currentBranch[category] || [])];

  let updatedList;
  if (isEdit && editId) {
    updatedList = currentCategoryList.map(item => {
      if (item.id === editId) {
        return {
          ...item,
          ...dish,
          id: editId
        };
      }
      return item;
    });
  } else {
    const newDishItem = {
      id: `${scope === 'carta' ? 'c' : 'm'}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      ...dish
    };
    updatedList = [...currentCategoryList, newDishItem];
  }

  const updatedMenu = {
    ...currentMenu,
    [branchKey]: {
      ...currentBranch,
      [category]: updatedList
    }
  };

  return saveMenuData(updatedMenu);
};

export const deleteDishAtomic = ({ scope, category, dishId }) => {
  const currentMenu = getMenuData();
  const branchKey = scope === 'carta' ? 'cartaData' : 'menuData';
  const currentBranch = { ...(currentMenu[branchKey] || {}) };
  const currentCategoryList = [...(currentBranch[category] || [])];

  const updatedCategoryList = currentCategoryList.filter(item => item.id !== dishId);

  const updatedMenu = {
    ...currentMenu,
    [branchKey]: {
      ...currentBranch,
      [category]: updatedCategoryList
    }
  };

  return saveMenuData(updatedMenu);
};

// ==========================================
// 3. CARRUSEL DE FOTOGRAFÍAS (CRUD + SYNC)
// ==========================================
export const getCarouselImages = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CAROUSEL);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Error reading carousel from localStorage:', e);
  }
  return initialCarousel;
};

export const saveCarouselImages = (images) => {
  localStorage.setItem(STORAGE_KEYS.CAROUSEL, JSON.stringify(images));
  window.dispatchEvent(new CustomEvent('veg_carousel_updated', { detail: images }));
  syncWithBackend('carousel', images);
};
