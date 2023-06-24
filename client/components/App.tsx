import Home from './Home'
import Nav from './Nav'

function App() {
  return (
    <>
      <Nav />
      <header className="header">
        <h1>My Collection (App componenet!)</h1>
      </header>
      <section className="main">
        <Home />
      </section>
    </>
  )
}

export default App
