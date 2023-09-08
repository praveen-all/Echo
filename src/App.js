import './App.css';
import {  Routes, Route ,BrowserRouter} from "react-router-dom";
import SignUp from "./components/authComponets/SignUp";
import Login from './components/authComponets/Login';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import EditProfilePage from './pages/EditProfilePage';

function App() {


  return (
    <>
    <NavBar/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage /> }></Route>
        <Route
          path="/about"
          element={
            <>
              <div>about page</div>
            </>
          }
        ></Route>

        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/profile" element={<ProfilePage/>}></Route>
        <Route path="/EditUser" element={<EditProfilePage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
