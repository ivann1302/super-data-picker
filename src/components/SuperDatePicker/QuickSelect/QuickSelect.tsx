import React from 'react'
import type { QuickSelectProps, Preset } from '../../../types/types'
import styles from './QuickSelect.module.css'

export const QuickSelect: React.FC<QuickSelectProps> = ({ presets, onSelect, disabled }) => {
  const handleClick = (p: Preset) => () => !disabled && onSelect(p)
  return (
    <div aria-disabled={disabled}>
      <div className={styles.header}>Быстрый выбор</div>
      <ul className={styles.list}>
        {presets.map((p) => (
          <li key={p.label}>
            <button
              className={`${styles.btn} ${disabled ? styles.btnDisabled : ''}`}
              disabled={disabled}
              onClick={handleClick(p)}
            >
              {p.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuickSelect
