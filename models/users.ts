export interface UserModel {
  id: number
  created_at: string
  name: string
  profile_image: string
  previous_winner: boolean
  is_deleted: boolean
}

export interface NewUserModel {
  name: string
  profile_image?: string
  previous_winner?: boolean
}

export interface UpdateUserModel {
  name?: string
  profile_image?: string
  previous_winner?: boolean
  is_deleted?: boolean
}
