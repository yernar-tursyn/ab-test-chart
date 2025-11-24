import { useState, useEffect } from 'react';
import { ChartData, ProcessedDataPoint, TimeRange } from '../types';
import { processChartData, getVariationKey } from '../utils/dataProcessing';

export const useChartData = (
  chartData: ChartData | null,
  timeRange: TimeRange
) => {
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [processedData, setProcessedData] = useState<ProcessedDataPoint[]>([]);

  useEffect(() => {
    if (!chartData) return;

    if (selectedVariations.length === 0) {
      const defaultSelection = [getVariationKey(chartData.variations[0])];
      setSelectedVariations(defaultSelection);
      return;
    }

    const processed = processChartData(
      chartData.data,
      chartData.variations,
      selectedVariations,
      timeRange
    );
    setProcessedData(processed);
  }, [chartData, selectedVariations, timeRange]);

  const toggleVariation = (varKey: string) => {
    setSelectedVariations((prev) => {
      if (prev.includes(varKey)) {
        if (prev.length === 1) return prev;
        return prev.filter((v) => v !== varKey);
      }
      return [...prev, varKey];
    });
  };

  return {
    selectedVariations,
    processedData,
    toggleVariation,
    setSelectedVariations,
  };
};

