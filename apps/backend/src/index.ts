import http from "http";
import { Server } from "socket.io";
import express from "express";
import router from "@/src/router";
import cors from "cors";
import { isFrom } from "./middlewares/from";

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => isFrom(req, res, next));

// Crie o servidor HTTP padrão com Express
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

// WebSocket: escutando conexões
io.on("connect", (socket) => {
  console.log("✨ Novo socket:", socket.id);

  socket.on("getOrders", (orders) => {
    orders = [{ id: "sd62as2d6as" }];
    return orders;
  });

  // // Envie uma mensagem para o cliente quando um novo pedido for criado/atualizado
  // socket.on("pedidoCriado", (pedido) => {
  //   // Envie a atualização para todos os clientes conectados
  //   io.emit("atualizacaoPedido", pedido);
  // });

  socket.on("disconnect", () => {
    console.log("👋 Socket desconectado:", socket.id);
  });
});

export { io };

app.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ App rodando na porta ${PORT}`);
});
