import type { ReactNode } from 'react';

/**
 * Represents content that can be rendered as children
 */
export type Children = ReactNode;

/**
 * Navigation item data model
 * Used by Link and navigation components
 */
export type NavItem = {
  /** Display text for the link */
  label: string;
  /** URL or path to navigate to */
  href: string;
  /** 
   * Whether partial URL matches should trigger active state
   * e.g., /blog should be active when on /blog/my-post
   */
  isPartiallyActiveAllowed?: boolean;
  /** Optional icon identifier */
  icon?: string;
  /** Nested navigation items for dropdowns/submenus */
  children?: NavItem[];
};

/**
 * Common props shared across interactive components
 */
export type InteractiveProps = {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

/**
 * Props for components that support framework-specific routing
 */
export type RoutableProps = {
  /** 
   * Framework-specific link/router component.
   * Allows design system components to work with any routing library.
   */
  linkComponentType?: React.ElementType;
};
