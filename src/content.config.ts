import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const vaultage = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/vaultage" }),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    album: z.string(),
    released: z.number().int().optional(),
    listenedOn: z.date(),
    rating: z.number().min(0).max(10),
    cover: z.string().optional(),
    genres: z.array(z.string()).default([]),
    mood: z.string().optional(),
    favoriteTracks: z.array(z.string()).default([]),
    status: z.enum(["published", "draft"]).default("draft"),
    description: z.string(),
  }),
});

export const collections = { vaultage };
