import { IOrderItemPizza, IPizza } from "@td/types";
import { getDate } from "src/util/date";
import { crusts, doughs, extras, flavors, sizes } from "./pizza";

export const pizzas: {
  g1: IOrderItemPizza;
  g2: IOrderItemPizza;
  g3: IOrderItemPizza;
  g4: IOrderItemPizza;
  f1: IOrderItemPizza;
  f2: IOrderItemPizza;
  f3: IOrderItemPizza;
  m1: IOrderItemPizza;
  m2: IOrderItemPizza;
  m3: IOrderItemPizza;
  p1: IOrderItemPizza;
  p2: IOrderItemPizza;
  p3: IOrderItemPizza;
  p4: IOrderItemPizza;
  p5: IOrderItemPizza;
  p6: IOrderItemPizza;
} = {
  p1: {
    id: "d5a1as515d15",
    createdAt: getDate(-5),
    flavors: [
      { ...flavors.calabresa, modifications: [], code: "63s1a651sa1f5a1" },
    ],
    type: "pizza",
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
    size: sizes.pequena,
    sold: 1500,
  },
  p2: {
    id: "ad6as2da6sa",
    type: "pizza",
    createdAt: getDate(-15),
    flavors: [
      { ...flavors.delicia, modifications: [], code: "56as1d1a5s1d51as51da" },
    ],
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
    size: sizes.pequena,
    sold: 800,
  },
  p3: {
    id: "sdfasgsadgdsg",
    type: "pizza",
    createdAt: getDate(-15),
    flavors: [
      { ...flavors.frango, modifications: [], code: "sa62fas561f65a1s561f" },
    ],
    size: sizes.pequena,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
    sold: 1000,
  },
  p4: {
    id: "a5s1d51sa51sa",
    type: "pizza",
    createdAt: getDate(-15),
    flavors: [
      { ...flavors.verona, modifications: [], code: "2as15f1a6s51f561a56f" },
    ],
    size: sizes.pequena,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
    sold: 72,
  },
  p5: {
    id: "sad596ssda2sa9dd",
    type: "pizza",
    createdAt: getDate(-15),
    flavors: [
      { ...flavors.romeu, modifications: [], code: "65a1s65f15as1f51as51f" },
    ],
    size: sizes.pequena,
    sold: 90,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
  },
  p6: {
    id: "SADSADSADAS",
    type: "pizza",
    createdAt: getDate(-15),
    flavors: [
      { ...flavors.mussarela, modifications: [], code: "651a65f1as15f1sa5" },
    ],
    size: sizes.pequena,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
    sold: 500,
  },
  g1: {
    id: "515d1as1d",
    type: "pizza",
    createdAt: getDate(-10),
    flavors: [
      {
        ...flavors.calabresa,
        modifications: [],
        code: "4sa654f651as561f5a1s561f",
      },
      { ...flavors.delicia, modifications: [], code: "6s5a1f65a5s61f5" },
      { ...flavors.romeu, modifications: [], code: "af6165g1fd1hh151fg" },
    ],
    size: sizes.grande,
    crust: crusts.cheddar,
    dough: doughs.batataGrossa,
    extras: [extras.cebola],
    sold: 350,
  },
  g2: {
    id: "62sad6aas",
    type: "pizza",
    createdAt: getDate(-16),
    flavors: [
      { ...flavors.delicia, modifications: [], code: "854j456f65j16fgj1" },
      { ...flavors.romeu, modifications: [], code: "fj6541f6g5j561fg651j" },
      { ...flavors.verona, modifications: [], code: "6626l2u2u2l" },
    ],
    size: sizes.grande,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
    sold: 200,
  },
  g3: {
    id: "2as2f6as",
    type: "pizza",
    createdAt: getDate(-16),
    flavors: [
      { ...flavors.delicia, modifications: [], code: "safasdfa1f61a615sf1" },
      { ...flavors.frango, modifications: [], code: "6a5s1d65as1d1" },
      { ...flavors.calabresa, modifications: [], code: "63sa5f65as1f61asd51f" },
    ],
    size: sizes.grande,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
    sold: 700,
  },
  g4: {
    id: "62sda2",
    type: "pizza",
    createdAt: getDate(-16),
    flavors: [
      { ...flavors.calabresa, modifications: [], code: "6g165d51h5151j51fg" },
    ],
    size: sizes.grande,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
    sold: 150,
  },
  f1: {
    id: "2sa66sa2d",
    type: "pizza",
    createdAt: getDate(-23),
    flavors: [
      { ...flavors.romeu, modifications: [], code: "shdfhshsgjfgjs" },
      { ...flavors.delicia, modifications: [], code: "sdjdfjdfgdfjggd" },
      { ...flavors.verona, modifications: [], code: "dfgjkghkfgdfjdfgj" },
      { ...flavors.verona, modifications: [], code: "sjsdfghsdgfsdfgdsfgsd" },
    ],
    size: sizes.familia,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
    sold: 70,
  },
  f2: {
    id: "asdasdas",
    type: "pizza",
    createdAt: getDate(-23),
    flavors: [
      { ...flavors.delicia, modifications: [], code: "dsfgsdgdsfghdshdsf" },
      { ...flavors.calabresa, modifications: [], code: "sdfhsdfhdshdfdsdf" },
      { ...flavors.delicia, modifications: [], code: "sdfhdfshdhsdhdsfhdsfh" },
      { ...flavors.romeu, modifications: [], code: "dshsdfhdsfhdsfhdfsh" },
    ],
    size: sizes.familia,
    sold: 69,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
  },
  f3: {
    id: "5sa515d1sa",
    type: "pizza",
    createdAt: getDate(-23),
    flavors: [
      {
        ...flavors.calabresa,
        modifications: [],
        code: "asgdasdghdfhadfhdfajaa",
      },
      { ...flavors.doisQ, modifications: [], code: "ajfjddfddadfhadfshadfhah" },
    ],
    size: sizes.familia,
    sold: 250,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
  },
  m1: {
    id: "sadas62d",
    type: "pizza",
    createdAt: getDate(-23),
    flavors: [
      { ...flavors.calabresa, modifications: [], code: "ahafdshfhsfahash" },
      { ...flavors.doisQ, modifications: [], code: "asdhashasdhsdahas" },
    ],
    size: sizes.media,
    sold: 85,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
  },
  m2: {
    id: "62sa6262as",
    type: "pizza",
    createdAt: getDate(-23),
    flavors: [
      { ...flavors.calabresa, modifications: [], code: "asjfasjfkoa" },
      { ...flavors.frango, modifications: [], code: "lsakjfoksajfsakfkoas" },
    ],
    size: sizes.media,
    sold: 105,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
  },
  m3: {
    id: "32sada26d",
    type: "pizza",
    createdAt: getDate(-23),
    flavors: [
      { ...flavors.delicia, modifications: [], code: "asfsaçsçfklsamçkfmaslk" },
      { ...flavors.casa, modifications: [], code: "çaslmfpaslflmsalmf" },
    ],
    size: sizes.media,
    sold: 105,
    crust: crusts.semBorda,
    dough: doughs.normal,
    extras: [],
  },
};
