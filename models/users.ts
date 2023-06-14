export interface UserModel {
  id: number
  createdAt: string
  name: string
  profileImage: string
  previousWinner: boolean
  isDeleted: boolean
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
