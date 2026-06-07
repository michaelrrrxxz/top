import axios from 'axios'

const API_URL = import.meta.env.VITE_2ON2_API

export async function get2on2() {

  const res = await axios.get(API_URL)

  return res.data
    .slice(2)
    .map((item: any) => {
      // Find the date column
      const dateKey = Object.keys(item).find(
        key =>
          key !== 'Last Updated' &&
          key !== 'undefined'
      )

      const w = Number(item[dateKey || ''] || 0)
      const t = Number(item['undefined'] || 0)

      return {
        Name: item["Last Updated"],
        Win: w,
        Loss: t - w,
        Total: t
      }
    })
}