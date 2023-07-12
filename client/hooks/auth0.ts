import { useAuth0 } from '@auth0/auth0-react'

export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated
}