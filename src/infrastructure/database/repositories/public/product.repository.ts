import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "../../../../domain";

type IProduct = Database["public"]["Tables"]["product"]["Row"];
type IFilter = Partial<IProduct>;

export class ProductRepository {
  constructor(private db: SupabaseClient<Database>) {}

  async getAll(filter: IFilter): Promise<Partial<IProduct>[]> {
    const { data, error } = await this.db
      .from("product")
      .select("name, description, img, uuid")
      .match(filter);

    if (error) throw error;

    return data;
  }

  async getByUUID(uuid: string): Promise<Partial<IProduct>> {
    const { data, error } = await this.db
      .from("product")
      .select("name, description, img, uuid")
      .eq("uuid", uuid)
      .single();

    if (error) throw error;

    return data;
  }

  async create(product: IProduct): Promise<Partial<IProduct>> {
    const { data, error } = await this.db
      .from("product")
      .insert(product)
      .select("name, description, img, uuid")
      .single();

    if (error) throw error;

    return data;
  }

  async update(uuid: string, product: IProduct): Promise<Partial<IProduct>> {
    const { data, error } = await this.db
      .from("product")
      .update(product)
      .eq("uuid", uuid)
      .select("name, description, img, uuid")
      .single();

    if (error) throw error;

    return data;
  }

  async delete(uuid: string): Promise<Partial<IProduct>> {
    const { data, error } = await this.db
      .from("product")
      .delete()
      .eq("uuid", uuid)
      .select("name, description, img, uuid")
      .single();

    if (error) throw error;

    return data;
  }

  async uploadImage(
    { mimetype: contentType, buffer }: Express.Multer.File,
    filename: string
  ): Promise<string> {
    const { error } = await this.db.storage
      .from("images")
      .upload(filename, buffer, { contentType, upsert: true });

    if (error) throw error;

    return filename;
  }

  async deleteImage(filenames: string[]): Promise<void> {
    const { error } = await this.db.storage.from("images").remove(filenames);

    if (error) throw error;
  }
}
