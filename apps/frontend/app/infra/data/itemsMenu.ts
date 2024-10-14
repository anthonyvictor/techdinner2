import React from "react"
import { BiDrink, BiSolidOffer } from "react-icons/bi"
import { IItemMenu } from "../types/itemMenu"
import { PiPizza } from "react-icons/pi"
import { GiHotDog } from "react-icons/gi"
import { PizzaBuilder } from "@/app/components/itemBuilder/pizza"
import { DrinkBuilder } from "@/app/components/itemBuilder/drink"
import { OtherBuilder } from "@/app/components/itemBuilder/other"

export const itemsMenu: IItemMenu[] = [
  {
    name: "pizzas",
    label: "Pizzas",
    shortLabel: "Pizzas",
    icon: PiPizza,
    component: PizzaBuilder,
    color: "orange",
  },
  {
    name: "drinks",
    label: "Bebidas",
    shortLabel: "Bebidas",
    icon: BiDrink,
    component: DrinkBuilder,
    color: "amber",
  },
  {
    name: "others",
    label: "Outros",
    shortLabel: "Outros",
    icon: GiHotDog,
    component: OtherBuilder,
    color: "blue",
  },
  {
    name: "offers",
    label: "Promoções",
    shortLabel: "Promos",
    icon: BiSolidOffer,
    component: PizzaBuilder,
    color: "purple",
  },
]
