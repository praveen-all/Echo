import React, { useEffect } from 'react'
import { UserState } from '../context/UserContext'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
  

export default function AdminPage() {
 
  const { user, setUser } = UserState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        (async () => {
          const q = query(
            collection(db, "userInfo"),
            where("id", "==", user.uid)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
            console.log(doc.data());
          });
        })();
      } else {
        console.log("something went wrong");
      }
    });
  }, []);
  return (
    <div>
      This is admin pannel
      {user &&
        <div>
          <p>{user.Name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.adress}</p>
          <p>{user.adress}</p>
        </div>
      }
    </div>
  );
}
