export interface UserSnakeCase {
  id: number
  created_at: number
  name: string
  profile_image: string
  previous_winner: boolean
  is_deleted: boolean
}

export interface New {
  name: string
  profile_image?: string | null
  previous_winner?: boolean
}

export interface Update {
  name?: string
  profile_image?: string | null
  previous_winner?: boolean
  is_deleted?: boolean
}

export type Action =
  | { type: 'ERROR'; payload: string }
  | { type: 'SET_USERS'; payload: UserSnakeCase[] }
  | { type: 'ADD_USER'; payload: New }
  | { type: 'UPDATE_USER'; payload: Update }
  | { type: 'DEL_USER'; payload: number }
