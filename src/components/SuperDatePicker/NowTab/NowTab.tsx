import React from 'react'
import type { NowTabProps } from '../../../types/types'
import styles from './NowTab.module.css'

export const NowTab: React.FC<NowTabProps> = ({ onPickNow, disabled }) => {
  return (
    <div aria-disabled={disabled} className={styles.box}>
      <div className={styles.row}>
        <span className={styles.label}>Now</span>
        <button
          className={`${styles.btn} ${disabled ? styles.btnDisabled : ''}`}
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
