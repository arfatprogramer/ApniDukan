import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Dashboard from "../pages/Dashboard";
import Login from '../pages/Login';
import Users from '../pages/Users';
import Category from '../pages/Category';
import Products from '../pages/Products';
import SalesPage from '../pages/SalesPage';
import OrdersPage from '../pages/OrdersPage';
import SettingsPage from '../pages/SettingsPage';
import Messages from '../pages/Messages';

const routes=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
           {
            path:'/',
            element:<Dashboard/>,
           },
           {
            path:'/Users',
            element:<Users/>,
           },
           {
            path:'/Category',
            element:<Category/>,
           },
           {
            path:'/Products',
            element:<Products/>,
           },
           {
            path:'/SalesPage',
            element:<SalesPage/>,
           },
           {
            path:'/Orders',
            element:<OrdersPage/>,
           },
           {
            path:'/UsersPage',
            element:<SettingsPage/>,
           },
           {
            path:'/MessagesPage',
            element:<Messages/>,
           },
        ]
    },
    {
        path: '/login',
        element:<Login/>
    }
])

export default routes