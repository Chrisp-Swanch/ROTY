import express from 'express'
import { NewUserModel, UpdateUserModel } from '../../models/users'
import {
  checkNewUser,
  checkUpdateUser,
  validate,
} from '../server-utils'

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
  const newUser = req.body as NewUserModel

  if (!validate(checkNewUser(newUser))) {
    res.sendStatus(500)
    return
  }

  // set defaults for optional keys
  // let prevWinner = false
  // let profImage = noImagePath

  // set optional keys if they exist
  // if (newUser.previous_winner) {
  //   prevWinner = newUser.previous_winner
  // }
  // if (newUser.profile_image) {
  //   profImage = newUser.profile_image
  // }

  // create the final new user object
  // const addUser = {
  //   ...newUser,
  //   previous_winner: prevWinner,
  //   profile_image: profImage,
  // }

  // call the database
  const user = await db.addUser(newUser)
  try {
    res.json(user)
  } catch (err) {
    res.sendStatus(500)
  }
})

// PATCH
// Update user
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  let newUser = req.body as UpdateUserModel

  if (!validate(checkUpdateUser(newUser))) {
    res.sendStatus(500)
    return
  }

  // set image to default if overwritten with null, or blank
  const image = newUser.profile_image
  if (image === null || image === '') {
    newUser = {
      ...newUser,
      profile_image: noImagePath,
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
  await db.deleterUser(id)
  try {
    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(500)
  }
})

export default router
