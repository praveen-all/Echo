
import { Button, Image } from "@chakra-ui/react";
import React  from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserState } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { ToastError, ToastSuccess } from "../utility/errorToasts";

export default function NavBar() {
      const {user,setUser}=UserState();

     const naviagete=useNavigate();
    const signOutUser=async()=>{
     await signOut(auth)
        .then(() => {
         setUser(null);
         ToastSuccess("SingOut successfully");
         window.setTimeout(()=>{
            naviagete("/");
         },1000);

        })
        .catch((error) => {
           ToastError("There is the error with singout");
        });
    }
      
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <NavLink to="/">Echo</NavLink>
        </div>

        <div className={`nav-elements`}>
          {user ? (
            <ul>
              <li>
                <NavLink to={"/profile"}>
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                  />
                </NavLink>
              </li>
              <li>
                <Button
                  onClick={signOutUser}
                  marginLeft={"10px"}
                  colorScheme="orange"
                >
                  Sign Out
                </Button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Button colorScheme="orange">
                  <NavLink to="/Login">Login</NavLink>
                </Button>
              </li>
              <li>
                <Button colorScheme="orange">
                  <NavLink to="/Signup">Sign Up</NavLink>
                </Button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
