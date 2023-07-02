import {useSelector} from "react-redux";
import {AuthState} from "../../store.ts";


const Profile = () => {
    const user = useSelector((state:AuthState) => state.user?.data)
    console.log(user);
    return (
        <div>

        </div>
    );
};

export default Profile;