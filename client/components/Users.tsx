import { useAppSelector } from '../hooks/hooks'
import * as UserModels from '../../models/interfaces/users'

import SingleUser from './SingleUser'

function Users() {
  const userList = useAppSelector(
    (state) => state.users as UserModels.UserSnakeCase[]
  )

  return (
    <>
      <h1>Meet the competition:</h1>
      {userList.map((user) => {
        return <SingleUser key={user.id} user={user} />
      })}
    </>
  )
}

export default Users
