import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight } from 'lucide-react';
import { contentfulClient, BlogPost } from '../lib/contentful';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'pageBlogPost',
          order: '-fields.publishedDate',
          include: 2,
        });

        const formattedPosts = response.items.map((item: any) => ({
          internalName: item.fields.internalName,
          seoFields: item.fields.seoFields?.fields,
          slug: item.fields.slug,
          author: item.fields.author?.fields
            ? {
                name: item.fields.author.fields.name,
                avatar: item.fields.author.fields.avatar?.fields.file
                  ? {
                      url: item.fields.author.fields.avatar.fields.file.url,
                      title: item.fields.author.fields.avatar.fields.title,
                    }
                  : undefined,
              }
            : undefined,
          publishedDate: new Date(item.fields.publishedDate).toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          title: item.fields.title,
          shortDescription: item.fields.shortDescription,
          featuredImage: item.fields.featuredImage?.fields.file
            ? {
                url: item.fields.featuredImage.fields.file.url,
                title: item.fields.featuredImage.fields.title,
              }
            : undefined,
          content: item.fields.content,
          url: `/blog/${item.fields.slug}`,
        }));

        // Set the first post as featured and remove it from the regular posts list
        if (formattedPosts.length > 0) {
          setFeaturedPost(formattedPosts[0]);
          setPosts(formattedPosts.slice(1));
        }
      } catch (err) {
        setError('Er is een fout opgetreden bij het laden van de blog posts.');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Marketing Blog & Inzichten | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Ontdek de laatste marketing trends, tips en strategieën in onze blog. Expert advies over SEO, social media, content marketing en meer." 
        />
        <link rel="canonical" href="https://www.meerimpactmarketing.nl/blog" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Marketing Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek de laatste inzichten, tips en strategieën om je online marketing naar het volgende niveau te tillen.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">
              {error}
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Uitgelichte Blog Post
                  </h2>
                  <Link
                    to={featuredPost.url}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {featuredPost.featuredImage && (
                      <div className="aspect-w-16 aspect-h-9 relative">
                        <img
                          src={`https:${featuredPost.featuredImage.url}?w=1200&h=600&fit=fill`}
                          alt={featuredPost.featuredImage.title}
                          className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                          <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-300 transition-colors">
                            {featuredPost.title}
                          </h3>
                          {featuredPost.shortDescription && (
                            <p className="text-lg text-white/90 mb-4">
                              {featuredPost.shortDescription}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-sm text-white/80">
                            {featuredPost.author && (
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {featuredPost.author.name}
                              </div>
                            )}
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {featuredPost.publishedDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    to={post.url}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {post.featuredImage && (
                      <div className="aspect-w-16 aspect-h-9 relative">
                        <img
                          src={`https:${post.featuredImage.url}?w=600&h=400&fit=fill`}
                          alt={post.featuredImage.title}
                          className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      {post.shortDescription && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.shortDescription}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        {post.author && (
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author.name}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.publishedDate}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700">
                        <span>Lees meer</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}