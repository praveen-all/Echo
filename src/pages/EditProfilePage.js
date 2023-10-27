import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Progress,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UserState } from "../context/UserContext";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
} from "../utility/errorToasts";
import { auth, db, storage } from "../Firebase";
import { updateProfile } from "firebase/auth";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [address, setAdress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [Form, setForm] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [isUpating, setIsUpating] = useState(false);
  const { user, orderUser, setLoadOrderUser, loadOrderUser } = UserState("");

  //    naviagator to set values
  const navaigate = useNavigate();

  //    starting imformation
  useEffect(() => {
    if (user || orderUser) {
      setName(user.displayName);
      setEmail(user.email);
      setForm({ imageUrl: user.photoURL });
      if (orderUser) {
        let ous = orderUser.data();
        setPhoneNumber(ous.phone);
        setAdress(ous.address);
      }
    } else {
      ToastError("There is the error backend ,useEffect Editpage");
    }
  }, []);

  const updateUserInfo = async () => {
    if (!phoneNumber || !name || !address || !Form) {
      return ToastWarning("Please enter all required documets");
    }
    if (phoneNumber.length > 10) {
      return ToastWarning("You must ener a valid 10 digit number");
    }
    setIsUpating(true);

    // update name and images
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `${Form.imageUrl}`,
    })
      .then(() => {
        console.log("name && photo updated successfully");
      })
      .catch((error) => {
        ToastError("There is the error with backend , please try again later");
      });

    //   update phone and address
    await updateDoc(doc(db, "userInfo", orderUser.id), {
      phone: phoneNumber,
      address: address,
      email: user.email,
      name: user.displayName,
    })
      .then((data) => {
        console.log("updated phone number");
      })
      .catch((err) => {
        console.log(err, "update doc");
      });
    setIsUpating(false);
    ToastSuccess("Your infromation updated successfully");
    navaigate("/profile");
    setLoadOrderUser(!loadOrderUser);
    // window.location.reload();
  };

  // function for uploading images to fireStore

  const onChangeFIleUploadHandler = (File) => {
    if (File === null) return;

    if (File === undefined) return ToastWarning("plese select proper image!");
    setImageLoading(true);
    const blogRef = ref(storage, `UserImages/${File.name + v4()}`);

    const uploadTask = uploadBytesResumable(blogRef, File);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
      
        switch (snapshot.state) {
          case "paused":
            ToastError("upload paused");
            break;
          case "running":
            // ToastInfo("Running");
            console.log("running");
            break;
          default:
            break;
        }
      },
      (ere) => {
        ToastError(ere.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          ToastSuccess("Image upload successfull");
          // setProgress(null);
          setForm((prev) => ({ ...prev, imageUrl: downloadUrl }));
          setImageLoading(false);
        });
      }
    );
  };

  const addInformation = async () => {
    if (!phoneNumber || !name || !address || !Form) {
      return ToastWarning("Please enter all required documets");
    }
    if (phoneNumber.length > 10) {
      return ToastWarning("You must ener a valid 10 digit number");
    }
    setIsUpating(true);
    try {
      const docRef = await addDoc(collection(db, "userInfo"), {
        uid: user.uid,
        phone: phoneNumber,
        address: address,
        days: 0,
        amount: 0,
        email:user.email,
        name:user.displayName,
      });
    } catch (error) {
      ToastError("There is the error with adding user to firestore");
    }

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: Form.imageUrl,
    })
      .then(() => {
        console.log("name && photo updated successfully");
      })
      .catch((error) => {
        ToastError("There is the error with backend , please try again later");
      });
    setIsUpating(false);
    ToastSuccess("Your infromation added successfully");
    setLoadOrderUser(!loadOrderUser);
    navaigate("/profile");
  };

  return (
    <>
      {user ? (
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
              {
                <Input
                  type="number"
                  placeholder="phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              }
            </FormControl>
            <FormControl id="address">
              <Input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAdress(e.target.value)}
              />
            </FormControl>
            {false && (
              <FormControl id="Email">
                <Input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            )}

            <FormControl>
              <Input
                type="file"
                className="form-control"
                onChange={(e) => {
                  onChangeFIleUploadHandler(
                    e.target.files[e.target.files.length - 1]
                  );
                }}
              />
              {imageLoading ? <Progress size="xs" isIndeterminate /> : <></>}
            </FormControl>
            <FormControl textAlign={"center"}>
              {orderUser ? (
                !isUpating ? (
                  <Button
                    colorScheme="orange"
                    type="submit"
                    onClick={updateUserInfo}
                  >
                    Update
                  </Button>
                ) : (
                  <Button colorScheme="orange" isLoading loadingText="Updating">
                    Update
                  </Button>
                )
              ) : (
                <Button
                  colorScheme="orange"
                  type="submit"
                  onClick={addInformation}
                >
                  Add Info
                </Button>
              )}
            </FormControl>
          </VStack>
        </Box>
      ) : (
        <>
          <div className="container">something went very bad here</div>
        </>
      )}
    </>
  );
}
