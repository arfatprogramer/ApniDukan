import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import routes from './route/index.jsx'
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./redux/Store.jsx";
import AdminContext from "./context/index"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AdminContext>
        <RouterProvider router={routes} />
      </AdminContext>
    </Provider>
  </StrictMode>,
)
