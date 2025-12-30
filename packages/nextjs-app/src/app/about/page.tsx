'use client';

import React from 'react';
import { AppLink } from '../../components/AppLink';

export default function AboutPage() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>About Page (Next.js)</h1>
      <p>This is a simple about page to demonstrate navigation.</p>
      <AppLink item={{ label: '← Back to Home', href: '/' }} />
    </main>
  );
}
