import * as UserModels from '../../models/interfaces/users'

interface Props {
  user: UserModels.UserSnakeCase
}

function SingleUser({ user }: Props) {
  const { name, profile_image, previous_winner } = user

  return (
    <div className="user_card">
      <h1>{name}</h1>
      <img src={profile_image} alt="" />
      {Boolean(previous_winner)  && <p>Defending Champion!</p>}
    </div>
  )
}

export default SingleUser
