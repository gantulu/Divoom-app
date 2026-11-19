# Divoom App

Mobile-first Divoom storefront built with React, Vite, TypeScript, Konsta UI (iOS theme), and Tailwind CSS v4.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## UI foundation

- Konsta UI global theme: iOS
- Tailwind CSS v4 with the official Vite plugin
- Mobile-first storefront shell (maximum content width: 500px)
- Safe-area-aware page foundation and bottom navigation
- Design tokens are defined in `src/index.css`

## Current scope

Phase 1 establishes the UI foundation only. Storefront screens, Supabase integration, and Midtrans payment processing are planned for later phases.
