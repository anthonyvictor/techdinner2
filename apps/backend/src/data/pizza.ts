import {
  IPizzaCrust,
  IPizzaDough,
  IPizzaDoughThickness,
  IPizzaDoughType,
  IPizzaExtra,
  IPizzaFlavor,
  IPizzaFlavorGroup,
  IPizzaFlavorIngredient,
  IPizzaSize,
  IPizzaSizeValue,
} from "@td/types/src/pizza";
import { avails } from "./visibility";
import { getDate } from "src/util/date";
import { generatBase } from "../util/base";

export const sizes: {
  media: IPizzaSize;
  grande: IPizzaSize;
  familia: IPizzaSize;
  pequena: IPizzaSize;
} = {
  pequena: {
    createdAt: new Date(),
    shortName: "Peq",
    fullName: "Pequena",
    id: "dsa622da62",
    maxflavors: 1,
    approximateCm: 15,
    pieces: 4,
    avails: avails.todos,
  },
  grande: {
    createdAt: new Date(),
    shortName: "Gra",
    fullName: "Grande",
    id: "5s4ad54sa5",
    maxflavors: 3,
    approximateCm: 35,
    pieces: 8,
    avails: avails.todos,
  },
  familia: {
    createdAt: new Date(),
    shortName: "Fam",
    fullName: "Familia",
    id: "a5s1d515as1d",
    maxflavors: 4,
    approximateCm: 40,
    pieces: 12,
    avails: avails.todos,
  },
  media: {
    createdAt: new Date(),
    shortName: "Med",
    fullName: "Média",
    id: "as6d2as2d2a",
    maxflavors: 2,
    approximateCm: 30,
    pieces: 6,
    avails: avails.todos,
  },
};

export const crusts: {
  cheddar: IPizzaCrust;
  requeijao: IPizzaCrust;
  semBorda: IPizzaCrust;
} = {
  semBorda: {
    createdAt: new Date(),
    id: "s6d26asa",
    fullName: "❌ Sem borda",
    position: 1,
    isDefault: true,
    avails: avails.todos,
    values: [],
  },
  cheddar: {
    createdAt: new Date(),
    id: "54sa5d4sa",
    fullName: "🟠 Borda de Cheddar",
    displayName: "🟠 Cheddar",
    position: 3,
    isDefault: false,
    avails: avails.todos,
    values: [
      {
        id: "sa65d16as1",
        size: sizes.pequena,
        createdAt: new Date(),
        value: 3,
      },
      { id: "62sad626sa", size: sizes.grande, createdAt: new Date(), value: 5 },
      {
        id: "asd2sa6d26",
        size: sizes.familia,
        createdAt: new Date(),
        value: 7,
      },
    ],
  },
  requeijao: {
    createdAt: new Date(),
    id: "sa6d216a2s2d",
    fullName: "⚪ Borda de Requeijão",
    displayName: "⚪ Requeijão",
    position: 2,
    avails: avails.todos,
    isDefault: false,
    values: [
      {
        id: "sa65d16as1",
        size: sizes.pequena,
        createdAt: new Date(),
        value: 3,
      },
      { id: "62sad626sa", size: sizes.grande, createdAt: new Date(), value: 5 },
      {
        id: "asd2sa6d26",
        size: sizes.familia,
        createdAt: new Date(),
        value: 7,
      },
    ],
  },
};

export const doughBakingLevels: {
  preAssada: IPizzaDoughThickness;
  bemAssada: IPizzaDoughThickness;
  aoPonto: IPizzaDoughThickness;
  malAssada: IPizzaDoughThickness;
} = {
  preAssada: {
    id: "sa2d6a22asd",
    createdAt: getDate(-10 * 60 * 24 * 30),
    fullName: "☃️ Pré assada",
    isDefault: false,
    position: 1,
    values: [],
    avails: avails.todos,
  },
  bemAssada: {
    id: "as2das229s9",
    createdAt: getDate(-10 * 60 * 24 * 30),
    fullName: "🔥 Bem assada",
    isDefault: false,
    values: [],
    position: 4,
    avails: avails.todos,
  },
  aoPonto: {
    id: "s6d26a2sd",
    createdAt: getDate(-10 * 60 * 24 * 30),
    fullName: "👌 Ao ponto",
    isDefault: true,
    values: [],
    position: 3,
    avails: avails.todos,
  },
  malAssada: {
    id: "51fds511f",
    createdAt: getDate(-10 * 60 * 24 * 30),
    fullName: "⏱️ Mal assada",
    isDefault: false,
    position: 2,

    values: [
      {
        id: "2s6d22asd2",
        createdAt: new Date(),
        size: sizes.pequena,
        value: 4,
      },
      { id: "asdas9652a", createdAt: new Date(), size: sizes.media, value: 5 },
      { id: "5sd62asd5g", createdAt: new Date(), size: sizes.grande, value: 6 },
      {
        id: "sad95as99s",
        createdAt: new Date(),
        size: sizes.familia,
        value: 7,
      },
    ],
    avails: avails.todos,
  },
};
export const doughThicknesses: {
  fina: IPizzaDoughThickness;
  normal: IPizzaDoughThickness;
  grossa: IPizzaDoughThickness;
  extraGrossa: IPizzaDoughThickness;
} = {
  fina: {
    id: "sa2d6a22asd",
    createdAt: getDate(-10 * 60 * 24 * 30),
    fullName: "🍃 Massa fina",
    isDefault: false,
    values: [],
    avails: avails.todos,
    position: 1,
  },
  normal: {
    id: "as2das229s9",
    createdAt: getDate(-10 * 60 * 24 * 30),
    fullName: "👍 Massa mediana",
    displayName: "👍 Mediana",
    isDefault: true,
    values: [],
    avails: avails.todos,
    position: 2,
  },
  grossa: {
    id: "s6d26a2sd",
    createdAt: getDate(-10 * 60 * 24 * 30),
    fullName: "⚓ Massa Grossa",
    displayName: "⚓ Grossa",
    isDefault: false,

    values: [
      {
        id: "2s6d22asd2",
        createdAt: new Date(),
        size: sizes.pequena,
        value: 2,
      },
      { id: "asdas9652a", createdAt: new Date(), size: sizes.media, value: 3 },
      { id: "5sd62asd5g", createdAt: new Date(), size: sizes.grande, value: 4 },
      {
        id: "sad95as99s",
        createdAt: new Date(),
        size: sizes.familia,
        value: 5,
      },
    ],
    avails: avails.todos,
    position: 3,
  },
  extraGrossa: {
    id: "51fds511f",
    createdAt: getDate(-10 * 60 * 24 * 30),
    fullName: "🫢 Massa Extra Grossa",
    displayName: "🫢 XGrossa",
    isDefault: false,
    position: 4,
    values: [
      {
        id: "2s6d22asd2",
        createdAt: new Date(),
        size: sizes.pequena,
        value: 4,
      },
      { id: "asdas9652a", createdAt: new Date(), size: sizes.media, value: 5 },
      { id: "5sd62asd5g", createdAt: new Date(), size: sizes.grande, value: 6 },
      {
        id: "sad95as99s",
        createdAt: new Date(),
        size: sizes.familia,
        value: 7,
      },
    ],
    avails: avails.todos,
  },
};
export const doughTypes: {
  normal: IPizzaDoughType;
  batata: IPizzaDoughType;
  cebola: IPizzaDoughType;
} = {
  normal: {
    id: "96da2s6d26",
    createdAt: getDate(-10 * 60 * 24 * 30),
    fullName: "⚪ Massa branca",
    displayName: "⚪ Branca",
    values: [],
    isDefault: true,
    position: 1,

    avails: avails.todos,
  },
  batata: {
    id: "s6d26a2sd",
    createdAt: getDate(-10 * 60 * 24 * 30),
    fullName: "🥔 Massa de Batata",
    displayName: "🥔 Batata",
    isDefault: false,
    position: 2,
    values: [
      {
        id: "2s6d22asd2",
        createdAt: new Date(),
        size: sizes.pequena,
        value: 2,
      },
      { id: "asdas9652a", createdAt: new Date(), size: sizes.media, value: 3 },
      { id: "5sd62asd5g", createdAt: new Date(), size: sizes.grande, value: 4 },
      {
        id: "sad95as99s",
        createdAt: new Date(),
        size: sizes.familia,
        value: 5,
      },
    ],
    avails: avails.todos,
  },
  cebola: {
    id: "51fds511f",
    createdAt: getDate(-10 * 60 * 24 * 30),
    fullName: "🧅 Massa com cebola",
    displayName: "🧅 Cebola",
    isDefault: false,
    position: 3,

    values: [
      {
        id: "2s6d22asd2",
        createdAt: new Date(),
        size: sizes.pequena,
        value: 2,
      },
      { id: "asdas9652a", createdAt: new Date(), size: sizes.media, value: 3 },
      { id: "5sd62asd5g", createdAt: new Date(), size: sizes.grande, value: 4 },
      {
        id: "sad95as99s",
        createdAt: new Date(),
        size: sizes.familia,
        value: 5,
      },
    ],
    avails: avails.todos,
  },
};

export const doughs: {
  batataGrossa: IPizzaDough;
  normal: IPizzaDough;
} = {
  batataGrossa: {
    createdAt: new Date(),
    id: "54sa5d4sa",
    bakingLevel: doughBakingLevels.aoPonto,
    thickness: doughThicknesses.grossa,
    type: doughTypes.batata,
  },
  normal: {
    createdAt: new Date(),
    id: "d2as62d2",
    bakingLevel: doughBakingLevels.aoPonto,
    thickness: doughThicknesses.normal,
    type: doughTypes.normal,
  },
};
export const extras: {
  cebola: IPizzaExtra;
  queijo: IPizzaExtra;
} = {
  queijo: {
    createdAt: new Date(),
    id: "5sad12sad215",
    fullName: "🧀 Queijo",
    avails: avails.todos,
    values: [
      {
        id: "sa65d16as1",
        size: sizes.pequena,
        createdAt: new Date(),
        value: 5,
      },
      { id: "asd26sad62", size: sizes.grande, createdAt: new Date(), value: 7 },
      {
        id: "62sad66sa2",
        size: sizes.familia,
        createdAt: new Date(),
        value: 8,
      },
    ],
  },
  cebola: {
    createdAt: new Date(),
    id: "54sa5d4sa",
    fullName: "🧅 Cebola",
    avails: avails.todos,
    values: [
      {
        id: "sa65d16as1",
        size: sizes.pequena,
        createdAt: new Date(),
        value: 5,
      },
      { id: "asd26sad62", size: sizes.grande, createdAt: new Date(), value: 7 },
      {
        id: "62sad66sa2",
        size: sizes.familia,
        createdAt: new Date(),
        value: 8,
      },
    ],
  },
};

const ingredientsValues = [
  [
    { ...generatBase(), size: sizes.pequena, value: 2 },
    { ...generatBase(), size: sizes.media, value: 3 },
    { ...generatBase(), size: sizes.grande, value: 4 },
    { ...generatBase(), size: sizes.familia, value: 5 },
  ],
  [
    { ...generatBase(), size: sizes.pequena, value: 5 },
    { ...generatBase(), size: sizes.media, value: 7 },
    { ...generatBase(), size: sizes.grande, value: 9 },
    { ...generatBase(), size: sizes.familia, value: 11 },
  ],
];

export const ingredients: {
  gorgonzola: IPizzaFlavorIngredient;
  mussarela: IPizzaFlavorIngredient;
  frango: IPizzaFlavorIngredient;
  calabresa: IPizzaFlavorIngredient;
  presunto: IPizzaFlavorIngredient;
  cebola: IPizzaFlavorIngredient;
  requeijao: IPizzaFlavorIngredient;
  cheddar: IPizzaFlavorIngredient;
  goiabada: IPizzaFlavorIngredient;
  chocolate: IPizzaFlavorIngredient;
  granulado: IPizzaFlavorIngredient;
  milho: IPizzaFlavorIngredient;
  tomate: IPizzaFlavorIngredient;
  parmesao: IPizzaFlavorIngredient;
  banana: IPizzaFlavorIngredient;
  leiteCond: IPizzaFlavorIngredient;
  canela: IPizzaFlavorIngredient;
  alho: IPizzaFlavorIngredient;
} = {
  banana: {
    id: "195sad6as156156as1f",
    fullName: "Banana",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  leiteCond: {
    id: "a96s1d54asf1sa546154",
    fullName: "Leite Condensado",
    shortName: "L.Cond",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  canela: {
    id: "sa521dfa51f561a651",
    fullName: "Canela",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  tomate: {
    id: "as16.5as2f6.52sa",
    fullName: "Tomate",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  parmesao: {
    id: ".6sa2f.62as2f6a.sf",
    fullName: "Parmesão",
    shortName: "Parm",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  milho: {
    id: "65as9f874as98f4as198",
    fullName: "Milho",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  granulado: {
    id: ".62asc62sa.62c2as6.2c",
    fullName: "Granulado",
    displayName: "Granulado",
    shortName: "Gran",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  chocolate: {
    id: "1as8591a8sc189as18c1as981c",
    fullName: "Chocolate",
    displayName: "Chocolate",
    shortName: "Choco",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  goiabada: {
    id: "a951sc951as591g1d91g5sd1g51dfh",
    fullName: "Goiabada",
    displayName: "Goiabada",
    shortName: "Gbd",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  mussarela: {
    id: "sa8c51as51c51a961c",
    fullName: "Queijo Mussarela",
    displayName: "Mussarela",
    shortName: "Musr",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  gorgonzola: {
    id: "5gf5j65f151h51d51g",
    fullName: "Queijo Gorgonzola",
    displayName: "Gorgonzola",
    shortName: "Gorg",
    createdAt: new Date(),
    values: ingredientsValues[1],
  },
  frango: {
    id: "f51h915g1j5gf741",
    fullName: "Frango",
    shortName: "Frg",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  calabresa: {
    id: "6as51651h95151j591gj",
    fullName: "Calabresa",
    displayName: "Calabresa",
    shortName: "Calab",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },

  presunto: {
    id: "6as51f656ds1h51dgj15ghk15",
    fullName: "Presunto",
    displayName: "Presunto",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },

  cebola: {
    id: "sad1g651s1j1h651k651",
    fullName: "Cebola",
    displayName: "Cebola",
    shortName: "Cebo",
    createdAt: new Date(),
    values: ingredientsValues[1],
  },

  requeijao: {
    id: "5asf1651g51s56f1j561",
    fullName: "Requeijão",
    displayName: "Requeijão",
    shortName: "Reqj",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },

  cheddar: {
    id: "sa51f961dsh515159khg",
    fullName: "Cheddar",
    displayName: "Cheddar",
    shortName: "Chedr",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
  alho: {
    id: "as5165h1f65d1g651kh651g",
    fullName: "Alho Torrado",
    displayName: "Alho",
    createdAt: new Date(),
    values: ingredientsValues[0],
  },
};

export const groups: {
  trad: IPizzaFlavorGroup;
  semc: IPizzaFlavorGroup;
  doces: IPizzaFlavorGroup;
  esp: IPizzaFlavorGroup;
} = {
  trad: {
    createdAt: new Date(),
    fullName: "Tradicionais 👍",
    id: "s26a2sd62a6sd26sa2",
    shortName: "Trad",
    flavors: [],
  },
  semc: {
    createdAt: new Date(),
    fullName: "Sem carne 🙅‍♂️",
    id: "s26a2sd62a6sd5sad56",
    shortName: "S/Crne",
    flavors: [],
  },
  doces: {
    createdAt: new Date(),
    fullName: "Doces 🍭",
    id: "s12ads6a26d6a26sd26",
    shortName: "Doces",
    flavors: [],
  },
  esp: {
    createdAt: new Date(),
    fullName: "Especiais 🤩",
    id: "sa2d9as59dsa5d95sd9",
    shortName: "Esp",
    flavors: [],
  },
};

const flavorValues: IPizzaSizeValue[][] = [
  [
    {
      createdAt: new Date(),
      id: "5sd651s651g561sd",
      size: sizes.pequena,
      value: 15,
    },
    {
      createdAt: new Date(),
      id: "dagas5g5s5g56",
      size: sizes.grande,
      value: 33,
    },
    {
      createdAt: new Date(),
      id: "65as1g6d51651",
      size: sizes.familia,
      value: 39,
    },
    {
      createdAt: new Date(),
      id: "6ds5gs6516g51s65d4",
      size: sizes.media,
      value: 27,
    },
  ],
  [
    {
      createdAt: new Date(),
      id: "asd65f1ad15g159sad",
      size: sizes.pequena,
      value: 20,
    },
    {
      createdAt: new Date(),
      id: "d+8gsdg1sd51",
      size: sizes.grande,
      value: 35,
    },
    {
      createdAt: new Date(),
      id: "+g5sda+95gh52sdfg5",
      size: sizes.familia,
      value: 43,
    },
    {
      createdAt: new Date(),
      id: "as54f54as4fsa11",
      size: sizes.media,
      value: 32,
    },
  ],
  [
    {
      createdAt: new Date(),
      id: "agsgsg5sag15sa1",
      size: sizes.pequena,
      value: 25,
    },
    {
      createdAt: new Date(),
      id: "sdg5sd5a1g51sa51g",
      size: sizes.grande,
      value: 39,
    },
    {
      createdAt: new Date(),
      id: "5sdg5sdag216sad541",
      size: sizes.familia,
      value: 47,
    },
    {
      createdAt: new Date(),
      id: "sag959f5sd5f5",
      size: sizes.media,
      value: 37,
    },
  ],
];

export const flavors: {
  calabresa: IPizzaFlavor;
  catupiresa: IPizzaFlavor;
  frango: IPizzaFlavor;
  mussarela: IPizzaFlavor;
  romeu: IPizzaFlavor;
  verona: IPizzaFlavor;
  delicia: IPizzaFlavor;
  doisQ: IPizzaFlavor;
  casa: IPizzaFlavor;
  milho: IPizzaFlavor;
  caipira: IPizzaFlavor;
  presunto: IPizzaFlavor;
  chinesa: IPizzaFlavor;
  banana: IPizzaFlavor;
  napo: IPizzaFlavor;
} = {
  napo: {
    id: "41sa5f1sa6156f1sa65156",
    fullName: "Napolitana",
    group: groups.semc,
    ingredients: [
      ingredients.mussarela,
      ingredients.tomate,
      ingredients.parmesao,
      ingredients.alho,
    ],
    avails: avails.todos,
    values: flavorValues[0],
    createdAt: new Date(),
    sold: 882,
  },
  catupiresa: {
    id: "45as1651a5s61f561a561",
    fullName: "Catupiresa",
    group: groups.trad,
    ingredients: [
      ingredients.mussarela,
      ingredients.calabresa,
      ingredients.requeijao,
    ],
    avails: avails.todos,
    values: flavorValues[0],
    createdAt: new Date(),
    sold: 882,
  },
  banana: {
    id: "8asfasf2sa52f5.2s5",
    fullName: "Banana Nevada",
    group: groups.doces,
    ingredients: [
      ingredients.mussarela,
      ingredients.banana,
      ingredients.leiteCond,
      ingredients.canela,
    ],
    avails: avails.todos,
    values: flavorValues[1],
    createdAt: new Date(),
    sold: 882,
  },
  chinesa: {
    id: "a9s5f5a6s2f2as652f",
    fullName: "Chinesa",
    shortName: "Chin",
    group: groups.trad,
    ingredients: [
      ingredients.mussarela,
      ingredients.calabresa,
      ingredients.cheddar,
      ingredients.milho,
    ],
    avails: avails.todos,
    values: flavorValues[0],
    createdAt: new Date(),
    sold: 882,
  },
  presunto: {
    id: "as6915df5asfa65s21f56sa156",
    fullName: "Presunto",
    shortName: "Pres",
    group: groups.trad,
    ingredients: [
      ingredients.mussarela,
      ingredients.presunto,
      ingredients.cheddar,
    ],
    avails: avails.todos,
    values: flavorValues[0],
    createdAt: new Date(),
    sold: 1005,
  },
  caipira: {
    id: "9a5s21f65as65f65sa561f",
    fullName: "Caipira",
    group: groups.trad,
    ingredients: [
      ingredients.mussarela,
      ingredients.frango,
      ingredients.tomate,
      ingredients.parmesao,
    ],
    avails: avails.todos,
    values: flavorValues[1],
    createdAt: new Date(),
    sold: 184,
  },
  milho: {
    id: "95as19fa95s1f5a51f6a",
    fullName: "Milho",
    group: groups.semc,
    ingredients: [ingredients.mussarela, ingredients.milho],
    avails: avails.todos,
    values: flavorValues[0],
    createdAt: new Date(),
    sold: 1920,
  },
  casa: {
    id: "49sfaf51a561f56a56f1",
    fullName: "Moda da Casa",
    shortName: "Mod.Cas",
    group: groups.trad,
    ingredients: [
      ingredients.mussarela,
      ingredients.calabresa,
      ingredients.presunto,
      ingredients.cebola,
    ],
    avails: avails.todos,
    values: flavorValues[0],
    createdAt: new Date(),
    sold: 1520,
  },
  calabresa: {
    id: "a541as51f6451as41fa",
    fullName: "Calabresa",
    shortName: "Calab.",
    group: groups.trad,
    ingredients: [
      ingredients.mussarela,
      ingredients.calabresa,
      ingredients.cebola,
    ],
    avails: avails.todos,
    values: flavorValues[0],
    createdAt: new Date(),
    sold: 32542,
  },
  frango: {
    id: "95as265a2s5625as6f2as5",
    fullName: "Frango",
    shortName: "Frango",
    group: groups.trad,
    values: flavorValues[0],
    ingredients: [
      ingredients.mussarela,
      ingredients.frango,
      ingredients.requeijao,
    ],
    avails: avails.todos,
    createdAt: new Date(),
    sold: 30648,
  },
  verona: {
    id: "a6s51f6as16f165as156f156a",
    fullName: "Moda Verona",
    shortName: "Verona",
    group: groups.esp,
    values: flavorValues[2],
    ingredients: [
      ingredients.presunto,
      ingredients.cheddar,
      ingredients.gorgonzola,
    ],
    avails: avails.todos,
    createdAt: new Date(),
    sold: 350,
  },
  romeu: {
    id: "as854df98a1s9fa51s85f",
    fullName: "Romeu & Julieta",
    shortName: "Romeu",
    group: groups.doces,
    values: flavorValues[1],
    ingredients: [ingredients.mussarela, ingredients.goiabada],
    avails: avails.todos,
    createdAt: new Date(),
    sold: 898,
  },
  mussarela: {
    id: "+s9a5f2+9a2fa2652as62",
    fullName: "Mussarela",
    shortName: "Muss",
    group: groups.semc,
    values: flavorValues[0],
    ingredients: [ingredients.mussarela],
    avails: avails.todos,
    createdAt: new Date(),
    sold: 1900,
  },
  delicia: {
    id: "651as65d1f6as1651561fa",
    fullName: "Delicia Da Bahia",
    shortName: "Delicia",
    group: groups.esp,
    values: flavorValues[1],
    ingredients: [
      ingredients.mussarela,
      ingredients.calabresa,
      ingredients.frango,
      ingredients.requeijao,
    ],
    avails: avails.todos,
    createdAt: new Date(),
    sold: 2400,
  },
  doisQ: {
    id: "sa5f84as94f9a1s91f985as581",
    fullName: "2 Queijos",
    shortName: "2 Qj",
    group: groups.semc,
    values: flavorValues[1],
    ingredients: [ingredients.mussarela, ingredients.requeijao],
    avails: avails.todos,
    createdAt: new Date(),
    sold: 900,
  },
};
