// Imports de imágenes reales de artistas
import dinastiaHerediaImg from '../assets/raw/Dinastia-Heredia.jpeg';
import antoniaImg from '../assets/raw/antonia-ready.jpg';
import jaraImg from '../assets/raw/jara-heredia-portrait.jpg';
import chonicoImg from '../assets/raw/Antonio-el-Chonico-guitarra-Venta-el-Gallo.jpg';
import miguelImg from '../assets/raw/Miguel-Angel-Cortes-Venta-el-Gallo-guitarra.webp';
import coralImg from '../assets/raw/13-1.webp';
import pacoImg from '../assets/raw/Artista-1.jpg';
import rayImg from '../assets/raw/Raimundo.jpg';
import antonioCantaorImg from '../assets/raw/antonio-heredia-cantaor.jpg';

import { menuCentralizado } from '../data/menuData';
import { carouselImagesData as initialCarousel } from '../features/restaurant/components/GastronomyCarousel';

export const artistImageMap = {
  "art-1": jaraImg,
  "art-2": antoniaImg,
  "art-3": dinastiaHerediaImg,
  "art-4": chonicoImg,
  "art-5": miguelImg,
  "art-6": pacoImg,
  "art-7": coralImg,
  "art-8": rayImg,
  "art-9": antonioCantaorImg,
  "Jara Heredia": jaraImg,
  "Antonia Heredia": antoniaImg,
  "Dinastía Heredia": dinastiaHerediaImg,
  "Antonio Heredia «El Chonico»": chonicoImg,
  "Miguel Ángel Cortés": miguelImg,
  "Paco Fernández": pacoImg,
  "Coral Fernández": coralImg,
  "Raimundo Benítez": rayImg,
  "Antonio Heredia": antonioCantaorImg
};

export const resolveAssetUrl = (url) => {
  if (!url) return jaraImg;
  if (artistImageMap[url]) return artistImageMap[url];
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('blob:')) return url;
  const clean = url.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${clean}`;
};

export const initialArtistsList = [
  {
    id: "art-1",
    name: "Jara Heredia",
    role: "Bailaora",
    imageUrl: jaraImg,
    description: "Fuerza, temperamento y pureza en cada desplante. Heredera directa de la tradición del Sacromonte.",
    order: 1
  },
  {
    id: "art-2",
    name: "Antonia Heredia",
    role: "Bailaora",
    imageUrl: antoniaImg,
    description: "Elegancia y duende gitano. Su baile transmite la esencia ancestral de las zambras granadinas.",
    order: 2
  },
  {
    id: "art-3",
    name: "Dinastía Heredia",
    role: "Familia Flamenca",
    imageUrl: dinastiaHerediaImg,
    description: "Generaciones de arte puro custodiando el legado flamenco en las entrañas del Sacromonte.",
    order: 3
  },
  {
    id: "art-4",
    name: "Antonio Heredia «El Chonico»",
    role: "Guitarrista",
    imageUrl: chonicoImg,
    description: "Maestría y compás en las seis cuerdas. Soniquete único que acompaña el alma del cante.",
    order: 4
  },
  {
    id: "art-5",
    name: "Miguel Ángel Cortés",
    role: "Guitarrista",
    imageUrl: miguelImg,
    description: "Virtuosismo y sensibilidad armónica. Uno de los grandes referentes de la guitarra flamenca contemporánea.",
    order: 5
  },
  {
    id: "art-6",
    name: "Paco Fernández",
    role: "Cantaor",
    imageUrl: pacoImg,
    description: "Voz desgarradora y jondura inigualable en los cantes de fragua y soleá.",
    order: 6
  },
  {
    id: "art-7",
    name: "Coral Fernández",
    role: "Cantaora",
    imageUrl: coralImg,
    description: "Cante dulce y profundo que eriza la piel en cada tercio flamenco.",
    order: 7
  },
  {
    id: "art-8",
    name: "Raimundo Benítez",
    role: "Bailaor",
    imageUrl: rayImg,
    description: "Zapateado vertiginoso y presencia escénica arrolladora.",
    order: 8
  },
  {
    id: "art-9",
    name: "Antonio Heredia",
    role: "Cantaor",
    imageUrl: antonioCantaorImg,
    description: "Eco gitano de pura cepa, maestro de los tangos y bulerías del Sacromonte.",
    order: 9
  }
];

const STORAGE_KEYS = {
  ARTISTS: 'veg_admin_artists',
  MENU_DATA: 'veg_admin_menu',
  CAROUSEL: 'veg_admin_carousel',
  PASES_CONFIG: 'veg_admin_pases'
};

// ==========================================
// 1. ARTISTAS (CRUD)
// ==========================================
export const getArtists = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ARTISTS);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map(a => ({
        ...a,
        imageUrl: artistImageMap[a.id] || artistImageMap[a.name] || a.imageUrl || jaraImg
      }));
    }
  } catch (e) {
    console.warn('Error reading artists from localStorage:', e);
  }
  return initialArtistsList;
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
// 2. CARTA Y MENÚ
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
// 3. CARRUSEL
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
// 4. PASES & TARIFAS MATRIZ REAL
// ==========================================
export const initialPases = {
  pase1: { 
    id: 'pase1', 
    time: "19:00", 
    name: "Primer Pase (Zambra Flamenca)", 
    active: true, 
    packShow: { title: "Espectáculo + Consumición", price: "25€", priceNum: 25 },
    packDinner: { title: "Cena Gastronómica + Espectáculo", price: "55€", priceNum: 55 }
  },
  pase2: { 
    id: 'pase2', 
    time: "21:00", 
    name: "Segundo Pase (Zambra Flamenca)", 
    active: true, 
    packShow: { title: "Espectáculo + Consumición", price: "25€", priceNum: 25 },
    packDinner: { title: "Cena Gastronómica + Espectáculo", price: "55€", priceNum: 55 }
  },
  general: {
    whatsappNumber: "+34958049461",
    gtmContainerId: "GTM-T22JXC3T",
    gtmActive: true,
    currency: "EUR"
  }
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
