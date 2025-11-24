import React from 'react';
import { Variation } from '../types';
import { getVariationKey } from '../utils/dataProcessing';
import styles from './Tooltip.module.css';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
  variations: Variation[];
}

export const Tooltip: React.FC<TooltipProps> = ({
  active,
  payload,
  label,
  variations,
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipDate}>{label}</div>
      {payload.map((entry, index) => {
        const varKey = entry.name.replace('var_', '');
        const variation = variations.find(
          (v) => getVariationKey(v) === varKey
        );
        return (
          <div key={index} className={styles.tooltipItem}>
            <span
              className={styles.tooltipDot}
              style={{ backgroundColor: entry.color }}
            />
            <span className={styles.tooltipLabel}>
              {variation?.name || 'Unknown'}: {entry.value.toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

