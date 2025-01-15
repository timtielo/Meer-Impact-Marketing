import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || 'w68zf4gcgfih',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || 'eSFtCTz8uA5vu1WuXgAAdYEt7kSHx-a_ASbdCrKpl20',
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

export interface Author {
  name: string;
  avatar?: {
    url: string;
    title: string;
  };
}

export interface RichImage {
  internalName: string;
  image: {
    url: string;
    title: string;
    description?: string;
    width?: number;
    height?: number;
  };
  caption?: string;
  fullWidth: boolean;
}

export interface SeoFields {
  internalName: string;
  pageTitle: string;
  pageDescription?: string;
  canonicalUrl?: string;
  nofollow: boolean;
  noindex: boolean;
  shareImages?: Array<{
    url: string;
    title: string;
    description?: string;
    width?: number;
    height?: number;
  }>;
}

export interface BlogPost {
  internalName: string;
  seoFields?: SeoFields;
  slug: string;
  author?: Author;
  publishedDate: string;
  title: string;
  shortDescription?: string;
  featuredImage: {
    url: string;
    title: string;
  };
  content: Document;
  relatedBlogPosts?: BlogPost[];
}

export interface LandingPage {
  internalName: string;
  seoFields?: SeoFields;
  featuredBlogPost?: {
    title: string;
    slug: string;
    shortDescription?: string;
    featuredImage?: {
      url: string;
      title: string;
    };
    publishedDate: string;
    author?: {
      name: string;
      avatar?: string;
    };
  };
}