# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Hoyo Buddy one-year anniversary website, a Next.js 15 application with React 19. The website is designed with Apple-inspired aesthetics and features comprehensive internationalization support for 10 languages. It uses shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm start` - Start production server
- `npm run lint` - Run ESLint (Note: linting and TypeScript errors are ignored during builds)

## Architecture & Key Files

### Core Configuration
- `next.config.mjs` - Next.js configuration with disabled ESLint/TypeScript build checks and unoptimized images
- `tailwind.config.ts` - Tailwind configuration with shadcn/ui theme system and CSS variables
- `components.json` - shadcn/ui configuration with component aliases and styling setup
- `middleware.ts` - Handles internationalization routing and locale detection

### Internationalization System
- `lib/i18n.ts` - Core i18n configuration with 10 supported locales: en, zh-TW, zh-CN, ja, es, nl, vi, ru, pt, fr
- `lib/dictionaries/` - Translation files for each locale
- Locale-based routing via `app/[locale]/` directory structure
- Default locale is English ('en')

### Components Structure
- `components/ui/` - Complete shadcn/ui component library (40+ components)
- `components/HoyoBuddyAnniversary.tsx` - Main anniversary page component with animations
- `components/LanguageSwitcher.tsx` - Language selection component
- `components/theme-provider.tsx` - Theme context provider

### Styling System
- Uses CSS variables for theming (`--primary`, `--secondary`, etc.)
- Dark mode support via class-based toggle
- Custom animations for accordions and other UI elements
- Framer Motion for advanced animations and scroll effects

### Development Notes
- Package manager: Uses both npm and pnpm (pnpm-lock.yaml present)
- TypeScript configuration includes path aliases (@/* maps to ./*)
- Images stored in `public/avatars/` for team member profile pictures
- Static assets include logo, preview images, and placeholder images

### Key Constants
When working with server count displays, use these constants from HoyoBuddyAnniversary.tsx:
- THREE_K_SERVERS = 3000
- SIX_K_SERVERS = 6000  
- ANNIVERSARY_SERVERS = 8514

## Component Patterns
- All UI components follow shadcn/ui patterns with forwardRef and className merging
- Use Tailwind's CSS variable system for consistent theming
- Framer Motion animations use consistent fadeInUp, fadeIn, and staggerContainer variants
- Internationalization handled via getDictionary() async function calls