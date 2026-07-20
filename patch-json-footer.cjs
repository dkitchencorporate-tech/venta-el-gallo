const fs = require('fs');

const textsES = {
  desc: 'Una cueva milenaria donde el flamenco se vive en su estado más puro. Manteniendo vivo el legado de Juanillo Heredia desde 1996.',
  cols: {
    exp: {
      title: 'La Experiencia',
      links: {
        history: 'Nuestro Legado',
        artists: 'Zambra y Artistas',
        restaurant: 'Gastronomía',
        contact: 'Eventos Exclusivos'
      }
    },
    legal: {
      title: 'Políticas Legales',
      links: {
        legal: 'Aviso Legal',
        privacy: 'Política de Privacidad',
        allergens: 'Información de Alérgenos',
        terms: 'Términos de Reserva'
      }
    },
    contact: {
      title: 'Contacto'
    }
  },
  bottom: {
    patrimony: 'Patrimonio del Sacromonte',
    rights: '© 2026 Cueva Venta El Gallo. Todos los derechos reservados.',
    designed_by: 'Designed & Developed by '
  }
};

const textsEN = {
  desc: 'A millennial cave where flamenco is lived in its purest state. Keeping Juanillo Heredia\'s legacy alive since 1996.',
  cols: {
    exp: {
      title: 'The Experience',
      links: {
        history: 'Our Legacy',
        artists: 'Zambra and Artists',
        restaurant: 'Gastronomy',
        contact: 'Exclusive Events'
      }
    },
    legal: {
      title: 'Legal Policies',
      links: {
        legal: 'Legal Notice',
        privacy: 'Privacy Policy',
        allergens: 'Allergens Information',
        terms: 'Reservation Terms'
      }
    },
    contact: {
      title: 'Contact'
    }
  },
  bottom: {
    patrimony: 'Sacromonte Heritage',
    rights: '© 2026 Cueva Venta El Gallo. All rights reserved.',
    designed_by: 'Designed & Developed by '
  }
};

const textsFR = {
  desc: 'Une grotte millénaire où le flamenco se vit à l\'état pur. Maintenir vivant l\'héritage de Juanillo Heredia depuis 1996.',
  cols: {
    exp: {
      title: 'L\'Expérience',
      links: {
        history: 'Notre Héritage',
        artists: 'Zambra et Artistes',
        restaurant: 'Gastronomie',
        contact: 'Événements Exclusifs'
      }
    },
    legal: {
      title: 'Politiques Légales',
      links: {
        legal: 'Mention Légale',
        privacy: 'Politique de Confidentialité',
        allergens: 'Informations sur les Allergènes',
        terms: 'Conditions de Réservation'
      }
    },
    contact: {
      title: 'Contact'
    }
  },
  bottom: {
    patrimony: 'Patrimoine du Sacromonte',
    rights: '© 2026 Cueva Venta El Gallo. Tous droits réservés.',
    designed_by: 'Conçu et Développé par '
  }
};

const langs = [
  { path: 'src/i18n/locales/es.json', data: textsES },
  { path: 'src/i18n/locales/en.json', data: textsEN },
  { path: 'src/i18n/locales/fr.json', data: textsFR }
];

langs.forEach(({ path, data }) => {
  const content = JSON.parse(fs.readFileSync(path, 'utf8'));
  content.footer = data;
  fs.writeFileSync(path, JSON.stringify(content, null, 2));
});
console.log('JSON files updated.');
