import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogs = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/posts" }),
    schema: z.object({
        title: z.string(),
        date: z.date()
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


export const collections = { blogs, projects, go }
