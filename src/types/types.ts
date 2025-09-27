import type moment from 'moment'
import type React from 'react'

// Base types
export type DateRange = { start: string; end: string }

export type Preset = {
  label: string
  start: string
  end: string
}

export type Mode = 'absolute' | 'relative' | 'now'

export type RefreshConfig = {
  /** milliseconds */
  interval: number
  /** pause/resume auto refresh */
  isPaused: boolean
}

export type RefreshUnits = 's' | 'm' | 'h'

// Component props
export interface SuperDatePickerProps {
  // MVP API only
  start?: string // по умолчанию 'now-15m'
  end?: string // по умолчанию 'now'
  onTimeChange?: (range: { start: string; end: string }) => void
  showUpdateButton?: boolean | 'iconOnly'
  commonlyUsedRanges?: Preset[]
  recentlyUsedRanges?: Preset[]
  /**
   * Кастомные панели в блоке Quick select. Минимальная поддержка: вывод JSX-контента.
   */
  customQuickSelectPanels?: { title?: string; content: React.ReactNode }[]
  /**
   * Кастомный рендерер секции Quick select. Если задан, компонент передаст части
   * (commonly, recently, customPanels) и рендер полностью на стороне вызывающего.
   */
  customQuickSelectRender?: (parts: {
    commonlyUsed: React.ReactNode
    recentlyUsed: React.ReactNode
    customPanels: React.ReactNode
  }) => React.ReactNode

  // Auto refresh (MVP API)
  onRefresh?: (info: { start: string; end: string }) => void | Promise<void>
  isPaused?: boolean // по умолчанию true
  refreshInterval?: number // миллисекунды, по умолчанию 1000
  refreshMinInterval?: number // нижняя граница для безопасности, по умолчанию 0
  refreshIntervalUnits?: RefreshUnits // опционально; для UI

  // UI flags
  isDisabled?: boolean
  isLoading?: boolean
}

export interface QuickSelectProps {
  presets: Preset[]
  onSelect: (preset: Preset) => void
  disabled?: boolean
}

export interface AbsoluteTabProps {
  value: DateRange
  onChange: (value: DateRange) => void
  min?: moment.Moment
  max?: moment.Moment
  dateTimeFormat?: string
  disabled?: boolean
}

export interface RelativeTabProps {
  value: DateRange
  onChange: (value: DateRange) => void
  disabled?: boolean
}

export interface NowTabProps {
  onPickNow: () => void
  disabled?: boolean
}

export interface UpdateButtonProps {
  onClick?: () => void
  isLoading?: boolean
  disabled?: boolean
}

export interface AutoRefreshProps extends RefreshConfig {
  onChange: (next: RefreshConfig) => void
  disabled?: boolean
}
