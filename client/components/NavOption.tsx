import { Link } from 'react-router-dom'
import * as NavModels from '../../models/interfaces/nav'

interface Props {
  option: NavModels.Option
}

function NavOption(props: Props) {
  const { displayText, linkTo } = props.option
  return (
    <>
      <Link key={linkTo} to={linkTo} style={{ textDecoration: 'none' }}>
        <div className="nav__option__text">{displayText}</div>
      </Link>
    </>
  )
}

export default NavOption
