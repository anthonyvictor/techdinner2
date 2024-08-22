import { ICustomer } from '@td/types';
import { getDate } from 'src/util/date';

export const customers: {
  carlos: ICustomer;
  alberto: ICustomer;
  joana: ICustomer;
  enzo: ICustomer;
  abel: ICustomer;
} = {
  enzo: {
    createdAt: getDate(-(60 * 24 * 1)),
    fullName: 'Enzo',
    displayName: 'Enzo',
    initials: 'En',
    id: 'asdas62d62as2d62sa2',
    purchases: 0,
    totalAmount: 0,
    shortName: 'Enzo',
    imageUrl:
      'https://img.a.transfermarkt.technology/portrait/big/648195-1669894717.jpg?lm=1',
    tags: [],
    phoneNumbers: [
      {
        isDefault: true,
        id: 'a62sd6as2d6as2',
        isTelegram: true,
        isWhatsapp: true,
        value: '71988726969',
        createdAt: new Date(),
      },
    ],

    addresses: [],
  },
  carlos: {
    createdAt: getDate(-(60 * 24 * 60)),
    fullName: 'Carlos João Andrade',
    initials: 'CJ',
    id: 'sa65d1sa651d511sa1',
    displayName: 'Carlos João',
    lastPurchaseAt: getDate(-(60 * 24 * 10)),
    purchases: 45,
    totalAmount: 650,
    shortName: 'Carlos J',
    imageUrl: 'https://techdinner.s3.us-east-2.amazonaws.com/cristiano.jpg',
    tags: [
      {
        createdAt: new Date(),
        id: 'sa8d54as4',
        value: 'Filho de dona Dalva',
      },
    ],
    phoneNumbers: [
      {
        isDefault: true,
        id: '6as1d65as16d1',
        isTelegram: true,
        isWhatsapp: true,
        value: '71984479191',
        createdAt: new Date(),
      },
    ],

    addresses: [
      {
        cep: '40170720',
        isDefault: true,
        id: '5sad5sa16',
        createdAt: new Date(),
        number: '52',
        neighborhood: 'Ondina',
        place: 'Hospital Jorge Valente',
        reference: 'Ao lado da farmacia',
        street: 'Avenida Anitta Garibaldi',
        initialFee: 5,
      },
    ],
  },
  abel: {
    createdAt: getDate(-(60 * 24 * 45)),
    fullName: 'Abel Doleite',
    initials: 'AD',
    id: 'as2das62ds2a62s',
    displayName: 'Abel Doleite',
    lastPurchaseAt: getDate(-(60 * 24 * 15)),
    purchases: 2,
    totalAmount: 30,
    shortName: 'Abel D',
    tags: [
      {
        createdAt: new Date(),
        id: 'sa8d54as4',
        value: 'Amigo de fofao',
      },
    ],
    phoneNumbers: [
      {
        isDefault: true,
        id: '6as1d65as16d1',
        isTelegram: false,
        isWhatsapp: false,
        value: '21988754212',
        createdAt: new Date(),
      },
    ],

    addresses: [],
  },
  joana: {
    createdAt: getDate(-(60 * 24 * 5)),
    fullName: 'Joaninha Daltro',
    initials: 'JD',

    id: '61a5s1d61a1d65sa16',
    displayName: 'Joani Daltro',
    shortName: 'Joani D',
    imageUrl: 'https://techdinner.s3.us-east-2.amazonaws.com/andressa.jpg',
    tags: [],
    lastPurchaseAt: getDate(-(60 * 24 * 2)),
    purchases: 2,
    totalAmount: 125.5,
    phoneNumbers: [
      {
        isDefault: true,
        id: '541d654as51d',
        isTelegram: false,
        isWhatsapp: true,
        value: '71988726927',
        createdAt: new Date(),
      },
    ],
    addresses: [
      {
        cep: '40170720',
        isDefault: true,
        id: '5sad5sa16',
        createdAt: new Date(),
        number: '01',
        neighborhood: 'Ondina',
        place: 'Pe de Goiaba',
        reference:
          'Descendo o pe de goiaba em frente a casa de Adriano onde tem uma casa com um monte de plantas na frente na sacada',
        street: 'Travessa Assembléia de Deus',
        initialFee: 5,
      },
    ],
  },
  alberto: {
    createdAt: getDate(-60 * 24 * 22),
    fullName: 'Alberto Santos',
    initials: 'AS',
    id: 'as6d51as51d1as65s4ad1',
    displayName: 'Alberto Santos',
    shortName: 'Alberto Santos',
    lastPurchaseAt: getDate(-60 * 24 * 22),
    totalAmount: 50,
    purchases: 1,
    imageUrl: 'https://techdinner.s3.us-east-2.amazonaws.com/thonny.png',
    tags: [],
    phoneNumbers: [
      {
        isDefault: true,
        id: '65asd165as1',
        isTelegram: false,
        isWhatsapp: false,
        value: '71984479191',
        createdAt: new Date(),
      },
      {
        isDefault: false,
        id: 'd26asd26as262',
        isTelegram: false,
        isWhatsapp: false,
        value: '71988726969',
        createdAt: new Date(),
      },
    ],
    addresses: [],
  },
};
