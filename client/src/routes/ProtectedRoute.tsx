
import {Navigate, Outlet} from "react-router-dom";

interface Props {
    isLoggedIn:boolean,
    redirectPath:string,
}

const ProtectedRoute = ({ isLoggedIn, redirectPath = '/landing' }:Props) => {
    if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;