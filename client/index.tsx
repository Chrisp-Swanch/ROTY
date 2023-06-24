import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'

import router from './router'
import { RouterProvider } from 'react-router-dom'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    // <Auth0Provider
    // domain='facil-joshliu.au.auth0.com'
    // clientId='LPmXLj6Y5eNaXiEo3BA7MEEwJWNkH2Sq'
    // redirectUri={window.location.origin}
    // audience='https://mooo-vies/api'
    // >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    // </Auth0Provider>
  )
})
