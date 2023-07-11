import * as RockModels from '../../models/interfaces/rocks'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../hooks/hooks'
import { deleteRockThunk, updateRockThunk } from '../actions/rocks'
import { Result } from '../../models/utils/helpers'
import { checkUpdateRock } from '../../models/utils/rocks'
interface Props {
  rock: RockModels.RockSnakeCase
}

function SingleRock({ rock }: Props) {
  const { id, name, description, weight_division } = rock
  let { image } = rock
  if (image === null || image === '') {
    image =
      'https://cdn.dealerspike.com/imglib/v1/300x225/imglib/Assets/Inventory/09/42/09424726-0955-48FC-BC41-C2F25C9688B1.jpeg'
  }
  const dispatch = useAppDispatch()
  const [selectedRock, setSelectedRock] = useState(false as boolean)
  const [rockDetails, setRockDetails] = useState({
    name: name,
    description: description,
    image: image,
  } as RockModels.Update)

  function handleEdit() {
    setSelectedRock(!selectedRock)
  }

  function handleDelete() {
    dispatch(deleteRockThunk(id))
  }

  function handleChange(
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { value } = evt.target
    setRockDetails({
      ...rockDetails,
      [evt.target.id]: value,
    })
  }

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault()

    const check = checkUpdateRock(rockDetails) as Result
    if (check.pass === true) {
      dispatch(updateRockThunk(id, rockDetails))
      setSelectedRock(false)
    } else {
      alert(check.errors)
    }
  }

  return (
    <>
      <div className="rock_card">
        <div />
        <h2>{name}</h2>
        <div className="line"></div>
        {!selectedRock && (
          <>
            <div className="rock_details">
              <img src={image} alt={`${name}`} />
              <h3>Weight Division:</h3>
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
        {/* edit rock form */}
        {selectedRock && (
          <>
            <div className="rock_details">
              <div className="edit_rock_form">
                <form onSubmit={handleSubmit}>
                  <div className="edit_rock_form__fields">
                    <label htmlFor="name">Name: </label>
                    <input
                      className="edit_rock_form__input"
                      type="text"
                      id="name"
                      defaultValue={name}
                      onChange={handleChange}
                    />

                    <label htmlFor="image">Image URL: </label>
                    <input
                      className="edit_rock_form__input"
                      type="text"
                      id="image"
                      defaultValue={image}
                      onChange={handleChange}
                    />

                    <label htmlFor="weight_division">Weight Division: </label>
                    <select
                      className="edit_rock_form__input"
                      id="weight_division"
                      defaultValue={weight_division}
                      onChange={handleChange}
                    >
                      <option value="Flyweight">Flyweight</option>
                      <option value="Lightweight">Lightweight</option>
                      <option value="Middleweight">Middleweight</option>
                      <option value="Heavyweight">Heavyweight</option>
                      <option value="Super Heavyweight">
                        Super Heavyweight
                      </option>
                    </select>

                    <label htmlFor="description" id="description_label">
                      Description:{' '}
                    </label>
                    <textarea
                      className="edit_rock_form__input__area"
                      id="description"
                      onChange={handleChange}
                      defaultValue={description}
                    ></textarea>
                  </div>
                  <button>Submit</button>
                  <button onClick={handleEdit}>Cancel</button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SingleRock
