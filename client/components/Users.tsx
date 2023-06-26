import { useAppSelector } from '../hooks/hooks'
import * as UserModels from '../../models/interfaces/users'

import SingleUser from './UserCard'

function Users() {
  const userList = useAppSelector(
    (state) => state.users as UserModels.UserSnakeCase[]
  )

  return (
    <>
      <h1>Meet the competition:</h1>
      <div className="users_container">
        {userList.map((user) => {
          return <SingleUser key={user.id} user={user} />
        })}
      </div>
    </>
  )
}

export default Users
