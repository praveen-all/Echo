import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ToastError } from "../utility/errorToasts";
const UserContext=createContext();

export const UserState=()=>useContext(UserContext);

const UserProvider=(props)=>{
    const [user, setUser] = useState(null)
    const [orderUser, setOrderUser] = useState(null);
    const [complteInfo,setCompleteInfo]=useState(25);

    const getUserOrderInfo=async(user)=>{
        const q = query(
          collection(db, "userInfo"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        setOrderUser(querySnapshot.docs[0]);
        if(querySnapshot.docs[0]){
          const data=querySnapshot.docs[0].data();
          let a=1;
          if(data.phone)a+=1;
          if(data.address)a+=1;
          if(user.emailVerified)a+=1;
         
          setCompleteInfo(a*25);
        }
        console.log(complteInfo);
    }
    
    useEffect(() => {
      onAuthStateChanged(auth,async(user)=>{
        if(user){
          setUser(user)
          if(user) getUserOrderInfo(user);
          console.log(user);
        }else{
        ToastError("There was the error with server,Please Try again later");
        }
      })
    
    }, [])
      
return (<UserContext.Provider
  value={{user,setUser,orderUser,setOrderUser}}
>
       {props.children}
    </UserContext.Provider>)
}

export default UserProvider;

