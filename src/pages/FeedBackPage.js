import { Box, Button, Spinner, Text } from '@chakra-ui/react'
import { collection, deleteDoc, doc,  getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { ToastError, ToastInfo } from '../utility/errorToasts';
import { UserState } from '../context/UserContext';

const FeedBackPage = () => {
const { isLoad, setIsLoad } = UserState();
    const [feedBacks, setfeedBacks] = useState([])
    const [isdelete, setIsDelete] = useState(false);
    const getalldoc=async()=>{
        const querySnapshot = await getDocs(collection(db, "feedBack"));
       
        setfeedBacks(querySnapshot.docs);
        setIsLoad(false);
    }

    useEffect(() => {
        setIsLoad(true);
    getalldoc();
    
     
    }, [isdelete])
    

    const handleDelete=async(el)=>{
        try {
            await deleteDoc(doc(db, "feedBack", el.id));
            return ToastInfo("feedback deleted successfully")
        } catch (error) {
            return ToastError(error.message)
        }
    
    }


  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", rowGap: "60px" }}
    >
      <h2>FeedBack Pages</h2>
      {feedBacks.length !== 0 ? (
        <Box
          width="100%"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
        >
          {feedBacks.map((el) => (
            <Box
            key={el.id}
              backgroundColor={"rgb(65, 201, 190,0.5)"}
              maxWidth={"300px"}
              overflow={"auto"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={"20px"}
              borderRadius={"20px"}
              padding={"20px"}
            >
              <h4>{el.data().userName}</h4>
              <Text>{el.data().feedbackType}</Text>
              <Text>{el.data().feedback}</Text>
              <Button colorScheme="red" onClick={(e)=>{
             e.preventDefault();
              handleDelete(el);
              setIsDelete(!isdelete);
              }}>delete</Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Text>No feedback😊😊</Text>
      )}
    </div>
  );
}

export default FeedBackPage