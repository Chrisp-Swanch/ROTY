import * as NavModels from '../../models/interfaces/nav'
import NavOption from './NavOption'

const options: NavModels.Option[] = [
  {
    display: 'Home',
    linkTo: '/',
  },
  // {
  //   display: 'Sign Up',
  //   linkTo: '/signup',
  // },
  {
    display: 'Competitors',
    linkTo: '/users',
  },
  {
    display: 'My Rocks',
    linkTo: '/rocks',
  },
]

function Nav() {
  return (
    <>
      <nav className="nav">
        {options.map((option) => {
          const { display, linkTo } = option
          return (
            <div key={display} className="nav__option">
              <NavOption display={display} linkTo={linkTo} />
            </div>
          )
        })}
      </nav>
    </>
  )
}

export default Nav
