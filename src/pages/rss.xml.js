import rss from '@astrojs/rss';
import site from '../data/site.json';
import { getPosts } from '../lib';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: `${site.name} · Writing`,
    description: site.intro,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/blog/${p.id}/`,
    })),
  });
}
