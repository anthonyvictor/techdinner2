import { useHome } from "@/app/context/Home";
import { Badge, Flex, IconButton } from "@radix-ui/themes";
import { getDuration } from "@td/functions";
import { IoCloseCircle, IoMenu } from "react-icons/io5";

export const Header = () => {
  const { currentOrder, closeOrder, setShowPanel } = useHome();
  if (!currentOrder) return <></>;
  return (
    <Flex justify={"between"} align={"center"}>
      <IconButton
        variant="ghost"
        asChild
        onClick={() => {
          setShowPanel((prev) => !prev);
        }}
      >
        <button>
          <IoMenu className="text-4xl md:text-2xl" />
        </button>
      </IconButton>
      <Badge title={currentOrder.id}>
        {currentOrder?.number
          ? `#${currentOrder.number}`
          : currentOrder.id.slice(0, 5)}
      </Badge>
      {(() => {
        const data = getDuration(currentOrder?.createdAt);
        return (
          <Badge color={data.color}>
            {currentOrder?.createdAt.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Badge>
        );
      })()}
      <IconButton variant="ghost" asChild onClick={closeOrder}>
        <button>
          <IoCloseCircle className="text-4xl md:text-2xl" />
        </button>
      </IconButton>
    </Flex>
  );
};
