import express from 'express'

const router = express.Router()

import * as db from '../db/rocks'

// MODEL IMPORTS
import { NewRockModel, UpdateRockModel } from '../../models/rocks'

// VARIABLES
const noImagePath = '/images/icon-no-image.svg'

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
  const newRock = req.body as NewRockModel

  // set defaults for optional key
  let image = noImagePath

  // set optional key if it exists
  if (newRock.image) {
    image = newRock.image
  }

  // create the final new rock object
  const addRock = {
    ...newRock,
    image,
  }

  // call the database
  const rock = await db.addRock(addRock)
  try {
    res.json(rock)
  } catch (err) {
    res.sendStatus(500)
  }
})

// PATCH
// Update user
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  let newRock = req.body as UpdateRockModel

  // set image to default if overwritten with null, or blank
  const image = newRock.image
  if (image === null || image === '') {
    newRock = {
      ...newRock,
      image: noImagePath,
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
// Delete user
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
