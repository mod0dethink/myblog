import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };
