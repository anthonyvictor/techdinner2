import { IOther, IOtherCategory, IOtherSize, IOtherSizeValue } from "@td/types";
import { getDate } from "src/util/date";
import { avails } from "./visibility";
import { brands } from "./brands";

export const categories: {
  lanche: IOtherCategory;
  remedio: IOtherCategory;
  embalado: IOtherCategory;
  sobremesa: IOtherCategory;
} = {
  lanche: {
    id: "sad5as1da",
    fullName: "Lanches 🍔",
    createdAt: new Date(),
    avails: avails.todos,
    others: [],
  },
  remedio: {
    id: "5as6das62",
    fullName: "Medicamentos 💊",
    createdAt: new Date(),
    avails: avails.todos,
    others: [],
  },
  embalado: {
    id: "a1d5sa51",
    fullName: "Embalados 🥫",
    createdAt: new Date(),
    avails: avails.todos,
    others: [],
  },
  sobremesa: {
    id: "sd2a626as",
    fullName: "Sobremesas 🍨",
    createdAt: new Date(),
    avails: avails.todos,
    others: [],
  },
};

const hotDogSizes: {
  normal: IOtherSize;
  dogao: IOtherSize;
} = {
  normal: {
    id: "5asd9as929sad2sad2f",
    fullName: "Normal",
    avails: avails.todos,
    createdAt: new Date(),
    position: 0,
    sold: 52,
    stock: 20,
  },
  dogao: {
    id: "as62d62as2d2a9",
    fullName: "Dogão",
    avails: avails.todos,
    createdAt: new Date(),
    position: 1,
    sold: 55,
    stock: 10,
  },
};
const tortaSizes: {
  normal: IOtherSize;
} = {
  normal: {
    id: "5asd9as929sad2sad2f",
    fullName: "Normal",
    avails: avails.todos,
    createdAt: new Date(),
    position: 0,
    sold: 20,
    stock: 3,
  },
};

const hotDogExtraValues: {
  barato: IOtherSizeValue[];
  caro: IOtherSizeValue[];
} = {
  barato: [
    {
      size: hotDogSizes.normal,
      value: 2,
      id: "a69s29a529bsd22s",
      createdAt: new Date(),
    },
    {
      size: hotDogSizes.dogao,
      value: 4,
      id: "as1fas22c92sa9c9a",
      createdAt: new Date(),
    },
  ],
  caro: [
    {
      size: hotDogSizes.normal,
      value: 5,
      id: "as12f62asf9as",
      createdAt: new Date(),
    },
    {
      size: hotDogSizes.dogao,
      value: 8,
      id: "5a2v92a9vas299",
      createdAt: new Date(),
    },
  ],
};
const tortaValues: {
  barato: IOtherSizeValue[];
  caro: IOtherSizeValue[];
} = {
  barato: [
    {
      size: tortaSizes.normal,
      value: 10,
      id: "a69s29a529bsd22s",
      createdAt: new Date(),
    },
  ],
  caro: [
    {
      size: tortaSizes.normal,
      value: 15,
      id: "as12f62asf9as",
      createdAt: new Date(),
    },
  ],
};

const biscoitoSizes: {
  "90g": IOtherSize;
} = {
  "90g": {
    id: "5asd9as929sad2sad2f",
    fullName: "90-120 Gramas",
    avails: avails.todos,
    createdAt: new Date(),
    position: 0,
    sold: 20,
    stock: 3,
  },
};

const biscoitoValues: {
  barato: IOtherSizeValue[];
} = {
  barato: [
    {
      size: tortaSizes.normal,
      value: 3,
      id: "a69s29a529bsd22s",
      createdAt: new Date(),
    },
  ],
};

const bauruSizes: {
  pequeno: IOtherSize;
  grande: IOtherSize;
} = {
  pequeno: {
    fullName: "Pequeno",
    id: "621sdc6as",
    createdAt: new Date(),
    avails: avails.todos,
    sold: 50,
    stock: 5,
    position: 0,
  },
  grande: {
    fullName: "Grande",
    id: "sadsad1as1d1",
    createdAt: new Date(),
    avails: avails.todos,
    sold: 150,
    position: 1,
    stock: 5,
  },
};

const bauruValues: {
  barato: IOtherSizeValue[];
} = {
  barato: [
    {
      size: bauruSizes.pequeno,
      value: 5,
      id: "a69s29a529bsd22s",
      createdAt: new Date(),
    },
    {
      size: bauruSizes.grande,
      value: 10,
      id: "3sad3sa922as",
      createdAt: new Date(),
    },
  ],
};

const bisXtraSizes: {
  normal: IOtherSize;
} = {
  normal: {
    id: "5asd9as929sad2sad2f",
    fullName: "Normal",
    avails: avails.todos,
    createdAt: new Date(),
    position: 0,
    sold: 20,
    stock: 3,
  },
};
const dorflexSizes: {
  normal: IOtherSize;
} = {
  normal: {
    id: "5asd9as929sad2sad2f",
    fullName: "Normal",
    avails: avails.todos,
    createdAt: new Date(),
    position: 0,
    sold: 20,
    stock: 3,
  },
};

const esfirraSizes: { pequena: IOtherSize; grande: IOtherSize } = {
  pequena: {
    fullName: "Pequena",
    id: "a2sdas62",
    sold: 7,
    createdAt: new Date(),
    avails: avails.todos,
    originalValue: 0,
    stock: 10,
    position: 0,
  },
  grande: {
    fullName: "Grande",
    sold: 7,
    id: "62sa62da",
    createdAt: new Date(),
    originalValue: 2,
    stock: 10,
    avails: avails.todos,
    position: 1,
  },
};

export const others: {
  bauru: IOther;
  hotdog: IOther;
  torta: IOther;
  esfirra: IOther;
  bisXtra: IOther;
  biscoito: IOther;
  dorflex: IOther;
} = {
  bauru: {
    id: "s21d6sa2d6as",
    fullName: "Baurú",
    tags: ["baurivis"],
    imageUrl: "https://i.ytimg.com/vi/UHCfbxRgk8c/maxresdefault.jpg",
    category: categories.lanche,
    createdAt: getDate(-500),
    forPrepare: false,
    stock: 5,
    sizes: [bauruSizes.pequeno, bauruSizes.grande],
    variations: [
      {
        avails: avails.todos,
        fullName: "Frango Empanado (Steak)",
        displayName: "Steak",
        id: "2sa26d2sa2922sa",
        createdAt: new Date(),
        sold: 335,
        stock: [
          {
            size: bauruSizes.pequeno,
            value: 5,
            id: "621sdc6assadasf",
            createdAt: new Date(),
          },
          {
            size: bauruSizes.grande,
            value: 5,
            id: "6s6d2as292asc992as9ca",
            createdAt: new Date(),
          },
        ],
        values: bauruValues.barato,
      },
      {
        avails: avails.todos,
        fullName: "Calabresa",
        id: "a2sd62as62d2sa9",
        createdAt: new Date(),
        sold: 480,
        stock: [
          {
            size: bauruSizes.pequeno,
            value: 6,
            id: "saf2a69s2f9a2f",
            createdAt: new Date(),
          },
          {
            size: bauruSizes.grande,
            value: 2,
            id: "a2s92as2c92as2ca92",
            createdAt: new Date(),
          },
        ],
        values: bauruValues.barato,
      },
      {
        avails: avails.todos,
        fullName: "Presunto",
        id: "95as95f9a9s5f9sa",
        createdAt: new Date(),
        sold: 859,
        stock: [
          {
            size: bauruSizes.pequeno,
            value: 5,
            id: "saf2a69s2f9a2f",
            createdAt: new Date(),
          },
          {
            size: bauruSizes.grande,
            value: 6,
            id: "a2s92as2c92as2ca92",
            createdAt: new Date(),
          },
        ],
        values: bauruValues.barato,
      },
      {
        avails: avails.todos,
        fullName: "Carne de Hambúrguer",
        id: "sa239as2f2as92f",
        createdAt: new Date(),
        sold: 620,
        stock: [
          {
            size: bauruSizes.pequeno,
            value: 3,
            id: "saf2a69s2f9a2f",
            createdAt: new Date(),
          },
          {
            size: bauruSizes.grande,
            value: 1,
            id: "a2s92as2c92as2ca92",
            createdAt: new Date(),
          },
        ],
        values: bauruValues.barato,
      },
    ],
    avails: avails.todos,
    extras: [],
    sold: 35,
  },
  hotdog: {
    id: "sa6d262as6d2a",
    fullName: "Hot Dog",
    imageUrl:
      "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/01/31/istock-143175178-1iuy9pef5iz3q.jpg",
    category: categories.lanche,
    createdAt: getDate(-500),
    forPrepare: true,
    stock: 5,
    sizes: [hotDogSizes.normal, hotDogSizes.dogao],
    variations: [
      {
        avails: avails.todos,
        fullName: "Salsicha",
        id: "2sa26d2sa2922sa",
        createdAt: new Date(),
        sold: 10,
        stock: [
          {
            size: hotDogSizes.normal,
            value: 3,
            id: "2s92d9as92f9a9",
            createdAt: new Date(),
          },
          {
            size: hotDogSizes.dogao,
            value: 5,
            id: "as2d92a2sf9a9a",
            createdAt: new Date(),
          },
        ],
        values: [
          {
            size: hotDogSizes.normal,
            value: 5,
            id: "2s92d9as92f9a9",
            createdAt: new Date(),
          },
          {
            size: hotDogSizes.dogao,
            value: 10,
            id: "as2d92a2sf9a9a",
            createdAt: new Date(),
          },
        ],
      },
      {
        avails: avails.todos,
        fullName: "Calabresa",
        id: "a2sd62as62d2sa9",
        createdAt: new Date(),
        sold: 5,
        stock: [
          {
            size: hotDogSizes.normal,
            value: 1,
            id: "2s92d9as92f9a9",
            createdAt: new Date(),
          },
          {
            size: hotDogSizes.dogao,
            value: 3,
            id: "as2d92a2sf9a9a",
            createdAt: new Date(),
          },
        ],
        values: [
          {
            size: hotDogSizes.normal,
            value: 8,
            id: "saf2a69s2f9a2f",
            createdAt: new Date(),
          },
          {
            size: hotDogSizes.dogao,
            value: 13,
            id: "df2hj92dfh9f2d",
            createdAt: new Date(),
          },
        ],
      },
    ],
    extras: [
      {
        avails: avails.todos,
        fullName: "Batata Palha",
        id: "a2sdas62",
        createdAt: new Date(),
        sold: 10,
        stock: 5,
        values: hotDogExtraValues.barato,
      },
      {
        avails: avails.todos,
        fullName: "Mostarda",
        id: "5s9da5sa5s",
        createdAt: new Date(),
        sold: 5,
        stock: 5,
        values: hotDogExtraValues.barato,
      },
      {
        avails: avails.todos,
        fullName: "Ketchup",
        id: "asdas2d66",
        createdAt: new Date(),
        sold: 8,
        stock: 5,
        values: hotDogExtraValues.barato,
      },
      {
        avails: avails.todos,
        fullName: "Milho",
        id: "1sd6a2sd26",
        createdAt: new Date(),
        sold: 6,
        stock: 5,
        values: hotDogExtraValues.barato,
      },
      {
        avails: avails.todos,
        fullName: "Ervilha",
        id: "23d6a2s62d",
        createdAt: new Date(),
        sold: 1,
        stock: 5,
        values: hotDogExtraValues.barato,
      },
      {
        avails: avails.todos,
        fullName: "Parmesão",
        id: "621sdc6as",
        createdAt: new Date(),
        stock: 5,
        sold: 9,
        values: hotDogExtraValues.caro,
      },
      {
        avails: avails.todos,
        fullName: "Purê de Batatas",
        id: "484asf8as",
        createdAt: new Date(),
        sold: 15,
        stock: 5,
        values: hotDogExtraValues.caro,
      },
    ],
    avails: avails.todos,
    sold: 15,
  },
  torta: {
    id: "sadasd84as84d8a",
    fullName: "Torta Fatia",
    imageUrl:
      "https://barlo.com.br/wp-content/uploads/2023/09/Fatia-de-torta-branquinho-com-brigadeiro.jpg",
    category: categories.sobremesa,
    createdAt: getDate(-500),
    forPrepare: true,
    extras: [],
    stock: 5,
    sizes: [tortaSizes.normal],
    variations: [
      {
        fullName: "Brigadeiro",
        id: "a2sdas62",
        createdAt: new Date(),
        avails: avails.todos,
        sold: 50,
        stock: [
          {
            size: tortaSizes.normal,
            value: 12,
            createdAt: new Date(),
            id: "dsaf22asa96",
          },
        ],
        values: tortaValues.barato,
      },
      {
        fullName: "Floresta Negra",
        id: "5s9da5sa5s",
        createdAt: new Date(),
        avails: avails.todos,
        sold: 15,
        stock: [
          {
            size: tortaSizes.normal,
            value: 5,
            createdAt: new Date(),
            id: "dsaf22asa96",
          },
        ],
        values: tortaValues.caro,
      },
      {
        fullName: "Prestígio",
        id: "asdas2d66",
        createdAt: new Date(),
        avails: avails.todos,
        sold: 3,
        stock: [
          {
            size: tortaSizes.normal,
            value: 8,
            createdAt: new Date(),
            id: "dsaf22asa96",
          },
        ],
        values: tortaValues.caro,
      },
    ],
    avails: avails.todos,
    sold: 15,
  },
  esfirra: {
    id: "8as4f8a4185a118v8a1",
    fullName: "Esfirra",
    imageUrl: "https://i.ytimg.com/vi/NtmGwskpiIQ/maxresdefault.jpg",
    category: categories.lanche,
    createdAt: getDate(-500),
    forPrepare: true,
    stock: 15,
    sizes: [esfirraSizes.pequena, esfirraSizes.grande],
    extras: [],
    variations: [
      {
        fullName: "Frango",
        id: "a3sfas6s2",
        createdAt: new Date(),
        avails: avails.todos,
        sold: 15,
        stock: [
          {
            size: esfirraSizes.pequena,
            id: "sa9a2d92as2",
            value: 5,
            createdAt: new Date(),
          },
          {
            size: esfirraSizes.grande,
            id: "sd2a29s2d2as",
            value: 2,
            createdAt: new Date(),
          },
        ],
        values: [
          {
            size: esfirraSizes.pequena,
            value: 5,
            id: "2ds2sa929f",
            createdAt: new Date(),
          },
          {
            size: esfirraSizes.grande,
            value: 10,
            id: "as2cas92ss",
            createdAt: new Date(),
          },
        ],
      },
    ],
    avails: avails.todos,
    sold: 10,
  },
  biscoito: {
    id: "5as1f5as1f1a5sf51a",
    fullName: "Biscoito Recheado",
    shortName: "Biscoito Recheado",
    imageUrl:
      "https://img.ws.mms.shopee.com.br/f5aeb8c2bb381388e516ab0b457bd63c",
    category: categories.embalado,
    brand: brands.amori,
    createdAt: getDate(-500),
    forPrepare: false,
    stock: 2,
    sizes: [biscoitoSizes["90g"]],
    variations: [
      {
        fullName: "Amori Morango",
        id: "a2sdas62",
        createdAt: new Date(),
        avails: avails.todos,
        imageUrl:
          "https://richester.b-cdn.net/wp-content/uploads/2021/02/Recheado-Amori-Morango-125g-1.png",
        sold: 50,
        values: biscoitoValues.barato,
        stock: [
          {
            id: "sd6ad6as2",
            createdAt: new Date(),
            size: biscoitoSizes["90g"],
            value: 10,
          },
        ],
      },
      {
        fullName: "Amori Chocolate",
        id: "62sa62da",
        createdAt: new Date(),
        avails: avails.todos,
        sold: 150,
        values: biscoitoValues.barato,
        imageUrl:
          "https://richester.b-cdn.net/wp-content/uploads/2021/01/Recheado-Amori-Chocolate-125g-1.png",
        stock: [
          {
            id: "sd6ad6as2",
            createdAt: new Date(),
            size: biscoitoSizes["90g"],
            value: 10,
          },
        ],
      },
      {
        fullName: "Amori Chocolate e Morango",
        id: "6as26d2a662",
        createdAt: new Date(),
        avails: avails.todos,
        sold: 100,
        values: biscoitoValues.barato,
        imageUrl:
          "https://gbarbosa.vtexassets.com/arquivos/ids/220483/65526db58d0743e148890f24.jpg?v=638354976569430000",
        stock: [
          {
            id: "sd6ad6as2",
            createdAt: new Date(),
            size: biscoitoSizes["90g"],
            value: 5,
          },
        ],
      },
      {
        fullName: "Escureto",
        id: "sadasdsad",
        createdAt: new Date(),
        avails: avails.todos,
        imageUrl:
          "https://loja.supermerclick.com.br/image/cache/catalog/produtos-integracao/000349-omie___biscoito-recheado-richester-125g-escureto__conv-1000x1000.jpg",
        sold: 10,
        values: biscoitoValues.barato,
        stock: [
          {
            id: "sd6ad6as2",
            createdAt: new Date(),
            size: biscoitoSizes["90g"],
            value: 10,
          },
        ],
      },
    ],
    extras: [],
    avails: avails.todos,
    sold: 32,
  },
  bisXtra: {
    id: "985a5d5sa5d9848a",
    fullName: "Chocolate BIS XTra",
    shortName: "BIS XTra",
    imageUrl:
      "https://m.media-amazon.com/images/I/61WZAB+XyPL._AC_UF1000,1000_QL80_.jpg",
    category: categories.embalado,
    createdAt: getDate(-500),
    forPrepare: false,
    stock: 10,
    sizes: [bisXtraSizes.normal],
    variations: [
      {
        fullName: "Original",
        id: "a2sdas62",
        createdAt: new Date(),
        avails: avails.todos,
        imageUrl:
          "https://images.tcdn.com.br/img/img_prod/638868/bis_xtra_chocolate_ao_leite_lacta_45g_1791_1_ca1f013c16e70f3af424a87e1efb4474.jpg",
        sold: 30,
        values: [
          {
            id: "sd6ad6as2",
            createdAt: new Date(),
            size: bisXtraSizes.normal,
            value: 10,
          },
        ],
        stock: [
          {
            id: "sd6ad6as2",
            createdAt: new Date(),
            size: bisXtraSizes.normal,
            value: 10,
          },
        ],
      },
      {
        fullName: "Black",
        id: "62sa62da",
        createdAt: new Date(),
        avails: avails.todos,
        imageUrl:
          "https://images.tcdn.com.br/img/img_prod/638868/chocolate_bis_xtra_black_lacta_45g_1792_1_735fced9be708679c38afd6cf29f3d92.jpg",
        sold: 20,
        values: [
          {
            id: "sd6ad6as2",
            createdAt: new Date(),
            size: bisXtraSizes.normal,
            value: 10,
          },
        ],
        stock: [
          {
            id: "sd6ad6as2",
            createdAt: new Date(),
            size: bisXtraSizes.normal,
            value: 10,
          },
        ],
      },
    ],
    extras: [],
    avails: avails.todos,
    sold: 17,
  },
  dorflex: {
    id: "62da2s6d6as2d26",
    fullName: "Dorflex Comprimido",
    shortName: "Dorflex",
    imageUrl:
      "https://redebella.vtexassets.com/arquivos/ids/423840/imagem_2023-11-16_160427285.png?v=638357582710300000",
    category: categories.remedio,
    createdAt: getDate(-500),
    forPrepare: false,
    stock: 7,
    sizes: [dorflexSizes.normal],
    components: [
      {
        id: "2sa62d2as",
        avails: avails.todos,
        createdAt: getDate(-500),
        fullName: "Dioxido de carbono",
        values: [],
      },
    ],
    variations: [
      {
        id: "a2sd62as62d",
        fullName: "Padrão",
        avails: avails.todos,
        createdAt: getDate(-500),
        sold: 50,
        stock: [
          {
            size: dorflexSizes.normal,
            id: "asad6a2s6d2",
            createdAt: new Date(),
            value: 20,
          },
        ],
        values: [
          {
            size: dorflexSizes.normal,
            id: "asad6a2s6d2",
            createdAt: new Date(),
            value: 1,
          },
        ],
      },
    ],
    extras: [],
    avails: avails.todos,
    sold: 4,
  },
};
