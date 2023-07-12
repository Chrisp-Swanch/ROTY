import * as NavModels from '../../models/interfaces/nav'
import LoginButton from './SignInButton'
import NavOption from './NavOption'

const options: NavModels.Option[] = [
  {
    displayText: 'Home',
    linkTo: '/',
  },
  // {
  //   displayText: 'Sign Up',
  //   linkTo: '/signup',
  // },
  {
    displayText: 'Competitors',
    linkTo: '/users',
  },
  {
    displayText: 'My Rocks',
    linkTo: '/rocks',
  },
]

function Nav() {


  return (
    <>
      <nav className="nav">
        {options.map((option) => {
          return (
            <div key={option.displayText} className="nav__option">
              <NavOption option={option} />
            </div>
          )
        })}
        <LoginButton />
      </nav>
    </>
  )
}

export default Nav
