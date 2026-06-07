import { kv } from '@vercel/kv'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  let visits = await kv.get<number>('visits')

  if (!visits) {
    visits = 0
  }

  visits++

  await kv.set('visits', visits)

  res.status(200).json({ visits })
}