import { ICombo, IComboDrink, IComboOther, IComboPizza } from "@td/types";
import { flavors, sizes } from "./pizza";
import { avails } from "./visibility";
import { drinks } from "./drinks";
import { others } from "./others";

const comboPizzas: IComboPizza[] = [
  {
    id: "26d26a2d6",
    createdAt: new Date(),
    flavors: [
      {
        ...flavors.calabresa,
        valuesInCombo: [
          {
            id: "262sa2dsa",
            createdAt: new Date(),
            size: sizes.grande,
            value: 0,
          },
        ],
      },
      {
        ...flavors.doisQ,
        valuesInCombo: [
          {
            id: "6as26sa98",
            createdAt: new Date(),
            size: sizes.grande,
            value: 0,
          },
        ],
      },
      {
        ...flavors.mussarela,
        valuesInCombo: [
          {
            id: "962asf6as",
            createdAt: new Date(),
            size: sizes.grande,
            value: 0,
          },
        ],
      },
      {
        ...flavors.romeu,
        valuesInCombo: [
          {
            id: "62f62dsa2",
            createdAt: new Date(),
            size: sizes.grande,
            value: 0,
          },
        ],
      },
      {
        ...flavors.delicia,
        valuesInCombo: [
          {
            id: "s3adas2a6",
            createdAt: new Date(),
            size: sizes.grande,
            value: 8,
          },
        ],
      },
      {
        ...flavors.calabresa,
        valuesInCombo: [
          {
            id: "6s2ad62a8",
            createdAt: new Date(),
            size: sizes.grande,
            value: 15,
          },
        ],
      },
    ],
    sizes: [sizes.grande],
  },
];
const comboDrinks: IComboDrink[] = [
  {
    ...drinks.antar1,
    valueInCombo: 0,
  },
  {
    ...drinks.pepsi1,
    valueInCombo: 0,
  },
  {
    ...drinks.sukita,
    valueInCombo: 0,
  },
];
const comboOthers: IComboOther[] = [
  {
    ...others.bauru,
    valueInCombo: 0,
  },
];

export const combos: {
  duasPor60: ICombo;
  FcomRefri: ICombo;
  GcomBauru: ICombo;
} = {
  duasPor60: {
    id: "1sa5d1as1d51sa5d",
    imageUrl: "https://techdinner.s3.us-east-2.amazonaws.com/pizza-dobro.jpeg",
    category: "combo",
    fullName: "Promoção Pizza Grande em Dobro",
    displayName: "Pizza G em Dobro",
    description: "Compre 1 pizza e ganhe outra totalmente grátis!",
    rules: ["Sabores promocionais"],
    fixedValue: 59.9,
    createdAt: new Date(),
    sold: 200,
    stock: 1,
    composition: [
      {
        title: "Monte a sua pizza",
        description: "Selecione os sabores da PRIMEIRA pizza",
        position: 0,
        id: "3sd6a2df62",
        createdAt: new Date(),
        max: 1,
        min: 1,
        items: [comboPizzas[0]],
      },
      {
        title: "Monte a sua pizza",
        description: "Selecione os sabores da SEGUNDA pizza",
        position: 1,
        id: "sadas9sa92sa",
        createdAt: new Date(),
        max: 1,
        min: 1,
        items: [comboPizzas[0]],
      },
    ],
    avails: avails.todos,
  },
  FcomRefri: {
    id: "asdasdsad",
    imageUrl: "https://techdinner.s3.us-east-2.amazonaws.com/FcomRefri.jpg",
    category: "combo",
    fullName: "Promoção Pizza Família com Refrigerante de 1L",
    displayName: "Pizza F + Refri GRÁTIS!",
    rules: [],
    createdAt: new Date(),
    sold: 150,
    stock: 10,
    composition: [
      {
        title: "Monte a sua pizza",
        position: 0,
        id: "3sd6a2df62",
        createdAt: new Date(),
        max: 1,
        min: 1,
        items: [comboPizzas[0]],
      },
      {
        title: "Selecione a bebida",
        position: 1,
        id: "sadas9sa92sa",
        createdAt: new Date(),
        max: 1,
        min: 1,
        items: [comboDrinks[0], comboDrinks[1], comboDrinks[2]],
      },
    ],
    avails: avails.todos,
  },
  GcomBauru: {
    id: "safdasdfsdfsda",
    imageUrl: "https://techdinner.s3.us-east-2.amazonaws.com/GcomBauru.jpg",
    category: "combo",
    fullName: "Promoção Pizza Grande com Bauru GRÁTIS",
    displayName: "Pizza G + Bauru GRÁTIS!",
    rules: [],
    createdAt: new Date(),
    sold: 150,
    stock: 10,
    composition: [
      {
        title: "Monte a sua pizza",
        position: 0,
        id: "3sd6a2df62",
        createdAt: new Date(),
        max: 1,
        min: 1,
        items: [comboPizzas[0]],
      },
      {
        title: "Selecione o sabor do bauru",
        position: 1,
        id: "sadas9sa92sa",
        createdAt: new Date(),
        max: 1,
        min: 1,
        items: [comboOthers[0]],
      },
    ],
    avails: avails.todos,
  },
};
