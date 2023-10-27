import React from "react";
import { auth } from "../Firebase";
import { sendEmailVerification } from "firebase/auth";
import { Box, Button } from "@chakra-ui/react";
import { ToastError, ToastInfo, ToastSuccess } from "../utility/errorToasts";

function PhoneNumberVerification({ user }) {
  const functiontoverify = async () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        ToastSuccess("verification link sent successfully ");
        ToastInfo("please Refresh after verification")
      })
      .catch((error) => {
        ToastError("Please sign Up real email Id");
      });
  };

  return (
    <Box
      p={4}
      border={"1px solid rgb(126, 121, 131)"}
      color={user.emailVerified ? "green" : "red"}
      borderRadius={"5px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      Account Verified?: <h3>{user.emailVerified ? "Yes" : "No"}</h3>
      {!user.emailVerified && (
        <Button
          Button
          colorScheme="orange"
          marginLeft={"20px"}
          onClick={functiontoverify}
        >
          Verify
        </Button>
      )}
    </Box>
  );
}

export default PhoneNumberVerification;
