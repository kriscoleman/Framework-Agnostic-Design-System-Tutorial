import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { AppLink } from '../components/AppLink';
import type { NavItem } from '@tutorial/design-system';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', isPartiallyActiveAllowed: true },
  { label: 'Blog', href: '/blog', isPartiallyActiveAllowed: true },
  { label: 'Contact', href: '/contact' },
];

const externalLinks: NavItem[] = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Documentation', href: 'https://docs.example.com' },
];

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🚀 Gatsby App Demo</h1>
      <p>
        This app demonstrates using our framework-agnostic design system
        with <strong>Gatsby's Link component</strong> injected for routing.
      </p>

      <section style={{ marginTop: '2rem' }}>
        <h2>Internal Navigation</h2>
        <p>These links use Gatsby's prefetching and client-side routing:</p>
        <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <AppLink
              key={item.href}
              item={item}
              className="nav-link"
              activeClassName="nav-link--active"
            />
          ))}
        </nav>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>External Links</h2>
        <p>These automatically open in new tabs with proper security attributes:</p>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          {externalLinks.map((item) => (
            <AppLink key={item.href} item={item} className="external-link" />
          ))}
        </nav>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Button Fallback</h2>
        <p>When there's no href but an onClick, it renders as a button:</p>
        <AppLink
          item={{ label: 'Show Alert', href: '' }}
          onClick={() => alert('Button clicked! (Gatsby App)')}
          className="button-link"
        />
      </section>

      <style>{`
        .nav-link {
          padding: 0.5rem 1rem;
          background: #f0f0f0;
          border-radius: 4px;
          text-decoration: none;
          color: #333;
          transition: background 0.2s;
        }
        .nav-link:hover {
          background: #e0e0e0;
        }
        .nav-link--active {
          background: #663399;
          color: white;
        }
        .external-link {
          color: #663399;
        }
        .button-link {
          padding: 0.5rem 1rem;
          background: #663399;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        .button-link:hover {
          background: #552288;
        }
      `}</style>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <title>Gatsby App - Framework Agnostic Demo</title>
);
