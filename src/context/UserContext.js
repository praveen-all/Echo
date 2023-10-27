import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ToastError } from "../utility/errorToasts";
const UserContext=createContext();

export const UserState=()=>useContext(UserContext);

const UserProvider=(props)=>{
    const [user, setUser] = useState(null)
    const [isLoad, setIsLoad] = useState(false);
    const [orderUser, setOrderUser] = useState(null);
    const [complteInfo,setCompleteInfo]=useState(25);
    const [Subscriber,setSubscriber]=useState({
      isSub:false,
      noofDays:0,

    });
    const [loadOrderUser,setLoadOrderUser]=useState(false);
    const getPayment = async (user) => {
      (async () => {
        const q = query(
          collection(db, "payment"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length!==0){

        let py = querySnapshot.docs
          .map((el) => el.data())
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )[0];
        let temp = Math.round(
          (-new Date(py.date).getTime() + new Date().getTime()) / 86400000
        );
        if (temp <= py.days) {
          setSubscriber({
            isSub: true,
            noofDays: py.days - temp,
          });
          

         
        } 
      }
      })();
    };
    const getUserOrderInfo=async(user)=>{
      getPayment(user);
        const q = query(
          collection(db, "userInfo"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        
        setOrderUser(querySnapshot.docs[0]);
         let a = 1;
          if (user.emailVerified) a += 1;
        if(querySnapshot.docs[0]){
          const data=querySnapshot.docs[0].data();
         
          if(data.phone)a+=1;
          if(data.address)a+=1;
         
          setCompleteInfo(a*25);
        }
         setCompleteInfo(a * 25);
       

      
    }
    
    useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
           
          if (user) {
          
          getUserOrderInfo(user);
         
          
          }
         

          
        }
      });
    }, [loadOrderUser]);

     

    
  

return (
  <UserContext.Provider
    value={{
      user,
      setUser,
      orderUser,
      setOrderUser,
      complteInfo,
      setCompleteInfo,
      loadOrderUser,
      setLoadOrderUser,
      Subscriber,
      setSubscriber,
      isLoad,
      setIsLoad
    }}
  >
    {props.children}
  </UserContext.Provider>
);
}

export default UserProvider;

