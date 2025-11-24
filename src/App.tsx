import { useState, useEffect, useRef } from 'react';
import { ChartData, TimeRange, LineStyle, Theme } from './types';
import { LineChart } from './components/LineChart';
import { Controls } from './components/Controls';
import { useChartData } from './hooks/useChartData';
import styles from './App.module.css';

function App() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [lineStyle, setLineStyle] = useState<LineStyle>('line');
  const [theme, setTheme] = useState<Theme>('light');
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let baseUrl = import.meta.env.BASE_URL;
    if (!baseUrl || baseUrl === '/') {
      const pathname = window.location.pathname;
      if (pathname.includes('/ab-test-chart')) {
        baseUrl = '/ab-test-chart/';
      } else {
        baseUrl = '/';
      }
    }
    const dataUrl = `${baseUrl}data.json`.replace(/\/+/g, '/');
    fetch(dataUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setChartData(data))
      .catch((err) => console.error('Failed to load data:', err));
  }, []);

  const {
    selectedVariations,
    processedData,
    toggleVariation,
  } = useChartData(chartData, timeRange);

  const handleExport = () => {
    if (!chartRef.current) return;
    
    import('html2canvas').then((html2canvas) => {
      html2canvas.default(chartRef.current!).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'ab-test-chart.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    });
  };

  const handleResetZoom = () => {
    window.location.reload();
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (!chartData) {
    return <div className={styles.loading}>Loading data...</div>;
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>A/B Test Conversion Rate Chart</h1>
      </header>
      <main className={styles.main}>
        <Controls
          variations={chartData.variations}
          selectedVariations={selectedVariations}
          onToggleVariation={toggleVariation}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          lineStyle={lineStyle}
          onLineStyleChange={setLineStyle}
          theme={theme}
          onThemeChange={setTheme}
          onExport={handleExport}
          onResetZoom={handleResetZoom}
        />
        <div ref={chartRef}>
          <LineChart
            data={processedData}
            variations={chartData.variations}
            selectedVariations={selectedVariations}
            lineStyle={lineStyle}
            theme={theme}
            onExport={handleExport}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

