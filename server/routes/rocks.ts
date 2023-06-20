import express from 'express'
import * as RockModels from '../../models/interfaces/rocks'
import { validate } from '../../models/utils/helpers'
import { checkNewRock, checkUpdateRock } from '../../models/utils/rocks'

const router = express.Router()

import * as db from '../db/rocks'

// GET
// Get all rocks
router.get('/', async (req, res) => {
  // call the database
  const rocks = await db.getAllRocks()
  try {
    res.json(rocks)
  } catch (err) {
    res.sendStatus(500)
  }
})

// get a rock by id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  // call the database
  const rock = await db.getOneRock(id)
  try {
    res.json(rock)
  } catch (err) {
    res.sendStatus(500)
  }
})

// POST
// Add a new rock
router.post('/', async (req, res) => {
  let newRock = req.body as RockModels.New

  if (!validate(checkNewRock(newRock))) {
    res.sendStatus(400)
    return
  }

  // set image to default if blank string
  if (newRock.image === '') {
    newRock = {
      ...newRock,
      image: null,
    }
  }

  // set description to null if blank string
  if (newRock.description === '') {
    newRock = {
      ...newRock,
      description: null,
    }
  }

  // call the database
  const rock = await db.addRock(newRock)
  try {
    res.json(rock)
  } catch (err) {
    res.sendStatus(500)
  }
})

// PATCH
// Update rock
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  let newRock = req.body as RockModels.Update

  if (!validate(checkUpdateRock(newRock))) {
    res.sendStatus(400)
    return
  }

  // set image to null if blank string
  if (newRock.image === '') {
    newRock = {
      ...newRock,
      image: null,
    }
  }

  // set description to null if blank string
  if (newRock.description === '') {
    newRock = {
      ...newRock,
      description: null,
    }
  }

  // call the database
  const rock = await db.updateRock(newRock, id)
  try {
    res.json(rock)
  } catch (err) {
    res.sendStatus(500)
  }
})

// DELETE
// Delete rock
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  // call the database
  await db.deleteRock(id)
  try {
    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(500)
  }
})

export default router
