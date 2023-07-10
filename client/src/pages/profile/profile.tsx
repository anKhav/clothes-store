import {useDispatch, useSelector} from "react-redux";
import {AuthState, RootState} from "../../store.ts";
import {logoutUser} from "../../features/auth.slice.ts";
import {MouseEvent} from "react";
import {ThunkDispatch} from "@reduxjs/toolkit";


const Profile = () => {
    const user = useSelector((state:AuthState) => state.user?.data)
    const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
    const logoutHandle = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await dispatch(logoutUser())
        localStorage.clear()
    }
    return (
        <div>
            {user?.email}
            <button onClick={logoutHandle}>Logout</button>
        </div>
    );
};

export default Profile;