import React from 'react'
import type { AbsoluteTabProps } from '../../../types/types'

const styles = {
  box: {
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: 12,
    background: '#fafafa',
  } as React.CSSProperties,
  row: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } as React.CSSProperties,
  label: { fontSize: 12, color: '#6b7280' } as React.CSSProperties,
  btn: {
    padding: '6px 10px',
    borderRadius: 6,
    border: '1px solid #e0e0e0',
    background: '#fff',
    color: '#1f2937',
    cursor: 'pointer',
    fontSize: 13,
  } as React.CSSProperties,
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' } as React.CSSProperties,
}

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
    <div aria-disabled={disabled} style={styles.box}>
      <div style={styles.row}>
        <span style={styles.label}>Absolute</span>
        <span style={styles.label}>Start: {value.start}</span>
        <span style={styles.label}>End: {value.end}</span>
        <span style={styles.label}>
          Bounds: {min ? 'min set' : 'no min'} / {max ? 'max set' : 'no max'}
        </span>
        <span style={styles.label}>Format: {dateTimeFormat ?? 'default'}</span>
        <button
          style={{ ...styles.btn, ...(disabled ? styles.btnDisabled : {}) }}
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
