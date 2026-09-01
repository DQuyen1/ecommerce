import { Request, Response } from "express";
import mongoose, { QueryFilter } from "mongoose";
import asyncHandler from "express-async-handler";
import Article, { IArticle } from "../models/Article";

export const listTopics = asyncHandler(async (_req: Request, res: Response) => {
  const topics = await Article.distinct("topic");
  res.json(topics);
});

export const listArticles = asyncHandler(async (req: Request, res: Response) => {
  const { topic, page = 1, limit = 10 } = req.query;
  const filter: QueryFilter<IArticle> = topic ? { topic: String(topic) } : {};
  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);

  const [items, total] = await Promise.all([
    Article.find(filter)
      .sort({ publishedAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Article.countDocuments(filter),
  ]);

  res.json({ total, page: pageNum, limit: limitNum, items });
});

export const getArticle = asyncHandler(async (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const query: QueryFilter<IArticle> = mongoose.isValidObjectId(idOrSlug)
    ? { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] }
    : { slug: idOrSlug };
  const article = await Article.findOne(query);
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.json(article);
});

export const createArticle = asyncHandler(async (req: Request, res: Response) => {
  const { title, topic, content } = req.body;
  const article = await Article.create({ title, topic, content });
  res.status(201).json(article);
});

export const updateArticle = asyncHandler(async (req: Request, res: Response) => {
  const { title, topic, content } = req.body;
  const article = await Article.findById(req.params.id);
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  if (title !== undefined) article.title = title;
  if (topic !== undefined) article.topic = topic;
  if (content !== undefined) article.content = content;
  await article.save();

  res.json(article);
});

export const deleteArticle = asyncHandler(async (req: Request, res: Response) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.json(article);
});
