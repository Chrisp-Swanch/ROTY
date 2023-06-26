import * as UserModels from '../../models/interfaces/users'

interface Props {
  user: UserModels.UserSnakeCase
}

function SingleUser({ user }: Props) {
  return (
    <>
      <h1>{user.name}</h1>
    </>
  )
}

export default SingleUser
