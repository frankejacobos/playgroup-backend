import { Database } from "../../domain";
import { CategoryRepository } from "../../infrastructure";

type ICategory = Database["public"]["Tables"]["category"]["Row"];
type IFilter = Partial<ICategory>;

export class CategoryService {
  constructor(private readonly repoCategory: CategoryRepository) {}

  async getAllCategories(filter: IFilter): Promise<Partial<ICategory>[]> {
    return this.repoCategory.getAll(filter);
  }
}
