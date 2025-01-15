import { createClient } from 'contentful';
import fs from 'fs/promises';

const contentfulClient = createClient({
  space: process.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

async function generateBlogSitemap() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'pageBlogPost',
      order: '-fields.publishedDate',
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://meerimpactmarketing.nl/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${response.items.map(post => `  <url>
    <loc>https://meerimpactmarketing.nl/blog/${post.fields.slug}</loc>
    <lastmod>${new Date(post.fields.publishedDate).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

    await fs.writeFile('public/blog-sitemap.xml', sitemapContent);
    console.log('Blog sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
  }
}

generateBlogSitemap();