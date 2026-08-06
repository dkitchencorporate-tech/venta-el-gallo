// Centralized Data Source for Menu and Carta
// This simulates what will eventually come from Firebase.

export const menuCentralizado = {
  menuData: {
    entrantes: [
      { id: 'm_ent_1', title: 'Tabla de embutido', desc: 'Queso, jamón, chorizo, etc' }
    ],
    primerPlato: [
      { id: 'm_pri_1', title: 'Tortilla sacromonte', desc: 'Con sesos de cordero' },
      { id: 'm_pri_2', title: 'Ensalada Gallo', desc: 'Ensalada mixta con huevo' },
      { id: 'm_pri_3', title: 'Habas con jamón y huevo', desc: '' }
    ],
    invierno: [
      { id: 'm_inv_1', title: 'Sopa de cebolla y queso', desc: 'Con pan tostado' },
      { id: 'm_inv_2', title: 'Sopa de marisco', desc: 'Con pan tostado' },
      { id: 'm_inv_3', title: 'Sopa de picadillo', desc: 'Con pollo, jamón y huevo' }
    ],
    verano: [
      { id: 'm_ver_1', title: 'Salmorejo', desc: 'Sopa de tomate con pan, jamón y huevo' },
      { id: 'm_ver_2', title: 'Gazpacho', desc: 'Sopa de tomate y pepino' },
      { id: 'm_ver_3', title: 'Melón con jamón', desc: '' },
      { id: 'm_ver_4', title: 'Ajoblanco', desc: '' }
    ],
    principal: [
      { id: 'm_mai_1', title: 'Bacalao frito con tomate', desc: '' },
      { id: 'm_mai_2', title: 'Merluza en salsa verde', desc: 'Con patatas a lo pobre' },
      { id: 'm_mai_3', title: 'Lomo de cerdo en salsa mozárabe', desc: 'Con patatas a lo pobre' },
      { id: 'm_mai_4', title: 'Ternera en salsa jardinera', desc: 'Con patatas a lo pobre' },
      { id: 'm_mai_5', title: 'Pollo al ajillo', desc: 'Con patatas a lo pobre' }
    ],
    postres: [
      { id: 'm_pos_1', title: 'Natillas de vainilla', desc: '' },
      { id: 'm_pos_2', title: 'Tarta de chocolate', desc: '' },
      { id: 'm_pos_3', title: 'Arroz con leche', desc: '' },
      { id: 'm_pos_4', title: 'Helado', desc: '' },
      { id: 'm_pos_5', title: 'Tarta de queso', desc: '' }
    ]
  },
  cartaData: {
    entrantes: [
      { id: 'c_ent_1', title: 'Ensalada Gallo', desc: 'Ensalada mixta con huevo', price: '14€' },
      { id: 'c_ent_2', title: 'Ensalada de pimientos', desc: 'Con huevo', price: '11€' },
      { id: 'c_ent_3', title: 'Ensalada de gambas y aguacate', desc: '', price: '16.5€' },
      { id: 'c_ent_4', title: 'Tomate aliñao', desc: '', price: '10€' },
      { id: 'c_ent_5', title: 'Tabla de jamón ibérico', desc: '', price: '20€' },
      { id: 'c_ent_6', title: 'Tabla de queso curado', desc: '', price: '20€' },
      { id: 'c_ent_7', title: 'Tabla de ibéricos', desc: '', price: '20€' },
      { id: 'c_ent_8', title: 'Tortilla de Sacromonte', desc: '', price: '12€' },
      { id: 'c_ent_9', title: 'Tortilla de espárragos', desc: '', price: '11€' },
      { id: 'c_ent_10', title: 'Berenjenas con miel de caña', desc: '', price: '10€' },
      { id: 'c_ent_11', title: 'Wok de verduras', desc: '', price: '14€' },
      { id: 'c_ent_12', title: 'Gambas al ajillo', desc: '', price: '16€' },
      { id: 'c_ent_13', title: 'Croquetas de pollo', desc: '', price: '14€' },
      { id: 'c_ent_14', title: 'Surtido de croquetas de ibéricos', desc: '', price: '14€' },
      { id: 'c_ent_15', title: 'Habas con jamón y huevo', desc: '', price: '14€' }
    ],
    invierno: [
      { id: 'c_inv_1', title: 'Sopa de cebolla', desc: 'Con pan tostado y queso', price: '8€' },
      { id: 'c_inv_2', title: 'Sopa de marisco', desc: 'Con pan tostado', price: '8€' },
      { id: 'c_inv_3', title: 'Sopa de picadillo', desc: 'Con pollo, jamón y huevo', price: '8€' }
    ],
    verano: [
      { id: 'c_ver_1', title: 'Salmorejo', desc: 'Sopa de tomate con pan, jamón y huevo', price: '9€' },
      { id: 'c_ver_2', title: 'Gazpacho', desc: 'Sopa de tomate y pepino', price: '9€' },
      { id: 'c_ver_3', title: 'Melón con jamón', desc: '', price: '9€' }
    ],
    pescados: [
      { id: 'c_pes_1', title: 'Bacalao frito con tomate', desc: '', price: '17€' },
      { id: 'c_pes_2', title: 'Merluza en salsa verde', desc: 'Con patatas a lo pobre', price: '16.5€' },
      { id: 'c_pes_3', title: 'Dorada a la plancha', desc: 'Con patatas a lo pobre', price: '18€' }
    ],
    carnes: [
      { id: 'c_car_1', title: 'Solomillo de cerdo', desc: 'Con patatas a lo pobre', price: '18€' },
      { id: 'c_car_2', title: 'Lomo de cerdo en salsa mozárabe', desc: 'Con patatas a lo pobre', price: '16.5€' },
      { id: 'c_car_3', title: 'Ternera en salsa jardinera', desc: 'Con patatas a lo pobre', price: '17€' },
      { id: 'c_car_4', title: 'Pollo al ajillo', desc: 'Con patatas a lo pobre', price: '15€' },
      { id: 'c_car_5', title: 'Entrecot de ternera', desc: 'Con patatas a lo pobre', price: '24€' },
      { id: 'c_car_6', title: 'Chuletillas de cordero', desc: 'Con patatas a lo pobre', price: '19€' }
    ],
    postres: [
      { id: 'c_pos_1', title: 'Natillas de vainilla', desc: '', price: '3.5€' },
      { id: 'c_pos_2', title: 'Tarta de chocolate', desc: '', price: '5€' },
      { id: 'c_pos_3', title: 'Arroz con leche', desc: '', price: '3.5€' },
      { id: 'c_pos_4', title: 'Helado', desc: '', price: '3.5€' },
      { id: 'c_pos_5', title: 'Tarta de queso', desc: '', price: '5€' }
    ],
    bebidas1: [
      { id: 'c_be1_1', title: 'Sangría', desc: '', price: '3.5€' },
      { id: 'c_be1_2', title: 'Jarra de sangría', desc: '', price: '16€' },
      { id: 'c_be1_3', title: 'Cerveza barril', desc: '', price: '3€' },
      { id: 'c_be1_4', title: 'Jarra de cerveza', desc: '', price: '15€' },
      { id: 'c_be1_5', title: 'Agua pequeña', desc: 'Con o sin gas', price: '1.5€' },
      { id: 'c_be1_6', title: 'Botella de agua grande', desc: '(750ml)', price: '3€' },
      { id: 'c_be1_7', title: 'Refrescos o zumos', desc: '', price: '3€' }
    ],
    bebidas2: [
      { id: 'c_be2_1', title: 'Botella de vino tinto o blanco de la casa', desc: '', price: '18€' },
      { id: 'c_be2_2', title: 'Vino blanco, tinto o rosado', desc: '', price: '3.5€' },
      { id: 'c_be2_3', title: 'Botella de vino tinto Rioja', desc: '', price: '22€' },
      { id: 'c_be2_4', title: 'Botella de vino tinto Protos', desc: '', price: '22€' }
    ]
  }
};
