import * as RockModels from '../../models/interfaces/rocks'
import { useState } from 'react'
import { useAppDispatch } from '../hooks/hooks'
import { deleteRockThunk } from '../actions/rocks'
interface Props {
  rock: RockModels.RockSnakeCase
}

function SingleRock({ rock }: Props) {
  const { id, name, image, description, weight_division } = rock
  const dispatch = useAppDispatch()
  const [selectedRock, setSelectedRock] = useState(false as boolean)
  // const [rockDetails, setRockDetails] = useState({} as RockModels.Update)

  function handleEdit() {
    setSelectedRock(!selectedRock)
    console.log(selectedRock)
  }

  function handleDelete() {
    dispatch(deleteRockThunk(id))
  }

  function handleChange() {
    // const { value } = evt.target
    return
  }

  return (
    <>
      <div className="rock_card">
        {!selectedRock && (
          <>
            <div className="rock_details">
              <h1>{name}</h1>
              <div className="line"></div>
              <img src={image} alt={`${name}`} />
              <h2>Weight Division:</h2>
              <p>{weight_division}</p>
              <h3>Description:</h3>
              <p>{description}</p>
            </div>
            <div className="rock_options">
              <button className="rock_card__button" onClick={handleEdit}>
                Edit Rock
              </button>
              <button className="rock_card__button" onClick={handleDelete}>
                Delete Rock
              </button>
            </div>
          </>
        )}
        {selectedRock && (
          <>
            <div className="rock_details">
              <form>
                <div className="signup_form__fields">
                  <label htmlFor="name">Name: </label>
                  <input
                    className="signup_form__input"
                    type="text"
                    id="name"
                    onChange={handleChange}
                  />

                  <label htmlFor="profile_image">Profile Image URL: </label>
                  <input
                    className="signup_form__input"
                    type="text"
                    id="profile_image"
                    onChange={handleChange}
                  />

                  <label htmlFor="bio" id="bio_label">
                    Bio:{' '}
                  </label>
                  <textarea
                    className="signup_form__input__area"
                    id="bio"
                    placeholder="What makes you an extraordinary rock collector?"
                  ></textarea>
                </div>
                <button>Submit</button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SingleRock
