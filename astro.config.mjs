import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), icon({ include: { mdi: ["pencil-outline"] } })],
  site: import.meta.env.PROD ? 'https://leozqin.me': 'http://localhost:4321',
  markdown: {
    shikiConfig: {
      theme: "github-dark-high-contrast"
    }
  },
  experimental: {
    svg: true
  }
});