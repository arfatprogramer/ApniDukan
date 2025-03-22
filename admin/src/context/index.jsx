import { createContext } from "react"; 
import { useDispatch } from "react-redux";
import { adminDate } from '../common/ApiUrls';
import { setUserDetails } from "../redux/userDataSlicer";

export const ContextProvider = createContext();

const AdminContext = ({ children }) => {
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const serverResponse = await fetch(adminDate.url, {
        method: adminDate.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const responseData = await serverResponse.json();

      if (responseData.success) {
        dispatch(setUserDetails(responseData.data));
      }

      return responseData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return { success: false, message: "Failed to fetch user data" };
    }
  };

  return (
    <ContextProvider.Provider value={{ fetchUserData }}>
      {children}
    </ContextProvider.Provider>
  );
};

export default AdminContext;
