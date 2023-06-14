import express from 'express'

const router = express.Router()

import * as db from '../db/db'

// MODEL IMPORTS
import { NewUserModel, UserModel } from '../../models/users'

// Get all users
router.get('/', async (req, res) => {
  const users = await db.getAllUsers()
  try {
    res.json(users)
  } catch (err) {
    res.sendStatus(500)
  }
})

// Add a new user
router.post('/', async (req, res) => {
  const newUser = req.body as NewUserModel

  // set defaults for optional keys
  let prevWinner = false
  let profImage = '/images/icon-no-user-image.svg'

  // set optional keys if they exist
  if (newUser.previous_winner) {
    prevWinner = newUser.previous_winner
  }
  if (newUser.profile_image) {
    profImage = newUser.profile_image
  }

  // create the final new user object
  const addUser = {
    ...newUser,
    previous_winner: prevWinner,
    profile_image: profImage,
  }

  // call the database
  const user = await db.addUser(addUser)
  try {
    res.json(user)
  } catch (err) {
    res.sendStatus(500)
  }
})

// get a user by id
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
