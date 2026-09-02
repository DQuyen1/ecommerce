import { Request, Response } from "express";
import { QueryFilter } from "mongoose";
import asyncHandler from "express-async-handler";
import Product, { CATEGORIES, IProduct, ProductCategory } from "../models/Product";

export const listCategories = asyncHandler(async (_req: Request, res: Response) => {
  res.json(CATEGORIES);
});

export const listProducts = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.query;
  const filter: QueryFilter<IProduct> = category
    ? { category: String(category) as ProductCategory }
    : {};
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, category, description, images } = req.body;
  const product = await Product.create({ name, category, description, images });
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, category, description, images } = req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { name, category, description, images },
    { new: true, runValidators: true }
  );
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
});
