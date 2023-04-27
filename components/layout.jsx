import React from "react";
import Header from "./header";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
const Layout = ({children}) => {
  return (
    <div id="root">
      <Header />
        {children}
      <Footer />
      <ToastContainer />
    </div>
  );
};
export default Layout;