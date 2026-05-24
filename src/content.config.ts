import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    teamNumber: z.string(),
    city: z.string(),
    mission: z.string(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    secondaryCtaLabel: z.string(),
    secondaryCtaHref: z.string(),
    heroImage: z.string().url(),
    galleryImages: z.array(
      z.object({
        src: z.string().url(),
        alt: z.string(),
      }),
    ),
    engineeringSkills: z.array(z.string()),
    leadershipSkills: z.array(z.string()),
    sponsors: z.array(
      z.object({
        src: z.string().url(),
        alt: z.string(),
      }),
    ),
    contact: z.object({
      email: z.string(),
      phone: z.string(),
      mailingAddress: z.string(),
      workshopAddress: z.string(),
    }),
    social: z.array(
      z.object({
        label: z.string(),
        href: z.string().url(),
      }),
    ),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    image: z.string().url().optional(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { pages, news };
