import { Box, Button, Text, Textarea } from '@chakra-ui/react'
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../Firebase';
import { UserState } from '../context/UserContext';
import { ToastError } from '../utility/errorToasts';

const FeedBackForm = () => {
    const [FeedType, setFeedType] = useState("");
    const [FeedBack, setFeedBack] = useState("");
    const [isLoading,setisLoading]=useState(false);
    const [issubmit,setIsSubmit]=useState(false);
    const {user}=UserState();
    const handleSubmit=async(e)=>{
       e.preventDefault();
       setisLoading(true);
        try {
            await addDoc(collection(db, "feedBack"), {
              feedbackType: FeedType,
              feedback: FeedBack,
              userName: user.displayName,
            });
            setisLoading(false)
            setFeedType("");
            setFeedBack("");
            setIsSubmit(true);
        } catch (error) {
            return ToastError(error.message)
            setisLoading(false)
        }
    }
   
  return (
    <Box
      width="100%"
      height={"500px"}
      display={"flex"}
      textAlign={"center"}
      justifyContent={"center"}
      marginTop={"80px"}
    >
      {!issubmit && (
        <Box
          width={"400px"}
          height={"300px"}
          backgroundColor={"rgb(65, 201, 190)"}
          borderRadius={"10px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
          flexDirection={"column"}
        >
          <h3>feedback form</h3>
          <input
            type="text"
            placeholder="Feedback type"
            style={{ width: "95%", borderRadius: "5px", padding: "10px" }}
            value={FeedType}
            onChange={(e) => {
              setFeedType(e.target.value);
            }}
          />
          <Textarea
            placeholder="we are always glad hear your feedback😊😊"
            width="95%"
            backgroundColor={"white"}
            padding={"15px"}
            value={FeedBack}
            onChange={(e) => {
              setFeedBack(e.target.value);
            }}
          ></Textarea>
          <Button
            colorScheme="orange"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            submit
          </Button>
        </Box>
      )}
      {issubmit && (
        <Box
          width={"400px"}
          height={"300px"}
          backgroundColor={"rgb(65, 201, 190)"}
          borderRadius={"10px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
          flexDirection={"column"}
        >
          {" "}
          <h3>feedback form</h3>
          <Text marginBottom={"50px"}>Feedback submited</Text>
        </Box>
      )}
    </Box>
  );
}

export default FeedBackForm