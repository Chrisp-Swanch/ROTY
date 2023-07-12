import { useAppSelector } from '../hooks/actions'
import * as UserModels from '../../models/interfaces/users'

import SingleUser from './SingleUser'

function Users() {
  const userList = useAppSelector(
    (state) => state.users as UserModels.UserSnakeCase[]
  )

  return (
    <>
      <h1>Meet the Competition:</h1>
      <div className="cards_container">
        {userList.map((user) => {
          return <SingleUser key={user.id} user={user} />
        })}
      </div>
    </>
  )
}

export default Users
