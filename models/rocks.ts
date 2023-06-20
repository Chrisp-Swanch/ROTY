export interface RockSnakeCase {
  id: number
  created_at: string
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
