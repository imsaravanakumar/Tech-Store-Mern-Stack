
import { useState } from "react"

import { FaBars } from "react-icons/fa6";
import Navbar from "./Navbar";

const Header = ({ token, setToken }) => {
  return (
    <header className="bg-[#ffffff] border-b-2 border-[#e9e9e9]">
      <Navbar token={token} setToken={setToken} />
    </header>
  );
};

export default Header;