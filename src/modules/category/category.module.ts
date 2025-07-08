import { Router } from "express";

import { CategoryController } from "./category.controller";
import { supabase } from "../../infrastructure";

const controller = new CategoryController(supabase);
const router = Router();

router.get("/", controller.getAllCategories);

export default router;
