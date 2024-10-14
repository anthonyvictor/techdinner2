import { Flex } from "@radix-ui/themes"
export default function Home() {
  return <Flex direction={"column"} gap="2"></Flex>
}

// "use client"
// import React, { useEffect, useState } from "react"
// import { socket } from "@/app/infra/util/io"

// type Cliente = {
//   id: string
//   nome: string
//   whatsapp: string
// }
// type Produto = {
//   id: string
//   nome: string
//   preco: number
// }
// interface Pedido {
//   id: string
//   cliente: Cliente
//   endereco: string
//   produtos: Produto[]
//   pagamento: "cartao" | "pix" | "especie"
//   trocoPara?: number
// }

// function PedidoComponent() {
//   const [pedidos, setPedidos] = useState<Pedido[]>([])

//   useEffect(() => {
//     // Escute por atualizações de pedidos
//     socket.on("atualizacaoPedido", (pedidoAtualizado) => {
//       setPedidos((prevPedidos) =>
//         prevPedidos.map((pedido) =>
//           pedido.id === pedidoAtualizado.id ? pedidoAtualizado : pedido,
//         ),
//       )
//     })

//     return () => {
//       socket.off("atualizacaoPedido")
//     }
//   }, [])

//   return (
//     <div>
//       {pedidos.map((pedido) => (
//         <li key={pedido.id}>
//           <h3>{pedido.cliente.nome}</h3>
//           <p>{pedido.endereco}</p>
//           {pedido.produtos.map((produto) => (
//             <li key={produto.id}>
//               <h5>{produto.nome}</h5>
//               <h6>R$ {produto.preco}</h6>
//             </li>
//           ))}
//         </li>
//       ))}
//     </div>
//   )
// }

// export default PedidoComponent
