import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import { connectDB } from './db'
import User from './models/User'
import { bloom } from './bloom'

async function loadBloomFilter() {
  const users = await User.find({}, 'username')
  users.forEach(u => {
    if (u.username) {
      bloom.add(u.username)
    }
  })
}


async function start() {
  await connectDB()
  await loadBloomFilter()

  app.listen(process.env.PORT, () =>
    console.log('Server running')
  )
}

start()
