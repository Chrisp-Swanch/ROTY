export interface RockSnakeCase {
  id: number
  created_at: number
  owner_id: number
  name: string
  description: string
  image: string
  weight_division: string
  disqualified: boolean
  is_deleted: boolean
}

export interface New {
  owner_id: number
  name: string
  description?: string | null
  image?: string | null
  weight_division: string
}
export interface Update {
  name?: string
  description?: string | null
  image?: string | null
  weight_division?: string
  disqualified?: boolean
  is_deleted?: boolean
}

export type Action =
  | { type: 'ERROR'; payload: string }
  | { type: 'SET_ROCKS'; payload: RockSnakeCase[] }
  | { type: 'ADD_ROCK'; payload: RockSnakeCase }
  | { type: 'UPDATE_ROCK'; payload: RockSnakeCase }
  | { type: 'DEL_ROCK'; payload: number }