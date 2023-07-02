import "./App.css";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./widgets/dashboard/dashboard.tsx";
import Login from "./pages/login/login.tsx";
import Profile from "./pages/profile/profile.tsx";

function App() {
  return (
      <Routes>
          <Route path='/' element={<Dashboard/>}>
            <Route path='/auth' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
      </Routes>
  );
}

export default App;
