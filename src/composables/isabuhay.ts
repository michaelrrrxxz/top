import { ref, computed } from 'vue'
import { getIsabuhay } from '@/api/isabuhay'

export interface Champion {
  Year: string
  Champion: string
}

export type SortKey = 'Champion' | 'Year'
export type SortDir = 'asc' | 'desc'

export function useIsabuhay() {

  const raw = ref<Champion[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const search = ref('')

  const sortKey = ref<SortKey>('Year')
  const sortDir = ref<SortDir>('desc')

  async function load() {
    loading.value = true
    error.value = null

    try {
      raw.value = await getIsabuhay()
    } catch (e: any) {
      error.value = e?.message || 'Failed to load champions.'
    } finally {
      loading.value = false
    }
  }

  function setSort(key: SortKey) {
    if (sortKey.value === key) {
      sortDir.value =
        sortDir.value === 'asc'
          ? 'desc'
          : 'asc'
    } else {
      sortKey.value = key
      sortDir.value =
        key === 'Champion'
          ? 'asc'
          : 'desc'
    }
  }

  const filtered = computed(() => {
    const q = search.value
      .trim()
      .toLowerCase()

    let list = raw.value

    if (q) {
      list = list.filter(c =>
        c.Champion
          .toLowerCase()
          .includes(q)
      )
    }

    return [...list].sort((a, b) => {

      let av: any
      let bv: any

      if (sortKey.value === 'Champion') {
        av = a.Champion.toLowerCase()
        bv = b.Champion.toLowerCase()
      } else {
        av = Number(a.Year)
        bv = Number(b.Year)
      }

      if (av < bv)
        return sortDir.value === 'asc'
          ? -1
          : 1

      if (av > bv)
        return sortDir.value === 'asc'
          ? 1
          : -1

      return 0
    })
  })

  return {
    loading,
    error,

    search,

    sortKey,
    sortDir,

    filtered,

    load,
    setSort,
  }
}