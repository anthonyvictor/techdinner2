"use client";
import { itemsMenu } from "@/app/infra/data/itemsMenu";
import {
  AlertDialog,
  Button,
  Dialog,
  Flex,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes";
import { IDrink, IPizza, IOther, ICombo, IBuildingPizza } from "@td/types";
import { ReactNode, useEffect, useState } from "react";
import { ItemsContainer } from "./Container";
import { Drink } from "./Drink";
import { Pizza } from "./Pizza";
import { Other } from "./Other";
import { Combo } from "./Combo";
import { api } from "@/app/infra/util/api";
import { ItemBuilder } from "@/app/components/itemBuilder/ItemBuilder";
import { ContrDialog } from "@/app/components/ControlledDialog";

interface IItems {
  pizzas: IBuildingPizza[];
  drinks: IDrink[];
  others: IOther[];
  combos: ICombo[];
}
export const ItemsPanel = () => {
  const [items, setItems] = useState<IItems>({
    pizzas: [],
    drinks: [],
    others: [],
    combos: [],
  });

  useEffect(() => {
    (async () => {
      const result = await api(`items-panel`);
      // fetch("/api/items-panel");
      if (result.ok) {
        const data = await result.json();
        setItems(data);
      }
    })();
  }, []);
  return (
    <div
      className="flex flex-col 
    flex-grow shrink w-0 gap-2"
    >
      <Flex id="menus" gap={"2"} p={"1"} justify={"center"} overflowX={"auto"}>
        {itemsMenu.map((item) => {
          return (
            <ContrDialog
              key={item.name}
              trigger={
                <Button variant="surface" color={item.color}>
                  <Flex align={"center"} gap="2">
                    <Text>{<item.icon />}</Text>
                    <Text>{item.label}</Text>
                  </Flex>
                </Button>
              }
            >
              <ItemBuilder>{<item.component />}</ItemBuilder>
            </ContrDialog>
          );
        })}
      </Flex>
      <ItemsContainer>
        {(
          items.pizzas.map((pizza, i) => {
            const r = i % 2 === 0 ? [pizza, items.pizzas[i + 1]] : [];
            return r;
          }, [] as IBuildingPizza[]) as unknown as IBuildingPizza[][]
        )
          .filter((x) => {
            return x.length > 0;
          })
          .map((pizzas) => {
            const Wrapper = ({ children }: { children: ReactNode[] }) =>
              pizzas[1]?.id ? (
                <Flex direction={"column"} gap="2">
                  {children}
                </Flex>
              ) : (
                <Flex
                  direction={"column"}
                  gap="2"
                  flexGrow={"0"}
                  height={"50%"}
                >
                  {children}
                </Flex>
              );

            return (
              <Wrapper
                key={pizzas.reduce(
                  (acc, pizza) => `${acc}-${pizza?.id ?? "x"}`,
                  ""
                )}
              >
                <Pizza key={pizzas[0].id} pizza={pizzas[0]} />
                {pizzas[1] && <Pizza key={pizzas[1].id} pizza={pizzas[1]} />}
              </Wrapper>
            );
          })}
      </ItemsContainer>
      <ItemsContainer>
        {(
          items.drinks.map((drink, i) => {
            const r = i % 2 === 0 ? [drink, items.drinks[i + 1]] : [];
            return r;
          }, [] as IDrink[]) as unknown as IDrink[][]
        )
          .filter((x) => {
            return x.length > 0;
          })
          .map((drinks) => (
            <Flex
              direction={"column"}
              gap="2"
              key={drinks.reduce(
                (acc, drink) => `${acc}-${drink?.id ?? "x"}`,
                ""
              )}
            >
              <Drink key={drinks[0].id} drink={drinks[0]} />
              {drinks[1] && <Drink key={drinks[1].id} drink={drinks[1]} />}
            </Flex>
          ))}
      </ItemsContainer>
      <ItemsContainer>
        {items.others.map((other) => (
          <Other key={other.id} other={other} />
        ))}
      </ItemsContainer>
      <ItemsContainer>
        {items.combos.map((combo) => (
          <Combo key={combo.id} combo={combo} />
        ))}
      </ItemsContainer>
      {/* <ItemsContainer></ItemsContainer> */}
      {/* <ItemsContainer></ItemsContainer> */}
    </div>
  );
};
