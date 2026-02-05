# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

This project uses **pnpm** as the package manager.

```bash
pnpm dev      # Start development server (http://localhost:3000)
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Technology Stack

- **Next.js 16.1.6** with App Router
- **React 19.2.3** with TypeScript 5
- **Tailwind CSS 4** (using @tailwindcss/postcss)
- **ESLint 9** with flat config format (eslint.config.mjs)

## Architecture

This is a Next.js App Router project. All pages and layouts live in the `app/` directory:

- `app/layout.tsx` - Root layout with Geist fonts and metadata
- `app/page.tsx` - Home page route
- `app/globals.css` - Global styles with Tailwind imports and CSS variables for theming

## Path Aliases

Use `@/*` to import from the project root (configured in tsconfig.json).

```typescript
import { something } from "@/app/components/Something";
```

## Styling

- Tailwind CSS is imported via `@import "tailwindcss"` in globals.css
- Dark mode is supported via `prefers-color-scheme` media query
- CSS variables `--background` and `--foreground` control theme colors
- Geist Sans and Geist Mono fonts are configured in layout.tsx
