import React, { useEffect, useMemo, useState } from 'react'
import { COMMONLY_USED_PRESETS } from '../presets'
import type { SuperDatePickerProps, Preset } from '../../../types/types'
import { isRangeValid as validateRange, parseStart, parseEnd } from '../dateMath'
import styles from './SuperDatePicker.module.css'

// Компонент SuperDatePicker: MVP-only API (start/end/onTimeChange)
export const SuperDatePicker: React.FC<SuperDatePickerProps> = (props) => {
  const {
    start: mvpStart = 'now-15m',
    end: mvpEnd = 'now',
    onTimeChange,
    showUpdateButton = true,
    commonlyUsedRanges,
    recentlyUsedRanges = [],
    onRefresh,
    isPaused: mvpIsPaused = true,
    refreshInterval: mvpRefreshInterval = 1000,
    refreshMinInterval = 0,
    isDisabled,
    isLoading,
    customQuickSelectPanels,
    customQuickSelectRender,
  } = props

  // Локальные черновики для MVP инпутов
  const [draftStart, setDraftStart] = useState(mvpStart)
  const [draftEnd, setDraftEnd] = useState(mvpEnd)

  // Локальное состояние «Недавно использованные» — инициализируем из пропса
  const [recent, setRecent] = useState(recentlyUsedRanges)
  useEffect(() => setRecent(recentlyUsedRanges), [recentlyUsedRanges])

  // Синхронно обновляем черновики, если приходят новые пропсы извне
  useEffect(() => setDraftStart(mvpStart), [mvpStart])
  useEffect(() => setDraftEnd(mvpEnd), [mvpEnd])

  // Валидация значений (MVP-only)
  const hasErrorStart = useMemo(() => !parseStart(draftStart), [draftStart])
  const hasErrorEnd = useMemo(() => !parseEnd(draftEnd), [draftEnd])
  const isRangeOk = useMemo(() => validateRange(draftStart, draftEnd), [draftStart, draftEnd])

  // Обновить значения посредством onTimeChange
  const applyDraft = () => {
    if (!isRangeOk || !onTimeChange) return
    onTimeChange({ start: draftStart, end: draftEnd })
  }

  // Добавляем выбранный диапазон в список «Недавно использованные»
  // Правила: уникальность по паре start/end, новый в начало, ограничение длины 10
  const pushRecent = (p: Preset) => {
    setRecent((prev) => {
      const next = prev ? [...prev] : []
      const existsIdx = next.findIndex((x) => x.start === p.start && x.end === p.end)
      if (existsIdx !== -1) next.splice(existsIdx, 1)
      next.unshift({ label: p.label, start: p.start, end: p.end })
      if (next.length > 10) next.length = 10
      return next
    })
  }

  const handleQuickSelect = (p: Preset) => {
    // Мгновенное применение
    if (!validateRange(p.start, p.end) || !onTimeChange) return
    onTimeChange({ start: p.start, end: p.end })
    // Обновляем список «Недавно использованные»
    pushRecent(p)
  }

  const presets = commonlyUsedRanges ?? COMMONLY_USED_PRESETS

  // Интервал автообновления (MVP-only)
  const safeIntervalMs = Math.max(
    Number.isFinite(mvpRefreshInterval) ? mvpRefreshInterval : 0,
    refreshMinInterval ?? 0,
  )

  // Тикер автообновления (MVP): запускается если есть onRefresh и не пауза
  useEffect(() => {
    if (!onRefresh) return
    if (mvpIsPaused || safeIntervalMs <= 0) return

    let stopped = false
    let timer: ReturnType<typeof setTimeout> | undefined
    let inFlight = false // защита от параллельных вызовов

    const tick = async () => {
      if (stopped) return
      if (inFlight) {
        timer = setTimeout(tick, safeIntervalMs)
        return
      }
      inFlight = true
      try {
        const maybe = onRefresh({ start: mvpStart, end: mvpEnd })
        if (maybe && typeof (maybe as Promise<void>).then === 'function') {
          await maybe
        }
      } catch (e) {
        throw new Error(`Error ${e}, cannot refresh`)
      } finally {
        inFlight = false
      }
      if (!stopped) timer = setTimeout(tick, safeIntervalMs)
    }

    timer = setTimeout(tick, safeIntervalMs)

    return () => {
      stopped = true
      if (timer) clearTimeout(timer)
    }
  }, [onRefresh, mvpIsPaused, safeIntervalMs, mvpStart, mvpEnd])

  return (
    <div className={styles.card} aria-disabled={isDisabled} aria-busy={isLoading}>
      {/* Заголовок блока */}
      <div className={styles.header}>
        <div className={styles.title}>Super Date Picker</div>
      </div>

      {/* Секция ввода и отображения */}
      <div className={`${styles.section}`}>
        <div className={`${styles.row} ${styles.inputsRow}`}>
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
        {(() => {
          // Части интерфейса Quick select собираем как узлы,
          // чтобы их можно было переопределить через customQuickSelectRender
          const commonlyNode = (
            <div>
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
            </div>
          )

          const recentlyNode = recent && recent.length > 0 && (
            <div>
              <div className={styles.quickTitle}>Недавно использованные</div>
              <div className={styles.quickList}>
                {recent.map((r, i) => (
                  <button
                    key={`${i}-${r.start}-${r.end}`}
                    className={styles.quickBtn}
                    onClick={() => handleQuickSelect(r)}
                  >
                    {r.label ?? `${r.start} → ${r.end}`}
                  </button>
                ))}
              </div>
            </div>
          )

          const customPanelsNode =
            customQuickSelectPanels && customQuickSelectPanels.length > 0 ? (
              <div>
                {customQuickSelectPanels.map((panel, idx) => (
                  <div key={idx} className={styles.quickSelectBlock}>
                    {panel.title ? <div className={styles.quickTitle}>{panel.title}</div> : null}
                    <div>{panel.content}</div>
                  </div>
                ))}
              </div>
            ) : null

          const defaultLayout = (
            <div className={styles.quickSelectBlock}>
              {commonlyNode}
              {recentlyNode}
              {customPanelsNode}
            </div>
          )

          return customQuickSelectRender
            ? customQuickSelectRender({
                commonlyUsed: commonlyNode,
                recentlyUsed: recentlyNode,
                customPanels: customPanelsNode,
              })
            : defaultLayout
        })()}
      </div>
    </div>
  )
}

export default SuperDatePicker
