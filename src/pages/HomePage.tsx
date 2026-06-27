import React from 'react';
import {
  HeroSection,
  AboutSection,
  PortfolioSection,
  ContactSection,
} from '@/components/sections';

export const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ContactSection />
    </main>
  );
};
