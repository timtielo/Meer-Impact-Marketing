import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { Link } from 'react-router-dom';
import RichImage from '../RichImage';

interface BlogContentProps {
  content: any;
}

export default function BlogContent({ content }: BlogContentProps) {
  const richTextOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="px-1 py-0.5 bg-gray-100 rounded">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        const { __typename } = node.data.target.sys.contentType.sys;
        if (__typename === 'ComponentRichImage') {
          return <RichImage image={node} />;
        }
        return null;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, description, file } = node.data.target.fields;
        const imageUrl = file.url;
        const { width, height } = file.details.image || {};

        return (
          <figure className="my-12 max-w-3xl mx-auto">
            <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-100">
              <img
                src={`https:${imageUrl}?w=1200`}
                alt={title}
                className="w-full h-auto hover:scale-105 transition-transform duration-300"
                width={width}
                height={height}
                loading="lazy"
              />
              {description && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm md:text-base">
                    {description}
                  </p>
                </div>
              )}
            </div>
            <figcaption className="mt-4 text-center text-sm text-gray-600 italic">
              {title}
            </figcaption>
          </figure>
        );
      },
      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
        <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
        <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => (
        <h5 className="text-lg font-bold text-gray-900 mt-4 mb-2">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => (
        <h6 className="text-base font-bold text-gray-900 mt-4 mb-2">{children}</h6>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
        <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
        <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
        <li className="text-gray-700">{children}</li>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-gray-200" />,
      [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-700">
          {children}
        </blockquote>
      ),
      [BLOCKS.TABLE]: (node: any, children: React.ReactNode) => (
        <div className="overflow-x-auto my-8">
          <table className="min-w-full divide-y divide-gray-200">
            {children}
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (node: any, children: React.ReactNode) => (
        <tr className="bg-white even:bg-gray-50">{children}</tr>
      ),
      [BLOCKS.TABLE_CELL]: (node: any, children: React.ReactNode) => (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{children}</td>
      ),
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          {children}
        </a>
      ),
      [INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
        const slug = node.data.target.fields.slug;
        return (
          <Link to={`/blog/${slug}`} className="text-blue-600 hover:text-blue-700 underline">
            {children}
          </Link>
        );
      },
    },
  };

  return (
    <div className="prose prose-lg max-w-none mb-20">
      {documentToReactComponents(content, richTextOptions)}
    </div>
  );
}