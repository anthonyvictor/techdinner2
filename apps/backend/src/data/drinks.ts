import { IDrink, IDrinkCategory, IDrinkFlavor } from "@td/types";
import { getDate } from "src/util/date";
import { brands } from "./brands";
import { avails } from "./visibility";

export const categories: {
  refri: IDrinkCategory;
  suco: IDrinkCategory;
  outro: IDrinkCategory;
  alc: IDrinkCategory;
} = {
  refri: {
    id: "d15sa5d1",
    fullName: "Refrigerantes 🥤",
    drinks: [],
    createdAt: new Date(),
    avails: avails.todos,
  },
  suco: {
    id: "sad626as",
    fullName: "Sucos 🧃",
    createdAt: new Date(),
    drinks: [],
    avails: avails.todos,
  },
  alc: {
    id: "6s2ad62d",
    fullName: "Alcoólicas 🍺",
    createdAt: new Date(),
    drinks: [],
    avails: avails.todos,
  },
  outro: {
    id: "62sda2as",
    fullName: "Outros ☕",
    createdAt: new Date(),
    drinks: [],
    avails: avails.todos,
  },
};

export const drinks: {
  pepsi1: IDrink;
  antar1: IDrink;
  pepsi2: IDrink;
  antar2: IDrink;
  monster: IDrink;
  suco15: IDrink;
  suco4: IDrink;
  suco2: IDrink;
  sucoNatural: IDrink;
  pitchula: IDrink;
  sukita: IDrink;
  soda: IDrink;
  goob1L: IDrink;
  goob2L: IDrink;
  devassa: IDrink;
  itaipava: IDrink;
  amstel: IDrink;
  imperio: IDrink;
  ice275: IDrink;
  agua: IDrink;
  refriLata: IDrink;
  guaramix: IDrink;
} = {
  pepsi1: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    id: "sd564g65s4d1g15sd1g15d6s",
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
    id: "saf19f8511sad5f15sd1g591sd",
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
    id: "959gdsd98g4sad84g89sd8g1",
    fullName: "Pepsi 2L",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8g2EK_2v-1RAdp_T1I-OPPL5CfJTeJgihUQ&s",
    avails: avails.todos,
    sizeInMl: 2000,
    originalValue: 12,
    brand: brands.peps,
    sold: 15,
    stock: 0,
  },
  antar2: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Antárctica 2L",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDUP1JgInVJUXcSB1xO4zo2gIyZNUBa4NnUQ&s",
    id: "a51sfas1f19a1f519as1f159as18f5",
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
    fullName: "Suco Yulo 1.5L",
    displayName: "Yulão",
    imageUrl: "https://i.ibb.co/VLLqmP7/yulo-laranja.png",
    flavors: [
      {
        createdAt: new Date(),
        id: "asfdsdsfhfdjdgsj",
        fullName: "Laranja",
        avails: avails.todos,
        stock: 5,
        sold: 70,
      },
      {
        createdAt: new Date(),
        id: "sdgasdhfdfhadbadfbadfs",
        fullName: "Uva",
        avails: avails.desativado,
        stock: 5,
        sold: 30,
      },
    ],
    id: "sdg8sd4g84sd81sd11d9s4g41",
    sizeInMl: 1500,
    originalValue: 8,
    avails: avails.todos,
    brand: brands.yulo,
    sold: 100,
    stock: 3,
  },
  suco4: {
    category: categories.suco,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Suco Yulo 400ml",
    displayName: "Yulo Médio",
    imageUrl:
      "https://mercantilatacado.vtexassets.com/arquivos/ids/172795-800-auto?v=638349584949870000&width=800&height=auto&aspect=true",
    flavors: [
      {
        createdAt: new Date(),
        id: "6af62as62f62as62f",
        fullName: "Laranja",
        avails: avails.todos,
        stock: 5,
        sold: 70,
      },
      {
        createdAt: new Date(),
        id: "saasf45as15f1a181fa",
        fullName: "Uva",
        avails: avails.todos,
        stock: 5,
        sold: 30,
      },
    ],
    id: "62a6s6fsa9f9a9a29asc952as9c",
    sizeInMl: 400,
    originalValue: 4,
    avails: avails.todos,
    brand: brands.yulo,
    sold: 100,
    stock: 3,
  },
  suco2: {
    category: categories.suco,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Suco Yulo 200ml",
    displayName: "Yulinho",
    imageUrl:
      "https://gbarbosa.vtexassets.com/arquivos/ids/245543/6564f37e0b7625dcb1cece39.jpg?v=638367115574830000",
    flavors: [
      {
        createdAt: new Date(),
        id: "6af62as62f62as62f",
        fullName: "Laranja",
        avails: avails.todos,
        stock: 5,
        sold: 70,
      },
      {
        createdAt: new Date(),
        id: "s62d6as6d26as2da181fa",
        fullName: "Uva",
        avails: avails.invisivel,
        stock: 5,
        sold: 30,
      },
    ],
    id: "sa2d62asd62sa62d29a29asc952as9c",
    sizeInMl: 200,
    originalValue: 2,
    avails: avails.todos,
    brand: brands.yulo,
    sold: 90,
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
        sold: 70,
      },
      {
        createdAt: new Date(),
        id: "6as6dsa65",
        fullName: "Uva",
        avails: avails.todos,
        stock: 5,
        sold: 0,
      },
      {
        createdAt: new Date(),
        id: "sadsa62d6s6as2",
        fullName: "Acerola",
        avails: avails.todos,
        stock: 5,
        sold: 10,
      },
    ],
    id: "sadassafasfsadgsdgsdg",
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3a2jdP4-eq1t8k1pW8xkEdsvwBLpfKlv984Kr3Ctyrr5_hjaOKahbcBUolmQib2cEaLc&usqp=CAU",
    flavors: [
      {
        createdAt: new Date(),
        id: "fhdfhdhdfhfhfd",
        fullName: "Cola",
        avails: avails.todos,
        imageUrl: "",
        stock: 5,
        sold: 200,
      },
      {
        createdAt: new Date(),
        id: "6as6dhdgdfhdfghsa65",
        fullName: "Guaraná",
        imageUrl: "",
        avails: avails.todos,
        stock: 5,
        sold: 150,
      },
      {
        createdAt: new Date(),
        id: "hdshhdfshdfshsdfhlsdsdijnsdkjn",
        fullName: "Laranja",
        imageUrl: "",
        avails: avails.todos,
        stock: 5,
        sold: 50,
      },
      {
        createdAt: new Date(),
        id: "5as1f5151as5f15as5f1sa",
        fullName: "Pepsi",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQzhLkRF9Z3aciuTIMPncUW9PFStNlnh_0Ow&s",
        avails: avails.todos,
        originalValue: 2.5,
        stock: 5,
        sold: 50,
      },
      {
        createdAt: new Date(),
        id: "s545a4sf1as1f1as651f",
        fullName: "Antárctica",
        imageUrl:
          "https://www.bernardaoemcasa.com.br/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/d/o/download_21__2.jpg",
        avails: avails.todos,
        originalValue: 2.5,
        stock: 5,
        sold: 50,
      },
    ],
    id: "gdsfgdfgdgdhfsdfg",
    sizeInMl: 200,
    originalValue: 2,
    avails: avails.todos,
    sold: 400,
    stock: 15,
  },
  sukita: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Sukita 1L",
    imageUrl: "https://deskontao.agilecdn.com.br/9690_1.jpg",
    id: "51f65g15d6f65g1d56f1g5h",
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
    id: "d65g5sdg65s5d61g651s1",
    sizeInMl: 1000,
    originalValue: 7,
    avails: avails.todos,
    sold: 80,
    stock: 1,
  },
  monster: {
    category: categories.outro,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Energético Monster 473ml",
    displayName: "Monster 473ml",
    imageUrl:
      "https://drogariasp.vteximg.com.br/arquivos/ids/435164-1000-1000/641693---energetico-monster-energy-473ml-spal.jpg?v=637496168469870000",
    id: "5g1951sd9g151sd591ga",
    sizeInMl: 1000,
    originalValue: 7,
    avails: avails.todos,
    sold: 80,
    stock: 1,
  },
  devassa: {
    category: categories.alc,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Cerveja Devassa Puro Malte 350ml",
    displayName: "Devassa 350ml",
    shortName: "Devassa Lata",
    imageUrl:
      "https://mercantilatacado.vtexassets.com/arquivos/ids/168457-800-auto?v=638338381577200000&width=800&height=auto&aspect=true",
    id: "51a6196f1as4f8a4sfh95",
    sizeInMl: 350,
    originalValue: 4,
    avails: avails.todos,
    sold: 80,
    stock: 45,
  },
  itaipava: {
    category: categories.alc,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Cerveja Itaipava 350ml",
    displayName: "Itaipava 350ml",
    shortName: "Itaipava Lata",
    imageUrl:
      "https://mercantilatacado.vtexassets.com/arquivos/ids/168466/65391b486a2a15a1bb6c1b78.jpg?v=638338381577830000",
    id: "8gk5h1k1gh51k51gh1k",
    sizeInMl: 350,
    originalValue: 4,
    avails: avails.todos,
    sold: 80,
    stock: 11,
  },
  amstel: {
    category: categories.alc,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Cerveja Amstel Puro Malte 350ml",
    displayName: "Amstel 350ml",
    shortName: "Amstel Lata",
    imageUrl: "https://static.paodeacucar.com/img/uploads/1/75/25002075.png",
    id: "5sf6as26f26as2f6sa262f",
    sizeInMl: 350,
    originalValue: 5,
    avails: avails.todos,
    sold: 60,
    stock: 10,
  },
  imperio: {
    category: categories.alc,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Cerveja Imperio Puro Malte 350ml",
    displayName: "Imperio 350ml",
    shortName: "Imperio Lata",
    imageUrl:
      "https://img.irroba.com.br/fit-in/600x600/filters:fill(transparent):quality(80)/shoeboxs/catalog/749.20220509152528.png",
    id: "sa651sd65g1s5dg121d51",
    sizeInMl: 350,
    originalValue: 5,
    avails: avails.todos,
    sold: 30,
    stock: 21,
  },
  ice275: {
    category: categories.alc,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Bebida Ice Long Neck",
    displayName: "Bebida Ice",
    imageUrl:
      "https://ibassets.com.br/ib.item.image.medium/m-ab46825e1a874fb6a369fb6bd009300b.jpeg",
    id: "6as2626as26c26asc29asc2",
    sizeInMl: 275,
    originalValue: 5,
    avails: avails.todos,
    sold: 30,
    stock: 21,
  },
  agua: {
    category: categories.outro,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Água Mineral 500ml",
    displayName: "Água 500ml",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtVLqGRGzl5W2apZhQAygeChfKVVHqF5urnQ&s",
    id: "4g1k1g1hk1gh1k91hg41k19g",
    sizeInMl: 500,
    originalValue: 2,
    avails: avails.todos,
    flavors: [
      {
        createdAt: new Date(),
        id: "f2gj2fgj9fgjfg812",
        fullName: "Normal",
        avails: avails.todos,
        stock: 3,
        sold: 90,
      },
      {
        createdAt: new Date(),
        id: "dsjfgkjhl",
        fullName: "Com gás",
        avails: avails.todos,
        stock: 5,
        sold: 10,
        originalValue: 3,
      },
    ],
    sold: 100,
    stock: 3,
  },
  guaramix: {
    category: categories.outro,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Guaramix 290ml",
    displayName: "Guaramix 290ml",
    imageUrl:
      "https://hiperideal.vtexassets.com/arquivos/ids/168829/1742760.jpg?v=636615820171100000",
    id: "dgdsfhfgjghkghghkdfgh",
    sizeInMl: 290,
    originalValue: 2.5,
    avails: avails.todos,
    sold: 50,
    stock: 2,
  },
  refriLata: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Refrigerante 350ml",
    displayName: "Refri Lata",
    imageUrl:
      "https://bolicho.diretoriofood.com.br/_core/_uploads/168/2023/03/2108070323ckgkjfd9g3.jpg",
    id: "sfhjfjghkghkdfkghkhg",
    sizeInMl: 350,
    originalValue: 4,
    avails: avails.todos,
    sold: 300,
    stock: 15,
    flavors: [
      {
        createdAt: new Date(),
        id: "5g21s95g59s5a9d1g1",
        fullName: "Pepsi",
        avails: avails.todos,
        stock: 3,
        sold: 90,
        originalValue: 4,
      },
      {
        createdAt: new Date(),
        id: "ds62fg2sdg2dsf65g6s12",
        fullName: "Antárctica",
        avails: avails.todos,
        stock: 5,
        sold: 10,
        originalValue: 4,
      },
      {
        createdAt: new Date(),
        id: "d65gs6d51g651sd651g516sd",
        fullName: "Coca Cola",
        avails: avails.desativado,
        stock: 5,
        sold: 10,
        originalValue: 5,
      },
    ],
  },
  goob1L: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Refrigerante Goob 1L",
    displayName: "Goob 1L",
    imageUrl: "https://group-ism.com/br/wp-content/uploads/2023/07/goob-12.png",
    id: "as8f48as41fa8181as8c18a1sc",
    sizeInMl: 1000,
    originalValue: 5,
    avails: avails.todos,
    sold: 90,
    stock: 15,
    flavors: [
      {
        createdAt: new Date(),
        id: "5g21s95g59s5a9d1g1",
        fullName: "Guaraná",
        avails: avails.todos,
        stock: 3,
        sold: 90,
      },
      {
        createdAt: new Date(),
        id: "ds62fg2sdg2dsf65g6s12",
        fullName: "Cola",
        avails: avails.todos,
        stock: 5,
        sold: 10,
      },
    ],
  },
  goob2L: {
    category: categories.refri,
    createdAt: new Date(),
    forPrepare: false,
    fullName: "Refrigerante Goob 2L",
    displayName: "Goob 2L",
    imageUrl:
      "https://ibassets.com.br/ib.item.image.large/l-1874a395575e47bd86bb6c7affb90281.jpeg",
    id: "6sa2df62as6f5as9f5sa2",
    sizeInMl: 2000,
    originalValue: 8,
    avails: avails.todos,
    sold: 90,
    stock: 15,
    flavors: [
      {
        createdAt: new Date(),
        id: "5g21s95g59s5a9d1g1",
        fullName: "Guaraná",
        avails: avails.todos,
        stock: 3,
        sold: 90,
      },
      {
        createdAt: new Date(),
        id: "ds62fg2sdg2dsf65g6s12",
        fullName: "Cola",
        avails: avails.todos,
        stock: 5,
        sold: 10,
      },
      {
        createdAt: new Date(),
        id: "d65gs6d51g651sd651g516sd",
        fullName: "Laranja",
        avails: avails.desativado,
        stock: 5,
        sold: 10,
      },
    ],
  },
};
