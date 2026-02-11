# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev      # Start development server (http://localhost:3000)
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
pnpm format   # Format code with Prettier
```

## Technology Stack

- **Next.js 16.1.6** with App Router
- **React 19.2.3** with TypeScript 5
- **Tailwind CSS 4** (using @tailwindcss/postcss)
- **shadcn/ui** components (New York style variant)
- **Manrope** Google Font (Latin & Cyrillic subsets)
- **ESLint 9** with flat config format

## Architecture

This is an immigration services landing page with lead qualification logic.

### Directory Structure

- `app/` - Next.js App Router pages and components
  - `components/` - Page section components (Hero, Stats, etc.)
  - `api/submit-lead/` - API route for Kommo CRM integration
  - `impressum/`, `privacy/` - Legal pages
- `components/ui/` - Reusable shadcn/ui components
- `lib/` - Utility functions (cn for className merging)
- `scripts/` - Helper scripts (get-kommo-fields.js)

### Key Components

**HeroForm** (`app/components/HeroForm.tsx`) contains the main lead capture form with:
- Form validation (name, phone, email required)
- Lead qualification logic based on career, education, and income
- Integration with analytics (Yandex Metrika, Google Ads, Meta Pixel)
- Conditional CRM submission for qualified leads only
- Medicine career requires specialist/higher education validation

**API Route** (`app/api/submit-lead/route.ts`) handles:
- Lead submission to Kommo CRM using Incoming Leads API
- Automatically places leads in "Incoming Lead" stage for proper funnel management
- Custom field mapping (career, education, income)
- Contact creation with phone, email, telegram fields
- Generates unique source_uid for each submission

### Lead Qualification Logic

Located in `HeroForm.tsx`, `isLead()` function:
- Income > €3000 → always qualified
- Income < €1000 → not qualified
- Engineering/Medicine + income > €500 → qualified
- Highschool/Specialist education (except income > €3000) → not qualified

### Analytics Integration

Three tracking systems initialized in `app/layout.tsx`:
- **Yandex Metrika** (ID: 91677080) - webvisor, clickmap, bounce tracking
- **Google Ads** (ID: AW-11223285171) - conversion tracking
- **Meta Pixel** (ID: 1611727633594481) - custom events

Conversions tracked on qualified lead submission in `HeroForm.tsx`.

## Path Aliases

Configured in `tsconfig.json` and `components.json`:

```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

## Styling

- Uses shadcn/ui with Tailwind CSS 4 and `tw-animate-css`
- Custom Tailwind config for brand colors (CSS variables in globals.css)
- Manrope font configured in `layout.tsx`
- Prettier with `prettier-plugin-tailwindcss` for automatic class sorting

## Environment Variables

Required for CRM integration (`.env.local`):

```
KOMMO_SUBDOMAIN=your-subdomain
KOMMO_API_TOKEN=your-token
KOMMO_PIPELINE_ID=pipeline-id
KOMMO_PHONE_FIELD_ID=field-id
KOMMO_EMAIL_FIELD_ID=field-id
```

Use `node scripts/get-kommo-fields.js` to fetch Kommo field IDs.

**Note:** The API uses the Incoming Leads endpoint (`/api/v4/leads/unsorted/forms`) which automatically places leads in the "Incoming Lead" stage, so `KOMMO_STATUS_ID` is not needed.
