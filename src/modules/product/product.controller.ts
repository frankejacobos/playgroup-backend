import { Request, Response } from "express";
import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "../../domain";
import { ProductRepository } from "../../infrastructure";
import { ProductService } from "./product.service";

export class ProductController {
  service: ProductService;

  constructor(private readonly db: SupabaseClient<Database>) {
    this.service = new ProductService(new ProductRepository(db));
  }

  getProducts = async (req: Request, res: Response) => {
    const products = await this.service.getAllProducts(req.query);

    res.status(200).json(products);
  };

  getProduct = async (req: Request, res: Response) => {
    const product = await this.service.getProductByUUID(req.params.uuid);

    res.status(200).json(product);
  };

  createProduct = async (req: Request, res: Response) => {
    const product = await this.service.createProduct(req.body, req.file);

    res.status(201).json(product);
  };

  updateProduct = async (req: Request, res: Response) => {
    const product = await this.service.updateProduct(
      req.params.uuid,
      req.body,
      req.file
    );

    res.status(200).json(product);
  };

  deleteProduct = async (req: Request, res: Response) => {
    const product = await this.service.deleteProduct(req.params.uuid);

    res.status(200).json(product);
  };
}
