import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase";
import { Link, useNavigate } from "react-router-dom";
import authImage from "./../../Images/authBackground.jpeg";
import { ToastError, ToastWarning } from "../../utility/errorToasts";

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassowrd] = useState();
  const navigate = useNavigate();
  const signupController = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return ToastWarning("please provide all information");
    }

    if (password !== confirmPassword) {
      return ToastWarning("Miss match passsword!!");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      navigate("/");
    } catch (error) {
      ToastError("something went wrong");
      console.log(error);
    }
  };
  return (
    <>
      <div className="login">
        <img src={authImage} alt="login image" className="login__img" />

        <form action="" className="login__form">
          <h1 className="login__title">Sign-up</h1>

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
              <i className="ri-user-3-line login__icon"></i>

              <div className="login__box-input">
                <input
                  type="text"
                  required
                  className="login__input"
                  placeholder=" "
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="" className="login__label">
                  Name
                </label>
              </div>
            </div>

            <div className="login__box">
              <i className="ri-user-3-line login__icon"></i>

              <div className="login__box-input">
                <input
                  type="password"
                  required
                  className="login__input"
                  placeholder=" "
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="" className="login__label">
                  Password
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
                  onChange={(e) => setConfirmPassowrd(e.target.value)}
                />
                <label htmlFor="" className="login__label">
                  Confirm Password
                </label>
                <i className="ri-eye-off-line login__eye" id="login-eye"></i>
              </div>
            </div>
          </div>

          <div className="login__check"></div>

          <button onClick={signupController} className="login__button">
            Sign - Up
          </button>

          <p className="login__register">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}
