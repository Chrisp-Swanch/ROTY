import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

const NavButton = styled.button`
  margin-right: 30px;
`

function SignInButton() {
  const { loginWithRedirect, logout, user } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    console.log('sign in?!?!')
    loginWithRedirect()
  }

  return (
    <>
      <IfAuthenticated>
        <NavButton
          key="signOut"
          onClick={handleSignOut}
          style={{ textDecoration: 'none' }}
        >
          Sign Out
        </NavButton>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <NavButton
          key="signOut"
          onClick={handleSignIn}
          style={{ textDecoration: 'none' }}
        >
          Sign In
        </NavButton>
      </IfNotAuthenticated>
    </>
  )
}

export default SignInButton
