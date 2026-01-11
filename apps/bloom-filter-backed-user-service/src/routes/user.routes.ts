import { Request, Response, Router } from 'express'
import User from '../models/User'
import { bloom } from '../bloom'

const router = Router()

interface UsernameBody {
  username: string
}

router.post('/check', async (req: Request<{}, {}, UsernameBody>, res: Response) => {
  const { username } = req.body

  if (!bloom.has(username)) {
    return res.json({ available: true })
  }

  const exists = await User.exists({ username })
  return res.json({ available: !exists })
})

router.post('/register', async (req: Request<{}, {}, UsernameBody>, res: Response) => {
  const { username } = req.body

  const user = await User.create({ username })
  bloom.add(username)

  res.status(201).json(user)
})

export default router
