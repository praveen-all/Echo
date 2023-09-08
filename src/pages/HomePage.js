import React from "react";

import { UserState } from "../context/UserContext";

export default function HomePage() {
  const { user } = UserState();

  console.log(user);

  return (
    <div
      className="container my-3"
      style={{backgroundColor:'red',height:"80vh" }}
    >
      Echo to start  healthy life

    </div>
  );
}
