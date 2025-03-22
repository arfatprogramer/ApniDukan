import { User } from "lucide-react";

import { useSelector } from "react-redux";
import userImage from "../../assets/images.png";
import SettingSection from "./SettingSection";

const Profile = ({setOpentUpdateProfile}) => {
	const userData =useSelector(state=>state?.user?.user)
	
	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src={userData?.profile?userData?.profile:userImage}
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4'
				/>

				<div>
					<h3 className='text-lg font-semibold text-gray-100'>{userData?.firstName } {userData?.lastName } </h3>
					<p className='text-gray-400'>{userData?.email}</p>
					<p className='text-gray-400'> Phone : {userData?.phoneNumber}</p>
				</div>
			</div>

			<button onClick={()=>setOpentUpdateProfile(true)} className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
				Edit Profile
			</button>
		</SettingSection>

	);
};
export default Profile;
