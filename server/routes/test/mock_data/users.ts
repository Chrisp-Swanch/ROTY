import * as UserModels from "../../../../models/interfaces/users";

const mockUserData: UserModels.UserSnakeCase[] = [
  {
    id: 1,
    created_at: 1687147209343,
    name: 'Bilbo Baggins',
    profile_image: 'image/path',
    previous_winner: false,
    is_deleted: false,
  },
  {
    id: 2,
    created_at: 1687147209343,
    name: 'Gandalf',
    profile_image: 'image/path',
    previous_winner: true,
    is_deleted: false,
  },
  {
    id: 3,
    created_at: 1687147209343,
    name: 'Saruman',
    profile_image: 'image/path',
    previous_winner: false,
    is_deleted: true,
  },
]

export default mockUserData