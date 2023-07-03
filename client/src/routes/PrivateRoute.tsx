import { useSelector } from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthState} from "../store.ts";
import Profile from "../pages/profile/profile.tsx";
import Dashboard from "../widgets/dashboard/dashboard.tsx";


// Higher-order component to wrap private routes
function PrivateRoute() {
    const user = useSelector((state: AuthState) => state.user);
    const isLoggedIn = !!user;
    console.log(isLoggedIn);

    return (
        <Routes>
            <Route path='/' element={<Dashboard/>}>
                <Route path='/profile' element={isLoggedIn ? <Profile/> : <Navigate to="/auth" replace />}/>
            </Route>
        </Routes>
    );
}

export default PrivateRoute;