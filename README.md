# Oasis Analytics Storyboard

A premium, interactive sales storyboard web app for live sales calls and shareable links. Built with React, TypeScript, Vite, TailwindCSS, shadcn/ui, Framer Motion, and Recharts.

## Features

- **10 Interactive Scenes**: Complete narrative showcasing Oasis Analytics case study metrics
- **Dual Modes**: 
  - **Presenter Mode**: Keyboard arrow keys to navigate scenes
  - **Link Mode**: Normal scrolling with automatic scene detection
- **Proof Mode**: Toggle to reveal detailed breakdown tables
- **PDF Export**: Export to PDF via browser print functionality
- **Responsive Design**: Optimized for both desktop screen shares and mobile devices
- **Accessibility**: Full keyboard navigation, focus states, and ARIA labels

## Getting Started

### Prerequisites

- Node.js 20+ 
- pnpm (or npm)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Testing

```bash
# Run tests
pnpm test
```

### Building

```bash
# Build for production
pnpm build
```

The built files will be in the `dist` directory, ready for static site deployment.

### Deployment

This is a static site and can be deployed to any static hosting service:

- **Vercel**: Connect your repository or run `vercel`
- **Netlify**: Connect your repository or drag & drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions or deploy the `dist` folder
- **Any static host**: Upload the contents of the `dist` directory

## Usage

### Navigation

- **Presenter Mode**: Toggle on to use arrow keys (←/→ or ↑/↓) to navigate between scenes
- **Link Mode**: Default mode - scroll normally and the current scene updates automatically
- **Progress Indicator**: Click the dots to jump to any scene
- **Back/Next Buttons**: Navigate sequentially through scenes

### Proof Mode

Toggle Proof Mode to reveal detailed breakdown tables in Scene 5 (Callbacks). These tables show:
- Interested Callback Breakdown
- Not Converted Callback Breakdown

### PDF Export

Click the "Export PDF" button in the navigation bar to open the browser's print dialog. Save as PDF to export the entire storyboard.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AnimatedCounter.tsx
│   ├── SceneLayout.tsx
│   ├── SceneReveal.tsx
│   └── StoryNavigation.tsx
├── contexts/           # React contexts
│   └── StoryContext.tsx
├── data/               # Metrics data (single source of truth)
│   ├── metrics.ts
│   └── metrics.test.ts
├── hooks/              # Custom React hooks
│   └── useStoryNavigation.ts
├── lib/                # Utilities
│   ├── assertMetrics.ts
│   └── format.ts
└── story/              # Story scenes
    ├── scenes.ts       # Scene registry
    └── scenes/         # Individual scene components
        ├── Scene1.tsx
        ├── Scene2.tsx
        └── ...
```

## Metrics

All metrics are stored in `src/data/metrics.ts` as the single source of truth. The metrics assertion system ensures values match exactly and cannot be accidentally modified.

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS v4** - Styling
- **shadcn/ui** - UI component library
- **Framer Motion** - Animations
- **Recharts** - Charts and data visualization
- **Vitest** - Testing

## License

Private project - All rights reserved
