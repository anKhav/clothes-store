
import {Navigate, Outlet} from "react-router-dom";
interface Props {
    isAdmin:boolean,
    redirectPath:string,
}
const AdminRoute = ({ isAdmin, redirectPath = '/landing' }:Props) => {

    if (!isAdmin) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default AdminRoute;