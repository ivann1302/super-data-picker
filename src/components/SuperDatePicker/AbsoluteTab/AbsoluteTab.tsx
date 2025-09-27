import React from 'react'
import type { AbsoluteTabProps } from '../../../types/types'
import styles from './AbsoluteTab.module.css'

export const AbsoluteTab: React.FC<AbsoluteTabProps> = ({
  value,
  onChange,
  min,
  max,
  dateTimeFormat,
  disabled,
}) => {
  // Здесь только демонстрация связи с onChange, реальный ввод дат будет позже
  const handleSwap = () => onChange({ start: value.end, end: value.start })
  return (
    <div aria-disabled={disabled} className={styles.box}>
      <div className={styles.row}>
        <span className={styles.label}>Absolute</span>
        <span className={styles.label}>Start: {value.start}</span>
        <span className={styles.label}>End: {value.end}</span>
        <span className={styles.label}>
          Bounds: {min ? 'min set' : 'no min'} / {max ? 'max set' : 'no max'}
        </span>
        <span className={styles.label}>Format: {dateTimeFormat ?? 'default'}</span>
        <button
          className={`${styles.btn} ${disabled ? styles.btnDisabled : ''}`}
          onClick={handleSwap}
          disabled={disabled}
        >
          Swap
        </button>
      </div>
    </div>
  )
}

export default AbsoluteTab
