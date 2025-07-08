import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "../../../../domain";

type ICategory = Database["public"]["Tables"]["category"]["Row"];
type IFilter = Partial<ICategory>;

export class CategoryRepository {
  constructor(private db: SupabaseClient<Database>) {}

  async getAll(filter: IFilter): Promise<Partial<ICategory>[]> {
    const { data, error } = await this.db
      .from("category")
      .select("id, name, description, icon, color, uuid")
      .match(filter);

    if (error) throw error;

    return data;
  }
}
