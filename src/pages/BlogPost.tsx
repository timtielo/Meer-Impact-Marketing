import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { contentfulClient, BlogPost as BlogPostType } from '../lib/contentful';
import Seo from '../components/Seo';
import BlogHeader from '../components/blog/BlogHeader';
import BlogContent from '../components/blog/BlogContent';
import GuideSignup from '../components/blog/GuideSignup';
import RelatedPosts from '../components/blog/RelatedPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'pageBlogPost',
          'fields.slug': slug,
          include: 10,
        });

        if (response.items.length > 0) {
          const item = response.items[0];
          const formattedPost: BlogPostType = {
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
            featuredImage: {
              url: item.fields.featuredImage.fields.file.url,
              title: item.fields.featuredImage.fields.title,
            },
            content: item.fields.content,
            relatedBlogPosts: item.fields.relatedBlogPosts?.map((relatedPost: any) => ({
              title: relatedPost.fields.title,
              slug: relatedPost.fields.slug,
              shortDescription: relatedPost.fields.shortDescription,
              featuredImage: {
                url: relatedPost.fields.featuredImage.fields.file.url,
                title: relatedPost.fields.featuredImage.fields.title,
              },
            })),
          };
          setPost(formattedPost);
        } else {
          setError('Blog post niet gevonden');
        }
      } catch (err) {
        setError('Er is een fout opgetreden bij het laden van de blog post');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{error || 'Blog post niet gevonden'}</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {post.seoFields ? (
        <Seo seo={post.seoFields} type="article" />
      ) : (
        <Seo
          seo={{
            pageTitle: `${post.title} | Meer Impact Marketing Blog`,
            pageDescription: post.shortDescription,
            canonicalUrl: `https://www.meerimpactmarketing.nl/blog/${post.slug}`,
            nofollow: false,
            noindex: false,
            shareImages: post.featuredImage
              ? [
                  {
                    url: post.featuredImage.url,
                    title: post.featuredImage.title,
                  },
                ]
              : undefined,
          }}
          type="article"
        />
      )}

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogHeader
            title={post.title}
            shortDescription={post.shortDescription}
            author={post.author}
            publishedDate={post.publishedDate}
            featuredImage={post.featuredImage}
          />
          
          <BlogContent content={post.content} />
          
          <GuideSignup />
          
          {post.relatedBlogPosts && <RelatedPosts posts={post.relatedBlogPosts} />}
        </article>
      </div>
    </>
  );
}