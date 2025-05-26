import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogs = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/posts" }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        tags: z.array(z.string()).optional(),
        slug: z.string().optional()
    })
})

const projects = defineCollection({
    loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/projects" }),
    schema: z.object({
        name: z.string(),
        link: z.string().url(),
        blogLink: z.string(),
        tech: z.array(z.string()),
        order: z.number().int()
    })
})

const go = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/go" }),
    schema: z.object({
        target: z.string().url(),
        delay: z.number().optional(),
        description: z.string()
    })
})

const galleries = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/gallery" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string().optional(),
        cover: image(),
        images: z.array(z.object({ src: z.string(), alt: z.string().optional(), commentary: z.string().optional() })).optional()
    }),
});

export const collections = { blogs, projects, go, galleries }
