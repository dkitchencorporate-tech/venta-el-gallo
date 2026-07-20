const fs = require('fs');

const textsES = {
  hero: {
    title_1: 'Contacta con ',
    title_2: 'Nosotros',
    desc: 'Estamos a tu disposición para atender cualquier consulta o reserva. Habla directamente con nuestro equipo.'
  },
  buttons: {
    call_title: 'Llámanos Directamente',
    chat_title: 'Chat Directo'
  },
  map: {
    button: 'Cómo Llegar'
  },
  email: {
    title: 'Envíanos un correo',
    desc: 'Para consultas generales, eventos o solicitudes especiales, no dudes en escribirnos. Te responderemos a la mayor brevedad posible.',
    button: 'Enviar Email'
  },
  cta: {
    title: '¿Listo para vivir la Zambra?',
    desc: 'Asegura tu mesa y no te quedes sin disfrutar del mejor flamenco.',
    button: 'Hacer Reserva Ahora'
  }
};

const textsEN = {
  hero: {
    title_1: 'Contact ',
    title_2: 'Us',
    desc: 'We are at your disposal to answer any questions or reservations. Speak directly with our team.'
  },
  buttons: {
    call_title: 'Call Us Directly',
    chat_title: 'Direct Chat'
  },
  map: {
    button: 'How to Get There'
  },
  email: {
    title: 'Send us an email',
    desc: 'For general inquiries, events or special requests, do not hesitate to write to us. We will reply as soon as possible.',
    button: 'Send Email'
  },
  cta: {
    title: 'Ready to experience the Zambra?',
    desc: 'Secure your table and do not miss out on enjoying the best flamenco.',
    button: 'Book Now'
  }
};

const textsFR = {
  hero: {
    title_1: 'Contactez- ',
    title_2: 'Nous',
    desc: 'Nous sommes à votre disposition pour répondre à toutes vos questions ou réservations. Parlez directement avec notre équipe.'
  },
  buttons: {
    call_title: 'Appelez-nous Directement',
    chat_title: 'Chat Direct'
  },
  map: {
    button: 'Comment s\'y Rendre'
  },
  email: {
    title: 'Envoyez-nous un e-mail',
    desc: 'Pour des questions générales, des événements ou des demandes spéciales, n\'hésitez pas à nous écrire. Nous vous répondrons dans les plus brefs délais.',
    button: 'Envoyer un Email'
  },
  cta: {
    title: 'Prêt à vivre la Zambra ?',
    desc: 'Assurez votre table et ne manquez pas de profiter du meilleur flamenco.',
    button: 'Réserver Maintenant'
  }
};

const langs = [
  { path: 'src/i18n/locales/es.json', data: textsES },
  { path: 'src/i18n/locales/en.json', data: textsEN },
  { path: 'src/i18n/locales/fr.json', data: textsFR }
];

langs.forEach(({ path, data }) => {
  const content = JSON.parse(fs.readFileSync(path, 'utf8'));
  content.contact_page = data;
  fs.writeFileSync(path, JSON.stringify(content, null, 2));
});
console.log('JSON files updated.');
