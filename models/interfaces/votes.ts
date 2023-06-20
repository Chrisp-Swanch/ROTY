export interface VoteSnakeCase {
  id: number
  created_at: number
  user_id: number
  rock_id: number
  preference: number
  is_deleted: boolean
}
export interface New {
  user_id: number
  rock_id: number
  preference: number
}
export interface Update {
  rock_id: number
  preference: number
  is_deleted: boolean
}