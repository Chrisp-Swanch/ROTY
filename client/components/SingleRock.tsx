import * as RockModels from '../../models/interfaces/rocks'
import { useState } from 'react'
import { useAppDispatch } from '../hooks/hooks'
import { deleteRockThunk, updateRockThunk } from '../actions/rocks'

import EditRockForm from './EditRockForm'
interface Props {
  rock: RockModels.RockSnakeCase
}

function SingleRock({ rock }: Props) {
  const { id, name, image, description, weight_division, is_deleted } = rock
  const dispatch = useAppDispatch()
  const [selectedRock, setSelectedRock] = useState(false as boolean)
  const [rockDetails, setRockDetails] = useState({} as RockModels.Update)

  function handleEdit() {
    setSelectedRock(!selectedRock)
  }

  function handleDelete() {
    dispatch(deleteRockThunk(id))
  }

  return (
    <>
      {Boolean(!is_deleted) && (
        <div className="rock_card">
          <div className="rock_details">
            <h1>{name}</h1>
            <div className="line"></div>
            <img src={image} alt={`${name}`} />
            <h2>Weight Division:</h2>
            <p>{weight_division}</p>
            <h3>Description:</h3>
            <p>{description}</p>
          </div>
          <div className="user_options">
            <button className="rock_card__button" onClick={handleEdit}>
              Edit Rock
            </button>
            <button className="rock_card__button" onClick={handleDelete}>
              Delete Rock
            </button>
            {/* {selectedRock && <p>I&apos;m selected!!</p>} */}
            {selectedRock && <EditRockForm />}
          </div>
        </div>
      )}
    </>
  )
}

export default SingleRock
