import React from 'react'
import { COMMONLY_USED_PRESETS } from '../presets'
import QuickSelect from '../QuickSelect/QuickSelect'
import AutoRefresh from '../AutoRefresh/AutoRefresh'
import UpdateButton from '../UpdateButton/UpdateButton'
import type { SuperDatePickerProps } from '../../../types/types'
import styles from './SuperDatePicker.module.css'

// Компонент оформлен в одном блоке. Логику не меняем, только представление
export const SuperDatePicker: React.FC<SuperDatePickerProps> = ({
  value,
  mode = 'relative',
  presets = COMMONLY_USED_PRESETS,
  onChange,
  onPresetSelect,
  isDisabled,
  isLoading,
  dateTimeFormat,
  refresh,
  onRefreshChange,
  onApply,
}) => {
  const hasHandlers = Boolean(onChange || onPresetSelect || onRefreshChange)
  const refreshInfo = refresh
    ? `${refresh.isPaused ? 'пауза' : 'идет'} / ${refresh.interval} мс`
    : 'выключено'

  return (
    <div
      className={styles.card}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      data-has-handlers={hasHandlers}
    >
      {/* Заголовок блока */}
      <div className={styles.header}>
        <div className={styles.title}>Super Data Picker</div>
        <span className={styles.caption}>режим: {mode}</span>
      </div>

      {/* Текущий диапазон и формат отображения */}
      <div className={styles.row}>
        <div className={styles.chip}>Диапазон</div>
        <div>
          {value.start} → {value.end}
        </div>
        <div className={styles.chip}>Формат</div>
        <div>{dateTimeFormat ?? 'по умолчанию'}</div>
      </div>

      {/* Быстрые пресеты */}
      <div className={styles.section}>
        <div className={`${styles.row} ${styles.rowMb4}`}>
          <div className={styles.chip}>Пресеты</div>
          <div className={styles.caption}>{presets.length} доступно</div>
        </div>
        <QuickSelect
          presets={presets}
          onSelect={onPresetSelect ?? (() => {})}
          disabled={isDisabled || isLoading}
        />
      </div>

      {/* Автообновление и кнопка применения */}
      <div className={`${styles.section} ${styles.footer}`}>
        <div className={styles.footerInfo}>
          <div className={styles.chip}>Обновление</div>
          <div className={styles.caption}>{refreshInfo}</div>
        </div>
        {refresh && onRefreshChange ? (
          <AutoRefresh
            interval={refresh.interval}
            isPaused={refresh.isPaused}
            onChange={onRefreshChange}
            disabled={isDisabled}
          />
        ) : null}
        <UpdateButton onClick={onApply} isLoading={isLoading} disabled={isDisabled} />
      </div>
    </div>
  )
}

export default SuperDatePicker
