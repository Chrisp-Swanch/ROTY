import express from 'express'
import * as VoteModels from '../../models/votes'
import { checkNewVote, checkUpdateVote, validate } from '../server-utils'

const router = express.Router()

import * as db from '../db/votes'

// GET
// Get all votes
router.get('/', async (req, res) => {
  // call the database
  const votes = await db.getAllVotes()
  try {
    res.json(votes)
  } catch (err) {
    res.sendStatus(500)
  }
})

// get votes by user_id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  // call the database
  const votes = await db.getVotesByUser(id)
  try {
    res.json(votes)
  } catch (err) {
    res.sendStatus(500)
  }
})

// POST
// Add a new vote
router.post('/', async (req, res) => {
  const newVote = req.body as VoteModels.New

  if (!validate(checkNewVote(newVote))) {
    res.sendStatus(400)
    return
  }

  // call the database
  const vote = await db.addVote(newVote)
  try {
    res.json(vote)
  } catch (err) {
    res.sendStatus(500)
  }
})

// PATCH
// Update vote
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const newVote = req.body as VoteModels.Update

  if (!validate(checkUpdateVote(newVote))) {
    res.sendStatus(400)
    return
  }

  // call the database
  const vote = await db.updateVote(newVote, id)
  try {
    res.json(vote[0])
  } catch (err) {
    res.sendStatus(500)
  }
})

// DELETE
// Delete vote
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  // call the database
  await db.deleteVote(id)
  try {
    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(500)
  }
})

export default router
