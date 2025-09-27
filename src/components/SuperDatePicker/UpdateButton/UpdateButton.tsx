import React from 'react'
import type { UpdateButtonProps } from '../../../types/types'
import styles from './UpdateButton.module.css'

export const UpdateButton: React.FC<UpdateButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${styles.btn} ${disabled || isLoading ? styles.btnDisabled : ''}`}
      aria-busy={isLoading}
    >
      {isLoading ? 'Обновление…' : 'Обновить'}
    </button>
  )
}

export default UpdateButton
