import express from "express";
import router from "./router";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

const port = "3001";
app.listen(port, () => {
  console.info(`✅ App running on port ${port}`);
});
