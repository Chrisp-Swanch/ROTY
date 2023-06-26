import * as RockModels from '../../models/interfaces/rocks'

interface Props {
  rock: RockModels.RockSnakeCase
}

function SingleRock({ rock }: Props) {
  const { name, image, description, weight_division, disqualified } = rock

  return (
    <>
      {Boolean(!disqualified) && (
        <div className="user_card">
          <h1>{name}</h1>
          <div className="line"></div>
          <img src={image} alt={`${name}`} />
          <p>{weight_division}</p>
          <p>{description}</p>
        </div>
      )}
    </>
  )
}

export default SingleRock
