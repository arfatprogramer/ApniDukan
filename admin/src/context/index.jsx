import { createContext } from "react"; 
import { useDispatch } from "react-redux";
import { adminDate } from '../common/ApiUrls';
import { setUserDetails } from "../redux/userDataSlicer";
import { useNavigate } from "react-router-dom";


export const ContextProvider = createContext()


const AdminContext=(props)=>{
  const dispatch = useDispatch();
  

const fetchUserData = async () => {
  const serverResponse = await fetch(adminDate.url, {
    method: adminDate.method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', },
  })
  const responseDate = await serverResponse.json(); 
  
  if (responseDate.success) {
     dispatch(setUserDetails(responseDate.data))
  }else{
    
  }
  return responseDate;
}

const contextValue={
  fetchUserData
}

return(
  <ContextProvider.Provider value={contextValue}>
  {props.children}
  </ContextProvider.Provider>
)

}


export default AdminContext;