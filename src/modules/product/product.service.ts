import { Database } from "../../domain";
import { ProductRepository, StringUtils } from "../../infrastructure";

type IProduct = Database["public"]["Tables"]["product"]["Row"];
type IFilter = Partial<IProduct>;

export class ProductService {
  constructor(private readonly repoProduct: ProductRepository) {}

  getAllProducts(filter: IFilter): Promise<Partial<IProduct>[]> {
    return this.repoProduct.getAll(filter);
  }

  async getProductByUUID(uuid: string): Promise<Partial<IProduct>> {
    return this.repoProduct.getByUUID(uuid);
  }

  async createProduct(
    product: IProduct,
    image?: Express.Multer.File
  ): Promise<Partial<IProduct>> {
    if (image) {
      const pName = StringUtils.slugify(product.name);
      product.img = await this.repoProduct.uploadImage(image, pName);
    }

    return this.repoProduct.create(product);
  }

  async updateProduct(
    uuid: string,
    product: IProduct,
    image?: Express.Multer.File
  ): Promise<Partial<IProduct>> {
    if (image) {
      const oldProduct = await this.repoProduct.getByUUID(uuid);

      if (oldProduct?.img) await this.repoProduct.deleteImage([oldProduct.img]);

      const pName = StringUtils.slugify(product.name);
      product.img = await this.repoProduct.uploadImage(image, pName);
    }

    return this.repoProduct.update(uuid, product);
  }

  async deleteProduct(uuid: string): Promise<Partial<IProduct>> {
    const product = await this.repoProduct.delete(uuid);

    if (product.img) await this.repoProduct.deleteImage([product.img]);

    return product;
  }
}
