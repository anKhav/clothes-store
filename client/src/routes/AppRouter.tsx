
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../widgets/dashboard/dashboard.tsx";
import Home from "../pages/home/home.tsx";
import Cart from "../pages/cart/cart.tsx";
import Profile from "../pages/profile/profile.tsx";
import SignIn from "../pages/auth/sign-in/sign-in.tsx";
import SignUp from "../pages/auth/sign-up/sign-up.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AdminRoute from "./AdminRoute.tsx";
import Admin from "../pages/admin/admin.tsx";
import Product from "../pages/product/product.tsx";

function App() {
    const user = useSelector((state: RootState) => state.auth.user?.data);
    const isLoggedIn = !!user;
    console.log(user);
    console.log(isLoggedIn);
    const isAdmin = user?.role === 'ADMIN';

    return (
        <Routes>
            <Route path='/' element={<Dashboard/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/product/:id' element={<Product/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route element={<ProtectedRoute redirectPath='/signin' isLoggedIn={isLoggedIn}/>}>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                </Route>
                <Route element={<AdminRoute redirectPath='/' isAdmin={isAdmin}/>}>
                    <Route path='/admin' element={<Admin/>}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
