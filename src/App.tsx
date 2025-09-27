import { useState, useCallback, useEffect } from 'react'
import SuperDatePicker from './components/SuperDatePicker/SuperDatePicker/SuperDatePicker'
import { toHumanRange } from './utils/date/format'

function App() {
  const [range, setRange] = useState<{ start: string; end: string }>({
    start: 'now-15m',
    end: 'now',
  })
  const [refresh, setRefresh] = useState<{ interval: number; isPaused: boolean }>({
    interval: 30000,
    isPaused: true,
  })
  const [loading, setLoading] = useState(false)

  const apply = useCallback(async () => {
    setLoading(true)
    // Simulate data fetch
    await new Promise((r) => setTimeout(r, 400))
    setLoading(false)
  }, [])

  useEffect(() => {
    if (refresh.isPaused || refresh.interval <= 0) return
    const id = setInterval(() => {
      apply()
    }, refresh.interval)
    return () => clearInterval(id)
  }, [refresh, apply])

  return (
    <div style={{ padding: 16 }}>
      <h3>Выбранный диапазон</h3>
      <div style={{ marginBottom: 12 }}>{toHumanRange(range.start, range.end)}</div>

      <SuperDatePicker
        start={range.start}
        end={range.end}
        onTimeChange={(next) => setRange(next)}
        showUpdateButton
        commonlyUsedRanges={undefined}
        recentlyUsedRanges={[
          { label: 'Последний час', start: 'now-1h', end: 'now' },
          { label: 'Последние 24 часа', start: 'now-24h', end: 'now' },
        ]}
        refresh={refresh}
        onRefreshChange={setRefresh}
        isLoading={loading}
      />
    </div>
  )
}

export default App
