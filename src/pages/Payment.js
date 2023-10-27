import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
// import {}
const PUBLIC_KEY =
  "pk_test_51O0pHzSA6IUOypCMpV6P4L0MFf9nTQh7TTE2uttQRqn8kz53VVl4lEjPfdOxUDHn2RDCrfjWvCj4xCu5nNjuO7oK00J2rATcm8";

const stripeTestPromise = loadStripe(PUBLIC_KEY);
const Payment = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
