import React from 'react'
import type { NowTabProps } from '../../../types/types'

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
    border: '1px solid #1976d2',
    background: '#1976d2',
    color: '#fff',
    cursor: 'pointer',
    fontSize: 13,
  } as React.CSSProperties,
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' } as React.CSSProperties,
}

export const NowTab: React.FC<NowTabProps> = ({ onPickNow, disabled }) => {
  return (
    <div aria-disabled={disabled} style={styles.box}>
      <div style={styles.row}>
        <span style={styles.label}>Now</span>
        <button
          style={{ ...styles.btn, ...(disabled ? styles.btnDisabled : {}) }}
          onClick={onPickNow}
          disabled={disabled}
        >
          Set to now
        </button>
      </div>
    </div>
  )
}

export default NowTab
