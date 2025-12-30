/**
 * AppLink - Gatsby-specific Link wrapper
 * 
 * This is the "glue" component that connects our framework-agnostic
 * design system to Gatsby's routing. It's the ONLY place in our app
 * that should import from 'gatsby' for Link functionality.
 * 
 * Benefits:
 * - Single point of change when migrating frameworks
 * - Design system remains pure and testable
 * - Gatsby's prefetching and routing "just works"
 */
import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Link, LinkProps } from '@tutorial/design-system';

// Re-export with Gatsby's Link pre-injected
export const AppLink = (props: Omit<LinkProps, 'linkComponentType'>) => (
  <Link {...props} linkComponentType={GatsbyLink} />
);

// Also export a version that allows override for edge cases
export const AppLinkConfigurable = (props: LinkProps) => (
  <Link linkComponentType={GatsbyLink} {...props} />
);

/**
 * For navigation components that need to render many links,
 * you can also export the component type directly
 */
export const AppLinkType = GatsbyLink;
