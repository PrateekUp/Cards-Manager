import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const SharedLayout = () => {
  return (
    <div
      style={
        {
          // height: "100vh",
          // width: "100vw",
          // display: "flex",
          // flexDirection: "column",
          // padding: "0",
        }
      }
    >
      <NavBar />
      <Outlet
        style={{
          height: "100%",
          overflowY: "hidden",
        }}
      />
    </div>
  );
};

export default SharedLayout;
