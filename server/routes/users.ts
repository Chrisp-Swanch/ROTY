import express from 'express'
import * as UserModels from '../../models/interfaces/users'
import { validate } from '../../models/utils/helpers'
import { checkNewUser, checkUpdateUser } from '../../models/utils/users'

const router = express.Router()

import * as db from '../db/users'

// GET
// Get all users
router.get('/', async (req, res) => {
  // call the database
  const users = await db.getAllUsers()
  try {
    res.json(users)
  } catch (err) {
    res.sendStatus(500)
  }
})

// get a user by id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  // call the database
  const user = await db.getOneUser(id)
  try {
    res.json(user)
  } catch (err) {
    res.sendStatus(500)
  }
})

// POST
// Add a new user
router.post('/', async (req, res) => {
  let newUser = req.body as UserModels.New

  if (!validate(checkNewUser(newUser))) {
    res.sendStatus(400)
    return
  }

  // set profile image to null if blank string
  if (newUser.profile_image === '') {
    newUser = {
      ...newUser,
      profile_image: null,
    }
  }

  // call the database
  const user = await db.addUser(newUser)
  try {
    res.json(user[0])
  } catch (err) {
    res.sendStatus(500)
  }
})

// PATCH
// Update user
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  let newUser = req.body as UserModels.Update

  if (!validate(checkUpdateUser(newUser))) {
    res.sendStatus(400)
    return
  }

  // set profile image to null if blank string
  if (newUser.profile_image === '') {
    newUser = {
      ...newUser,
      profile_image: null,
    }
  }

  // call the database
  const user = await db.updateUser(newUser, id)
  try {
    res.json(user[0])
  } catch (err) {
    res.sendStatus(500)
  }
})

// DELETE
// Delete user
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  // call the database
  await db.deleteUser(id)
  try {
    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(500)
  }
})

export default router
