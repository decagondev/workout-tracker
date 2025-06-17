# Vite Tailwind 4 Starter Template

A modern, fast starter template for React projects using Vite, Tailwind CSS 4, React 19, and TypeScript.

## Features

- ⚡️ [Vite](https://vitejs.dev/) - Lightning fast frontend tooling
- 🎨 [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- ⚛️ [React 19](https://react.dev/) - Latest version of React
- 📝 [TypeScript](https://www.typescriptlang.org/) - Type safety
- 🧹 [ESLint](https://eslint.org/) - Modern linting rules

## Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn or pnpm

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/decagondev/vite-tailwind4-starter.git
cd vite-tailwind4-starter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Visit http://localhost:5173 to see your application running.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## Project Structure

```
vite-tailwind4-starter/
├── public/             # Static assets
├── src/                # Source files
│   ├── assets/         # Assets like images, fonts, etc.
│   ├── App.tsx         # Main App component
│   ├── App.css         # App-specific styles
│   ├── index.css       # Global styles with Tailwind import
│   ├── main.tsx        # Entry point
│   └── vite-env.d.ts   # Vite type declarations
├── .gitignore
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md           # This file
```

## License

This project is open source and available under the [MIT License](LICENSE).
