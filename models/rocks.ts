export interface RockModel {
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

export interface NewRockModel {
  owner_id: number
  name: string
  description: string
  image: string
  weight_division: string
}