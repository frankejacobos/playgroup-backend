import dotenv from "dotenv";
import express from "express";

import { logErrorsMiddleware, requestLoggerMiddleware } from "./infrastructure";
import ProductModule from "./modules/product/product.module";

dotenv.config();

const app = express();

app.use(express.json());
app.use(requestLoggerMiddleware);

app.use("/products", ProductModule);

app.use(logErrorsMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});
