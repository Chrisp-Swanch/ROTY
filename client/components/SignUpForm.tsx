import { useState } from 'react'
// import { useAppDispatch } from '../hooks/hooks'
import { ChangeEvent, FormEvent } from 'react'
import * as UserModels from '../../models/interfaces/users'

function SignUpForm() {
  const [userDetails, setUserDetails] = useState({} as UserModels.New)

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault()
    console.log(userDetails)
    // const dispatch = useAppDispatch()
    // dispatch(evt)
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const { value } = evt.target
    setUserDetails({
      ...userDetails,
      [evt.target.id]: value,
    })
  }

  return (
    <section className="signup_container">
      <div className="signup_form">
        <h1>Sign Up</h1>
        <div className="line"></div>
        <form onSubmit={handleSubmit}>
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
            <textarea className="signup_form__input__area" id="bio" placeholder="What makes you an extraordinary rock collector?"></textarea>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </section>
  )
}

export default SignUpForm
