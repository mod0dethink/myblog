import { getCollection } from 'astro:content';

export async function GET() {
  const posts = (await getCollection('posts'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const payload = posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    date: post.data.date.toLocaleDateString('ja-JP'),
    category: post.data.category,
    tags: post.data.tags ?? [],
    summary: post.data.summary ?? '',
    body: post.body ?? '',
  }));

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
