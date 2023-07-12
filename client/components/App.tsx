import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from '../hooks/actions'

import Home from './Home'
import Nav from './Nav'
import SignUpForm from './SignUpForm'
import Users from './Users'
import Rocks from './Rocks'

import { getUsersThunk } from '../actions/users'
import { getRocksThunk } from '../actions/rocks'
import { Auth0Provider } from '@auth0/auth0-react'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsersThunk())
    dispatch(getRocksThunk())
  }, [dispatch])

  return (
      <>
        <Nav />
        <section className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/users" element={<Users />} />
            <Route path="/rocks" element={<Rocks />} />
          </Routes>
        </section>
      </>
  )
}

export default App
