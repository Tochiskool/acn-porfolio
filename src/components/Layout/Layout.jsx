import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./layout.css";
const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
