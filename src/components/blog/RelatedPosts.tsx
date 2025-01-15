import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../lib/contentful';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Gerelateerde artikelen</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {post.featuredImage && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={`https:${post.featuredImage.url}?w=800`}
                  alt={post.featuredImage.title}
                  className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              {post.shortDescription && (
                <p className="text-gray-600 line-clamp-2">{post.shortDescription}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}