import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../assets/kutniti-logo.svg";
import logo2 from "../assets/Beta.svg";
import vector from "../assets/Vector.svg";
import twitter from "../assets/twitter.svg";
import youtube from "../assets/youtube.svg";
import linkedin from "../assets/linkedin.svg";
import Home from "./navbarIcons/Home";
import Global from "./navbarIcons/Global";
import Newspaper from "./navbarIcons/Newspaper";
import Bulb from "./navbarIcons/Bulb";
import About from "./navbarIcons/About";

import { useMediaQuery } from "react-responsive";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [strokeHome, setStrokeHome] = useState("black");
  const [strokeGlobal, setStrokeGlobal] = useState("black");
  const [strokeNewspaper, setStrokeNewspaper] = useState("black");
  const [strokeBulb, setStrokeBulb] = useState("black");
  const [strokeAbout, setStrokeAbout] = useState("black");

  const handleNav = () => {
    setNav(!nav);
  };

  const handle1MouseEnter = () => {
    setStrokeHome("white");
  };

  const handle1MouseLeave = () => {
    setStrokeHome("black");
  };

  const handle2MouseEnter = () => {
    setStrokeGlobal("white");
  };

  const handle2MouseLeave = () => {
    setStrokeGlobal("black");
  };

  const handle3MouseEnter = () => {
    setStrokeNewspaper("white");
  };

  const handle3MouseLeave = () => {
    setStrokeNewspaper("black");
  };

  const handle4MouseEnter = () => {
    setStrokeBulb("white");
  };

  const handle4MouseLeave = () => {
    setStrokeBulb("black");
  };

  const handle5MouseEnter = () => {
    setStrokeAbout("white");
  };

  const handle5MouseLeave = () => {
    setStrokeAbout("black");
  };

  const shareText = "Check out this awesome pie chart!"; // Change as needed
  const shareUrl = encodeURIComponent("http://localhost:3000/country-view"); // Get the current URL

  const handleTwitterShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    window.open(twitterShareUrl, "_blank");
  };

  const handleLinkedInShare = () => {
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`;
    window.open(linkedInShareUrl, "_blank");
  };

  // const isMobile = useMediaQuery({ maxWidth: 767 }); // Define the mobile breakpoint
  const isLaptop = useMediaQuery({ minWidth: 780 });

  return (
    <div className="shadow-2xl z-50 h-auto top-0 left-0 right-0 bg-white m-5 rounded-lg fixed flex justify-between items-center   px-2 py-2 ">
      <Link to="/" className="home-link flex">
        <img src={logo2} alt="logo" className="" />
        {/* <h1 className='w-full text-3xl text-black hover:text-purple-600' >Kutniti Watch</h1>
      <p style={{ color: "rgb(121, 0, 255)"}} className='text-sm p-3'>Beta</p> */}
      </Link>

      <ul className="hidden md:flex ">
        <li
          className="cursor-pointer hover:bg-black hover:text-white rounded-full px-3 flex items-center py-1 "
          onMouseEnter={handle1MouseEnter}
          onMouseLeave={handle1MouseLeave}
        >
          <div className="mr-1">
            <Home stroke={strokeHome} />
          </div>

          <div className="">
            <a href="/">Home</a>
          </div>
        </li>

        <li
          className="cursor-pointer hover:bg-black hover:text-white rounded-full px-3 flex items-center "
          onMouseEnter={handle2MouseEnter}
          onMouseLeave={handle2MouseLeave}
        >
          <div className="mr-1">
            <Global stroke={strokeGlobal} />
          </div>
          <div className="">
            <a href="/country-view">Countries</a>
          </div>
        </li>

        <li
          className="cursor-pointer hover:bg-black hover:text-white rounded-full px-3 flex items-center "
          onMouseEnter={handle3MouseEnter}
          onMouseLeave={handle3MouseLeave}
        >
          <div className="mr-1">
            <Newspaper stroke={strokeNewspaper} />
          </div>
          <div className="">
            <a href="/newspaper-view">Newspapers</a>
          </div>
        </li>

        <li
          className="cursor-pointer hover:bg-black hover:text-white rounded-full px-3 flex items-center "
          onMouseEnter={handle4MouseEnter}
          onMouseLeave={handle4MouseLeave}
        >
          <div className="mr-1">
            <Bulb stroke={strokeBulb} />
          </div>
          <div className="">
            <a href="/methodology">Methodology</a>
          </div>
        </li>

        <li
          className="cursor-pointer hover:bg-black hover:text-white rounded-full px-3 flex items-center "
          onMouseEnter={handle5MouseEnter}
          onMouseLeave={handle5MouseLeave}
        >
          <div className="mr-1">
            <About stroke={strokeAbout} />
          </div>
          <div className="">
            <a href="/about">About</a>
          </div>
        </li>
      </ul>
      {isLaptop && (
        <div className="flex">
          <button onClick={handleTwitterShare} className="mx-2">
            <img src={twitter} alt="global " className="m-auto w-8" />
          </button>

          <button onClick={handleLinkedInShare} className="mx-2">
            <img src={linkedin} alt="global " className="m-auto w-8" />
          </button>

          <button onClick={handleTwitterShare} className="mx-2">
            <img src={youtube} alt="global " className="m-auto w-8" />
          </button>
        </div>
      )}

      <div onClick={handleNav} className="block md:hidden">
        {nav ? (null) : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={
          nav
            ? "fixed right-0 top-0 w-[60%] h-full border-r border-r-gray-900  ease-in-out duration-500  backdrop-blur-[10px] bg-opacity-0"
            : "ease-in-out duration-500 fixed left-[-100%] "
        }
      >
        <div className="">
        <div onClick={handleNav} className="block md:hidden fixed right-7 top-10 ">
        {nav ? <AiOutlineClose size={20} /> : (null)}
      </div>
          {/* <h1 className='w-full text-3xl font-bold  m-4'>REACT.</h1> */}
          <li className="mt-20 p-4 border-b border-gray-600">
            <a href="/">Home</a>
          </li>
          <li className="p-4 border-b border-gray-600">
            <a href="/country-view">Countries</a>
          </li>
          <li className="p-4 border-b border-gray-600">
            <a href="/newspaper-view">Newspapers</a>
          </li>
          <li className="p-4 border-b border-gray-600">
            <a href="/methodology">Methodology</a>
          </li>
          <li className="p-4 border-b border-gray-600">
            <a href="/about">About</a>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
