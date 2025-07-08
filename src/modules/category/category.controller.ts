import { Request, Response } from "express";
import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "../../domain";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "../../infrastructure";

type ICategory = Database["public"]["Tables"]["category"]["Row"];
type IFilter = Partial<ICategory>;

export class CategoryController {
  service: CategoryService;

  constructor(private readonly db: SupabaseClient<Database>) {
    this.service = new CategoryService(new CategoryRepository(db));
  }
  getAllCategories = async (req: Request, res: Response): Promise<void> => {
    const categories = await this.service.getAllCategories(req.query);

    res.status(200).json(categories);
  };
}
