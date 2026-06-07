import axios from 'axios'

function safeArray(res: any) {
  const data = res?.data

  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  if (typeof data === 'string') return JSON.parse(data)

  return []
}

function getDateColumn(item: any) {
  return Object.keys(item).find(
    key =>
      key !== 'Last Updated' &&
      key !== 'undefined'
  )
}

/* ───────────────────── ISABUHAY ───────────────────── */
export async function getIsabuhay() {
  const res = await axios.get(import.meta.env.VITE_ISABUHAY_API)
  const list = safeArray(res)

  return list.slice(1).map((item: any) => {
    const dateColumn = getDateColumn(item)

    return {
      year: item['Last Updated'],
      champion: dateColumn ? item[dateColumn] : null,
      runnerUp: item['undefined'] ?? null,
    }
  })
}

/* ───────────────────── DOS POR DOS ───────────────────── */
export async function getDosPorDos() {
  const res = await axios.get(import.meta.env.VITE_DOS_API)
  const list = safeArray(res)

  return list.slice(1).map((item: any) => {
    const dateColumn = getDateColumn(item)

    return {
      year: item['Last Updated'],
      champion: dateColumn ? item[dateColumn] : null,
      runnerUp: item['undefined'] ?? null,
    }
  })
}

/* ───────────────────── LANGIT LUPA ───────────────────── */
export async function getLangitLupa() {
  const res = await axios.get(import.meta.env.VITE_LANGIT_API)
  const list = safeArray(res)

  return list.slice(1).map((item: any) => ({
    year: item['Last Updated'],
    champion: null,
    runnerUp: null,
  }))
}