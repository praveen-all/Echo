import React from "react";

function Spinner() {
  return (
    <div
      style={{
        width: "90vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        position:"absolute",
        backgroundColor:'white',
        zIndex:"1000000"
      }}
    >
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
