import type { Preset } from '../../types/types'

// Default commonly used ranges for QuickSelect
export const COMMONLY_USED_PRESETS: Preset[] = [
  { label: 'Последние 15 минут', start: 'now-15m', end: 'now' },
  { label: 'Последние 30 минут', start: 'now-30m', end: 'now' },
  { label: 'Последний час', start: 'now-1h', end: 'now' },
  { label: 'Последние 24 часа', start: 'now-24h', end: 'now' },
  { label: 'Последние 7 дней', start: 'now-7d', end: 'now' },
  { label: 'Последние 30 дней', start: 'now-30d', end: 'now' },
  { label: 'Текущий месяц', start: 'now/M', end: 'now/M' },
  { label: 'Текущий год', start: 'now/y', end: 'now/y' },
]
