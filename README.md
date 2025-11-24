# A/B Test Interactive Line Chart

An interactive chart for visualizing A/B test results, built with React, TypeScript, and Recharts.

## Features

### Core Requirements
- ✅ Conversion rate chart for all variations (displayed as percentages)
- ✅ Hover interactivity with vertical line and tooltip
- ✅ At least one variation is always selected
- ✅ Automatic axis adaptation to visible data
- ✅ All values displayed as percentages
- ✅ Responsive design (671px - 1300px)
- ✅ Variation selector
- ✅ Time selector (Day/Week)

### Bonus Features
- ✅ Zoom/Reset zoom
- ✅ Line style selector (Line, Smooth, Area)
- ✅ Light/Dark theme toggle
- ✅ Export chart to PNG

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Recharts** - Charting library
- **Vite** - Build tool
- **CSS Modules** - Component styling
- **Font Awesome** - Icons

## Installation Instructions

### Requirements
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ab-test-chart.git
cd ab-test-chart
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Deploy to GitHub Pages:
```bash
npm run deploy
```

Make sure to update the `homepage` field in `package.json` with your GitHub repository URL.

## Project Structure

```
src/
├── components/       # React components
├── hooks/           # Custom React hooks
├── types/           # TypeScript types
├── utils/           # Utilities
└── App.tsx          # Main application component
```

## Visualization Library

**Recharts** was chosen for this project because:
- Built specifically for React
- Excellent TypeScript support
- Rich functionality (tooltips, responsive design, multiple chart types)
- Active maintenance and community
- Easy customization and theming
- Font Awesome for icons
