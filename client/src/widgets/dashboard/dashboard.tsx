import Header from "../LayoutHeader";
import {Outlet} from "react-router-dom";
import Footer from "../footer/footer.tsx";


const Dashboard = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default Dashboard;