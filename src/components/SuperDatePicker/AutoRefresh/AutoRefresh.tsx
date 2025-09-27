import React from 'react'
import type { AutoRefreshProps } from '../../../types/types'
import styles from './AutoRefresh.module.css'

export const AutoRefresh: React.FC<AutoRefreshProps> = ({
  interval,
  isPaused,
  onChange,
  disabled,
}) => {
  const toggle = () => onChange({ interval, isPaused: !isPaused })
  const inc = () => onChange({ interval: Math.max(0, interval + 1000), isPaused })
  const dec = () => onChange({ interval: Math.max(0, interval - 1000), isPaused })

  return (
    <div aria-disabled={disabled}>
      <div className={styles.row}>
        <span className={styles.label}>Автообновление:</span>
        <span className={styles.label}>{isPaused ? 'пауза' : 'идет'}</span>
        <span className={styles.label}>| {interval} мс</span>
        <button
          className={`${styles.btn} ${styles.btnPrimary} ${disabled ? styles.btnDisabled : ''}`}
          onClick={toggle}
          disabled={disabled}
        >
          {isPaused ? 'Возобновить' : 'Пауза'}
        </button>
        <button
          className={`${styles.btn} ${disabled ? styles.btnDisabled : ''}`}
          onClick={inc}
          disabled={disabled}
        >
          +1с
        </button>
        <button
          className={`${styles.btn} ${disabled || interval <= 0 ? styles.btnDisabled : ''}`}
          onClick={dec}
          disabled={disabled || interval <= 0}
        >
          -1с
        </button>
      </div>
    </div>
  )
}

export default AutoRefresh
