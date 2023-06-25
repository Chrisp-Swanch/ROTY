import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Nav from './Nav'

function App() {
  return (
    <>
      <Nav />
      <section className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path='/users' element={<Users />} /> */}
          {/* <Route path='/rocks' element={<Rocks />} /> */}
        </Routes>
      </section>
    </>
  )
}

export default App
