import { Router } from "express";

import { ProductController } from "./product.controller";
import { memoryUpload, supabase } from "../../infrastructure";

const controller = new ProductController(supabase);
const router = Router();

router.get("/", controller.getProducts);
router.get("/:uuid", controller.getProduct);
router.post("/", memoryUpload.single("image"), controller.createProduct);
router.put("/:uuid", memoryUpload.single("image"), controller.updateProduct);
router.delete("/:uuid", controller.deleteProduct);

export default router;
