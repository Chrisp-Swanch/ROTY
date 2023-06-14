import express from 'express'

const router = express.Router()

import * as db from '../db/db'

router.get('/', async (req, res) => {
  const users = await db.getAllUsers()
  try {
    res.json(users)
  } catch (err) {
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const user = await db.getOneUser(id)
  try {
    res.json(user)
  } catch (err) {
    res.sendStatus(500)
  }
})

export default router
