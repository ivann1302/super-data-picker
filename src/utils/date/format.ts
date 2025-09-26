import moment from 'moment'
import { parseStart, parseEnd } from './dateMath'

export function toHumanRange(start: string, end: string, opts?: { dateTimeFormat?: string }) {
  const fmt = opts?.dateTimeFormat ?? 'MMM D, YYYY @ HH:mm:ss.SSS'
  const s = parseStart(start)
  const e = parseEnd(end)
  if (!s || !e) return `${start} → ${end}` // показываем исходные строки, если парсинг не удался
  return `${s.format(fmt)} → ${e.format(fmt)}`
}

// Формат для одиночных значений (вдруг пригодится)
export function formatMoment(m: moment.Moment | undefined, fmt = 'YYYY-MM-DDTHH:mm:ss.SSSZ') {
  return m?.isValid() ? m.format(fmt) : ''
}
