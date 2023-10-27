import './App.css';
import {  Routes, Route } from "react-router-dom";
import SignUp from "./components/authComponets/SignUp";
import Login from './components/authComponets/Login';
import HomePage from './pages/HomePage';
import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import EditProfilePage from './pages/EditProfilePage';
import Payment from './pages/Payment';
import FeedBackPage from './pages/FeedBackPage';
import Spinner from './components/Spinner';
import { UserState } from './context/UserContext';

function App() {
const {isLoad,setIsLoad}=UserState();

  return (
    <>
    <NavBar/>
      <ToastContainer />
     { isLoad&&<Spinner/>}
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
        <Route path="/Payment" element={<Payment/>}></Route>
        <Route path="/feedback" element={<FeedBackPage/>}></Route>
        
      </Routes>
    </>
  );
}

export default App;
