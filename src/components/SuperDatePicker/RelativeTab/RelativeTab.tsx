import React from 'react'
import type { RelativeTabProps } from '../../../types/types'
import styles from './RelativeTab.module.css'

export const RelativeTab: React.FC<RelativeTabProps> = ({ value, onChange, disabled }) => {
  const setLast15m = () => onChange({ start: 'now-15m', end: 'now' })
  return (
    <div aria-disabled={disabled} className={styles.box}>
      <div className={styles.row}>
        <span className={styles.label}>Относительный</span>
        <span className={styles.label}>
          Текущий: {value.start} → {value.end}
        </span>
        <button
          className={`${styles.btn} ${disabled ? styles.btnDisabled : ''}`}
          onClick={setLast15m}
          disabled={disabled}
        >
          За последние 15 мин
        </button>
      </div>
    </div>
  )
}

export default RelativeTab
