import { Link } from 'react-router-dom'
import * as NavModels from '../../models/interfaces/nav'

function NavOption(option: NavModels.Option) {
  const { display, linkTo } = option
  return (
    <>
      <Link to={linkTo} style={{ textDecoration: 'none' }}>
        <div className="nav__option__text">{display}</div>
      </Link>
    </>
  )
}

export default NavOption
