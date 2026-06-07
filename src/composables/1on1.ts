import { ref, computed } from 'vue'
import { getStandings } from '@/api/1on1'

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
export interface Battler {
  Name:  string
  Win:   number
  Loss:  number
  Total: number
}

export type SortKey = 'Win' | 'Loss' | 'Name' | 'winRate' | 'overall'
export type SortDir = 'asc' | 'desc'

export interface Filters {
  search:      string
  minBattles:  number
  minWins:     number
  maxLosses:   number | null   // null = no cap
  minWinRate:  number          // 0-100
}


/** Raw win% for display */
export const rawRate = (b: Battler): number => {
  const total = b.Win + b.Loss
  return total ? Math.round((b.Win / total) * 100) : 0
}

/**
 * Bayesian-smoothed score for win-rate sorting.
 * (Win + 1) / (Total + 2) penalises tiny sample sizes.
 * e.g.  1W/0L → 0.667   vs   10W/2L → 0.786
 */
export const smoothedRate = (b: Battler): number =>
  (b.Win + 1) / (b.Win + b.Loss + 2)

/**
 * Combined "overall" score — rewards high wins AND good rate AND
 * battle-tested volume. Tune the weights as needed.
 */
export const overallScore = (b: Battler): number => {
  const rate = rawRate(b)
  return (b.Win * 2) + (rate * 1.5) + (b.Total * 0.3)
}

const winRateColor = (rate: number) => {
  const clamped = Math.max(0, Math.min(rate, 100))

  // 0 = red (0deg), 120 = green
  const hue = (clamped * 120) / 100

  return `hsl(${hue}, 80%, 45%)`
}

/* ─────────────────────────────────────────
   COMPOSABLE
───────────────────────────────────────── */
export function useStandings() {

  /* ── raw data ── */
  const raw     = ref<Battler[]>([])
  const loading = ref(true)
  const error   = ref<string | null>(null)

  /* ── sort state ── */
  const sortKey = ref<SortKey>('Win')
  const sortDir = ref<SortDir>('desc')

  /* ── filters ── */
  const filters = ref<Filters>({
    search:     '',
    minBattles: 0,
    minWins:    0,
    maxLosses:  null,
    minWinRate: 0,
  })

  /* ── load ── */
  async function load() {
    loading.value = true
    error.value   = null
    try {
      const data = await getStandings()
      raw.value = data.map((b: any) => ({
        Name:  (b.Name  ?? '').trim(),
        Win:   b.Win   ?? 0,
        Loss:  b.Loss  ?? 0,
        Total: (b.Win ?? 0) + (b.Loss ?? 0),
      }))
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to load standings.'
    } finally {
      loading.value = false
    }
  }

  /* ── sort toggle ── */
  function setSort(key: SortKey) {
    if (sortKey.value === key) {
      sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortDir.value = key === 'Name' ? 'asc' : 'desc'
    }
  }

  /* ── reset filters ── */
  function resetFilters() {
    filters.value = {
      search:     '',
      minBattles: 0,
      minWins:    0,
      maxLosses:  null,
      minWinRate: 0,
    }
  }

  /* ── computed: is any advanced filter active? ── */
  const hasActiveFilters = computed(() =>
    filters.value.search      !== ''   ||
    filters.value.minBattles  >   0    ||
    filters.value.minWins     >   0    ||
    filters.value.maxLosses  !== null  ||
    filters.value.minWinRate  >   0
  )

  /* ── stats for filter UI ranges ── */
  const maxBattlesInData = computed(() =>
    Math.max(0, ...raw.value.map(b => b.Total))
  )
  const maxWinsInData = computed(() =>
    Math.max(0, ...raw.value.map(b => b.Win))
  )
  const maxLossesInData = computed(() =>
    Math.max(0, ...raw.value.map(b => b.Loss))
  )

  /* ── filtered + sorted list ── */
  const filtered = computed<Battler[]>(() => {
    const q   = filters.value.search.trim().toLowerCase()
    const f   = filters.value

    let list = raw.value.filter(b => {
      if (q && !b.Name.toLowerCase().includes(q)) return false
      if (b.Total  <  f.minBattles)               return false
      if (b.Win    <  f.minWins)                  return false
      if (f.maxLosses !== null && b.Loss > f.maxLosses) return false
      if (rawRate(b) < f.minWinRate)              return false
      return true
    })

    return [...list].sort((a, b) => {
      let av: number | string
      let bv: number | string

      switch (sortKey.value) {
        case 'winRate':  av = smoothedRate(a); bv = smoothedRate(b); break
        case 'overall':  av = overallScore(a); bv = overallScore(b); break
        case 'Name':     av = a.Name.toLowerCase(); bv = b.Name.toLowerCase(); break
        default:         av = a[sortKey.value];     bv = b[sortKey.value]
      }

      if (av < bv) return sortDir.value === 'asc' ? -1 :  1
      if (av > bv) return sortDir.value === 'asc' ?  1 : -1
      return 0
    })
  })

  return {
    /* state */
    raw, loading, error,
    sortKey, sortDir, filters,
    /* computed */
    filtered, hasActiveFilters,
    maxBattlesInData, maxWinsInData, maxLossesInData,
    /* actions */
    load, setSort, resetFilters,
    /* helpers (re-exported for template use) */
    rawRate, winRateColor, overallScore,
  }
}