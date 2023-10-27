import React, { useEffect, useState } from "react";

import { UserState } from "../context/UserContext";
import { NewCard } from "../components/NewCard";
import Slides from "../components/Slides";
import Footer from "../components/Footer";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import slide1 from "./../Images/image-4.jpg";

import {
  Box,
  Button,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
export default function HomePage() {
  const { user, Subscriber, orderUser, setSubscriber } = UserState();
  const [details, setDetails] = useState([]);
  const [isCollect, setisCollect] = useState(false);
const { isLoad, setIsLoad } = UserState();
  useEffect(() => {
    if (orderUser) {
      if (Subscriber.isSub) {
        (async () =>
          await updateDoc(doc(db, "userInfo", orderUser.id), {
            days: Subscriber.noofDays,
          }))();
      } else {
        (async () =>
          await updateDoc(doc(db, "userInfo", orderUser.id), {
            days: Subscriber.noofDays,
          }))();
      }
    }
  }, [orderUser]);

  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getdetails = async () => {
    setIsLoad(true);
    const q = query(collection(db, "userInfo"), where("days", "!=", 0));
    const querySnapshot = await getDocs(q);
    setDetails(querySnapshot.docs);
    setIsLoad(false);
  };
  useEffect(() => {
    if (user && user.displayName === "admin") getdetails();
  }, [isCollect]);

  const getnumberofDays = async (detailst) => {
    const q = query(
      collection(db, "payment"),
      where("uid", "==", detailst.data().uid)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length !== 0) {
      let py = querySnapshot.docs
        .map((el) => el.data())
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0];
      let temp = Math.round(
        (-new Date(py.date).getTime() + new Date().getTime()) / 86400000
      );

      return temp;
    }
  };

  const handleColect = async (detailst) => {
    let temp = await getnumberofDays(detailst);

    await updateDoc(doc(db, "userInfo", detailst.id), {
      days: detailst.data().subDays - temp,
      isCollect: true,
    });

    setisCollect(!isCollect);
  };

  const handlerClearEverything = async () => {
    setIsLoad(true);
    try {
      details.forEach(async (detailst) => {
       
       try{ await updateDoc(doc(db, "userInfo", detailst.id), {
          isCollect: false,
        });}catch(err){
          console.log(err)
        }
        
      });
      setisCollect(!isCollect);
      setIsLoad(false);
    } catch (error) {
      console.log(error);
      setIsLoad(false);
    }
  };

  return (
    <>
      {user && user.displayName === "admin" ? (
        <TableContainer className="container">
          <Table variant="simple" borderRadius={"5px"} marginTop={"30px"}>
            <Thead>
              <Tr>
                <Th
                  backgroundColor={"gray"}
                  color={"white"}
                  textAlign={"center"}
                >
                  Name
                </Th>
                <Th
                  backgroundColor={"gray"}
                  color={"white"}
                  textAlign={"center"}
                >
                  Phone
                </Th>
                <Th
                  backgroundColor={"gray"}
                  color={"white"}
                  textAlign={"center"}
                >
                  Adress
                </Th>
                <Th
                  backgroundColor={"gray"}
                  color={"white"}
                  textAlign={"center"}
                >
                  Email
                </Th>
                <Th
                  backgroundColor={"gray"}
                  color={"white"}
                  textAlign={"center"}
                >
                  Status
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {details.map((detailst) => {
                return (
                  !detailst.data().isCollect && (
                    <Tr>
                      <Td textAlign={"center"}>{detailst.data().name}</Td>
                      <Td textAlign={"center"}>{detailst.data().phone}</Td>
                      <Td textAlign={"center"}>{detailst.data().address}</Td>
                      <Td textAlign={"center"} overflowX={"auto"}>
                        {detailst.data().email}
                      </Td>
                      <Td textAlign={"center"}>
                        {" "}
                        <Button
                          colorScheme="orange"
                          onClick={async (e) => {
                            e.preventDefault();

                            handleColect(detailst);
                          }}
                        >
                          Collect
                        </Button>{" "}
                      </Td>
                    </Tr>
                  )
                );
              })}
            </Tbody>
          </Table>

          <Button
            marginTop={"100px"}
            colorScheme="red"
            onClick={handlerClearEverything}
          >
            set EveryThing
          </Button>
        </TableContainer>
      ) : (
        <div
          className="container my-3"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Slides />
          {!Subscriber.isSub && <NewCard />}
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image src={slide1} />
            <Box>
              <h1>With Our Experience We Will Save Earth</h1>
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <li>
                  <h5>10 year </h5>
                  <span>Experience</span>
                </li>
                <li>
                  <h5>750+ </h5>
                  <span>Users</span>
                </li>
                <li>
                  <h5>650+ tones </h5>
                  <span>Disposed</span>
                </li>
              </ul>
            </Box>
          </Box>
          <Footer moveTop={moveTop} />
        </div>
      )}
    </>
  );
}
