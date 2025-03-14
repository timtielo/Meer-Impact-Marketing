import contentful from 'contentful';
import fs from 'fs/promises';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const contentfulClient = contentful.createClient({
  space: process.env.VITE_CONTENTFUL_SPACE_ID || 'w68zf4gcgfih',
  accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN || 'eSFtCTz8uA5vu1WuXgAAdYEt7kSHx-a_ASbdCrKpl20',
  environment: process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

const DOMAIN = 'https://www.meerimpactmarketing.nl';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// Static URLs configuration
const STATIC_URLS = [
  { url: '', changefreq: 'weekly', priority: '1.0' },
  { url: 'contact', changefreq: 'monthly', priority: '0.7' },
  { url: 'gratis-guide', changefreq: 'monthly', priority: '0.7' },
  { url: 'marketing-analyse', changefreq: 'monthly', priority: '0.7' },
  { url: 'testimonials', changefreq: 'monthly', priority: '0.7' },
  { url: 'privacy', changefreq: 'yearly', priority: '0.3' },
  { url: 'voorwaarden', changefreq: 'yearly', priority: '0.3' },
];

const SERVICE_URLS = [
  { url: 'diensten', changefreq: 'monthly', priority: '0.8' },
  { url: 'diensten/meta-ads', changefreq: 'monthly', priority: '0.8' },
  { url: 'diensten/email-marketing', changefreq: 'monthly', priority: '0.8' },
];

async function generateSitemapIndex() {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/pages-sitemap.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/blog-sitemap.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/diensten-sitemap.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
</sitemapindex>`;

  await fs.writeFile('public/sitemap-index.xml', sitemapIndex);
  console.log('Generated sitemap-index.xml');
}

async function generateSitemaps() {
  try {
    // Fetch blog posts from Contentful
    console.log('Fetching blog posts from Contentful...');
    const response = await contentfulClient.getEntries({
      content_type: 'pageBlogPost',
      order: '-fields.publishedDate',
      select: ['fields.slug', 'fields.publishedDate']
    });

    // Generate blog sitemap
    const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${response.items.map(post => `  <url>
    <loc>${DOMAIN}/blog/${post.fields.slug}</loc>
    <lastmod>${new Date(post.fields.publishedDate).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

    await fs.writeFile('public/blog-sitemap.xml', blogSitemap);
    console.log('Generated blog-sitemap.xml');

    // Generate services sitemap
    const servicesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SERVICE_URLS.map(page => `  <url>
    <loc>${DOMAIN}/${page.url}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    await fs.writeFile('public/diensten-sitemap.xml', servicesSitemap);
    console.log('Generated diensten-sitemap.xml');

    // Generate pages sitemap
    const pagesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_URLS.map(page => `  <url>
    <loc>${DOMAIN}${page.url ? `/${page.url}` : ''}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    await fs.writeFile('public/pages-sitemap.xml', pagesSitemap);
    console.log('Generated pages-sitemap.xml');

    // Generate blog-slugs.json
    const blogSlugs = response.items.map(post => ({
      slug: post.fields.slug,
      publishedDate: new Date(post.fields.publishedDate).toLocaleDateString('en-US'),
      url: `${DOMAIN}/blog/${post.fields.slug}`
    }));

    await fs.writeFile('public/blog-slugs.json', JSON.stringify(blogSlugs, null, 2));
    console.log('Generated blog-slugs.json');

    // Generate sitemap index
    await generateSitemapIndex();

  } catch (error) {
    console.error('Error generating sitemaps:', error);
    process.exit(1);
  }
}

generateSitemaps();