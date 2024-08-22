import { IOther, OtherCategory } from '@td/types';
import { getDate } from 'src/util/date';
import { avails } from './visibility';
import { brands } from './brands';

export const otherCategories: {
  lanche: OtherCategory;
  remedio: OtherCategory;
  embalado: OtherCategory;
  sobremesa: OtherCategory;
} = {
  lanche: {
    id: 'sad5as1da',
    fullName: 'Lanches 🍔',
    createdAt: new Date(),
    avails: avails.todos,
  },
  remedio: {
    id: '5as6das62',
    fullName: 'Medicamentos 💊',
    createdAt: new Date(),
    avails: avails.todos,
  },
  embalado: {
    id: 'a1d5sa51',
    fullName: 'Embalados 🥫',
    createdAt: new Date(),
    avails: avails.todos,
  },
  sobremesa: {
    id: 'sd2a626as',
    fullName: 'Sobremesas 🍨',
    createdAt: new Date(),
    avails: avails.todos,
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
    id: 's21d6sa2d6as',
    fullName: 'Baurú',
    imageUrl: 'https://i.ytimg.com/vi/UHCfbxRgk8c/maxresdefault.jpg',
    category: otherCategories.lanche,
    createdAt: getDate(-500),
    forPrepare: true,
    originalValue: 5,
    stock: 5,
    optionsGroups: [
      {
        id: 'as2d62as2d6as',
        createdAt: new Date(),
        fullName: 'Sabor',
        min: 1,
        max: 1,
        repeatOption: false,
        valuationMethod: 'sum',
        options: [
          {
            fullName: 'Presunto',
            id: '621sdc6as',
            createdAt: new Date(),
            avails: avails.todos,
          },
          {
            fullName: 'Carne de Hambúrguer',
            shortName: 'Carne HB',
            displayName: 'Carne de Hamb.',
            id: '6a2dsa6s',
            createdAt: new Date(),
            avails: avails.todos,
          },
          {
            fullName: 'Frango Empanado (Steak)',
            shortName: 'Steak',
            displayName: 'Frango Emp.',
            id: 'assad0d',
            createdAt: new Date(),
            avails: avails.todos,
          },
        ],
        avails: avails.todos,
      },
    ],
    avails: avails.todos,
    sold: 35,
  },
  hotdog: {
    id: 'sa6d262as6d2a',
    fullName: 'Hot Dog',
    imageUrl:
      'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/01/31/istock-143175178-1iuy9pef5iz3q.jpg',
    category: otherCategories.lanche,
    createdAt: getDate(-500),
    forPrepare: true,
    originalValue: 5,
    stock: 5,
    optionsGroups: [
      {
        id: 'sada15d1a5',
        createdAt: new Date(),
        fullName: 'Condimentos',
        min: 0,
        max: 5,
        repeatOption: true,
        valuationMethod: 'sum',
        avails: avails.todos,
        options: [
          {
            avails: avails.todos,
            fullName: 'Batata Palha',
            id: 'a2sdas62',
            createdAt: new Date(),
          },
          {
            avails: avails.todos,
            fullName: 'Mostarda',
            id: '5s9da5sa5s',
            createdAt: new Date(),
          },
          {
            avails: avails.todos,
            fullName: 'Ketchup',
            id: 'asdas2d66',
            createdAt: new Date(),
          },
          {
            avails: avails.todos,
            fullName: 'Milho',
            id: '1sd6a2sd26',
            createdAt: new Date(),
          },
          {
            avails: avails.todos,
            fullName: 'Ervilha',
            id: '23d6a2s62d',
            createdAt: new Date(),
          },
          {
            avails: avails.todos,
            fullName: 'Parmesão',
            id: '621sdc6as',
            createdAt: new Date(),
            value: 1,
          },
          {
            avails: avails.todos,
            fullName: 'Purê de Batatas',
            id: '484asf8as',
            createdAt: new Date(),
            value: 2,
          },
        ],
      },
    ],
    avails: avails.todos,
    sold: 15,
  },
  torta: {
    id: 'sadasd84as84d8a',
    fullName: 'Torta Fatia',
    imageUrl:
      'https://barlo.com.br/wp-content/uploads/2023/09/Fatia-de-torta-branquinho-com-brigadeiro.jpg',
    category: otherCategories.sobremesa,
    createdAt: getDate(-500),
    forPrepare: true,
    originalValue: 5,
    stock: 5,
    optionsGroups: [
      {
        id: 'sada15d1a5',
        createdAt: new Date(),
        fullName: 'Sabores',
        min: 1,
        max: 1,
        repeatOption: false,
        valuationMethod: 'sum',
        avails: avails.todos,
        options: [
          {
            fullName: 'Brigadeiro',
            id: 'a2sdas62',
            createdAt: new Date(),
            avails: avails.todos,
          },
          {
            fullName: 'Floresta Negra',
            id: '5s9da5sa5s',
            createdAt: new Date(),
            avails: avails.todos,
          },
          {
            fullName: 'Prestígio',
            id: 'asdas2d66',
            createdAt: new Date(),
            avails: avails.todos,
          },
        ],
      },
    ],
    avails: avails.todos,
    sold: 15,
  },
  esfirra: {
    id: '8as4f8a4185a118v8a1',
    fullName: 'Esfirra',
    imageUrl: 'https://i.ytimg.com/vi/NtmGwskpiIQ/maxresdefault.jpg',
    category: otherCategories.lanche,
    createdAt: getDate(-500),
    forPrepare: true,
    originalValue: 5,
    stock: 15,
    optionsGroups: [
      {
        id: 'sada15d1a5',
        createdAt: new Date(),
        fullName: 'Tamanho',
        min: 1,
        max: 1,
        repeatOption: false,
        valuationMethod: 'sum',
        avails: avails.todos,
        options: [
          {
            fullName: 'P',
            id: 'a2sdas62',
            createdAt: new Date(),
            avails: avails.todos,
          },
          {
            fullName: 'G',
            id: '62sa62da',
            createdAt: new Date(),
            value: 2,
            avails: avails.todos,
          },
        ],
      },
      {
        id: 's62d6a2s62d6sa',
        createdAt: new Date(),
        fullName: 'Extras',
        min: 0,
        max: 5,
        repeatOption: false,
        valuationMethod: 'sum',
        avails: avails.todos,
        options: [
          {
            fullName: 'Leite',
            id: 'a2sdas62',
            createdAt: new Date(),
            value: 3,
            avails: avails.todos,
          },
        ],
      },
    ],
    avails: avails.todos,
    sold: 10,
  },
  biscoito: {
    id: '5as1f5as1f1a5sf51a',
    fullName: 'Biscoito Recheado Richester',
    shortName: 'Bisc. Richester',
    imageUrl:
      'https://img.ws.mms.shopee.com.br/f5aeb8c2bb381388e516ab0b457bd63c',
    category: otherCategories.embalado,
    brand: brands.amori,
    createdAt: getDate(-500),
    forPrepare: false,
    originalValue: 5,
    stock: 2,
    optionsGroups: [
      {
        id: 'sada15d1a5',
        createdAt: new Date(),
        fullName: 'Sabor',
        min: 1,
        max: 1,
        repeatOption: false,
        valuationMethod: 'sum',
        avails: avails.todos,
        options: [
          {
            fullName: 'Amori Morango',
            id: 'a2sdas62',
            createdAt: new Date(),
            avails: avails.todos,
          },
          {
            fullName: 'Amori Chocolate',
            id: '62sa62da',
            createdAt: new Date(),
            avails: avails.todos,
          },
          {
            fullName: 'Escureto',
            id: 'sadasdsad',
            createdAt: new Date(),
            avails: avails.todos,
          },
        ],
      },
    ],
    avails: avails.todos,
    sold: 32,
  },
  bisXtra: {
    id: '985a5d5sa5d9848a',
    fullName: 'Chocolate BIS XTra',
    shortName: 'BIS XTra',
    imageUrl:
      'https://m.media-amazon.com/images/I/61WZAB+XyPL._AC_UF1000,1000_QL80_.jpg',
    category: otherCategories.embalado,
    createdAt: getDate(-500),
    forPrepare: false,
    originalValue: 5,
    stock: 10,
    optionsGroups: [
      {
        id: 'sada15d1a5',
        createdAt: new Date(),
        fullName: 'Sabor',
        min: 1,
        max: 1,
        repeatOption: false,
        valuationMethod: 'sum',
        avails: avails.todos,
        options: [
          {
            fullName: 'Original',
            id: 'a2sdas62',
            createdAt: new Date(),
            avails: avails.todos,
          },
          {
            fullName: 'Black',
            id: '62sa62da',
            createdAt: new Date(),
            avails: avails.todos,
          },
        ],
      },
    ],
    avails: avails.todos,
    sold: 17,
  },
  dorflex: {
    id: '62da2s6d6as2d26',
    fullName: 'Dorflex Comprimido',
    shortName: 'Dorflex',
    imageUrl:
      'https://redebella.vtexassets.com/arquivos/ids/423840/imagem_2023-11-16_160427285.png?v=638357582710300000',
    category: otherCategories.remedio,
    createdAt: getDate(-500),
    forPrepare: false,
    stock: 7,
    originalValue: 1,
    optionsGroups: [],
    avails: avails.todos,
    sold: 4,
  },
};
