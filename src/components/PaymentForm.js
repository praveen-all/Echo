import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { UserState } from "../context/UserContext";
import { ToastError, ToastSuccess } from "../utility/errorToasts";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000000",
      fontWeight: 500,
      fontSize: "16px",

      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fc883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const amount = sessionStorage.getItem("payment");
  const { user,orderUser } = UserState();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const createpayment = async (response) => {
   await addDoc(collection(db, "payment"), {
     uid: user.uid,
     amount: response.data.details.amount,
     method: "card",
     paymentId: response.data.details.id,
     date:`${new Date()}`,
     days:
       response.data.details.amount === 100
         ? 30
         : response.data.details.amount === 300
         ? 90
         : 180,
   });
   await updateDoc(doc(db, "userInfo", orderUser.id), {
     days:
       response.data.details.amount === 100
         ? 30
         : response.data.details.amount === 300
         ? 90
         : 180,
     subDays:
       response.data.details.amount === 100
         ? 30
         : response.data.details.amount === 300
         ? 90
         : 180
   });
   console.log(response)
    // window.setTimeout(() => {
    //   navigate("/profile");
    // }, 2000);
    ToastSuccess("Payment Successfull");
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;

        const response = await axios.post("http://localhost:4000/payment", {
          amount: amount,
          id,
        });
        if (response.status == 200) {
          setSuccess(true);
          createpayment(response);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error", error);
        setIsLoading(false);
      }
    } else {
      console.log(error.message, "-------------->");
      ToastError(error.message);
      setIsLoading(false);
    }
  };
  return (
    // <div className="container1 p-0">
    //   <div className="card px-4">
    //     <p className="h8 py-3">Payment Details</p>
    //     <div className="row gx-3">
    //       <div className="col-12">
    //         <div className="d-flex flex-column">
    //           <p className="text mb-1">Person Name</p>
    //           <input
    //             className="form-control mb-3"
    //             type="text"
    //             placeholder="Name"
    //             value="Barry Allen"
    //           />
    //         </div>
    //       </div>
    //       <div className="col-12">
    //         <div className="d-flex flex-column">
    //           <p className="text mb-1">Card Number</p>
    //           <input
    //             className="form-control mb-3"
    //             type="text"
    //             placeholder="1234 5678 435678"
    //           />
    //         </div>
    //       </div>
    //       <div className="col-6">
    //         <div className="d-flex flex-column">
    //           <p className="text mb-1">Expiry</p>
    //           <input
    //             className="form-control mb-3"
    //             type="text"
    //             placeholder="MM/YYYY"
    //           />
    //         </div>
    //       </div>
    //       <div className="col-6">
    //         <div className="d-flex flex-column">
    //           <p className="text mb-1">CVV/CVC</p>
    //           <input
    //             className="form-control mb-3 pt-2 "
    //             type="password"
    //             placeholder="***"
    //           />
    //         </div>
    //       </div>
    //       <div className="col-12">
    //         <div className="btn btn-primary mb-3">
    //           <span className="ps-3">Pay $243</span>
    //           <span className="fas fa-arrow-right"></span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      {!success ? (
        <div className="container1 p-0">
          <div className="card px-4">
            <p className="h8 py-3">Payment Details</p>
            <div className="row gx-3">
              <div className="col-12">
                <div className="d-flex flex-column">
                  <p className="text mb-1">Person Name</p>
                  <input
                    className="form-control mb-3"
                    type="text"
                    value={user.displayName}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="d-flex flex-column">
                  <div
                    style={{ paddingTop: "20px" }}
                    className="form-control mb-3"
                  >
                    <CardElement options={CARD_OPTIONS} />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <Button
                  onClick={handlerSubmit}
                  colorScheme="blue"
                  //   className="btn btn-primary mb-3"
                  width={"100%"}
                  height={"60px"}
                  isLoading={isLoading}
                  textAlign="center"
                >
                  Pay - ₹{amount}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>you pay ment successfull</h1>
        </div>
      )}
    </>
  );
}

export default PaymentForm;
