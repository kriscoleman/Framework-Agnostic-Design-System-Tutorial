# Framework-Agnostic Component Design Tutorial

> Learn how to decouple your design system from your framework for painless migrations.

## The Scenario

Your team built a Gatsby.js application with a tightly-coupled design system. Now you need to migrate to Next.js. How do you do this without:

- A months-long feature freeze?
- Supporting two frameworks simultaneously?
- Rewriting everything from scratch?

**Answer: Component abstraction via dependency injection.**

## Quick Start

```bash
# Install dependencies
pnpm install

# Build the design system first
pnpm build

# Run either app:
pnpm dev:gatsby    # http://localhost:8000
pnpm dev:nextjs    # http://localhost:3000
```

Both apps render **identical UIs** using the **same design system**, but with different framework routing.

## The Core Pattern

### The Problem with Tight Coupling

```tsx
// ❌ BAD: Design system component with framework dependency
import { Link } from 'gatsby';  // Framework lock-in!

export const NavLink = ({ to, children }) => (
  <Link to={to} activeClassName="active">{children}</Link>
);
```

### The Solution: Dependency Injection

```tsx
// ✅ GOOD: Framework-agnostic component
export const NavLink = ({ to, children, linkComponentType }) => (
  React.createElement(
    linkComponentType || 'a',
    { href: to, to: to },
    children
  )
);
```

Now the host application decides what `linkComponentType` is:

```tsx
// Gatsby app:
<NavLink to="/about" linkComponentType={GatsbyLink}>About</NavLink>

// Next.js app:
<NavLink to="/about" linkComponentType={NextLink}>About</NavLink>
```

## Project Structure

```
packages/
├── design-system/           # Framework-agnostic components
│   └── src/components/Link  # The star of the show
├── gatsby-app/              # Gatsby host application
│   └── src/components/AppLink.tsx  # Injects GatsbyLink
└── nextjs-app/              # Next.js host application
    └── src/components/AppLink.tsx  # Injects NextLink
```

## Migration Phases

### Phase 1: Extract & Abstract
Decouple design system without breaking the current app.

### Phase 2: Build New Host
Create Next.js app using the same design system.

### Phase 3: Infrastructure & Cutover
Deploy and retire the old framework.

## Exercises

1. **Trace the Abstraction**: Compare the two `AppLink.tsx` files
2. **Add a Component**: Create a framework-agnostic `Button`
3. **Handle Quirks**: See how `NextLinkWithActive` adds activeClassName support

## Learn More

See the full tutorial documentation in the `docs/` folder or the detailed comments in the source files.
