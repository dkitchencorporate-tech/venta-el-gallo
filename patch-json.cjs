const fs = require('fs');

const menuDataES = {
  entrantes: [
    { title: 'Tabla de embutido', desc: 'Queso, jamón, chorizo, etc' }
  ],
  primerPlato: [
    { title: 'Tortilla sacromonte', desc: 'Con sesos de cordero' },
    { title: 'Ensalada Gallo', desc: 'Ensalada mixta con huevo' },
    { title: 'Habas con jamón y huevo', desc: '' }
  ],
  invierno: [
    { title: 'Sopa de cebolla y queso', desc: 'Con pan tostado' },
    { title: 'Sopa de marisco', desc: 'Con pan tostado' },
    { title: 'Sopa de picadillo', desc: 'Con pollo, jamón y huevo' }
  ],
  verano: [
    { title: 'Salmorejo', desc: 'Sopa de tomate con pan, jamón y huevo' },
    { title: 'Gazpacho', desc: 'Sopa de tomate y pepino' },
    { title: 'Melón con jamón', desc: '' },
    { title: 'Ajoblanco', desc: '' }
  ],
  principal: [
    { title: 'Bacalao frito con tomate', desc: '' },
    { title: 'Merluza en salsa verde', desc: 'Con patatas a lo pobre' },
    { title: 'Lomo de cerdo en salsa mozárabe', desc: 'Con patatas a lo pobre' },
    { title: 'Ternera en salsa jardinera', desc: 'Con patatas a lo pobre' },
    { title: 'Pollo al ajillo', desc: 'Con patatas a lo pobre' }
  ],
  postres: [
    'Natillas de vainilla', 'Tarta de chocolate', 'Arroz con leche', 'Helado', 'Tarta de queso'
  ]
};

const cartaDataES = {
  entrantes: [
    { title: 'Ensalada Gallo', desc: 'Ensalada mixta con huevo', price: '14€' },
    { title: 'Ensalada de pimientos', desc: 'Con huevo', price: '11€' },
    { title: 'Ensalada de gambas y aguacate', desc: '', price: '16.5€' },
    { title: 'Tomate aliñao', desc: '', price: '10€' },
    { title: 'Tabla de jamón ibérico', desc: '', price: '20€' },
    { title: 'Tabla de queso curado', desc: '', price: '20€' },
    { title: 'Tabla de ibéricos', desc: '', price: '20€' },
    { title: 'Tortilla de Sacromonte', desc: '', price: '12€' },
    { title: 'Tortilla de espárragos', desc: '', price: '11€' },
    { title: 'Berenjenas con miel de caña', desc: '', price: '10€' },
    { title: 'Wok de verduras', desc: '', price: '14€' },
    { title: 'Gambas al ajillo', desc: '', price: '16€' },
    { title: 'Croquetas de pollo', desc: '', price: '14€' },
    { title: 'Surtido de croquetas de ibéricos', desc: '', price: '14€' },
    { title: 'Habas con jamón y huevo', desc: '', price: '14€' }
  ],
  invierno: [
    { title: 'Sopa de cebolla', desc: 'Con pan tostado y queso', price: '8€' },
    { title: 'Sopa de marisco', desc: 'Con pan tostado', price: '8€' },
    { title: 'Sopa de picadillo', desc: 'Con pollo, jamón y huevo', price: '8€' }
  ],
  verano: [
    { title: 'Salmorejo', desc: 'Sopa de tomate con pan, jamón y huevo', price: '9€' },
    { title: 'Gazpacho', desc: 'Sopa de tomate y pepino', price: '9€' },
    { title: 'Melón con jamón', desc: '', price: '9€' }
  ],
  pescados: [
    { title: 'Bacalao frito con tomate', desc: '', price: '17€' },
    { title: 'Merluza en salsa verde', desc: 'Con patatas a lo pobre', price: '16.5€' },
    { title: 'Dorada a la plancha', desc: 'Con patatas a lo pobre', price: '18€' }
  ],
  carnes: [
    { title: 'Solomillo de cerdo', desc: 'Con patatas a lo pobre', price: '18€' },
    { title: 'Lomo de cerdo en salsa mozárabe', desc: 'Con patatas a lo pobre', price: '16.5€' },
    { title: 'Ternera en salsa jardinera', desc: 'Con patatas a lo pobre', price: '17€' },
    { title: 'Pollo al ajillo', desc: 'Con patatas a lo pobre', price: '15€' },
    { title: 'Entrecot de ternera', desc: 'Con patatas a lo pobre', price: '24€' },
    { title: 'Chuletillas de cordero', desc: 'Con patatas a lo pobre', price: '19€' }
  ],
  postres: [
    { title: 'Natillas de vainilla', price: '3.5€' },
    { title: 'Tarta de chocolate', price: '5€' },
    { title: 'Arroz con leche', price: '3.5€' },
    { title: 'Helado', price: '3.5€' },
    { title: 'Tarta de queso', price: '5€' }
  ],
  bebidas1: [
    { title: 'Sangría', price: '3.5€' },
    { title: 'Jarra de sangría', price: '16€' },
    { title: 'Cerveza barril', price: '3€' },
    { title: 'Jarra de cerveza', price: '15€' },
    { title: 'Agua pequeña', desc: 'Con o sin gas', price: '1.5€' },
    { title: 'Botella de agua grande', desc: '(750ml)', price: '3€' },
    { title: 'Refrescos o zumos', price: '3€' },
  ],
  bebidas2: [
    { title: 'Botella de vino tinto o blanco de la casa', price: '18€' },
    { title: 'Vino blanco, tinto o rosado', price: '3.5€' },
    { title: 'Botella de vino tinto Rioja', price: '22€' },
    { title: 'Botella de vino tinto Protos', price: '22€' }
  ]
};

const menuDataEN = {
  entrantes: [
    { title: 'Cold meats board', desc: 'Cheese, ham, chorizo, etc' }
  ],
  primerPlato: [
    { title: 'Sacromonte Omelet', desc: 'With lamb brains' },
    { title: 'Gallo Salad', desc: 'Mixed salad with egg' },
    { title: 'Broad beans with ham and egg', desc: '' }
  ],
  invierno: [
    { title: 'Onion and cheese soup', desc: 'With toasted bread' },
    { title: 'Seafood soup', desc: 'With toasted bread' },
    { title: 'Picadillo soup', desc: 'With chicken, ham and egg' }
  ],
  verano: [
    { title: 'Salmorejo', desc: 'Tomato soup with bread, ham and egg' },
    { title: 'Gazpacho', desc: 'Tomato and cucumber soup' },
    { title: 'Melon with ham', desc: '' },
    { title: 'Ajoblanco', desc: 'Cold almond soup' }
  ],
  principal: [
    { title: 'Fried cod with tomato', desc: '' },
    { title: 'Hake in green sauce', desc: 'With poor man\'s potatoes' },
    { title: 'Pork loin in Mozarabic sauce', desc: 'With poor man\'s potatoes' },
    { title: 'Beef in gardener sauce', desc: 'With poor man\'s potatoes' },
    { title: 'Garlic chicken', desc: 'With poor man\'s potatoes' }
  ],
  postres: [
    'Vanilla custard', 'Chocolate cake', 'Rice pudding', 'Ice cream', 'Cheesecake'
  ]
};

const cartaDataEN = {
  entrantes: [
    { title: 'Gallo Salad', desc: 'Mixed salad with egg', price: '14€' },
    { title: 'Pepper Salad', desc: 'With egg', price: '11€' },
    { title: 'Prawn and avocado salad', desc: '', price: '16.5€' },
    { title: 'Seasoned tomato', desc: '', price: '10€' },
    { title: 'Iberian ham board', desc: '', price: '20€' },
    { title: 'Cured cheese board', desc: '', price: '20€' },
    { title: 'Iberian cold meats board', desc: '', price: '20€' },
    { title: 'Sacromonte Omelet', desc: '', price: '12€' },
    { title: 'Asparagus Omelet', desc: '', price: '11€' },
    { title: 'Aubergines with cane honey', desc: '', price: '10€' },
    { title: 'Vegetable Wok', desc: '', price: '14€' },
    { title: 'Garlic prawns', desc: '', price: '16€' },
    { title: 'Chicken croquettes', desc: '', price: '14€' },
    { title: 'Assorted Iberian croquettes', desc: '', price: '14€' },
    { title: 'Broad beans with ham and egg', desc: '', price: '14€' }
  ],
  invierno: [
    { title: 'Onion soup', desc: 'With toasted bread and cheese', price: '8€' },
    { title: 'Seafood soup', desc: 'With toasted bread', price: '8€' },
    { title: 'Picadillo soup', desc: 'With chicken, ham and egg', price: '8€' }
  ],
  verano: [
    { title: 'Salmorejo', desc: 'Tomato soup with bread, ham and egg', price: '9€' },
    { title: 'Gazpacho', desc: 'Tomato and cucumber soup', price: '9€' },
    { title: 'Melon with ham', desc: '', price: '9€' }
  ],
  pescados: [
    { title: 'Fried cod with tomato', desc: '', price: '17€' },
    { title: 'Hake in green sauce', desc: 'With poor man\'s potatoes', price: '16.5€' },
    { title: 'Grilled bream', desc: 'With poor man\'s potatoes', price: '18€' }
  ],
  carnes: [
    { title: 'Pork tenderloin', desc: 'With poor man\'s potatoes', price: '18€' },
    { title: 'Pork loin in Mozarabic sauce', desc: 'With poor man\'s potatoes', price: '16.5€' },
    { title: 'Beef in gardener sauce', desc: 'With poor man\'s potatoes', price: '17€' },
    { title: 'Garlic chicken', desc: 'With poor man\'s potatoes', price: '15€' },
    { title: 'Beef entrecôte', desc: 'With poor man\'s potatoes', price: '24€' },
    { title: 'Lamb chops', desc: 'With poor man\'s potatoes', price: '19€' }
  ],
  postres: [
    { title: 'Vanilla custard', price: '3.5€' },
    { title: 'Chocolate cake', price: '5€' },
    { title: 'Rice pudding', price: '3.5€' },
    { title: 'Ice cream', price: '3.5€' },
    { title: 'Cheesecake', price: '5€' }
  ],
  bebidas1: [
    { title: 'Sangria', price: '3.5€' },
    { title: 'Sangria pitcher', price: '16€' },
    { title: 'Draft beer', price: '3€' },
    { title: 'Beer pitcher', price: '15€' },
    { title: 'Small water', desc: 'Sparkling or still', price: '1.5€' },
    { title: 'Large water bottle', desc: '(750ml)', price: '3€' },
    { title: 'Soft drinks or juices', price: '3€' },
  ],
  bebidas2: [
    { title: 'House wine bottle (red or white)', price: '18€' },
    { title: 'White, red or rosé wine glass', price: '3.5€' },
    { title: 'Rioja red wine bottle', price: '22€' },
    { title: 'Protos red wine bottle', price: '22€' }
  ]
};

const menuDataFR = {
  entrantes: [
    { title: 'Planche de charcuterie', desc: 'Fromage, jambon, chorizo, etc' }
  ],
  primerPlato: [
    { title: 'Omelette Sacromonte', desc: "Avec cervelle d'agneau" },
    { title: 'Salade Gallo', desc: 'Salade mixte avec œuf' },
    { title: 'Fèves au jambon et œuf', desc: '' }
  ],
  invierno: [
    { title: "Soupe à l'oignon et au fromage", desc: 'Avec pain grillé' },
    { title: 'Soupe de fruits de mer', desc: 'Avec pain grillé' },
    { title: 'Soupe de picadillo', desc: 'Avec poulet, jambon et œuf' }
  ],
  verano: [
    { title: 'Salmorejo', desc: 'Soupe de tomates avec pain, jambon et œuf' },
    { title: 'Gazpacho', desc: 'Soupe de tomates et concombres' },
    { title: 'Melon au jambon', desc: '' },
    { title: 'Ajoblanco', desc: 'Soupe froide aux amandes' }
  ],
  principal: [
    { title: 'Cabillaud frit à la tomate', desc: '' },
    { title: 'Colin en sauce verte', desc: 'Avec pommes de terre du pauvre' },
    { title: 'Longe de porc en sauce mozarabe', desc: 'Avec pommes de terre du pauvre' },
    { title: 'Bœuf en sauce jardinière', desc: 'Avec pommes de terre du pauvre' },
    { title: "Poulet à l'ail", desc: 'Avec pommes de terre du pauvre' }
  ],
  postres: [
    'Crème anglaise à la vanille', 'Gâteau au chocolat', 'Riz au lait', 'Glace', 'Gâteau au fromage'
  ]
};

const cartaDataFR = {
  entrantes: [
    { title: 'Salade Gallo', desc: 'Salade mixte avec œuf', price: '14€' },
    { title: 'Salade de poivrons', desc: 'Avec œuf', price: '11€' },
    { title: 'Salade de crevettes et avocat', desc: '', price: '16.5€' },
    { title: 'Tomate assaisonnée', desc: '', price: '10€' },
    { title: 'Planche de jambon ibérique', desc: '', price: '20€' },
    { title: 'Planche de fromage affiné', desc: '', price: '20€' },
    { title: 'Planche de charcuterie ibérique', desc: '', price: '20€' },
    { title: 'Omelette Sacromonte', desc: '', price: '12€' },
    { title: 'Omelette aux asperges', desc: '', price: '11€' },
    { title: 'Aubergines au miel de canne', desc: '', price: '10€' },
    { title: 'Wok de légumes', desc: '', price: '14€' },
    { title: "Crevettes à l'ail", desc: '', price: '16€' },
    { title: 'Croquettes de poulet', desc: '', price: '14€' },
    { title: 'Assortiment de croquettes ibériques', desc: '', price: '14€' },
    { title: 'Fèves au jambon et œuf', desc: '', price: '14€' }
  ],
  invierno: [
    { title: "Soupe à l'oignon", desc: 'Avec pain grillé et fromage', price: '8€' },
    { title: 'Soupe de fruits de mer', desc: 'Avec pain grillé', price: '8€' },
    { title: 'Soupe de picadillo', desc: 'Avec poulet, jambon et œuf', price: '8€' }
  ],
  verano: [
    { title: 'Salmorejo', desc: 'Soupe de tomates avec pain, jambon et œuf', price: '9€' },
    { title: 'Gazpacho', desc: 'Soupe de tomates et concombres', price: '9€' },
    { title: 'Melon au jambon', desc: '', price: '9€' }
  ],
  pescados: [
    { title: 'Cabillaud frit à la tomate', desc: '', price: '17€' },
    { title: 'Colin en sauce verte', desc: 'Avec pommes de terre du pauvre', price: '16.5€' },
    { title: 'Dorade grillée', desc: 'Avec pommes de terre du pauvre', price: '18€' }
  ],
  carnes: [
    { title: 'Filet de porc', desc: 'Avec pommes de terre du pauvre', price: '18€' },
    { title: 'Longe de porc en sauce mozarabe', desc: 'Avec pommes de terre du pauvre', price: '16.5€' },
    { title: 'Bœuf en sauce jardinière', desc: 'Avec pommes de terre du pauvre', price: '17€' },
    { title: "Poulet à l'ail", desc: 'Avec pommes de terre du pauvre', price: '15€' },
    { title: 'Entrecôte de bœuf', desc: 'Avec pommes de terre du pauvre', price: '24€' },
    { title: "Côtelettes d'agneau", desc: 'Avec pommes de terre du pauvre', price: '19€' }
  ],
  postres: [
    { title: 'Crème anglaise à la vanille', price: '3.5€' },
    { title: 'Gâteau au chocolat', price: '5€' },
    { title: 'Riz au lait', price: '3.5€' },
    { title: 'Glace', price: '3.5€' },
    { title: 'Gâteau au fromage', price: '5€' }
  ],
  bebidas1: [
    { title: 'Sangria', price: '3.5€' },
    { title: 'Pichet de sangria', price: '16€' },
    { title: 'Bière pression', price: '3€' },
    { title: 'Pichet de bière', price: '15€' },
    { title: 'Petite eau', desc: 'Gazeuse ou plate', price: '1.5€' },
    { title: "Grande bouteille d'eau", desc: '(750ml)', price: '3€' },
    { title: 'Boissons gazeuses ou jus', price: '3€' },
  ],
  bebidas2: [
    { title: 'Bouteille de vin maison (rouge ou blanc)', price: '18€' },
    { title: 'Verre de vin blanc, rouge ou rosé', price: '3.5€' },
    { title: 'Bouteille de vin rouge Rioja', price: '22€' },
    { title: 'Bouteille de vin rouge Protos', price: '22€' }
  ]
};

const textsES = {
  header: {
    restaurant: 'Restaurante flamenco',
    menu: 'MENÚ',
    carta: 'CARTA'
  },
  sections: {
    entrante: 'ENTRANTE',
    entrantes: 'ENTRANTES',
    primer_plato: 'PRIMER PLATO',
    invierno: 'Temporada de invierno',
    verano: 'Temporada de verano',
    principal: 'PRINCIPAL',
    pescados: 'PESCADOS',
    carnes: 'CARNES',
    postres: 'POSTRES CASEROS',
    bodega: 'BODEGA Y BEBIDAS',
    bebidas_incluidas: 'BEBIDAS INCLUIDAS'
  },
  drinks: {
    t1: '1 bebida de bienvenida espectáculo',
    t2: '(sangría o cerveza)',
    t3: '2 bebidas del menú',
    sangria: 'Sangría',
    cerveza: 'Cerveza',
    agua: 'Agua',
    agua_desc: 'Con o sin gas',
    zumo: 'Zumo',
    zumo_desc: 'Melocotón, piña, naranja',
    refrescos: 'Refrescos',
    refrescos_desc: 'Menta y jengibre',
    vino: 'Vino',
    vino_desc: 'Blanco o tinto'
  },
  modal: {
    hacer_reserva: 'Hacer Reserva'
  },
  section: {
    title_1: 'Nuestra ',
    title_2: 'Gastronomía',
    desc: 'Nuestra propuesta gastronómica está diseñada para complementar el arte flamenco. Elige tu menú ideal o disfruta de nuestra carta completa.',
    allergens: 'Información de Alérgenos',
    cards: {
      menu_title: 'Nuestros Menús',
      menu_desc: 'Descubre nuestros menús degustación especiales incluidos en los pases.',
      menu_link: 'Ver Menú',
      carta_title: 'Carta del Restaurante',
      carta_desc: 'Explora nuestra selección completa de platos tradicionales y tapas.',
      carta_link: 'Ver Carta'
    }
  },
  menuData: menuDataES,
  cartaData: cartaDataES
};

const textsEN = {
  header: {
    restaurant: 'Flamenco Restaurant',
    menu: 'SET MENU',
    carta: 'A LA CARTE'
  },
  sections: {
    entrante: 'STARTER',
    entrantes: 'STARTERS',
    primer_plato: 'FIRST COURSE',
    invierno: 'Winter Season',
    verano: 'Summer Season',
    principal: 'MAIN COURSE',
    pescados: 'FISH',
    carnes: 'MEAT',
    postres: 'HOMEMADE DESSERTS',
    bodega: 'CELLAR & DRINKS',
    bebidas_incluidas: 'DRINKS INCLUDED'
  },
  drinks: {
    t1: '1 welcome show drink',
    t2: '(sangria or beer)',
    t3: '2 drinks from the menu',
    sangria: 'Sangria',
    cerveza: 'Beer',
    agua: 'Water',
    agua_desc: 'Sparkling or still',
    zumo: 'Juice',
    zumo_desc: 'Peach, pineapple, orange',
    refrescos: 'Soft Drinks',
    refrescos_desc: 'Mint and ginger',
    vino: 'Wine',
    vino_desc: 'White or red'
  },
  modal: {
    hacer_reserva: 'Book Now'
  },
  section: {
    title_1: 'Our ',
    title_2: 'Gastronomy',
    desc: 'Our gastronomic offer is designed to complement the flamenco art. Choose your ideal menu or enjoy our full à la carte selection.',
    allergens: 'Allergen Information',
    cards: {
      menu_title: 'Set Menus',
      menu_desc: 'Discover our special tasting menus included in the show passes.',
      menu_link: 'View Menu',
      carta_title: 'A La Carte',
      carta_desc: 'Explore our full selection of traditional dishes and tapas.',
      carta_link: 'View A La Carte'
    }
  },
  menuData: menuDataEN,
  cartaData: cartaDataEN
};

const textsFR = {
  header: {
    restaurant: 'Restaurant Flamenco',
    menu: 'MENU',
    carta: 'À LA CARTE'
  },
  sections: {
    entrante: 'ENTRÉE',
    entrantes: 'ENTRÉES',
    primer_plato: 'PREMIER PLAT',
    invierno: "Saison d'hiver",
    verano: "Saison d'été",
    principal: 'PLAT PRINCIPAL',
    pescados: 'POISSONS',
    carnes: 'VIANDES',
    postres: 'DESSERTS MAISON',
    bodega: 'CAVE ET BOISSONS',
    bebidas_incluidas: 'BOISSONS INCLUSES'
  },
  drinks: {
    t1: '1 boisson de bienvenue',
    t2: '(sangria ou bière)',
    t3: '2 boissons du menu',
    sangria: 'Sangria',
    cerveza: 'Bière',
    agua: 'Eau',
    agua_desc: 'Gazeuse ou plate',
    zumo: 'Jus',
    zumo_desc: 'Pêche, ananas, orange',
    refrescos: 'Boissons Gazeuses',
    refrescos_desc: 'Menthe et gingembre',
    vino: 'Vin',
    vino_desc: 'Blanc ou rouge'
  },
  modal: {
    hacer_reserva: 'Réserver Maintenant'
  },
  section: {
    title_1: 'Notre ',
    title_2: 'Gastronomie',
    desc: "Notre offre gastronomique est conçue pour compléter l'art du flamenco. Choisissez votre menu idéal ou profitez de notre sélection à la carte.",
    allergens: 'Informations sur les Allergènes',
    cards: {
      menu_title: 'Menus',
      menu_desc: 'Découvrez nos menus dégustation spéciaux inclus dans les pass.',
      menu_link: 'Voir le Menu',
      carta_title: 'À La Carte',
      carta_desc: 'Explorez notre sélection complète de plats traditionnels et de tapas.',
      carta_link: 'Voir la Carte'
    }
  },
  menuData: menuDataFR,
  cartaData: cartaDataFR
};

const langs = [
  { path: 'src/i18n/locales/es.json', data: textsES },
  { path: 'src/i18n/locales/en.json', data: textsEN },
  { path: 'src/i18n/locales/fr.json', data: textsFR }
];

langs.forEach(({ path, data }) => {
  const content = JSON.parse(fs.readFileSync(path, 'utf8'));
  if (!content.restaurant_page) content.restaurant_page = {};
  content.restaurant_page.interactive_menu = data;
  fs.writeFileSync(path, JSON.stringify(content, null, 2));
});
console.log('JSON files updated.');
