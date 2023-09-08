import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authImage from "./../../Images/authBackground.jpeg";
import { ToastError, ToastSuccess, ToastWarning } from '../../utility/errorToasts';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';
export default function Login() {

   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
    const navigate=useNavigate();

   const loginController=async(e)=>{
           e.preventDefault();
           
  if ( !email || !password ) {
    return ToastWarning("please provide all information");
  }

   try {
    await signInWithEmailAndPassword(auth, email, password);
    ToastSuccess("logged in successfully");
    navigate("/");
   } catch (error) {
    if (error.code === "auth/user-not-found") {
      ToastError("There is no user with this email ");
    } else if (error.code === "auth/invalid-email") {
      ToastError("Invalid Email");
    } else if (error.code === "auth/wrong-password") {
      ToastError("Wrong password");
    } else {
      ToastError(" something went  Wrong,Please try again later ");
      console.log(error.message);
    }
   }

   }

  return (
    <div className="login">
      <img src={authImage} alt="login image" className="login__img" />

      <form action="" className="login__form">
        <h1 className="login__title">Login</h1>

        <div className="login__content">
          <div className="login__box">
            <i className="ri-user-3-line login__icon"></i>

            <div className="login__box-input">
              <input
                type="email"
                required
                className="login__input"
                placeholder=" "
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="" className="login__label">
                Email
              </label>
            </div>
          </div>

          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>

            <div className="login__box-input">
              <input
                type="password"
                required
                className="login__input"
                id="login-pass"
                placeholder=" "
                onChange={(e)=>setPassword(e.target.value)}
              />
              <label htmlFor="" className="login__label">
                Password
              </label>
              <i className="ri-eye-off-line login__eye" id="login-eye"></i>
            </div>
          </div>
        </div>

        <div className="login__check"></div>

        <button onClick={loginController} className="login__button">
          Login
        </button>

        <p className="login__register">
          Dont have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
}
