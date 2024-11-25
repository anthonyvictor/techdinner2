import { IPromo, IPromoItemPizza, IPromoRule } from "@td/types/src/promo";
import { avails } from "./visibility";
import { crusts, flavors, groups, sizes } from "./pizza";
import { drinks } from "./drinks";
import { IDrinkFlavor } from "@td/types";
import { others } from "./others";

const getFlavors = (groupsName: string[], values?: "29") => {
  const _groups = Object.values(groups).filter((y) =>
    groupsName
      .map((z) => z.toLowerCase())
      .some((x) => y.fullName.toLowerCase().includes(x))
  );
  const _flavors = Object.values(flavors).filter((x) =>
    _groups.some((y) => y.id === x.group.id)
  );
  return _flavors.map((x) => {
    let _x = { ...x };
    if (values === "29") {
      _x.values = _x.values.map((y) => ({ ...y, value: 29 }));
    }

    return _x;
  });
  // return _groups.map((x) => x.flavors).flat();
};

const freeSizeValue = [
  { size: sizes.media, value: 0, id: "2s2sa", createdAt: new Date() },
  { size: sizes.grande, value: 0, id: "sdasd", createdAt: new Date() },
  { size: sizes.familia, value: 0, id: "6sa22", createdAt: new Date() },
];

const onlyPixCash: IPromoRule = {
  type: "specificPaymentTypes",
  id: "s2a92ca9292",
  fullName: "Pagamento somente em espécie ou PIX",
  createdAt: new Date(),
  anotherPaymentTypeFee: "5%",
  value: ["pix", "cash"],
};

const pizza1: IPromoItemPizza = {
  position: 1,
  isMandatory: true,
  id: "primeiraPizza",
  fullName: "Primeira pizza",
  createdAt: new Date(),
  type: "pizza",
};

export const promos: {
  entregaGratisPrimeiroPedido: IPromo;
  entregaMetade: IPromo;
  duasPor58: IPromo;
  bordaERefri: IPromo;
  segundaPizzaGratis: IPromo;
  primeiros5RefriGratis: IPromo;
} = {
  primeiros5RefriGratis: {
    id: "p5rg",
    createdAt: new Date(),

    fullName: "Primeiros 5 pedidos ganham refrigerante grátis!",
    description:
      "Os 5 primeiros pedidos contendo uma pizza grande ou família, levam um refrigerante de 1L grátis!",
    isAutomatic: true,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0wHk8DeqkOi4Vyn4oZEjkD2Pmx3wl-mGS4g&s",
    rules: [
      {
        type: "todayMaxOrdersWithLastOnePizzaSize",
        value: 4,
        sizesId: [sizes.grande.id, sizes.familia.id],
        id: "2sd29asda",
        createdAt: new Date(),
        fullName: "Primeiros 5 pedidos com pizza grande ou família",
      },
      {
        type: "orderMinPizzaSizes",
        value: 1,
        sizesId: [sizes.grande.id, sizes.familia.id],
        id: "sadsadad9",
        createdAt: new Date(),
        fullName: "O pedido deve ter pelo menos 1 pizza grande ou família",
      },
    ],
    builders: [
      {
        position: 1,
        isMandatory: true,
        id: "as9a2cas299",
        createdAt: new Date(),
        type: "group",
        fullName: "Selecione o acompanhamento!",
        min: 1,
        max: 1,
        options: [
          {
            id: "bebida1",
            createdAt: new Date(),
            type: "drink",
            drinkId: drinks.pepsi1.id,
          },
          {
            id: "bebida2",
            createdAt: new Date(),
            type: "drink",
            drinkId: drinks.antar1.id,
          },
          {
            id: "bebida3",
            createdAt: new Date(),
            type: "drink",
            drinkId: drinks.suco4.id,
            flavors: [drinks.suco4?.flavors?.[0] as IDrinkFlavor],
          },
          {
            id: "bauru1",
            createdAt: new Date(),
            type: "other",
            otherId: others.bauru.id,
            sizes: [others.bauru.sizes[0]],
            variations: [others.bauru.variations[0]],
          },
        ],
      },
    ],
    actions: [
      {
        id: "sd29asd9sa92",
        createdAt: new Date(),
        type: "promoItemsGroupDiscount",
        discount: "100%",
        maxDiscount: 7,
        itemsGroupId: "as9a2cas299",
      },
    ],
    avails: avails.segASex,
    sold: 200,
  },
  entregaGratisPrimeiroPedido: {
    id: "egpp",
    createdAt: new Date(),
    fullName: "Entrega grátis no primeiro pedido!",
    description: "Clientes novos ganham entrega grátis!",
    subDescription: "Valor máximo de  na entrega: R$ 10,00",
    isAutomatic: true,
    imageUrl: "https://www.designi.com.br/images/preview/10689314.jpg",
    rules: [
      {
        type: "customerMaxOrders",
        value: 0,
        id: "asd95as5d",
        createdAt: new Date(),
        fullName: "Clientes com 0 pedidos",
      },
    ],
    actions: [
      {
        id: "sd29asd9sa92",
        createdAt: new Date(),
        type: "deliveryFeeDiscount",
        discount: "100%",
        maxDiscount: 10,
      },
    ],
    avails: [
      {
        at: "*",
        createdAt: new Date(),
        id: "a1d2a6s2d2as",
        is: "enabled",
        to: "*",
      },
    ],
    sold: 100,
  },
  entregaMetade: {
    id: "epm",
    createdAt: new Date(),
    fullName: "Entrega pela metade a cada R$ 100!",
    description:
      "Clientes ganham entrega pela metade do preço a cada 100 reais em compras!",
    subDescription:
      "Valor mínimo de taxa de entrega para aplicar desconto: R$ 3,00",
    isAutomatic: true,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF0GekDMu5ka1qSncd1vXwJpbmY-fFYEK8Qg&s",
    rules: [
      {
        type: "customerForEverySpentValue",
        value: 100,
        id: "asd95as5d",
        createdAt: new Date(),
      },
      {
        type: "deliveryMinFee",
        value: 3,
        id: "d6as226a2",
        createdAt: new Date(),
      },
    ],
    actions: [
      {
        id: "sd29asd9sa92",
        createdAt: new Date(),
        type: "deliveryFeeDiscount",
        discount: "100%",
        maxDiscount: 10,
      },
    ],
    avails: [
      {
        at: "*",
        createdAt: new Date(),
        id: "a1d2a6s2d2as",
        is: "enabled",
        to: "*",
      },
    ],
    sold: 100,
  },

  duasPor58: {
    id: "dp58",
    createdAt: new Date(),

    fullName: "Duas Pizzas GRANDES por R$ 57,90",
    description: "Sábado e Domingo, duas pizzas grandes saem por R$ 57,90",
    subDescription: "*Válido somente para para pagamentos via PIX ou espécie",
    isAutomatic: false,
    imageUrl: "https://i.ibb.co/WcTCy8k/Frame-1.png",
    rules: [onlyPixCash],
    builders: [
      {
        position: 1,
        isMandatory: true,
        id: "pizza1",
        createdAt: new Date(),
        type: "pizza",
        sizes: [{ ...sizes.grande, maxflavors: 2 }],
        flavors: getFlavors(["trad", "carne"], "29"),
        fullName: "Primeira pizza",
      },
      {
        position: 2,
        isMandatory: true,
        id: "pizza2",
        createdAt: new Date(),
        type: "pizza",
        sizes: [{ ...sizes.grande, maxflavors: 2 }],
        flavors: getFlavors(["trad", "carne"], "29"),
        fullName: "Primeira pizza",
      },
    ],
    actions: [
      {
        id: "sd29asd9sa92",
        createdAt: new Date(),
        type: "promoFixedValue",
        fixedvalue: 57.9,
      },
    ],
    avails: avails.sabDom,
    sold: 500,
  },

  bordaERefri: {
    id: "ber",
    createdAt: new Date(),
    fullName: "Borda e refri por + R$ 3,00!",
    description:
      "Toda segunda, acrescente + R$ 3,00 em uma pizza média, grande ou família e leve borda recheada e 1 refrigerante de 1L",
    subDescription: "*Válido somente para para pagamentos via PIX ou espécie",
    isAutomatic: false,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOUJAv3xFuRL71jLwtA9FLKVVBZ2o0T9WzKA&s",
    rules: [onlyPixCash],
    builders: [
      {
        position: 1,
        isMandatory: true,
        id: "pizza",
        createdAt: new Date(),
        fullName: "Pizza",
        description: "Selecione a pizza do combo!",
        type: "pizza",
        sizes: [sizes.media, sizes.grande, sizes.familia],
        crusts: [
          { ...crusts.requeijao, values: freeSizeValue },
          { ...crusts.cheddar, values: freeSizeValue },
        ],
      },

      {
        position: 2,
        isMandatory: true,
        id: "as9a2cas299",
        createdAt: new Date(),
        type: "group",
        fullName: "Bebida",
        description: "Selecione a bebida do combo!",
        min: 1,
        max: 1,
        options: [
          {
            id: "bebida1",
            createdAt: new Date(),
            type: "drink",
            drinkId: drinks.pepsi1.id,
            originalValue: 3,
          },
          {
            id: "bebida2",
            createdAt: new Date(),
            type: "drink",
            drinkId: drinks.antar1.id,
            originalValue: 3,
          },
          {
            id: "bebida3",
            createdAt: new Date(),
            type: "drink",
            drinkId: drinks.suco4.id,
            flavors: [drinks.suco4?.flavors?.[0] as IDrinkFlavor],
            originalValue: 3,
          },
        ],
      },
    ],
    actions: [
      {
        id: "sd29asd9sa92",
        createdAt: new Date(),
        type: "pizzaCrustDiscount",
        discount: "100%",
        maxDiscount: 12,
      },
    ],
    avails: [
      {
        at: "*",
        createdAt: new Date(),
        id: "a1d2a6s2d2as",
        is: "disabled",
        to: "*",
      },
      {
        at: ["monday"],
        until: new Date("2024-12-01 05:00:00"),
        createdAt: new Date(),
        id: "a1d2a6s2d2as",
        is: "enabled",
        to: "*",
      },
    ],
    sold: 150,
  },

  segundaPizzaGratis: {
    id: "spg",
    createdAt: new Date(),
    fullName: "Segunda Pizza Grátis!",
    description:
      "De segunda à sexta, até as 19h, comprando uma pizza você leva outra do mesmo tamanho totalmente grátis!",
    subDescription:
      "*Válido somente para os sabores promocionais e para pagamentos via PIX ou espécie",
    isAutomatic: false,
    imageUrl:
      "https://fdr.com.br/wp-content/uploads/2021/07/E6sD6BvWEAU8i05.jpg",
    rules: [onlyPixCash],
    builders: [
      pizza1,
      {
        position: 2,
        isMandatory: true,
        id: "segundaPizza",
        createdAt: new Date(),
        fullName: "Segunda pizza",
        type: "pizza",
        flavors: getFlavors(["trad", "carne"]),
        sameSizeAs: pizza1.id,
      },
    ],
    actions: [
      {
        id: "sd29asd9sa92",
        createdAt: new Date(),
        type: "promoItemDiscount",
        discount: "100%",
        itemId: "segundaPizza",
      },
    ],
    avails: [
      {
        at: "*",
        createdAt: new Date(),
        id: "a1d2a6s2d2as",
        is: "disabled",
        to: "*",
      },
      {
        at: [
          {
            days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
            hours: [{ from: { h: 16, m: 0 }, until: { h: 19, m: 1 } }],
          },
        ],
        until: new Date("2024-12-01 05:00:00"),
        createdAt: new Date(),
        id: "a1d2a6s2d2as",
        is: "enabled",
        to: "*",
      },
    ],
    sold: 300,
  },
};
