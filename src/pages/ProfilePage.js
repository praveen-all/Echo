import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { UserState } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import BoxInformation from "../components/BoxInformation";
import PhoneNumberVerification from "../components/PhoneNumberVerification";
import { db } from "../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import TableComp from "../components/TableComp";
import FeedBackForm from "../components/FeedBackForm";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../Firebase";

export default function ProfilePage() {
  // user from context
  const { complteInfo, user, orderUser, setOrderUser } = UserState();
  const [payment, setPayment] = useState(null);
  const { isLoad, setIsLoad } = UserState();
  const getPayment = () => {
    (async () => {
      const q = query(collection(db, "payment"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setPayment(querySnapshot.docs);
    })();
  };
  const getUserOrderInfo=async(user)=>{
        const q = query(
          collection(db, "userInfo"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        
        setOrderUser(querySnapshot.docs[0]);

  }
  useEffect(() => {
    
    if (user) {
      getUserOrderInfo(user);
      getPayment();
    }
  }, []);
  

  return (
    <>
      {user || orderUser ? (
        <>
          {" "}
          <div className="container my-3">
            <div
              className="container"
              style={{
                minHeight: "50vh",
                flexDirection: "column",
                padding: "1%",
                justifyContent: "space-around",
              }}
            >
              {user && (
                <Box
                  w="100%"
                  p={4}
                  color="black"
                  border={"1px solid rgb(126, 121, 131)"}
                  borderRadius={"5px"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                >
                  <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={
                      user.photoURL
                        ? user.photoURL
                        : "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                    }
                    alt="Dan Abramov"
                  />

                  <div>
                    <Heading>{user.displayName}</Heading>
                    <NavLink to={"/EditUser"}>
                      <Button
                        marginLeft={"30vw"}
                        marginTop={"4"}
                        colorScheme="orange"
                      >
                        {!orderUser ? "Add Info" : "Edit"}
                      </Button>
                    </NavLink>
                  </div>
                </Box>
              )}
              <Box
                width={"100%"}
                marginTop={"10px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-around"}
              >
                <Box
                  width={"70%"}
                  display={"flex"}
                  flexDirection={"column"}
                  rowGap={"10px"}
                >
                  {user && (
                    <Box
                      p={4}
                      border={"1px solid rgb(126, 121, 131)"}
                      borderRadius={"5px"}
                    >
                      {user.email}
                    </Box>
                  )}
                  {orderUser && (
                    <BoxInformation info={{ info: orderUser.data().address }} />
                  )}
                  {orderUser && (
                    <BoxInformation info={{ info: orderUser.data().phone }} />
                  )}
                  {orderUser && (
                    <BoxInformation info={{ info: orderUser.data().days }} />
                  )}
                  <PhoneNumberVerification user={user} />
                </Box>
                <Box
                  width={"28%"}
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                >
                  <CircularProgress
                    value={complteInfo}
                    size={"140px"}
                    color={complteInfo === 25 ? "red" : "green.400"}
                    float={"right"}
                  >
                    <CircularProgressLabel>
                      {complteInfo}%
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Text color={"orange"}>
                    {complteInfo === 25
                      ? "incomplete Profile"
                      : "profile status"}
                  </Text>
                </Box>
              </Box>
            </div>
          </div>
          {payment!==null && payment.length!==0 && (
            <Box width={"90%"} margin={"auto"}>
              <Heading>Payment details</Heading>
              
                   <TableComp payment={payment} /> 
              
               <FeedBackForm/>
             
            </Box>
          )}
        </>
      ) : (
        <div className="cotainer">There is no use to show</div>
      )}
    </>
  );
}
