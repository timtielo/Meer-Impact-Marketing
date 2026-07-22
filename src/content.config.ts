import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Kennisbank / blog
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['Instructie', 'Strategie', 'SEO', 'Meta Ads']).default('Instructie'),
    publishDate: z.coerce.date(),
    author: z.string().default('Lars'),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Succesverhalen / cases (bidirectioneel gekoppeld aan diensten via `service` slug)
const cases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
  schema: z.object({
    client: z.string(),
    segment: z.string(),
    service: z.string(), // slug van de dienst in de services-collectie
    metric: z.string(), // groot cijfer op de kaart, bijv. "+312% leads"
    summary: z.string(),
    results: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    before: z.string().optional(),
    after: z.string().optional(),
    quote: z.string().optional(),
    quoteBy: z.string().optional(),
    source: z.enum(['google', 'werkspot']).default('google'),
    rating: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    publishDate: z.coerce.date(),
  }),
});

// Diensten
const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    tag: z.string().default(''), // bijv. "Hoofddienst", "Done-with-you"
    summary: z.string(),
    order: z.number().default(0),
    hero: z.boolean().default(false), // hoofddienst (uitgelicht)
    caseSlug: z.string().optional(), // gekoppelde case
  }),
});

export const collections = { blog, cases, services };
