export const restaurant = {
  name: "Ahma",
  wordmark: "AHMA",
  subtitle: "CHINESE TAKE OUT",
  tagline: "FRESH · FAST · MADE WITH LOVE",
  introduction: "Chinese favorites, cooked fresh and made with heart.",
  farewell: "Good food. Warm hearts.",
  allergyNote: "Please let our team know about any food allergies.",
  currency: "PHP",
  locale: "en-PH",
  tableCount: 10,
} as const;

export const categories = [
  { id: "mains", name: "Mains" },
  { id: "sides", name: "Sides" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export interface Dish {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  image: string;
  imagePosition?: string;
  label: string;
  description: string;
  portion: string;
  available: boolean;
}

export const dishes: readonly Dish[] = [
  {
    id: "chow-mein",
    name: "Chow Mein",
    category: "mains",
    price: 145,
    image: "/menu/chow-mein.jpg",
    label: "Wok favorite",
    description:
      "Springy egg noodles, crisp cabbage, carrots, and spring onions tossed in a savory soy sauce over a hot wok.",
    portion: "One serving",
    available: true,
  },
  {
    id: "sweet-sour-chicken",
    name: "Sweet & Sour Chicken",
    category: "mains",
    price: 185,
    image: "/menu/sweet-sour-chicken.jpg",
    imagePosition: "center 78%",
    label: "House favorite",
    description:
      "Crispy chicken with pineapple, bell peppers, and onions, coated in our bright, tangy sweet and sour sauce. Rice sold separately.",
    portion: "One serving",
    available: true,
  },
  {
    id: "kung-pao-chicken",
    name: "Kung Pao Chicken",
    category: "mains",
    price: 195,
    image: "/menu/kung-pao-chicken.jpg",
    label: "A little heat",
    description:
      "Wok-seared chicken with roasted peanuts, dried chilies, and bell peppers in a savory, lightly sweet sauce. Rice sold separately.",
    portion: "One serving · Spicy",
    available: true,
  },
  {
    id: "yang-chow-rice",
    name: "Yang Chow Fried Rice",
    category: "sides",
    price: 125,
    image: "/menu/fried-rice.jpg",
    label: "Comfort in a bowl",
    description:
      "Golden wok-fried rice with egg, shrimp, pork, peas, and spring onions. A little of everything in every spoonful.",
    portion: "One bowl",
    available: true,
  },
  {
    id: "spring-rolls",
    name: "Vegetable Spring Rolls",
    category: "sides",
    price: 95,
    image: "/menu/spring-rolls.jpg",
    label: "Golden & crispy",
    description:
      "Crisp rolls filled with shredded cabbage, carrots, and mushrooms. Served with a sweet chili dipping sauce.",
    portion: "Four pieces",
    available: true,
  },
  {
    id: "pork-siomai",
    name: "Pork Siomai",
    category: "sides",
    price: 85,
    image: "/menu/pork-siomai.jpg",
    label: "Steamed to order",
    description:
      "Tender steamed dumplings filled with seasoned pork and shrimp. Served with soy sauce, calamansi, and chili garlic on the side.",
    portion: "Four pieces",
    available: false,
  },
  {
    id: "sesame-balls",
    name: "Sesame Balls",
    category: "desserts",
    price: 75,
    image: "/menu/sesame-balls.jpg",
    imagePosition: "center top",
    label: "Sweet little bites",
    description:
      "Golden sesame-coated glutinous rice balls with a soft, chewy center and sweet red bean filling.",
    portion: "Three pieces",
    available: true,
  },
  {
    id: "mango-pudding",
    name: "Mango Pudding",
    category: "desserts",
    price: 85,
    image: "/menu/mango-pudding.jpg",
    label: "Cool & creamy",
    description:
      "Silky mango pudding served chilled with a splash of evaporated milk. A light, fruity finish to your meal.",
    portion: "One cup",
    available: false,
  },
  {
    id: "leche-flan",
    name: "Leche Flan",
    category: "desserts",
    price: 80,
    image: "/menu/leche-flan.webp",
    label: "A local favorite",
    description:
      "Rich, smooth egg custard topped with amber caramel sauce. Made for slow spoonfuls and a sweet finish.",
    portion: "One slice",
    available: true,
  },
  {
    id: "calamansi-cooler",
    name: "Calamansi Cooler",
    category: "drinks",
    price: 65,
    image: "/menu/calamansi-juice.webp",
    label: "Fresh & refreshing",
    description:
      "Fresh calamansi juice, lightly sweetened and poured over ice. The perfect partner to a warm meal.",
    portion: "350 ml",
    available: true,
  },
  {
    id: "iced-tea",
    name: "Iced Tea",
    category: "drinks",
    price: 55,
    image: "/menu/iced-tea.jpg",
    imagePosition: "70% center",
    label: "Cool & refreshing",
    description:
      "Freshly brewed black tea, lightly sweetened and served over ice with a slice of lemon.",
    portion: "350 ml",
    available: true,
  },
  {
    id: "bottled-water",
    name: "Bottled Water",
    category: "drinks",
    price: 30,
    image: "/menu/bottled-water.jpg",
    label: "Keep it simple",
    description: "Chilled bottled drinking water to enjoy with your meal.",
    portion: "500 ml",
    available: true,
  },
];

interface PhotoCredit {
  author: string;
  source: string;
  license: string;
  licenseUrl: string;
}

export const photoCredits: Record<string, PhotoCredit> = {
  "iced-tea": {
    author: "Vin Jack",
    source:
      "https://unsplash.com/photos/glass-of-iced-tea-on-table-8fS1ByfREpw",
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
  },
  "kung-pao-chicken": {
    author: "Wheeler Cowperthwaite",
    source: "https://commons.wikimedia.org/wiki/File:Kung_Pao_Chicken_2.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  "spring-rolls": {
    author: "Budi Puspa Wijaya",
    source:
      "https://unsplash.com/photos/a-plate-of-food-on-a-wooden-table-snEe9nRTqyY",
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
  },
  "pork-siomai": {
    author: "Sumit Surai",
    source: "https://commons.wikimedia.org/wiki/File:Pork_Siu_Mai.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "sesame-balls": {
    author: "MOs810",
    source:
      "https://commons.wikimedia.org/wiki/File:Jian_dui_in_London_(Chinatown).jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "mango-pudding": {
    author: "Terence Ong; color adjustment by Hohum",
    source: "https://commons.wikimedia.org/wiki/File:Mango_pudding.JPG",
    license: "CC BY 2.5",
    licenseUrl: "https://creativecommons.org/licenses/by/2.5/",
  },
  "bottled-water": {
    author: "Shajith Ali",
    source:
      "https://unsplash.com/photos/a-pile-of-bottled-water-bottles-sitting-next-to-each-other-KZFMbBUCTVU",
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
  },
};
