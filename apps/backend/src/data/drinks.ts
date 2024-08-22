import { IDrink, DrinkCategory, Drinkflavor } from "@td/types";
import { getDate } from "src/util/date";
import { brands } from "./brands";
import { avails } from "./visibility";

export const categories: {
  refri: DrinkCategory;
  suco: DrinkCategory;
  outro: DrinkCategory;
} = {
  refri: {
    id: "d15sa5d1",
    fullName: "Refrigerantes 🥤",
    createdAt: new Date(),
  },
  suco: { id: "sad626as", fullName: "Sucos 🧃", createdAt: new Date() },
  outro: { id: "62sda2as", fullName: "Outros ☕", createdAt: new Date() },
};

export const drinks: {
  pepsi1: IDrink;
  antar1: IDrink;
  pepsi2: IDrink;
  antar2: IDrink;
  monster: IDrink;
  suco15: IDrink;
  sucoNatural: IDrink;
  pitchula: IDrink;
  sukita: IDrink;
  soda: IDrink;
  devassa: IDrink;
  itaipava: IDrink;
  agua: IDrink;
  aguaGas: IDrink;
} = {
  pepsi1: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    id: "sad6as262dsa",
    fullName: "Pepsi 1L",
    imageUrl:
      "https://i.ibb.co/9VtV0CK/Refrigerante-Pepsi-Cola-1-Litro-Garrafa.png",
    avails: avails.todos,
    sizeInMl: 1000,
    originalValue: 6,
    brand: brands.peps,
    sold: 350,
    stock: 10,
  },
  antar1: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Antárctica 1L",
    imageUrl: "https://i.ibb.co/djLfgFD/3323-1.jpg",
    id: "q6d9f5as5d95sa95dsa",
    sizeInMl: 1000,
    avails: avails.todos,
    originalValue: 6,
    brand: brands.anta,
    sold: 350,
    stock: 15,
  },
  pepsi2: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    id: "sad6as262dsa",
    fullName: "Pepsi 2L",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8g2EK_2v-1RAdp_T1I-OPPL5CfJTeJgihUQ&s",
    avails: avails.todos,
    sizeInMl: 2000,
    originalValue: 12,
    brand: brands.peps,
    sold: 15,
    stock: 3,
  },
  antar2: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Antárctica 2L",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDUP1JgInVJUXcSB1xO4zo2gIyZNUBa4NnUQ&s",
    id: "q6d9f5as5d95sa95dsa",
    sizeInMl: 2000,
    avails: avails.todos,
    originalValue: 12,
    brand: brands.anta,
    sold: 10,
    stock: 5,
  },
  suco15: {
    category: categories.suco,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Yulo 1.5L",
    imageUrl: "https://i.ibb.co/VLLqmP7/yulo-laranja.png",
    flavors: [
      {
        createdAt: new Date(),
        id: "sdasds1a5",
        fullName: "Laranja",
        avails: avails.todos,
        stock: 5,
      },
      {
        createdAt: new Date(),
        id: "sad6sa2dsa",
        fullName: "Uva",
        avails: avails.todos,
        stock: 5,
      },
    ],
    id: "dag22sadg2sda219ds",
    sizeInMl: 1500,
    originalValue: 8,
    avails: avails.todos,
    brand: brands.yulo,
    sold: 100,
    stock: 3,
  },
  sucoNatural: {
    category: categories.suco,
    createdAt: new Date(),
    forPrepare: true,
    fullName: "Suco Natural 1L",
    imageUrl:
      "https://www.padariapampulha.com.br/wp-content/uploads/2023/12/95587.png",
    flavors: [
      {
        createdAt: new Date(),
        id: "sdasds1a5",
        fullName: "Laranja",
        avails: avails.todos,
        stock: 5,
      },
      {
        createdAt: new Date(),
        id: "6as6dsa65",
        fullName: "Uva",
        avails: avails.todos,
        stock: 5,
      },
      {
        createdAt: new Date(),
        id: "sadsa62d6s6as2",
        fullName: "Acerola",
        avails: avails.todos,
        stock: 5,
      },
    ],
    id: "6296ds59ads5g59ds5g",
    sizeInMl: 1000,
    originalValue: 10,
    avails: avails.todos,
    sold: 80,
    stock: 6,
  },
  pitchula: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: true,
    fullName: "Pitchulinha",
    imageUrl:
      "https://acdn.mitiendanube.com/stores/001/167/768/products/refrigerante-guarana-fanta-pet-200ml1-12c5b5716d9a591b2415946680328529-1024-1024.jpg",
    flavors: [
      {
        createdAt: new Date(),
        id: "sdasds1a5",
        fullName: "Cola",
        avails: avails.todos,
        stock: 5,
      },
      {
        createdAt: new Date(),
        id: "6as6dsa65",
        fullName: "Guaraná",
        avails: avails.todos,
        stock: 5,
      },
      {
        createdAt: new Date(),
        id: "sadsa62d6s6as2",
        fullName: "Laranja",
        avails: avails.todos,
        stock: 5,
      },
    ],
    id: "sagasgdshdfshdfh",
    sizeInMl: 200,
    originalValue: 2,
    avails: avails.todos,
    sold: 400,
    stock: 35,
  },
  sukita: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Sukita 1L",
    imageUrl: "https://deskontao.agilecdn.com.br/9690_1.jpg",
    id: "asfadgsdagsdgsdag",
    sizeInMl: 1000,
    originalValue: 7,
    avails: avails.todos,
    sold: 200,
    stock: 3,
  },
  soda: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Soda Limonada 1L",
    imageUrl:
      "https://redemix.vteximg.com.br/arquivos/ids/208791-1000-1000/7891991002578.jpg?v=638350601625700000",
    id: "asas262as2f",
    sizeInMl: 1000,
    originalValue: 7,
    avails: avails.todos,
    sold: 80,
    stock: 1,
  },
  monster: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Energético Monster 473ml",
    displayName: "Monster 473ml",
    imageUrl:
      "https://drogariasp.vteximg.com.br/arquivos/ids/435164-1000-1000/641693---energetico-monster-energy-473ml-spal.jpg?v=637496168469870000",
    id: "safasdfgsd",
    sizeInMl: 1000,
    originalValue: 7,
    avails: avails.todos,
    sold: 80,
    stock: 1,
  },
  devassa: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Cerveja Devassa 350ml",
    displayName: "Devassa 350ml",
    shortName: "Devassa Lata",
    imageUrl:
      "https://mercantilatacado.vtexassets.com/arquivos/ids/168457-800-auto?v=638338381577200000&width=800&height=auto&aspect=true",
    id: "aas5das95das59d",
    sizeInMl: 350,
    originalValue: 7,
    avails: avails.todos,
    sold: 80,
    stock: 1,
  },
  itaipava: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Cerveja Itaipava 350ml",
    displayName: "Itaipava 350ml",
    shortName: "Itaipava Lata",
    imageUrl:
      "https://www.imigrantesbebidas.com.br/bebida/images/products/full/183-cerveja-itaipava-pilsen-lata-350ml.jpg",
    id: "sa6d6as292sa2",
    sizeInMl: 350,
    originalValue: 7,
    avails: avails.todos,
    sold: 80,
    stock: 1,
  },
  aguaGas: {
    category: categories.outro,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Água Com Gás 500ml",
    displayName: "Água c/Gás 500ml",
    imageUrl:
      "https://d3gdr9n5lqb5z7.cloudfront.net/fotos/983651-17-02-2023-17-00-15-288.jpg",
    id: "62sda62d2as6a",
    sizeInMl: 500,
    originalValue: 3,
    avails: avails.todos,
    sold: 120,
    stock: 10,
  },
  agua: {
    category: categories.outro,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Água Mineral 500ml",
    displayName: "Água 500ml",
    imageUrl:
      "https://tb0932.vtexassets.com/arquivos/ids/162415-800-auto?v=637705334878500000&width=800&height=auto&aspect=true",
    id: "6sa2d26as2d62sa",
    sizeInMl: 500,
    originalValue: 2,
    avails: avails.todos,
    sold: 100,
    stock: 3,
  },
};
