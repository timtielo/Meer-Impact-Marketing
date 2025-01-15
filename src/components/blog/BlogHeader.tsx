import React from 'react';
import { Clock, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogHeaderProps {
  title: string;
  shortDescription?: string;
  author?: {
    name: string;
    avatar?: {
      url: string;
      title: string;
    };
  };
  publishedDate: string;
  featuredImage?: {
    url: string;
    title: string;
  };
}

export default function BlogHeader({ 
  title, 
  shortDescription, 
  author, 
  publishedDate,
  featuredImage 
}: BlogHeaderProps) {
  return (
    <div className="mb-12">
      <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Terug naar blog overzicht
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        {shortDescription && (
          <p className="text-xl text-gray-600 mb-6">{shortDescription}</p>
        )}

        <div className="flex items-center text-sm text-gray-500 space-x-6">
          {author && (
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {author.name}
            </div>
          )}
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {publishedDate}
          </div>
        </div>
      </div>

      {featuredImage && (
        <div className="relative aspect-w-16 aspect-h-9">
          <img
            src={`https:${featuredImage.url}?w=1200`}
            alt={featuredImage.title}
            className="w-full h-[400px] object-cover rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}