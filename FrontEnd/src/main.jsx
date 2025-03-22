import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/main.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import UserContext from './context/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <UserContext>
        <RouterProvider router={router} />
      </UserContext>
    </Provider>
  </StrictMode>,
)
