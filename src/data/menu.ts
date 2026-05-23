export type Badge = 'sin-tacc' | 'vegano' | 'keto' | 'sin-azucar'

export interface MenuItem {
  name: string
  description?: string
  price: number
  badges?: Badge[]
  note?: string
}

export interface MenuCategory {
  id: string
  title: string
  subtitle?: string
  includesNote?: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'desayunos',
    title: 'Desayunos y Meriendas',
    subtitle: 'Todos incluyen café, té, jugo de naranja o limonada',
    items: [
      {
        name: 'Desayuno Merienda Light',
        description: 'Tostadas en pan de masa madre (o sin gluten) con queso y mermelada o manteca y dulce de leche.',
        price: 10000,
      },
      {
        name: 'Tostado Clásico',
        description: 'Con jamón cocido y queso en pan de molde.',
        price: 14500,
      },
      {
        name: 'Pancakes de Avena',
        description: 'Con fruta de estación, pasta de maní, granola y miel.',
        price: 13500,
      },
      {
        name: 'Huevos Revueltos',
        description: 'Con pan de masa madre.',
        price: 13000,
        note: 'Podés agregar palta, hongos salteados o panceta crocante. +$2.000',
      },
      {
        name: 'Tostada Francesa',
        description: 'Con frosting de queso crema, fruta de estación, miel y coulis de frutos rojos.',
        price: 14500,
      },
      {
        name: 'Yogurt Griego',
        description: 'Con granola artesanal, miel y frutas de estación.',
        price: 14500,
      },
      {
        name: 'Avocado Toast',
        description: 'Con palta rústica y en gajitos, huevo poché y mix de semillas.',
        price: 15000,
      },
    ],
  },
  {
    id: 'brunch',
    title: 'El Brunch',
    subtitle: 'No incluye infusión',
    items: [
      {
        name: 'Bowl Keto',
        description: 'Cazuela de huevos revueltos, cherrys asados, panceta crocante, palta y queso ahumado. Sale con tostada de masa madre o keto. La estrella de la casa.',
        price: 15000,
        badges: ['keto'],
      },
      {
        name: 'Omelette de Hongos y Espinaca',
        description: 'Omelette de huevos relleno con espinacas salteadas, hongos y queso ahumado.',
        price: 12000,
      },
      {
        name: 'Montaditos Keto',
        description: 'Dos tostadas en pan keto con hummus de remolacha, palta, mix de semillas y huevo poché.',
        price: 11000,
        badges: ['keto'],
      },
      {
        name: 'Tostón de Salmón Ahumado',
        description: 'Con requesón y alcaparras.',
        price: 15500,
      },
      {
        name: 'Bowl de Frutas',
        description: 'Frutas de estación en gajos.',
        price: 12000,
      },
    ],
  },
  {
    id: 'cafeteria',
    title: 'Cafetería',
    items: [
      { name: 'Espresso', price: 4000 },
      { name: 'Americano', price: 4400 },
      { name: 'Café Hindú', description: 'Cúrcuma y otras especias.', price: 4800 },
      { name: 'Cortado Suave', price: 4000 },
      { name: 'Cortado Cargado', price: 4300 },
      { name: 'Macchiatto Doble', price: 4100 },
      { name: 'Latte Macchiatto', price: 4000 },
      { name: 'Cappuccino', price: 4400 },
      { name: 'Flat White', price: 4600 },
      { name: 'Latte', price: 4800 },
      { name: 'Latte con Doble Shot de Café', price: 5000 },
      { name: 'Mocca', price: 5000 },
      { name: 'Nutelatte', price: 5700 },
      { name: 'Golden Milk', price: 5700 },
    ],
  },
  {
    id: 'cafe-frio',
    title: 'Café Frío',
    items: [
      { name: 'Iced Americano', price: 4600 },
      { name: 'Iced Flat', price: 4800 },
      { name: 'Iced Latte', price: 4900 },
      { name: 'Iced Mocca', price: 5200 },
      { name: 'Frappé', price: 5700 },
      { name: 'Affogatto', price: 5900 },
      { name: 'Cold Brew', price: 5200 },
    ],
  },
  {
    id: 'pasteleria',
    title: 'Pastelería',
    items: [
      { name: 'Budín Limón y Amapolas', price: 4200 },
      { name: 'Budín Zanahoria con Glaseado de Queso Crema', price: 4200 },
      {
        name: 'Budín Vegano de Chocolate Amargo',
        price: 4600,
        badges: ['vegano'],
      },
      {
        name: 'Budín Vegano de Naranja y Frambuesa',
        description: 'Sin TACC y sin azúcar.',
        price: 4600,
        badges: ['vegano', 'sin-tacc', 'sin-azucar'],
      },
      { name: 'Budín del Día', price: 4400 },
      { name: 'Alfajor de Nuez y Dulce de Leche', price: 4400 },
      { name: 'Alfajor Brownie', price: 4600 },
      { name: 'Alfajor Coco y Dulce de Leche', price: 4400 },
      {
        name: 'Pepas',
        description: 'Vegana de chocolate y pasta de maní, o limón y choco blanco, o frutos rojos.',
        price: 1600,
        badges: ['vegano'],
      },
      { name: 'Cookies Americanas', price: 4600 },
      { name: 'Biscottis de Almendras y Castañas de Cajú', price: 2400 },
      {
        name: 'Brownie Keto',
        description: 'Choco 70% cacao.',
        price: 4600,
        badges: ['keto'],
      },
      {
        name: 'Torta Benito',
        description: 'Finas capas de nuez intercaladas con dulce de leche y nueces.',
        price: 5500,
      },
    ],
  },
  {
    id: 'panaderia',
    title: 'Panadería',
    items: [
      { name: 'Medialuna Dulce', price: 2500 },
      { name: 'Medialuna Salada', price: 2500 },
      { name: 'Croissant', price: 4400 },
      { name: 'Croissant Jamón y Queso', price: 9200 },
      { name: 'Croissant con Nutella y Banana', price: 9200 },
      {
        name: 'Croissant de Verano',
        description: 'Con frosting de queso crema, fruta de estación y crocante de nueces caramelizadas.',
        price: 9200,
      },
    ],
  },
  {
    id: 'lunch',
    title: 'El Lunch',
    subtitle: 'Disponibles de 12:00 a 16:00hs',
    includesNote: 'Incluye bebida y café',
    items: [
      {
        name: 'Tarta de Jamón y Queso',
        description: 'Con ensaladita verde y tomates cherrys.',
        price: 15000,
      },
      {
        name: 'Tarta de Verduras',
        description: 'Con ensaladita verde y tomates cherrys.',
        price: 15000,
      },
      {
        name: 'Ensalada Verde Toscana',
        description: 'Brócolis, panceta crocante, escamas de sardo, nueces pecan, láminas de zanahoria y huevo poché.',
        price: 17000,
      },
      {
        name: 'Salteado de Lomo y Vegetales',
        description: 'Acompañado de tortillas de maíz morado.',
        price: 17000,
      },
      {
        name: 'Milanesa Tana',
        description: 'Milanesa de pollo con salsa de tomate y queso, acompañada de ensalada coleslaw y gajos de papas.',
        price: 17000,
      },
    ],
  },
  {
    id: 'sandwiches',
    title: 'Nuestros Sandwiches',
    subtitle: 'No incluyen infusión',
    items: [
      {
        name: 'Chipá',
        description: 'Con jamón y queso, o tomate, queso y albahaca.',
        price: 11000,
      },
      {
        name: 'Tostado de Ternera',
        description: 'Con lechuga, queso y tomate.',
        price: 13500,
      },
      {
        name: 'Croque Benito',
        description: 'Con jamón, huevo, salsa bechamel y queso sardo gratinado.',
        price: 13000,
      },
      {
        name: 'Baguette Veggie',
        description: 'Con requesón, espinaca salteada, zucchinis y cherrys asados.',
        price: 12000,
      },
      {
        name: 'Baguette César',
        description: 'Hojas verdes, pollo y sardo rallado.',
        price: 13500,
      },
      {
        name: 'Croiss Roll Ahumado',
        description: 'Con lomito ahumado, requesón, queso sardo, tomate y rúcula.',
        price: 14500,
      },
    ],
  },
  {
    id: 'bebidas',
    title: 'Té, Jugos y Otras Bebidas',
    items: [
      { name: 'Té en Hebras', description: 'Negro, rojo o verde.', price: 4600 },
      { name: 'Té Frío', price: 4600 },
      { name: 'Shaked Tea', price: 4800 },
      { name: 'Chai Latte', price: 4800 },
      {
        name: 'Ginger Latte',
        description: 'Leche texturizada, almíbar de jengibre y canela.',
        price: 4800,
      },
      { name: 'Exprimido de Naranja', price: 4800 },
      { name: 'Limonada de Menta y Jengibre', price: 4800 },
      { name: 'Limonada con Espirulina', price: 5200 },
      {
        name: 'Jugo Natural Rojo',
        description: 'Antioxidante y energético: remolacha, manzana roja, frutos rojos, naranja y miel.',
        price: 5800,
      },
      {
        name: 'Jugo Natural Dorado',
        description: 'Vit. C + Refuerzo inmunológico: zanahoria, mango, naranja, jengibre y miel.',
        price: 5800,
      },
      {
        name: 'Jugo Natural Verde',
        description: 'Detox refrescante: espinaca, manzana verde, lima, menta, limón y miel.',
        price: 5800,
      },
      { name: 'Licuado de Banana con Leche y Miel', price: 5500 },
      { name: 'Chocolatada', price: 4600 },
    ],
  },
  {
    id: 'sin-gluten',
    title: 'Sin Gluten',
    items: [
      { name: 'Alfajor de Maicena', price: 4200, badges: ['sin-tacc'] },
      { name: 'Alfajor de Almendra y Dulce de Leche', price: 4600, badges: ['sin-tacc'] },
      { name: 'Galleta Pepito', price: 3800, badges: ['sin-tacc'] },
      { name: 'Galleta Pasta de Maní y Choco', price: 3800, badges: ['sin-tacc'] },
    ],
  },
]
