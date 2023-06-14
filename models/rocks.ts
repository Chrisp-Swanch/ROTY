export interface RockModel {
  id: number
  createdAt: string
  ownerId: number
  name: string
  description: string
  image: string
  weightDivision: string
  disqualified: boolean
  isDeleted: boolean
}

export interface NewRockModel {
  owner_id: number
  name: string
  description: string
  image: string
  weight_division: string
}
export interface UpdateRockModel {
  name?: string
  description?: string
  image?: string
  weight_division?: string
  disqualified?: boolean
  is_deleted?: boolean
}
