/**
 * AppLink - Next.js-specific Link wrapper
 * 
 * This is the "glue" component that connects our framework-agnostic
 * design system to Next.js's routing. Notice how similar this is to
 * the Gatsby version - the only difference is which Link we import!
 * 
 * Note: Next.js Link has slightly different behavior:
 * - Uses 'href' instead of 'to'
 * - Doesn't have 'activeClassName' built-in (need useRouter for that)
 * - Prefetching works differently
 * 
 * Our design system handles these differences by passing both props.
 */
'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Link, LinkProps } from '@tutorial/design-system';

/**
 * For Next.js, we need a wrapper component to handle active state
 * since Next.js Link doesn't have built-in activeClassName support
 */
const NextLinkWithActive = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof NextLink> & { 
    activeClassName?: string;
    partiallyActive?: boolean;
  }
>(({ activeClassName, className, href, partiallyActive, ...props }, ref) => {
  const pathname = usePathname();
  const hrefString = typeof href === 'string' ? href : href.pathname || '';
  const isActive = pathname === hrefString || 
    (partiallyActive && pathname?.startsWith(hrefString));
  
  const combinedClassName = [
    className,
    isActive && activeClassName,
  ].filter(Boolean).join(' ');

  return (
    <NextLink ref={ref} href={href} className={combinedClassName} {...props} />
  );
});
NextLinkWithActive.displayName = 'NextLinkWithActive';

// Re-export with Next.js Link pre-injected
export const AppLink = (props: Omit<LinkProps, 'linkComponentType'>) => (
  <Link {...props} linkComponentType={NextLinkWithActive} />
);

// Also export a version that allows override for edge cases
export const AppLinkConfigurable = (props: LinkProps) => (
  <Link linkComponentType={NextLinkWithActive} {...props} />
);

/**
 * For components that need direct access to the link type
 */
export const AppLinkType = NextLinkWithActive;
