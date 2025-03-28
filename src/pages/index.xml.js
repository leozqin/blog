import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context) {
    const blogs = await getCollection("blogs")
    return rss({
        title: "Leo's Blog",
        description: "Leo's Blog, and other thoughts and writings",
        site: context.site,
        trailingSlash: false,
        items: blogs.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
            .slice(0, 10).map((post) => ({
                title: post.data.title,
                pubDate: post.data.date,
                link: `posts/${post.id}`,
                content: sanitizeHtml(parser.render(post.body), {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
                }),
            }))
    })
}