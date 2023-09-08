import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { UserState } from "../context/UserContext";
import { NavLink } from "react-router-dom";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../Firebase";

export default function ProfilePage() {
  // user from context
  const { user,orderUser} = UserState();
 


  return (
    <>
      {user || orderUser ? (
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
                src="https://bit.ly/dan-abramov"
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
                    Edit
                  </Button>
                </NavLink>
                <Text>{user.email}</Text>
              </div>
            </Box>

            {orderUser && (
              <Box
                w="80%"
                p={4}
                border={"1px solid rgb(126, 121, 131)"}
                borderRadius={"5px"}
              >
                {orderUser.data().address}
              </Box>
            )}
            {orderUser && (
              <Box
                w="80%"
                p={4}
                border={"1px solid rgb(126, 121, 131)"}
                borderRadius={"5px"}
              >
                {orderUser.data().phone}
              </Box>
            )}
            {orderUser && (
              <Box
                w="80%"
                p={4}
                border={"1px solid rgb(126, 121, 131)"}
                borderRadius={"5px"}
              >
                amount: {orderUser.data().amount}
                day: {orderUser.data().days}
              </Box>
            )}
          </div>
        </div>
      ) : (
        <div className="cotainer">There is no use to print</div>
      )}
    </>
  );
}
