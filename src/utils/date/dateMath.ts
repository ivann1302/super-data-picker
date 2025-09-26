import moment from 'moment'
import dateMath from '@elastic/datemath'

export type DateRange = { start: string; end: string }

// Парсинг левой границы (start)
export function parseStart(input: string): moment.Moment | undefined {
  const m = dateMath.parse(input)
  return m && m.isValid() ? m : undefined
}

// Парсинг правой границы (end) — важно roundUp: true
export function parseEnd(input: string): moment.Moment | undefined {
  const m = dateMath.parse(input, { roundUp: true })
  return m && m.isValid() ? m : undefined
}

// Проверка корректности диапазона с учётом min/max
export function isRangeValid(
  start: string,
  end: string,
  opts?: { min?: moment.Moment; max?: moment.Moment },
): boolean {
  const s = parseStart(start)
  const e = parseEnd(end)
  if (!s || !e) return false
  if (e.isBefore(s)) return false
  if (opts?.min && (s.isBefore(opts.min) || e.isBefore(opts.min))) return false
  if (opts?.max && (s.isAfter(opts.max) || e.isAfter(opts.max))) return false
  return true
}

// Безопасное приведение строк к moment, удобно в одном месте
export function safeRange(
  start: string,
  end: string,
): { start?: moment.Moment; end?: moment.Moment } {
  return { start: parseStart(start), end: parseEnd(end) }
}
