const fs = require('fs');

const textsES = {
  home_mid: {
    title_1: 'El latido del Sacromonte ',
    title_2: 'te está esperando.',
    cta: 'Reservar'
  },
  home_bottom: {
    title_1: 'Tu asiento en la ',
    title_2: 'historia.',
    desc: 'Las plazas en la cueva son limitadas para preservar la pureza acústica y la intimidad del espectáculo. Asegura tu lugar en la Zambra.',
    cta: 'Reservar'
  },
  blog: {
    title_1: 'Nuestro ',
    title_2: 'Blog',
    subtitle: 'Sumérgete en la cultura, historia y noticias del auténtico flamenco del Sacromonte.',
    read_more: 'Leer Más'
  },
  artist_card: {
    bio_btn: 'Ver Biografía',
    sample: 'Muestra Artística'
  },
  booking_modal: {
    title_1: 'Reserva tu ',
    title_2: 'Experiencia Flamenca',
    desc: 'Asegura tu lugar en la mítica Cueva Venta El Gallo. Disfruta del flamenco más puro en el corazón del Sacromonte.',
    guarantee_title: 'Garantía',
    guarantee_desc: 'Reserva oficial y pago 100% seguro.',
    location_title: 'Ubicación',
    location_desc: 'Barranco de los Negros, 5, Sacromonte.'
  }
};

const textsEN = {
  home_mid: {
    title_1: 'The heartbeat of Sacromonte ',
    title_2: 'is waiting for you.',
    cta: 'Book Now'
  },
  home_bottom: {
    title_1: 'Your seat in ',
    title_2: 'history.',
    desc: 'Seats in the cave are limited to preserve acoustic purity and the intimacy of the show. Secure your place at the Zambra.',
    cta: 'Book Now'
  },
  blog: {
    title_1: 'Our ',
    title_2: 'Blog',
    subtitle: 'Immerse yourself in the culture, history, and news of authentic Sacromonte flamenco.',
    read_more: 'Read More'
  },
  artist_card: {
    bio_btn: 'View Biography',
    sample: 'Artistic Sample'
  },
  booking_modal: {
    title_1: 'Book your ',
    title_2: 'Flamenco Experience',
    desc: 'Secure your place in the legendary Cueva Venta El Gallo. Enjoy the purest flamenco in the heart of Sacromonte.',
    guarantee_title: 'Guarantee',
    guarantee_desc: 'Official booking and 100% secure payment.',
    location_title: 'Location',
    location_desc: 'Barranco de los Negros, 5, Sacromonte.'
  }
};

const textsFR = {
  home_mid: {
    title_1: 'Le cœur du Sacromonte ',
    title_2: 'vous attend.',
    cta: 'Réserver'
  },
  home_bottom: {
    title_1: 'Votre place dans ',
    title_2: 'l\'histoire.',
    desc: 'Les places dans la grotte sont limitées pour préserver la pureté acoustique et l\'intimité du spectacle. Assurez votre place à la Zambra.',
    cta: 'Réserver'
  },
  blog: {
    title_1: 'Notre ',
    title_2: 'Blog',
    subtitle: 'Plongez dans la culture, l\'histoire et l\'actualité du flamenco authentique du Sacromonte.',
    read_more: 'Lire la Suite'
  },
  artist_card: {
    bio_btn: 'Voir Biographie',
    sample: 'Échantillon Artistique'
  },
  booking_modal: {
    title_1: 'Réservez votre ',
    title_2: 'Expérience Flamenco',
    desc: 'Assurez votre place dans la mythique Cueva Venta El Gallo. Profitez du flamenco le plus pur au cœur du Sacromonte.',
    guarantee_title: 'Garantie',
    guarantee_desc: 'Réservation officielle et paiement 100% sécurisé.',
    location_title: 'Emplacement',
    location_desc: 'Barranco de los Negros, 5, Sacromonte.'
  }
};

const langs = [
  { path: 'src/i18n/locales/es.json', data: textsES },
  { path: 'src/i18n/locales/en.json', data: textsEN },
  { path: 'src/i18n/locales/fr.json', data: textsFR }
];

langs.forEach(({ path, data }) => {
  const content = JSON.parse(fs.readFileSync(path, 'utf8'));
  content.home_mid = data.home_mid;
  content.home_bottom = data.home_bottom;
  content.blog = data.blog;
  content.artist_card = data.artist_card;
  content.booking_modal = data.booking_modal;
  fs.writeFileSync(path, JSON.stringify(content, null, 2));
});
console.log('JSON files updated.');
