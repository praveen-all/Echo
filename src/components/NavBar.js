import { Avatar, Button, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserState } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { ToastError, ToastSuccess } from "../utility/errorToasts";
import logo from './../Images/logo.jpeg'
export default function NavBar() {
  const { user, setUser } = UserState();

  const naviagete = useNavigate();
  const signOutUser = async () => {
    await signOut(auth)
      .then(() => {
        setUser(null);

        naviagete("/");
        window.location.reload();
        ToastSuccess("SingOut successfully");
      })
      .catch((error) => {
        ToastError("There is the error with singout");
      });
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo" style={{ marginBottom: "20px" }}>
          <NavLink to="/">
            {" "}
            <Heading color={"white"} fontFamily={"sans-serif"}>
              ECHO
            </Heading>{" "}
          </NavLink>
        </div>

        <div className={`nav-elements`}>
          {user ? (
            <ul>
              {user.displayName !== "admin" ? (
                <li >
                  <NavLink to={"/profile"}>
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      border={"3px solid rgb(65, 201, 190) "}
                      src={
                        user.photoURL
                          ? user.photoURL
                          : "	https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                      }
                      alt="Dan Abramov"
                    />
                  </NavLink>
                </li>
              ) : (
                <li style={{ textAlign: "center", paddingTop: "10px" }}>
                  <NavLink to={"/feedback"}>Feedback </NavLink>
                </li>
              )}
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
