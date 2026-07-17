import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        history: 'El Legado',
        artists: 'Artistas',
        restaurant: 'Restaurante',
        b2b: 'Agencias y Profesionales',
        contact: 'Contacto'
      },
      hero: {
        title: 'Alma de Roca, Corazón de Fuego',
        subtitle: 'Una cueva legendaria donde el flamenco trasciende el tiempo.',
        cta: 'Reserva tu Mesa'
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        history: 'The Legacy',
        artists: 'Artists',
        restaurant: 'Restaurant',
        b2b: 'Agencies & Professionals',
        contact: 'Contact'
      },
      hero: {
        title: 'Rock Soul, Heart of Fire',
        subtitle: 'A legendary cave where flamenco transcends time.',
        cta: 'Book a Table'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
