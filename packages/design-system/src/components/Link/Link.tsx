import React from 'react';
import type { NavItem, Children } from '../../types';

export type LinkProps = {
  /** Navigation item containing href and label */
  item: NavItem;
  /** 
   * Framework-specific link component to use for rendering.
   * Pass Gatsby's Link, Next.js Link, React Router's Link, etc.
   * Falls back to native <a> tag if not provided.
   */
  linkComponentType?: React.ElementType;
  className?: string;
  activeClassName?: string;
  children?: Children;
  role?: string;
  ariaLabel?: string;
  navTarget?: '_blank' | '_self';
  id?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

/**
 * Framework-agnostic Link component.
 * 
 * This component demonstrates the dependency injection pattern for
 * decoupling design system components from framework-specific code.
 * 
 * @example
 * // In a Gatsby app:
 * import { Link as GatsbyLink } from 'gatsby';
 * <Link item={{ href: '/about', label: 'About' }} linkComponentType={GatsbyLink} />
 * 
 * @example
 * // In a Next.js app:
 * import NextLink from 'next/link';
 * <Link item={{ href: '/about', label: 'About' }} linkComponentType={NextLink} />
 * 
 * @example
 * // Without any framework (uses native <a>):
 * <Link item={{ href: '/about', label: 'About' }} />
 */
export const Link = ({
  item,
  linkComponentType,
  className,
  activeClassName,
  children,
  role = 'link',
  ariaLabel,
  navTarget,
  id,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: LinkProps) => {
  const href = item?.href ?? '';
  const isExternal = href.startsWith('http');
  const rel = isExternal ? 'noopener noreferrer' : undefined;
  const target = navTarget ?? (isExternal ? '_blank' : '_self');
  const label = ariaLabel || item.label;
  const content = children || item.label;

  // Case 1: No href but has onClick - render as button for accessibility
  if (href === '' && onClick) {
    return (
      <button
        aria-label={label}
        className={className}
        id={id}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        type="button"
      >
        {content}
      </button>
    );
  }

  // Case 2: Framework-specific link component provided - use createElement
  if (linkComponentType) {
    return React.createElement(
      linkComponentType,
      {
        'aria-label': label,
        // Gatsby uses 'to', Next.js uses 'href' - provide both for compatibility
        to: href,
        href: href,
        className,
        role,
        activeClassName,
        partiallyActive: item.isPartiallyActiveAllowed,
        target,
        rel,
        id,
        onClick,
        onMouseEnter,
        onMouseLeave,
      },
      content
    );
  }

  // Case 3: No framework component - fall back to native anchor
  return (
    <a
      aria-label={label}
      href={href}
      className={className}
      role={role}
      target={target}
      rel={rel}
      id={id}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </a>
  );
};
