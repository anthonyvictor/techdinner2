import React from "react";
import { BiDrink, BiSolidOffer } from "react-icons/bi";
import { IItemMenu } from "../types/itemMenu";
import { PiPizza } from "react-icons/pi";
import { GiHotDog } from "react-icons/gi";
import { PizzaBuilder } from "@/app/components/itemBuilder/pizza";

export const itemsMenu: IItemMenu[] = [
  {
    name: "pizzas",
    label: "Pizzas",
    icon: PiPizza,
    component: PizzaBuilder,
    color: "orange",
  },
  {
    name: "drinks",
    label: "Bebidas",
    icon: BiDrink,
    component: PizzaBuilder,
    color: "amber",
  },
  {
    name: "others",
    label: "Outros",
    icon: GiHotDog,
    component: PizzaBuilder,
    color: "blue",
  },
  {
    name: "offers",
    label: "Promoções",
    icon: BiSolidOffer,
    component: PizzaBuilder,
    color: "purple",
  },
];
