import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: 'home.md', base: './src/content/pages' }),
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
    heroImage: z.string(),
    galleryImages: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    ),
    engineeringSkills: z.array(z.string()),
    leadershipSkills: z.array(z.string()),
    sponsors: z.array(
      z.object({
        src: z.string(),
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

const aboutPage = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content/pages' }),
  schema: z.object({
    heroChip: z.string(),
    heroTitle: z.string(),
    heroLead: z.string(),
    heroArt: z.string(),
    teamNumber: z.string(),
    foundedYear: z.string(),
    yearsCompeting: z.string(),
    buildSeason: z.string(),
    firstOrgUrl: z.string(),
  }),
});

const calendarPage = defineCollection({
  loader: glob({ pattern: 'calendar.md', base: './src/content/pages' }),
  schema: z.object({
    heroChip: z.string(),
    heroTitle: z.string(),
    heroLead: z.string(),
    heroArt: z.string(),
    artHeight: z.string().optional(),
    calendarEmbedSrc: z.string(),
    googleCalendarUrl: z.string(),
    icalUrl: z.string(),
  }),
});

const contactPage = defineCollection({
  loader: glob({ pattern: 'contact.md', base: './src/content/pages' }),
  schema: z.object({
    heroChip: z.string(),
    heroTitle: z.string(),
    heroLead: z.string(),
    heroArt: z.string(),
    formspreeEndpoint: z.string(),
  }),
});

const galleryPage = defineCollection({
  loader: glob({ pattern: 'gallery.md', base: './src/content/pages' }),
  schema: z.object({
    heroChip: z.string(),
    heroTitle: z.string(),
    heroLead: z.string(),
    heroArt: z.string(),
    artHeight: z.string().optional(),
  }),
});

const donationsPage = defineCollection({
  loader: glob({ pattern: 'donations.md', base: './src/content/pages' }),
  schema: z.object({
    heroChip: z.string(),
    heroTitle: z.string(),
    heroLead: z.string(),
    heroArt: z.string(),
    zeffyFormUrl: z.string(),
    quote: z.string(),
    quoteAuthor: z.string(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { pages, aboutPage, calendarPage, contactPage, galleryPage, donationsPage, news };
