import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { logOut } from "../../common/ApiUrls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/userDataSlicer";

const DangerZone = () => {
	const navigate=useNavigate()
	const dispatch=useDispatch()

	const handelLogout = async () => {
		const serverResponse = await fetch(logOut.url, {
		  method: logOut.method,
		  credentials: 'include',
		  headers: { "Content-Type": "application/json" }
		})
		const responseDate = await serverResponse.json()
		if (responseDate.success) {
		  toast.success(responseDate.message)
		  navigate('/login')
		  dispatch(setUserDetails(null))
		}
		if (responseDate.error) {
		  toast.error(responseDate.message)
		  navigate('/login')
		}
	  }
	return (
		<motion.div
			className='bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className='flex items-center mb-4'>
				<Trash2 className='text-red-400 mr-3' size={24} />
				<h2 className='text-xl font-semibold text-gray-100'>Danger Zone</h2>
			</div>
			<p className='text-gray-300 mb-4'>Do you want Realy Logout.</p>
			<button
			onClick={()=>handelLogout()}
				className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded 
      transition duration-200'
			>
				Logout
			</button>
		</motion.div>
	);
};
export default DangerZone;
