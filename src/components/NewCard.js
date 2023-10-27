import React from "react";
import "./../css/CardCss.css";
import { Button, Circle } from "@chakra-ui/react";
import {  useNavigate } from "react-router-dom";
import { UserState } from "../context/UserContext";
import {  ToastWarning } from "../utility/errorToasts";
export const NewCard = () => {
  const navigate = useNavigate();
  const {complteInfo,user}=UserState();
  const functiontomov = (amount) => {
    if(!user){
       ToastWarning("Please login to buys");
        navigate("/login");
       return;
    }
    if(complteInfo!==100){
       ToastWarning("Please give all you Info and Verify");
       navigate('/profile');
       return;
    }
    sessionStorage.setItem("payment", amount);
    navigate("/payment");
  };
  return (
    <div>
      <div className="gradient-cards">
        <div className="card">
          <div className="container-card bg-green-box container-card_orange">
            <Circle
              size="60px"
              bg="red"
              color="white"
              position={"absolute"}
              top={"-5%"}
              left={"1%"}
            >
              30%
            </Circle>
            <h1 style={{ color: "orange" }}>One Month</h1>
            <p className="card-title">Zero-cost Possibilities</p>
            <p className="card-description">One month full care to you</p>
            <Button
              onClick={(e) => {
                e.preventDefault();
                functiontomov(100);
              }}
            >
              100 pay{" "}
            </Button>
          </div>
        </div>

        <div className="card">
          <div className="container-card bg-g-box container-card_pink">
            <Circle
              size="60px"
              bg="red"
              color="white"
              position={"absolute"}
              top={"-5%"}
              left={"1%"}
            >
              40%
            </Circle>
            <h1 style={{ color: "orange" }}>Three Month</h1>
            <p className="card-title">Zero-cost Possibilities</p>
            <p className="card-description">Three month full care to you</p>

            <Button
              onClick={(e) => {
                e.preventDefault();
                functiontomov(300);
              }}
            >
              300 pay{" "}
            </Button>
          </div>
        </div>
        <div className="card">
          <div className="container-card bg-green-box container-card_green">
            <Circle
              size="60px"
              bg="red"
              color="white"
              position={"absolute"}
              top={"-5%"}
              left={"1%"}
            >
              50%
            </Circle>
            <h1 style={{ color: "orange" }}>Six Month</h1>
            <p className="card-title">Zero-cost Possibilities</p>
            <p className="card-description">Six month full care to you</p>
            <Button
              onClick={(e) => {
                e.preventDefault();
                functiontomov(500);
              }}
            >
              500 pay{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
