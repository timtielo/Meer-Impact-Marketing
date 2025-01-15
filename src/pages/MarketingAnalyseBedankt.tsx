import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contentfulClient } from '../lib/contentful';

export default function MarketingAnalyseBedankt() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'pageBlogPost',
          order: '-fields.publishedDate',
          limit: 2
        });

        const formattedPosts = response.items.map(item => ({
          id: item.sys.id,
          title: item.fields.title,
          slug: item.fields.slug,
          image: `https:${item.fields.featuredImage.fields.file.url}`
        }));

        setBlogPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Bedankt voor je aanvraag! | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Je marketing analyse aanvraag is ontvangen. We nemen binnen 24 uur contact met je op met onze bevindingen." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Bedankt voor je aanvraag!
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-4">
                We hebben je verzoek ontvangen.
              </p>
              <p className="text-xl text-gray-600">
                Lars neemt binnen 24 uur contact met je op.
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Marketing tips & tricks
            </h2>
            <p className="text-xl text-gray-600">
              Neem in de tussentijd een kijkje bij onze blogs voor meer marketing tips & tricks.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <div className="mt-4 flex items-center text-white/90">
                      <span>Lees meer</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}