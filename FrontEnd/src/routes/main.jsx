import App from '../App'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Cart from "../pages/Cart";
import ForgotPassword from "../pages/ForgotPassword";
import Category from '../pages/Category';
import ProductView from '../pages/ProductView';
import Search from '../pages/Search';
import CheckOut from '../pages/CheckOut';
import SignupOption from '../pages/SignupOption';
import SignupType from '../pages/SignupType';
import SignupVender from '../pages/signupVender';
import Merchant from '../pages/Merchant';
import AllProduct from '../pages/AllProduct';
import Profile from '../pages/userProfile';
import MyOrder from '../pages/MyOrder';
import PaymentOptions from '../pages/PaymentOptions';
import VenderViewOrder from '../pages/VenderViewOrder';
import Cancel from '../pages/Cancel';
import Success from '../pages/Success';
import Contact from '../pages/Contact';
import BuyPage from '../pages/BuyPage';
import VenderCanceledOrders from '../pages/VenderCanceledOrders';
import AddressPage from '../pages/AddressPage';
import ProtectedRoutes from '../components/ProtectedRoutes';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/services',
                element: <Services />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/forgotPassword',
                element: <ForgotPassword />
            },
            {
                path: '/signup/:type',
                element: <Signup />
            },
            {
                path: '/myCart',
                element:<ProtectedRoutes> <Cart /> </ProtectedRoutes> 
            },
            {
                path: '/category/',
                element: <Category />
            },
            {
                path: '/product/:id',
                element: <ProductView />,
            },
            {
                path: '/search',
                element: <Search />,
            },
            {
                path: '/checkout',
                element:<CheckOut/>
            },
            {
                path:"success",
                element:<Success/>
            },
            {
                path:"cancel",
                element:<Cancel/>
            },
            {
                path:"Payment",
                element:<PaymentOptions/>
            },
            {
                path:"SignupType",
                element:<SignupType/>
            },
            {
                path:"SignupOption/:type",
                element:<SignupOption/>
            },
            {
                path:"SignupVender/:type",
                element:<SignupVender/>
            },
            {
                path:"MyProfile",
                element:<Profile/>
            },
            {
                path:"MyOrder",
                element:<MyOrder/>
            },
           
            {
                path:"Buy",
                element: <ProtectedRoutes> <BuyPage/> </ProtectedRoutes>
            },

            {
                path:"AddressPage",
                element:<AddressPage/>
            },
           
           
            {
                path:"merchant",
                element:<Merchant/>,
                children:[
                    {
                        path:'all-product',
                        element:<AllProduct/>
                    },
                    {
                        path:"all-Orders",
                        element:<VenderViewOrder/>
                    },
                    {
                        path:"canced-Orders",
                        element:<VenderCanceledOrders/>
                    },
                ]
            }
        ]
    },

])

export default router;
