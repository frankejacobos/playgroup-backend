import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { logErrorsMiddleware, requestLoggerMiddleware } from "./infrastructure";
import CategoryModule from "./modules/category/category.module";
import ProductModule from "./modules/product/product.module";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLoggerMiddleware);

app.use("/categories", CategoryModule);
app.use("/products", ProductModule);
app.get("/", (_req, res) => {
  res.json({ message: "Bienvenido al backend playgroup 🎉" });
});

app.use(logErrorsMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at PORT ${process.env.PORT || 3000}`);
});
