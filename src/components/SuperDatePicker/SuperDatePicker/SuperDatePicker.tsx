import React, { useEffect, useMemo, useState } from 'react'
import { COMMONLY_USED_PRESETS } from '../presets'
import QuickSelect from '../QuickSelect/QuickSelect'
import AutoRefresh from '../AutoRefresh/AutoRefresh'
import UpdateButton from '../UpdateButton/UpdateButton'
import type { SuperDatePickerProps, Preset } from '../../../types/types'
import { isRangeValid as validateRange, parseStart, parseEnd } from '../dateMath'
import styles from './SuperDatePicker.module.css'

// Компонент поддерживает два режима пропсов: легаси (value/mode) и новый MVP (start/end/onTimeChange)
export const SuperDatePicker: React.FC<SuperDatePickerProps> = (props) => {
  const {
    // legacy
    value,
    mode = 'relative',
    presets: legacyPresets = COMMONLY_USED_PRESETS,
    onChange,
    onPresetSelect,
    isDisabled,
    isLoading,
    dateTimeFormat,
    refresh,
    onRefreshChange,
    onApply,
    // MVP
    start: mvpStart = 'now-15m',
    end: mvpEnd = 'now',
    onTimeChange,
    showUpdateButton = true,
    commonlyUsedRanges,
    recentlyUsedRanges = [],
  } = props

  // Режим MVP включается, если передан onTimeChange
  const isMvp = typeof onTimeChange === 'function'

  // Локальные черновики для MVP инпутов
  const [draftStart, setDraftStart] = useState(mvpStart)
  const [draftEnd, setDraftEnd] = useState(mvpEnd)

  // Синхронно обновляем черновики, если приходят новые пропсы извне
  useEffect(() => setDraftStart(mvpStart), [mvpStart])
  useEffect(() => setDraftEnd(mvpEnd), [mvpEnd])

  // Валидация значений для MVP
  const hasErrorStart = useMemo(() => isMvp && !parseStart(draftStart), [isMvp, draftStart])
  const hasErrorEnd = useMemo(() => isMvp && !parseEnd(draftEnd), [isMvp, draftEnd])
  const isRangeOk = useMemo(
    () => (isMvp ? validateRange(draftStart, draftEnd) : true),
    [isMvp, draftStart, draftEnd],
  )

  // Обработчики
  const applyDraft = () => {
    if (!isMvp || !isRangeOk || !onTimeChange) return
    onTimeChange({ start: draftStart, end: draftEnd })
  }

  const handleQuickSelect = (p: Preset) => {
    if (isMvp) {
      // Мгновенное применение по требованиям MVP
      if (!validateRange(p.start, p.end) || !onTimeChange) return
      onTimeChange({ start: p.start, end: p.end })
      return
    }
    // Легаси путь: просто пробрасываем выбранный пресет наружу
    onPresetSelect?.(p)
  }

  const presets = isMvp ? (commonlyUsedRanges ?? COMMONLY_USED_PRESETS) : legacyPresets

  const refreshInfo = refresh
    ? `${refresh.isPaused ? 'пауза' : 'идет'} / ${refresh.interval} мс`
    : 'выключено'

  return (
    <div
      className={styles.card}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      data-has-handlers={Boolean(onChange || onPresetSelect || onRefreshChange)}
    >
      {/* Заголовок блока */}
      <div className={styles.header}>
        <div className={styles.title}>Super Date Picker</div>
        {!isMvp && <span className={styles.caption}>режим: {mode}</span>}
      </div>

      {/* Секция ввода и отображения */}
      {isMvp ? (
        <div className={`${styles.section}`}>
          <div className={styles.row}>
            <div className={styles.inputCol}>
              <label className={styles.label}>Начало</label>
              <input
                className={hasErrorStart ? styles.inputError : styles.input}
                value={draftStart}
                onChange={(e) => setDraftStart(e.target.value)}
                placeholder="например: now-15m или 2025-09-26T12:00:00.000Z"
              />
              {hasErrorStart && <div className={styles.errorText}>Некорректное значение</div>}
            </div>
            <div className={styles.inputCol}>
              <label className={styles.label}>Конец</label>
              <input
                className={hasErrorEnd ? styles.inputError : styles.input}
                value={draftEnd}
                onChange={(e) => setDraftEnd(e.target.value)}
                placeholder="например: now или 2025-09-26T12:30:00.000Z"
              />
              {hasErrorEnd && <div className={styles.errorText}>Некорректное значение</div>}
            </div>
            {showUpdateButton && (
              <button
                className={styles.updateBtn}
                onClick={applyDraft}
                disabled={!isRangeOk}
                title={showUpdateButton === 'iconOnly' ? 'Обновить' : undefined}
                aria-label="Обновить"
              >
                {showUpdateButton === 'iconOnly' ? '⟳' : 'Обновить'}
              </button>
            )}
          </div>

          {/* Quick select: применяем сразу */}
          <div className={styles.quickSelectBlock}>
            <div className={styles.quickTitle}>Быстрый выбор</div>
            <div className={styles.quickList}>
              {presets.map((p) => (
                <button
                  key={p.label}
                  className={styles.quickBtn}
                  onClick={() => handleQuickSelect(p)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {!!recentlyUsedRanges.length && (
              <>
                <div className={styles.quickTitle}>Недавно использованные</div>
                <div className={styles.quickList}>
                  {recentlyUsedRanges.map((r, i) => (
                    <button
                      key={`${i}-${r.label}`}
                      className={styles.quickBtn}
                      onClick={() => handleQuickSelect(r)}
                    >
                      {r.label ?? `${r.start} → ${r.end}`}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Текущий диапазон и формат отображения */}
          <div className={styles.row}>
            <div className={styles.chip}>Диапазон</div>
            <div>
              {value?.start} → {value?.end}
            </div>
            <div className={styles.chip}>Формат</div>
            <div>{dateTimeFormat ?? 'по умолчанию'}</div>
          </div>

          {/* Быстрые пресеты (legacy) */}
          <div className={styles.section}>
            <div className={`${styles.row} ${styles.rowMb4}`}>
              <div className={styles.chip}>Пресеты</div>
              <div className={styles.caption}>{presets.length} доступно</div>
            </div>
            <QuickSelect
              presets={presets}
              onSelect={handleQuickSelect}
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
        </>
      )}
    </div>
  )
}

export default SuperDatePicker
