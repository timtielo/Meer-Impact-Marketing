import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import MetricsDashboard from '../components/sections/MetricsDashboard';
import MarketingChoices from '../components/sections/MarketingChoices';
import Differentiators from '../components/sections/Differentiators';
import Testimonials from '../components/sections/Testimonials';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Meer Impact Marketing - Gegarandeerd meer klanten</title>
        <meta
          name="description"
          content="Verhoog jouw online zichtbaarheid en conversies met onze bewezen marketingstrategieën. Specialist in SEO, SEA en social media marketing."
        />
        <link rel="canonical" href="https://www.meerimpactmarketing.nl" />
      </Helmet>

      <Hero />
      <MetricsDashboard />
      <MarketingChoices />
      <Differentiators />
      <Testimonials />
    </>
  );
}