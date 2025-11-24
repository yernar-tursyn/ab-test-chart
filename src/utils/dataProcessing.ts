import { DailyData, ProcessedDataPoint, Variation, TimeRange } from '../types';

export const calculateConversionRate = (conversions: number, visits: number): number => {
  if (visits === 0) return 0;
  return (conversions / visits) * 100;
};

export const processChartData = (
  data: DailyData[],
  variations: Variation[],
  selectedVariations: string[],
  timeRange: TimeRange
): ProcessedDataPoint[] => {
  const processed: ProcessedDataPoint[] = [];

  data.forEach((day) => {
    const point: ProcessedDataPoint = { date: day.date };

    selectedVariations.forEach((varKey) => {
      const variation = variations.find(
        (v) => (v.id?.toString() || '0') === varKey
      );
      if (!variation) return;

      const visits = day.visits[varKey] || 0;
      const conversions = day.conversions[varKey] || 0;
      const conversionRate = calculateConversionRate(conversions, visits);

      point[`var_${varKey}`] = conversionRate;
    });

    processed.push(point);
  });

  if (timeRange === 'week') {
    return aggregateByWeek(processed);
  }

  return processed;
};

const aggregateByWeek = (data: ProcessedDataPoint[]): ProcessedDataPoint[] => {
  const weekly: ProcessedDataPoint[] = [];
  const weekGroups: ProcessedDataPoint[][] = [];

  for (let i = 0; i < data.length; i += 7) {
    weekGroups.push(data.slice(i, i + 7));
  }

  weekGroups.forEach((week) => {
    if (week.length === 0) return;

    const weekPoint: ProcessedDataPoint = {
      date: `${week[0].date} - ${week[week.length - 1].date}`,
    };

    const variationKeys = Object.keys(week[0]).filter((key) => key.startsWith('var_'));

    variationKeys.forEach((varKey) => {
      const values = week
        .map((d) => d[varKey] as number)
        .filter((v) => typeof v === 'number');
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      weekPoint[varKey] = avg;
    });

    weekly.push(weekPoint);
  });

  return weekly;
};

export const getVariationKey = (variation: Variation): string => {
  return variation.id?.toString() || '0';
};

export const getVariationColor = (index: number): string => {
  const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300',
    '#8dd1e1',
    '#d084d0',
  ];
  return colors[index % colors.length];
};

