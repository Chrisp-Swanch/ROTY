import express from 'express'
import { NewUserModel } from '../../models/users'

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

router.post('/', async (req, res) => {
  const newUser = req.body as NewUserModel

  let prevWinner = false
  let profImage = '/images/icon-no-user-image.svg'

  if (newUser.previous_winner) {
    prevWinner = newUser.previous_winner
  }
  if (newUser.profile_image) {
    profImage = newUser.profile_image
  }

  const addUser = {
    ...newUser,
    previous_winner: prevWinner,
    profile_image: profImage,
  }

  const user = await db.addUser(addUser)
  try {
    res.json(user)
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
