const fs = require('fs');

const artistsDataES = [
  {
    name: "Jara Heredia",
    role: "DIRECCIÓN ARTÍSTICA",
    description: "Jara Heredia comenzó su carrera artística con profesores como Angustillas Ruiz “la mona” Manolete, Eva Garrido “la Yerbabuena”, Antonio Canales, Farruquito, Manuela Carrasco…… formando parte de la escuela escénica de Mario Maya. Actúa en varias ocasiones para S. M el rey D. Juan Carlos y en los Ángeles en casa de Antonio Banderas, Festival internacional de música y danza de Granada, festival del premio Lorca de poesía en Nueva York 2004, festival USA 2010, festival internacional de Carthage."
  },
  {
    name: "Antonia Heredia",
    role: "Bailaora",
    description: "Antonia Heredia comenzó su carrera artística con la bailaora Angustias Ruiz y con su hermana Jara Heredia. Más tarde comienza a formarse profesionalmente con profesores como Mario Maya, Eduardo Serrano «guiri», Belén Maya, Rafaela Carrasco, Manuel Liñán… Comienza a actuar en los tablaos flamencos de Granada a los 12 años. Actuó en los festivales de música y danza de Granada. Ha actuado con artistas como Juan Moneo «El tortas» en el festival de Almuñécar, Pepe Habichuela y Josemi Carmona en una gira por toda India y Festival de Mont de Marsan con Pepe Luis Carmona en numerosos festivales. Participa con Antonio Canales en el corral del carbón en varios videoclips de la talla de «Manzanita, Remedios Amaya, Antonio Carmona, Pepe Luis Carmona…»"
  },
  {
    name: "Dinastía Heredia",
    role: "Hijas del Fundador",
    description: "El alma femenina de la Venta El Gallo. Las hijas de Juan Heredia representan la continuidad histórica y el compromiso inquebrantable con el arte puro que su padre inició."
  },
  {
    name: "Antonio Heredia «El Chonico»",
    role: "Maestro Guitarrista",
    description: "Referente absoluto del toque granadino. Su guitarra es el latido indómito de la cueva, combinando una técnica depurada con el eco ancestral del barrio del Sacromonte."
  },
  {
    name: "Miguel Ángel Cortés",
    role: "Guitarra Concertista",
    description: "Virtuosismo y sensibilidad reconocidos internacionalmente. Premiado con el Bordón Minero, es uno de los guitarristas más influyentes de su generación en el panorama flamenco."
  },
  {
    name: "Paco Fernández",
    role: "Bailaor",
    description: "Fuerza y carisma en el tablao. Siguiendo los pasos de grandes maestros, Paco imprime una energía visceral que hace vibrar los cimientos de la Zambra en cada actuación."
  },
  {
    name: "Coral Fernández",
    role: "Bailaora",
    description: "Elegancia y técnica depurada. Formada en las mejores escuelas de flamencología, su baile es una oda a la estética granadina, llena de temperamento y precisión absoluta."
  },
  {
    name: "Raimundo Benítez",
    role: "Bailaor y Coreógrafo",
    description: "Maestro del movimiento. Su trayectoria en compañías internacionales le permite aportar una profundidad interpretativa que eleva el baile hacia nuevas cotas de expresión."
  },
  {
    name: "Antonio Heredia",
    role: "Cantaor",
    description: "Antonio Heredia es un cantaor granadino con raíces flamencas profundas, nacido en una familia de artistas donde el cante siempre fue una forma de vida. Desde joven mostró un talento innato, empapándose de los cantes tradicionales y desarrollando una voz poderosa y expresiva. A los 19 años inició su carrera profesional en los tablaos de Granada, destacando por su versatilidad y su capacidad para emocionar al público.\n\nHa trabajado con grandes figuras del flamenco, como Los Farruco y Belén López, y ha participado en festivales tanto en España como a nivel internacional. En 2021 lanzó el álbum Hasta La Eternidad, disponible en plataformas digitales, y ha formado parte de espectáculos junto a artistas como Sergio Gómez \"El Colorao\" y Alicia Morales. Su cante, lleno de sentimiento y autenticidad, fusiona la tradición con un estilo personal que lo ha consolidado como una de las voces más respetadas del flamenco actual."
  }
];

const artistsDataEN = [
  {
    name: "Jara Heredia",
    role: "ARTISTIC DIRECTION",
    description: "Jara Heredia began her artistic career with teachers such as Angustillas Ruiz \"la mona\" Manolete, Eva Garrido \"la Yerbabuena\", Antonio Canales, Farruquito, Manuela Carrasco... forming part of Mario Maya's scenic school. She has performed on several occasions for H.M. King Juan Carlos and in Los Angeles at Antonio Banderas' house, at the International Festival of Music and Dance of Granada, Lorca Poetry Prize Festival in New York 2004, USA Festival 2010, Carthage International Festival."
  },
  {
    name: "Antonia Heredia",
    role: "Dancer",
    description: "Antonia Heredia began her artistic career with dancer Angustias Ruiz and her sister Jara Heredia. She later began to train professionally with teachers such as Mario Maya, Eduardo Serrano «guiri», Belén Maya, Rafaela Carrasco, Manuel Liñán... She started performing in the flamenco tablaos of Granada at the age of 12. She performed at the music and dance festivals of Granada. She has performed with artists such as Juan Moneo «El tortas» at the Almuñécar festival, Pepe Habichuela and Josemi Carmona on a tour throughout India and the Mont de Marsan Festival with Pepe Luis Carmona in numerous festivals. She participated with Antonio Canales in the corral del carbón in several music videos of the stature of «Manzanita, Remedios Amaya, Antonio Carmona, Pepe Luis Carmona...»"
  },
  {
    name: "Dinastía Heredia",
    role: "Founder's Daughters",
    description: "The feminine soul of Venta El Gallo. Juan Heredia's daughters represent the historical continuity and unwavering commitment to pure art that their father initiated."
  },
  {
    name: "Antonio Heredia «El Chonico»",
    role: "Master Guitarist",
    description: "An absolute benchmark of the Granada touch. His guitar is the untamed heartbeat of the cave, combining refined technique with the ancestral echo of the Sacromonte neighborhood."
  },
  {
    name: "Miguel Ángel Cortés",
    role: "Concert Guitarist",
    description: "Internationally recognized virtuosity and sensitivity. Awarded the Bordón Minero, he is one of the most influential guitarists of his generation in the flamenco scene."
  },
  {
    name: "Paco Fernández",
    role: "Dancer",
    description: "Strength and charisma on the tablao. Following in the footsteps of great masters, Paco prints a visceral energy that makes the foundations of the Zambra vibrate in every performance."
  },
  {
    name: "Coral Fernández",
    role: "Dancer",
    description: "Elegance and refined technique. Trained in the best schools of flamencology, her dance is an ode to Granada aesthetics, full of temperament and absolute precision."
  },
  {
    name: "Raimundo Benítez",
    role: "Dancer and Choreographer",
    description: "Master of movement. His trajectory in international companies allows him to bring an interpretive depth that elevates dance to new heights of expression."
  },
  {
    name: "Antonio Heredia",
    role: "Singer",
    description: "Antonio Heredia is a Granada singer with deep flamenco roots, born into a family of artists where singing was always a way of life. From a young age he showed an innate talent, soaking up traditional songs and developing a powerful and expressive voice. At 19 he began his professional career in the tablaos of Granada, standing out for his versatility and ability to move the public.\n\nHe has worked with great figures of flamenco, such as Los Farruco and Belén López, and has participated in festivals both in Spain and internationally. In 2021 he released the album Hasta La Eternidad, available on digital platforms, and has been part of shows alongside artists such as Sergio Gómez \"El Colorao\" and Alicia Morales. His singing, full of feeling and authenticity, fuses tradition with a personal style that has consolidated him as one of the most respected voices in current flamenco."
  }
];

const artistsDataFR = [
  {
    name: "Jara Heredia",
    role: "DIRECTION ARTISTIQUE",
    description: "Jara Heredia a commencé sa carrière artistique avec des professeurs tels qu'Angustillas Ruiz \"la mona\" Manolete, Eva Garrido \"la Yerbabuena\", Antonio Canales, Farruquito, Manuela Carrasco... faisant partie de l'école scénique de Mario Maya. Elle s'est produite à plusieurs reprises pour S.M. le Roi Juan Carlos et à Los Angeles chez Antonio Banderas, au Festival International de Musique et de Danse de Grenade, au Festival du Prix de Poésie Lorca à New York en 2004, au Festival USA en 2010, au Festival International de Carthage."
  },
  {
    name: "Antonia Heredia",
    role: "Danseuse",
    description: "Antonia Heredia a commencé sa carrière artistique avec la danseuse Angustias Ruiz et sa sœur Jara Heredia. Elle a ensuite commencé à se former professionnellement avec des professeurs tels que Mario Maya, Eduardo Serrano « guiri », Belén Maya, Rafaela Carrasco, Manuel Liñán... Elle a commencé à se produire dans les tablaos flamencos de Grenade à l'âge de 12 ans. Elle s'est produite aux festivals de musique et de danse de Grenade. Elle a joué avec des artistes tels que Juan Moneo « El tortas » au festival d'Almuñécar, Pepe Habichuela et Josemi Carmona lors d'une tournée dans toute l'Inde et au Festival de Mont de Marsan avec Pepe Luis Carmona dans de nombreux festivals. Elle a participé avec Antonio Canales au corral del carbón dans plusieurs clips musicaux de la stature de « Manzanita, Remedios Amaya, Antonio Carmona, Pepe Luis Carmona... »"
  },
  {
    name: "Dinastía Heredia",
    role: "Filles du Fondateur",
    description: "L'âme féminine de la Venta El Gallo. Les filles de Juan Heredia représentent la continuité historique et l'engagement indéfectible envers l'art pur que leur père a initié."
  },
  {
    name: "Antonio Heredia « El Chonico »",
    role: "Maître Guitariste",
    description: "Une référence absolue du toucher grenadin. Sa guitare est le battement de cœur indompté de la grotte, alliant une technique raffinée à l'écho ancestral du quartier de Sacromonte."
  },
  {
    name: "Miguel Ángel Cortés",
    role: "Guitariste de Concert",
    description: "Virtuosité et sensibilité reconnues internationalement. Récompensé par le Bordón Minero, il est l'un des guitaristes les plus influents de sa génération sur la scène flamenca."
  },
  {
    name: "Paco Fernández",
    role: "Danseur",
    description: "Force et charisme sur le tablao. Sur les traces des grands maîtres, Paco imprime une énergie viscérale qui fait vibrer les fondations de la Zambra à chaque représentation."
  },
  {
    name: "Coral Fernández",
    role: "Danseuse",
    description: "Élégance et technique raffinée. Formée dans les meilleures écoles de flamencologie, sa danse est une ode à l'esthétique grenadine, pleine de tempérament et d'une précision absolue."
  },
  {
    name: "Raimundo Benítez",
    role: "Danseur et Chorégraphe",
    description: "Maître du mouvement. Son parcours dans des compagnies internationales lui permet d'apporter une profondeur interprétative qui élève la danse vers de nouveaux sommets d'expression."
  },
  {
    name: "Antonio Heredia",
    role: "Chanteur",
    description: "Antonio Heredia est un chanteur grenadin aux profondes racines flamencas, né dans une famille d'artistes où le chant a toujours été un mode de vie. Dès son plus jeune âge, il a fait preuve d'un talent inné, s'imprégnant des chants traditionnels et développant une voix puissante et expressive. À 19 ans, il commence sa carrière professionnelle dans les tablaos de Grenade, se distinguant par sa polyvalence et sa capacité à émouvoir le public.\n\nIl a travaillé avec de grandes figures du flamenco, telles que Los Farruco et Belén López, et a participé à des festivals en Espagne et à l'international. En 2021, il a sorti l'album Hasta La Eternidad, disponible sur les plateformes numériques, et a participé à des spectacles aux côtés d'artistes tels que Sergio Gómez \"El Colorao\" et Alicia Morales. Son chant, plein de sentiments et d'authenticité, fusionne la tradition avec un style personnel qui l'a consolidé comme l'une des voix les plus respectées du flamenco actuel."
  }
];


const textsES = {
  hero: {
    tag: 'Pasión y Destreza',
    title_1: 'Elenco ',
    title_2: 'Artístico',
    desc: 'Conoce a los maestros que dan vida a la Zambra Gitana cada noche. Un linaje de arte puro forjado en las entrañas del Sacromonte.',
  },
  cta: {
    tag: 'Reserva Exclusiva',
    title_1: 'Siente la ',
    title_2: 'Zambra',
    title_3: ' en tu Piel.',
    desc_1: 'Las plazas para nuestra zambra son ',
    desc_2: 'estrictamente limitadas',
    desc_3: '. No pierdas la oportunidad de vivir el verdadero arte flamendo desde la primera fila.',
    button: 'Reservar'
  },
  footer: '"El flamenco en la Venta El Gallo no se ensaya, se hereda."',
  artists: artistsDataES
};

const textsEN = {
  hero: {
    tag: 'Passion and Skill',
    title_1: 'Artistic ',
    title_2: 'Cast',
    desc: 'Meet the masters who bring the Gypsy Zambra to life every night. A lineage of pure art forged in the depths of Sacromonte.',
  },
  cta: {
    tag: 'Exclusive Booking',
    title_1: 'Feel the ',
    title_2: 'Zambra',
    title_3: ' on your Skin.',
    desc_1: 'Spots for our zambra are ',
    desc_2: 'strictly limited',
    desc_3: '. Don\'t miss the opportunity to experience true flamenco art from the front row.',
    button: 'Book Now'
  },
  footer: '"Flamenco at Venta El Gallo is not rehearsed, it is inherited."',
  artists: artistsDataEN
};

const textsFR = {
  hero: {
    tag: 'Passion et Habileté',
    title_1: 'Distribution ',
    title_2: 'Artistique',
    desc: 'Rencontrez les maîtres qui donnent vie à la Zambra gitane chaque nuit. Une lignée d\'art pur forgée dans les profondeurs du Sacromonte.',
  },
  cta: {
    tag: 'Réservation Exclusive',
    title_1: 'Sentez la ',
    title_2: 'Zambra',
    title_3: ' sur votre Peau.',
    desc_1: 'Les places pour notre zambra sont ',
    desc_2: 'strictement limitées',
    desc_3: '. Ne manquez pas l\'occasion de vivre le véritable art flamenco depuis le premier rang.',
    button: 'Réserver'
  },
  footer: '"Le flamenco à la Venta El Gallo ne s\'apprend pas, il s\'hérite."',
  artists: artistsDataFR
};

const langs = [
  { path: 'src/i18n/locales/es.json', data: textsES },
  { path: 'src/i18n/locales/en.json', data: textsEN },
  { path: 'src/i18n/locales/fr.json', data: textsFR }
];

langs.forEach(({ path, data }) => {
  const content = JSON.parse(fs.readFileSync(path, 'utf8'));
  content.artists_page = data;
  fs.writeFileSync(path, JSON.stringify(content, null, 2));
});
console.log('JSON files updated.');
