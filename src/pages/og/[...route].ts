import { OGImageRoute } from 'astro-og-canvas';

// Static generation of per-page OG images (1200x630) from a branded template.
export const prerender = true;

// Read collection frontmatter synchronously (no top-level await, so Astro can
// still detect the getStaticPaths export on this dynamic route).
const md = import.meta.glob('/src/content/**/*.md', { eager: true }) as Record<string, { frontmatter: any }>;

const pages: Record<string, { title: string; description: string }> = {
  default: { title: 'Meer Impact Marketing', description: 'Meta Ads en SEO die groei opleveren. Voor personal trainers, sportscholen en coaches.' },
  index: { title: 'Adverteren dat je terugziet in je agenda', description: 'Meta Ads en SEO die meetbaar leads opleveren.' },
};

for (const [path, mod] of Object.entries(md)) {
  const m = path.match(/\/src\/content\/(blog|cases|services)\/(.+)\.md$/);
  if (!m) continue;
  const [, coll, slug] = m;
  const fm = mod.frontmatter || {};
  if (coll === 'blog') pages[`kennisbank/${slug}`] = { title: fm.title, description: fm.description };
  else if (coll === 'cases') pages[`cases/${slug}`] = { title: `${fm.client}: ${fm.metric}`, description: fm.summary };
  else if (coll === 'services') pages[`diensten/${slug}`] = { title: fm.name, description: fm.summary };
}

const route = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: { path: './public/logo-horizontal-white.png', size: [300] },
    bgGradient: [
      [11, 31, 58],
      [22, 48, 79],
    ],
    border: { color: [242, 96, 12], width: 14, side: 'inline-start' },
    padding: 70,
    font: {
      title: { color: [255, 255, 255], size: 62, weight: 'Bold', lineHeight: 1.15, families: ['Space Grotesk'] },
      description: { color: [174, 187, 205], size: 30, lineHeight: 1.4, families: ['Instrument Sans'] },
    },
    fonts: ['./src/assets/og/SpaceGrotesk.ttf', './src/assets/og/InstrumentSans.ttf'],
    format: 'PNG',
  }),
});

export const getStaticPaths = (...args: unknown[]) => (route.getStaticPaths as any)(...args);
export const GET = (ctx: any) => (route.GET as any)(ctx);
