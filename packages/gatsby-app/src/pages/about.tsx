import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { AppLink } from '../components/AppLink';

const AboutPage: React.FC<PageProps> = () => (
  <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
    <h1>About Page (Gatsby)</h1>
    <p>This is a simple about page to demonstrate navigation.</p>
    <AppLink item={{ label: '← Back to Home', href: '/' }} />
  </main>
);

export default AboutPage;
export const Head: HeadFC = () => <title>About - Gatsby App</title>;
