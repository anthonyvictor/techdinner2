"use client";
import { useHome } from "@/app/context/Home";
import { Card } from "@radix-ui/themes";
import { Header } from "./Header";
import { CustomerBox } from "./CustomerBox";
import { TypeBox } from "./TypeBox";
import { ItemsBox } from "./ItemsBox";
import { PaymentBox } from "./PaymentBox";
import { Bottom } from "./Bottom";

export default function Order() {
  const { currentOrder } = useHome();

  // if (!currentOrder?.id) return <></>;
  return (
    <>
      <Card className="w-full lg:w-80 " style={{ padding: "0" }}>
        <div
          // style={{ background: "var(--gray-3)" }}
          className="flex flex-col gap-2 p-2
     max-sm:w-full
     h-full max-h-full 
     min-h-0 shrink-0 "
        >
          <Header />
          <CustomerBox />
          <TypeBox />
          <ItemsBox />
          <PaymentBox />
          <Bottom />
        </div>
      </Card>
    </>
  );
}
