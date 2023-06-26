import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from '../hooks/hooks'

import Home from './Home'
import Nav from './Nav'
import { getUsersThunk } from '../actions/users'


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsersThunk())
  }, [dispatch])

  return (
    <>
      <Nav />
      <section className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/users" element={<Users />} /> */}
          {/* <Route path='/rocks' element={<Rocks />} /> */}
        </Routes>
      </section>
    </>
  )
}

export default App
