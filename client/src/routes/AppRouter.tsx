
import {Route, Routes} from "react-router-dom";
import Dashboard from "../widgets/dashboard/dashboard.tsx";
import Login from "../pages/login/login.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Dashboard/>}>
                    <Route path='/auth' element={<Login/>}/>
                </Route>
            </Routes>
            <PrivateRoute/>
        </>
    );
}

export default App;
