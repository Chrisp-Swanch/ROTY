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
      <div className="cards_container">
        {rockList.map((rock) => {
          return <SingleRock key={rock.id} rock={rock}/>
        })}
      </div>
    </>
  )
}

export default Rocks
