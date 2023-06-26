import * as UserModels from '../../models/interfaces/users'

interface Props {
  user: UserModels.UserSnakeCase
}

function SingleUser({ user }: Props) {
  const { name, profile_image, previous_winner } = user

  return (
    <div className="user_card">
      {Boolean(previous_winner) && <div className="user_card__badge"><p>Previous Winner</p></div>}
      <h1>{name}</h1>
      <div className="line"></div>
      <img src={profile_image} alt={`${name}`} />
      <p>View Rocks</p>
    </div>
  )
}

export default SingleUser
