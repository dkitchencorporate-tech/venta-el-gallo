const fs = require('fs');

const textsES = {
  hero: {
    tag: 'Eventos y Profesionales',
    title_1: 'Eventos con ',
    title_2: 'Alma',
    desc: '¿Buscas un lugar con magia para tu próximo evento? En nuestra cueva del Sacromonte, donde el flamenco nace y la historia se respira en cada rincón, creamos momentos únicos que quedan grabados para siempre.'
  },
  services: {
    tag: 'Celebraciones Únicas',
    title_1: '¿Quieres celebrar un evento especial con ',
    title_2: 'nosotros?',
    desc: 'Celebraciones especiales, cenas de empresa, viajes con amigos o encuentros culturales… Sea cual sea la ocasión, la convertimos en una experiencia inolvidable. Combinamos lo mejor de la gastronomía andaluza con el arte más auténtico del flamenco, en un entorno incomparable con vistas a la Alhambra y el embrujo de Granada.',
    subtitle: 'Nuestros Servicios para Eventos:',
    list: [
      { title: 'Espacios con encanto:', desc: 'Terraza con vistas, salones en cueva y zonas privadas.' },
      { title: 'Gastronomía personalizada:', desc: 'Menú o carta adaptada a cada tipo de evento.' },
      { title: 'Flamenco en vivo:', desc: 'Para dar ese toque de emoción y autenticidad.' },
      { title: 'Organización integral:', desc: 'Para que tú solo te preocupes de disfrutar.' }
    ],
    footer: 'Haz que tu evento tenga alma, sabor… y arte.'
  },
  contact: {
    title: 'Contacto Directo',
    desc: 'Atención exclusiva para profesionales del sector turístico y corporativo.',
    paco_tag: 'Operaciones B2B',
    fijo: 'Fijo',
    movil: 'Móvil / WhatsApp',
    email_general: 'Email General',
    german_tag: 'Marketing Digital',
    german_desc: 'Colaboraciones, marketing y alianzas estratégicas.'
  },
  form: {
    title_1: 'Solicitud de ',
    title_2: 'Eventos',
    desc: 'Envíanos los detalles de tu evento y prepararemos una propuesta a medida.',
    name_label: 'Nombre / Agencia',
    name_placeholder: 'Tu nombre o empresa',
    email_label: 'Email',
    email_placeholder: 'correo@ejemplo.com',
    details_label: 'Detalles del Evento',
    details_placeholder: 'Indícanos fechas, número de personas, menús deseados y cualquier requerimiento especial...',
    button: 'Organizar Evento'
  }
};

const textsEN = {
  hero: {
    tag: 'Events and Professionals',
    title_1: 'Events with ',
    title_2: 'Soul',
    desc: 'Looking for a magical place for your next event? In our Sacromonte cave, where flamenco is born and history is breathed in every corner, we create unique moments that are etched forever.'
  },
  services: {
    tag: 'Unique Celebrations',
    title_1: 'Do you want to celebrate a special event with ',
    title_2: 'us?',
    desc: 'Special celebrations, company dinners, trips with friends or cultural meetings... Whatever the occasion, we turn it into an unforgettable experience. We combine the best of Andalusian gastronomy with the most authentic flamenco art, in an incomparable setting with views of the Alhambra and the charm of Granada.',
    subtitle: 'Our Services for Events:',
    list: [
      { title: 'Charming spaces:', desc: 'Terrace with views, cave lounges and private areas.' },
      { title: 'Personalized gastronomy:', desc: 'Menu or à la carte adapted to each type of event.' },
      { title: 'Live flamenco:', desc: 'To give that touch of emotion and authenticity.' },
      { title: 'Comprehensive organization:', desc: 'So that you only worry about enjoying.' }
    ],
    footer: 'Make your event have soul, flavor... and art.'
  },
  contact: {
    title: 'Direct Contact',
    desc: 'Exclusive attention for professionals in the tourism and corporate sector.',
    paco_tag: 'B2B Operations',
    fijo: 'Landline',
    movil: 'Mobile / WhatsApp',
    email_general: 'General Email',
    german_tag: 'Digital Marketing',
    german_desc: 'Collaborations, marketing and strategic alliances.'
  },
  form: {
    title_1: 'Event ',
    title_2: 'Request',
    desc: 'Send us the details of your event and we will prepare a tailor-made proposal.',
    name_label: 'Name / Agency',
    name_placeholder: 'Your name or company',
    email_label: 'Email',
    email_placeholder: 'email@example.com',
    details_label: 'Event Details',
    details_placeholder: 'Indicate dates, number of people, desired menus and any special requirements...',
    button: 'Organize Event'
  }
};

const textsFR = {
  hero: {
    tag: 'Événements et Professionnels',
    title_1: 'Événements avec ',
    title_2: 'Âme',
    desc: 'Vous cherchez un lieu magique pour votre prochain événement ? Dans notre grotte de Sacromonte, où naît le flamenco et où l\'histoire se respire à chaque coin, nous créons des moments uniques gravés à jamais.'
  },
  services: {
    tag: 'Célébrations Uniques',
    title_1: 'Vous souhaitez célébrer un événement spécial avec ',
    title_2: 'nous ?',
    desc: 'Célébrations spéciales, dîners d\'entreprise, voyages entre amis ou rencontres culturelles... Quelle que soit l\'occasion, nous en faisons une expérience inoubliable. Nous combinons le meilleur de la gastronomie andalouse avec l\'art flamenco le plus authentique, dans un cadre incomparable avec vue sur l\'Alhambra et le charme de Grenade.',
    subtitle: 'Nos Services pour les Événements :',
    list: [
      { title: 'Espaces de charme :', desc: 'Terrasse avec vue, salons troglodytes et espaces privés.' },
      { title: 'Gastronomie personnalisée :', desc: 'Menu ou à la carte adapté à chaque type d\'événement.' },
      { title: 'Flamenco en direct :', desc: 'Pour donner cette touche d\'émotion et d\'authenticité.' },
      { title: 'Organisation intégrale :', desc: 'Pour que vous ne vous souciiez que de profiter.' }
    ],
    footer: 'Donnez à votre événement une âme, une saveur... et de l\'art.'
  },
  contact: {
    title: 'Contact Direct',
    desc: 'Attention exclusive pour les professionnels du secteur touristique et corporatif.',
    paco_tag: 'Opérations B2B',
    fijo: 'Fixe',
    movil: 'Mobile / WhatsApp',
    email_general: 'Email Général',
    german_tag: 'Marketing Numérique',
    german_desc: 'Collaborations, marketing et alliances stratégiques.'
  },
  form: {
    title_1: 'Demande d\' ',
    title_2: 'Événements',
    desc: 'Envoyez-nous les détails de votre événement et nous préparerons une proposition sur mesure.',
    name_label: 'Nom / Agence',
    name_placeholder: 'Votre nom ou entreprise',
    email_label: 'Email',
    email_placeholder: 'email@exemple.com',
    details_label: 'Détails de l\'Événement',
    details_placeholder: 'Indiquez les dates, le nombre de personnes, les menus souhaités et toute exigence particulière...',
    button: 'Organiser l\'Événement'
  }
};

const langs = [
  { path: 'src/i18n/locales/es.json', data: textsES },
  { path: 'src/i18n/locales/en.json', data: textsEN },
  { path: 'src/i18n/locales/fr.json', data: textsFR }
];

langs.forEach(({ path, data }) => {
  const content = JSON.parse(fs.readFileSync(path, 'utf8'));
  content.agencias_page = data;
  fs.writeFileSync(path, JSON.stringify(content, null, 2));
});
console.log('JSON files updated.');
