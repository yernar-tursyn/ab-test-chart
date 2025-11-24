import React, { useRef, useState } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { ProcessedDataPoint, Variation, LineStyle } from '../types';
import { Tooltip } from './Tooltip';
import { getVariationKey, getVariationColor } from '../utils/dataProcessing';
import styles from './LineChart.module.css';

interface LineChartProps {
  data: ProcessedDataPoint[];
  variations: Variation[];
  selectedVariations: string[];
  lineStyle: LineStyle;
  theme: 'light' | 'dark';
  onExport: () => void;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  variations,
  selectedVariations,
  lineStyle,
  theme,
  onExport,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getDomain = () => {
    if (data.length === 0) return [0, 100];
    const allValues: number[] = [];
    selectedVariations.forEach((varKey) => {
      data.forEach((point) => {
        const value = point[`var_${varKey}`] as number;
        if (typeof value === 'number') allValues.push(value);
      });
    });
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1;
    return [Math.max(0, min - padding), max + padding];
  };

  const yDomain = getDomain();

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
      onMouseMove: (state: any) => {
        if (state?.activeTooltipIndex !== undefined) {
          setHoveredIndex(state.activeTooltipIndex);
        }
      },
      onMouseLeave: () => setHoveredIndex(null),
    };

    if (lineStyle === 'area') {
      return (
        <AreaChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#e0e0e0'} />
          <XAxis
            dataKey="date"
            stroke={theme === 'dark' ? '#ccc' : '#666'}
            tick={{ fill: theme === 'dark' ? '#ccc' : '#666' }}
          />
          <YAxis
            domain={yDomain}
            stroke={theme === 'dark' ? '#ccc' : '#666'}
            tick={{ fill: theme === 'dark' ? '#ccc' : '#666' }}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
          />
          <RechartsTooltip
            content={<Tooltip variations={variations} />}
          />
          {hoveredIndex !== null && (
            <ReferenceLine
              x={data[hoveredIndex]?.date}
              stroke={theme === 'dark' ? '#888' : '#999'}
              strokeDasharray="3 3"
            />
          )}
          {selectedVariations.map((varKey, index) => {
            const variation = variations.find(
              (v) => getVariationKey(v) === varKey
            );
            if (!variation) return null;
            return (
              <Area
                key={varKey}
                type="monotone"
                dataKey={`var_${varKey}`}
                stroke={getVariationColor(index)}
                fill={getVariationColor(index)}
                fillOpacity={0.3}
                strokeWidth={2}
                name={`var_${varKey}`}
              />
            );
          })}
        </AreaChart>
      );
    }

    return (
      <RechartsLineChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#e0e0e0'} />
        <XAxis
          dataKey="date"
          stroke={theme === 'dark' ? '#ccc' : '#666'}
          tick={{ fill: theme === 'dark' ? '#ccc' : '#666' }}
        />
        <YAxis
          domain={yDomain}
          stroke={theme === 'dark' ? '#ccc' : '#666'}
          tick={{ fill: theme === 'dark' ? '#ccc' : '#666' }}
          tickFormatter={(value) => `${value.toFixed(1)}%`}
        />
        <Tooltip
          variations={variations}
          content={<Tooltip variations={variations} />}
        />
        {hoveredIndex !== null && (
          <ReferenceLine
            x={data[hoveredIndex]?.date}
            stroke={theme === 'dark' ? '#888' : '#999'}
            strokeDasharray="3 3"
          />
        )}
        {selectedVariations.map((varKey, index) => {
          const variation = variations.find(
            (v) => getVariationKey(v) === varKey
          );
          if (!variation) return null;
          return (
            <Line
              key={varKey}
              type={lineStyle === 'smooth' ? 'monotone' : 'linear'}
              dataKey={`var_${varKey}`}
              stroke={getVariationColor(index)}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              name={`var_${varKey}`}
            />
          );
        })}
      </RechartsLineChart>
    );
  };

  return (
    <div ref={chartRef} className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={500}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

