import { useAppSelector } from '../hooks/hooks'
import * as RockModels from '../../models/interfaces/rocks'

import SingleRock from './SingleRock'

function Rocks() {
  const rockList = useAppSelector(
    (state) => state.rocks as RockModels.RockSnakeCase[]
  )

  return (
    <>
      <h1>This Year&apos;s Entries:</h1>
      <div className="users_container">
        {userList.map((user) => {
          return <SingleUser key={user.id} user={user} />
        })}
      </div>
    </>
  )
}

export default rocks
