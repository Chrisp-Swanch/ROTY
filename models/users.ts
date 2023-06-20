export interface UserSnakeCase {
  id: number
  created_at: string
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
