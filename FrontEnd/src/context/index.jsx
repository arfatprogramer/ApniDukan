import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { cartCount, getAddress, OrderDetails, userDate } from '../common/apiData';
import { setUserState } from "../redux/userSlicer";
import { setAddress } from "../redux/addressSlicer";
import { setMyorder } from "../redux/customerOrderData";

export const ContextProvider = createContext()

const UserContext = (props) => {
  const dispatch = useDispatch();
  const [cartItemCount, setCartItemCount] = useState(0);

  /*** it is use for fetch user data **/
  const fetchUserData = async () => {
    const serverResponse = await fetch(userDate.url, {
      method: userDate.method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', },
    })
    const responseDate = await serverResponse.json();
    if (responseDate.success) {
      dispatch(setUserState(responseDate.data))
    }
    return responseDate;
  }

  const fetchCartData= async ()=>{
    const serverResponse = await fetch(cartCount.url,{
      method:cartCount.method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', },
    })
    const responseDate = await serverResponse.json();

    if (responseDate.success) {
      setCartItemCount(responseDate.data)
    }
    if (responseDate.error)
     {
      setCartItemCount(0)
    }
    
    
  }

  //Fetch Order Details Of user
    const getOrderDetails = async () => {
      const data = await fetch(OrderDetails.url, {
        method: OrderDetails.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const response = await data.json()
      if (response.success) {
        dispatch(setMyorder(response.data))
      }
    }

  // fetch user address
  const fetchAddress=async()=>{
    const response= await fetch(getAddress.url,{
      method:getAddress.method,
      credentials: 'include',
    })
    const responseDate=await response.json()                              
    if(responseDate.success) {
        dispatch(setAddress(responseDate.data))
       }
  }

  const contextValue = {
    fetchUserData,
    fetchCartData,
    cartItemCount, 
    fetchAddress,
    getOrderDetails,
  }

  return (
    <ContextProvider.Provider value={contextValue}>
      {props.children}
    </ContextProvider.Provider>
  )

}


export default UserContext;