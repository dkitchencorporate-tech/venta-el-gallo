import { initialArtists } from '../data/artistsData';
import { menuCentralizado } from '../data/menuData';
import { carouselImagesData as initialCarousel } from '../features/restaurant/components/GastronomyCarousel';

const STORAGE_KEYS = {
  ARTISTS: 'veg_admin_artists',
  MENU_DATA: 'veg_admin_menu',
  CAROUSEL: 'veg_admin_carousel',
  PASES_CONFIG: 'veg_admin_pases'
};

// ==========================================
// 1. GESTOR DE ARTISTAS
// ==========================================
export const getArtists = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ARTISTS);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Error reading artists from localStorage:', e);
  }
  return initialArtists;
};

export const saveArtists = (artists) => {
  localStorage.setItem(STORAGE_KEYS.ARTISTS, JSON.stringify(artists));
  window.dispatchEvent(new CustomEvent('veg_artists_updated', { detail: artists }));
};

export const addArtist = (artist) => {
  const list = getArtists();
  const newArtist = {
    ...artist,
    id: `art-${Date.now()}`,
    order: list.length + 1
  };
  const updated = [newArtist, ...list];
  saveArtists(updated);
  return updated;
};

export const updateArtist = (id, updatedFields) => {
  const list = getArtists();
  const updated = list.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  saveArtists(updated);
  return updated;
};

export const deleteArtist = (id) => {
  const list = getArtists();
  const updated = list.filter(item => item.id !== id);
  saveArtists(updated);
  return updated;
};

// ==========================================
// 2. GESTOR DE CARTA Y MENÚ
// ==========================================
export const getMenuData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.MENU_DATA);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Error reading menuData from localStorage:', e);
  }
  return menuCentralizado;
};

export const saveMenuData = (data) => {
  localStorage.setItem(STORAGE_KEYS.MENU_DATA, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('veg_menu_updated', { detail: data }));
};

// ==========================================
// 3. GESTOR DE CARRUSEL
// ==========================================
export const getCarouselImages = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CAROUSEL);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Error reading carousel from localStorage:', e);
  }
  return initialCarousel;
};

export const saveCarouselImages = (images) => {
  localStorage.setItem(STORAGE_KEYS.CAROUSEL, JSON.stringify(images));
  window.dispatchEvent(new CustomEvent('veg_carousel_updated', { detail: images }));
};

// ==========================================
// 4. GESTOR DE PASES Y CONFIGURACIÓN
// ==========================================
export const initialPases = {
  pase1: { time: "19:00", name: "Primer Pase (Espectáculo + Cena)", active: true, priceShow: 35, priceDinner: 70 },
  pase2: { time: "21:00", name: "Segundo Pase (Espectáculo + Cena)", active: true, priceShow: 35, priceDinner: 70 },
  whatsappNumber: "+34600000000",
  gtmContainerId: "GTM-T22JXC3T",
  gtmActive: true
};

export const getPasesConfig = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PASES_CONFIG);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Error reading pases from localStorage:', e);
  }
  return initialPases;
};

export const savePasesConfig = (config) => {
  localStorage.setItem(STORAGE_KEYS.PASES_CONFIG, JSON.stringify(config));
  window.dispatchEvent(new CustomEvent('veg_pases_updated', { detail: config }));
};
