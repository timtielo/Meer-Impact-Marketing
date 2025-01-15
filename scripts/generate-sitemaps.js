import contentful from 'contentful';
import fs from 'fs/promises';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const contentfulClient = contentful.createClient({
  space: process.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

const DOMAIN = 'https://meerimpactmarketing.nl';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

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

  await fs.writeFile('public/sitemap.xml', sitemapIndex);
  console.log('Generated sitemap index');
}

async function generateBlogSitemap() {
  try {
    console.log('Fetching blog posts from Contentful...');
    const response = await contentfulClient.getEntries({
      content_type: 'pageBlogPost',
      order: '-fields.publishedDate',
      limit: 1000,
      select: ['fields.slug', 'fields.publishedDate']
    });

    console.log(`Found ${response.items.length} blog posts`);

    const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/blog</loc>
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
    console.log('Generated blog sitemap');

    // Also save the slugs for reference
    const slugsList = response.items.map(post => ({
      slug: post.fields.slug,
      publishedDate: new Date(post.fields.publishedDate).toLocaleDateString('nl-NL'),
      url: `${DOMAIN}/blog/${post.fields.slug}`
    }));

    await fs.writeFile('public/blog-slugs.json', JSON.stringify(slugsList, null, 2));
    console.log('Saved blog slugs to blog-slugs.json');

  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    // Create a basic blog sitemap if Contentful fails
    const basicBlogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    
    await fs.writeFile('public/blog-sitemap.xml', basicBlogSitemap);
    console.log('Generated basic blog sitemap due to error');
  }
}

async function generatePagesSitemap() {
  const pagesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${DOMAIN}/contact</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${DOMAIN}/gratis-guide</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${DOMAIN}/marketing-analyse</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${DOMAIN}/testimonials</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${DOMAIN}/privacy</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${DOMAIN}/voorwaarden</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  await fs.writeFile('public/pages-sitemap.xml', pagesSitemap);
  console.log('Generated pages sitemap');
}

async function generateDienstenSitemap() {
  const dienstenSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/diensten</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${DOMAIN}/diensten/meta-ads</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${DOMAIN}/diensten/email-marketing</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  await fs.writeFile('public/diensten-sitemap.xml', dienstenSitemap);
  console.log('Generated diensten sitemap');
}

async function generateAllSitemaps() {
  try {
    console.log('Starting sitemap generation...');
    await generateSitemapIndex();
    await generatePagesSitemap();
    await generateBlogSitemap();
    await generateDienstenSitemap();
    console.log('All sitemaps generated successfully!');
  } catch (error) {
    console.error('Error generating sitemaps:', error);
    process.exit(1);
  }
}

generateAllSitemaps();