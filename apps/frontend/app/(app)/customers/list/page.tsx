"use client";

import { useCustomers } from "@/app/context/Customers";
import {
  Avatar,
  Badge,
  Card,
  Flex,
  Strong,
  Table,
  Text,
} from "@radix-ui/themes";
import { address, currency, date, name, phoneNumber } from "@td/functions";
import { ICustomer } from "@td/types";

export default function CustomersList() {
  const { customers } = useCustomers();
  const getAddress = (customer: ICustomer) => {
    const _address =
      customer.addresses.find((x) => x.isDefault) ?? customer.addresses[0];

    return _address ? (
      <Text className="flex gap-1">
        <Strong>{currency(_address.initialFee)}</Strong>
        {address(_address)}
      </Text>
    ) : (
      ""
    );
  };
  const getPhoneNumber = (customer: ICustomer) => {
    const _pn = (
      customer.phoneNumbers.find((x) => x.isDefault) ?? customer.phoneNumbers[0]
    ).value;

    return _pn ? phoneNumber(_pn) : "";
  };
  return (
    <Flex direction={"column"} gap="1">
      {customers.map((customer) => (
        <Card key={customer.id} asChild>
          <button>
            <Flex align={"center"} gap="2">
              <Avatar
                size={"5"}
                src={customer.imageUrl}
                fallback={customer.initials ?? "CD"}
              />
              <Flex direction={"column"} overflowX={"auto"}>
                <Text truncate={true}>
                  <Strong>{customer.displayName}</Strong>
                  {!!customer.tags.length && (
                    <Text size={"1"}>
                      {" "}
                      {customer.tags.map((x) => x.value).join(", ")}
                    </Text>
                  )}
                </Text>
                <Flex gap="1">
                  {customer.phoneNumbers.map((pn) => (
                    <Badge key={pn.id} size={"1"}>
                      {phoneNumber(pn.value)}
                    </Badge>
                  ))}
                </Flex>
                <Text size={"2"} truncate className="">
                  {getAddress(customer)}
                </Text>
                <Flex
                  align={"center"}
                  gap="1"
                  className="opacity-50"
                  overflowX={"auto"}
                >
                  <Text truncate size={"1"}>
                    Criado em: {date(customer.createdAt)}
                  </Text>
                  {customer.lastPurchaseAt ? (
                    <Text truncate size="1">
                      {` | `}Ult.Ped: {date(customer.lastPurchaseAt)} |{" "}
                      {customer.purchases} peds |{" "}
                      {currency(customer.totalAmount)}
                    </Text>
                  ) : (
                    <Badge color="grass">Novo</Badge>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </button>
        </Card>
      ))}
    </Flex>
  );
  return (
    <Table.Root size={"3"} variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <Text truncate={true}>Nome</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text truncate={true}>Telefone</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="max-sm:hidden">
            <Text truncate={true}>Endereço</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="max-sm:hidden">
            <Text truncate={true}>Última compra</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="max-sm:hidden">
            <Text truncate={true}>Valor gasto</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="max-sm:hidden">
            <Text truncate={true}>Cadastrado em</Text>
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {customers.map((customer) => (
          <>
            <Table.Row
              key={customer.id}
              align={"center"}
              className="select-none hover:bg-zinc-800"
            >
              <Table.RowHeaderCell>
                <Flex align={"center"} gap="2">
                  <Avatar
                    src={customer.imageUrl}
                    fallback={customer.initials ?? "CD"}
                  />
                  <Flex direction={"column"}>
                    <Text truncate={true}>
                      <Strong>{name(customer)}</Strong>
                    </Text>
                    {!!customer.tags.length && (
                      <Text size={"1"}>
                        {customer.tags.map((x) => x.value).join(", ")}
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Flex direction={"column"}>
                  <Text truncate={true}>{getPhoneNumber(customer)}</Text>
                  {customer.phoneNumbers.length > 1 && (
                    <Flex className="overflow-x-auto no-scroll">
                      {customer.phoneNumbers
                        .filter((x) => !x.isDefault)
                        .map((pn) => (
                          <Text key={pn.id} size={"1"} truncate={true}>
                            {phoneNumber(pn.value)}
                          </Text>
                        ))}
                    </Flex>
                  )}
                </Flex>
              </Table.Cell>
              <Table.Cell
                maxWidth={"350px"}
                className="overflow-x-auto no-scroll max-sm:hidden"
              >
                <Text truncate={true} trim={"both"}>
                  {getAddress(customer)}
                </Text>
              </Table.Cell>
              <Table.Cell className="max-sm:hidden">
                {customer.lastPurchaseAt ? (
                  date(customer.lastPurchaseAt)
                ) : (
                  <Badge color="grass">Novo</Badge>
                )}
              </Table.Cell>
              <Table.Cell className="max-sm:hidden">
                {currency(customer.totalAmount)}
              </Table.Cell>
              <Table.Cell className="max-sm:hidden">
                {date(customer.createdAt)}
              </Table.Cell>
            </Table.Row>
            <Text size={"1"}>
              {customer.addresses.length > 0 && getAddress(customer)}
            </Text>
            <div className="md:hidden w-full bg-red-500"></div>
          </>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
