import type moment from 'moment'

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

// Component props
export interface SuperDatePickerProps {
  value: DateRange
  mode?: Mode
  onChange?: (next: { value: DateRange; mode?: Mode }) => void

  // Presets and quick select
  presets?: Preset[]
  onPresetSelect?: (preset: Preset) => void

  // Optional bounds
  min?: moment.Moment
  max?: moment.Moment

  // Formatting/UI controls
  dateTimeFormat?: string
  isDisabled?: boolean
  isLoading?: boolean

  // Auto refresh
  refresh?: RefreshConfig
  onRefreshChange?: (next: RefreshConfig) => void
  onApply?: () => void
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
