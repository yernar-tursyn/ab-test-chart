import React from 'react';
import { Variation, TimeRange, LineStyle, Theme } from '../types';
import { getVariationKey } from '../utils/dataProcessing';
import styles from './Controls.module.css';

interface ControlsProps {
  variations: Variation[];
  selectedVariations: string[];
  onToggleVariation: (varKey: string) => void;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  lineStyle: LineStyle;
  onLineStyleChange: (style: LineStyle) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onExport: () => void;
  onResetZoom: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  variations,
  selectedVariations,
  onToggleVariation,
  timeRange,
  onTimeRangeChange,
  lineStyle,
  onLineStyleChange,
  theme,
  onThemeChange,
  onExport,
  onResetZoom,
}) => {
  return (
    <div className={styles.controls}>
      <div className={styles.controlGroup}>
        <label className={styles.label}>Variations:</label>
        <div className={styles.variationButtons}>
          {variations.map((variation) => {
            const varKey = getVariationKey(variation);
            const isSelected = selectedVariations.includes(varKey);
            return (
              <button
                key={varKey}
                className={`${styles.variationButton} ${
                  isSelected ? styles.selected : ''
                }`}
                onClick={() => onToggleVariation(varKey)}
                disabled={isSelected && selectedVariations.length === 1}
              >
                {variation.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.controlGroup}>
        <label className={styles.label}>Time Range:</label>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${
              timeRange === 'day' ? styles.active : ''
            }`}
            onClick={() => onTimeRangeChange('day')}
          >
            Day
          </button>
          <button
            className={`${styles.button} ${
              timeRange === 'week' ? styles.active : ''
            }`}
            onClick={() => onTimeRangeChange('week')}
          >
            Week
          </button>
        </div>
      </div>

      <div className={styles.controlGroup}>
        <label className={styles.label}>Line Style:</label>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${
              lineStyle === 'line' ? styles.active : ''
            }`}
            onClick={() => onLineStyleChange('line')}
          >
            Line
          </button>
          <button
            className={`${styles.button} ${
              lineStyle === 'smooth' ? styles.active : ''
            }`}
            onClick={() => onLineStyleChange('smooth')}
          >
            Smooth
          </button>
          <button
            className={`${styles.button} ${
              lineStyle === 'area' ? styles.active : ''
            }`}
            onClick={() => onLineStyleChange('area')}
          >
            Area
          </button>
        </div>
      </div>

      <div className={styles.iconGroup}>
        <button className={styles.iconButton} onClick={onResetZoom} title="Reset Zoom">
          <i className="fas fa-rotate-left"></i>
        </button>
        <button className={styles.iconButton} onClick={onExport} title="Export PNG">
          <i className="fas fa-download"></i>
        </button>
        <button
          className={styles.iconButton}
          onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
          title="Toggle Theme"
        >
          <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
        </button>
      </div>
    </div>
  );
};

