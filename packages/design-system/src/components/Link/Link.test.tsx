import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Link } from './Link';
import type { NavItem } from '../../types';

describe('Link', () => {
  const defaultItem: NavItem = {
    label: 'Test Link',
    href: '/test-path',
  };

  describe('without linkComponentType (native anchor)', () => {
    it('renders an anchor tag with correct href', () => {
      render(<Link item={defaultItem} />);
      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/test-path');
    });

    it('renders children when provided', () => {
      render(<Link item={defaultItem}>Custom Content</Link>);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('uses label as content when children not provided', () => {
      render(<Link item={defaultItem} />);
      expect(screen.getByText('Test Link')).toBeInTheDocument();
    });

    it('opens external links in new tab', () => {
      const externalItem: NavItem = {
        label: 'External',
        href: 'https://example.com',
      };
      render(<Link item={externalItem} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('keeps internal links in same tab', () => {
      render(<Link item={defaultItem} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_self');
      expect(link).not.toHaveAttribute('rel');
    });
  });

  describe('with linkComponentType (framework injection)', () => {
    const MockFrameworkLink = ({ children, to, href, ...props }: any) => (
      <a data-testid="framework-link" data-to={to} href={href} {...props}>
        {children}
      </a>
    );

    it('uses injected component type', () => {
      render(<Link item={defaultItem} linkComponentType={MockFrameworkLink} />);
      expect(screen.getByTestId('framework-link')).toBeInTheDocument();
    });

    it('passes both to and href for framework compatibility', () => {
      render(<Link item={defaultItem} linkComponentType={MockFrameworkLink} />);
      const link = screen.getByTestId('framework-link');
      expect(link).toHaveAttribute('data-to', '/test-path');
      expect(link).toHaveAttribute('href', '/test-path');
    });

    it('passes activeClassName to framework component', () => {
      render(
        <Link
          item={defaultItem}
          linkComponentType={MockFrameworkLink}
          activeClassName="is-active"
        />
      );
      const link = screen.getByTestId('framework-link');
      expect(link).toHaveAttribute('activeclassname', 'is-active');
    });
  });

  describe('button fallback (no href with onClick)', () => {
    it('renders button when no href but onClick provided', () => {
      const handleClick = vi.fn();
      const buttonItem: NavItem = { label: 'Click Me', href: '' };
      render(<Link item={buttonItem} onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });

    it('calls onClick when button is clicked', () => {
      const handleClick = vi.fn();
      const buttonItem: NavItem = { label: 'Click Me', href: '' };
      render(<Link item={buttonItem} onClick={handleClick} />);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('sets aria-label from item label', () => {
      render(<Link item={defaultItem} />);
      expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'Test Link');
    });

    it('allows custom aria-label override', () => {
      render(<Link item={defaultItem} ariaLabel="Custom Label" />);
      expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'Custom Label');
    });
  });
});
