import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UserState } from "../context/UserContext";
import { ToastError, ToastSuccess, ToastWarning } from "../utility/errorToasts";
import { auth, db } from "../Firebase";
import { updateEmail, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [address, setAdress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const { user, orderUser } = UserState("");

   const navaigate=useNavigate();
  useEffect(() => {
    if (user && orderUser) {
      let ous=orderUser.data();
      setName(user.displayName);
      setEmail(user.email);
      setPhoneNumber(ous.phone);
      setAdress(ous.address);
    } else {
      ToastError("There is the error backend ,please try again later");
      console.log(user);
      console.log(orderUser);
    }
  }, []);



  const updateUserInfo=async()=>{
    if(!email ||!phoneNumber  ||!name || !address ){
        return ToastWarning("Please enter all required documets");
    }
    if(phoneNumber.length>10){
        return ToastWarning("You must ener a valid 10 digit number");
    }
    // update name && photo
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    })
      .then(() => {
        console.log("name && photo updated successfully")
      })
      .catch((error) => {
          ToastError("There is the error with backend , please try again later")
      });

    //   await updateEmail(auth.currentUser, "pngh.46.46@gmail.com")
    //     .then(() => {
    //       // Email updated!
    //       // ...
    //       console.log("email updated successfully")
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //       ToastError(
    //         "There is the error with backend , please try again later for email"
    //       );
    //     });


        await updateDoc(doc(db, "userInfo", orderUser.id), {
            phone:phoneNumber,
          address: address,
        }).then(()=>{
            console.log("updated phone number")
        }).catch((err)=>{
            console.log(err);
        })
        ToastSuccess("Your infromation updated successfully");
      
        navaigate("/profile");
          window.location.reload();
  }

  return (
    <>
      {user && orderUser ? (
        <Box
          marginTop={"30px"}
          className="container"
          display={"flex"}
          flexDirection={"column"}
        >
          <Heading>Update Your Details</Heading>
          <VStack marginTop={"30px"} spacing={"20px"} width={"100%"}>
            <FormControl id="Name">
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl id="phoneNumber">
             {  <Input
                type="number"
                placeholder="phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />}
            </FormControl>
            <FormControl id="address">
              <Input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAdress(e.target.value)}
              />
            </FormControl>
           { false&&<FormControl id="Email">
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>}

            <FormControl>
              <Input type="file" className="form-control" />
            </FormControl>
            <FormControl textAlign={"center"}>
              <Button colorScheme="orange" type="submit" onClick={updateUserInfo}>
                Update
              </Button>
            </FormControl>
          </VStack>
        </Box>
      ) : (
        <>
          <div className="container" >something went very bad here</div>
        </>
      )}
    </>
  );
}
