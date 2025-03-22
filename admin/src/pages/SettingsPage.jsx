import { useState } from "react";
import Header from "../components/common/Header";
import DangerZone from "../components/settings/DangerZone";
import Profile from "../components/settings/Profile";
import UpdateAdminProfile from "../components/settings/UpdateAdminProfile";

const SettingsPage = () => {
	const [openUpdateProfle, setOpentUpdateProfile] = useState(false)
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='User Details' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile setOpentUpdateProfile={setOpentUpdateProfile} />
				{/* <Security /> */}
				<DangerZone />
			</main>
			{
				openUpdateProfle && <UpdateAdminProfile OnClose={() => setOpentUpdateProfile(false)} />
			}

		</div>
	);
};
export default SettingsPage;
