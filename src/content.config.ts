import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    h1: z.string(),
    description: z.string(),
    product: z.enum(['dresva', 'shheben-20-40', 'shheben-5-20', 'shheben-0-50', 'shheben', 'beton']),
    kind: z.enum(['kommercheskaya', 'ekspertnaya', 'sravnenie']),
    date: z.string(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

export const collections = { blog };
