import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../assets/kutniti-Logo.png";
import bulb from "../assets/Bulb.png";
import global from "../assets/global.png";
import home from "../assets/home-2.png";
import newspaper from "../assets/newspaper.png";
import vector from "../assets/Vector.png";
import twitter from "../assets/twitter.png";
import youtube from "../assets/youtube.png";
import linkedin from "../assets/linkedin.png";
import { useMediaQuery } from "react-responsive";



const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const shareText = "Check out this awesome pie chart!"; // Change as needed
  const shareUrl = encodeURIComponent("http://localhost:3000/country-view"); // Get the current URL
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

  const handleTwitterShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    window.open(twitterShareUrl, "_blank");
  };

  const handleLinkedInShare = () => {
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`;
    window.open(linkedInShareUrl, "_blank");
  };

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define the mobile breakpoint
  const isLaptop = useMediaQuery({ minWidth: 780 });

  return (
    <div className="shadow-2xl z-50 h-auto top-0 left-0 right-0 bg-white m-5 rounded-lg fixed flex justify-between items-center max-w-[1240px]  px-2 py-2 ">
      <Link to="/" className="home-link flex">
        <img src={logo} alt="logo image" className="" />
        {/* <h1 className='w-full text-3xl text-black hover:text-purple-600' >Kutniti Watch</h1>
      <p style={{ color: "rgb(121, 0, 255)"}} className='text-sm p-3'>Beta</p> */}
      </Link>

      <ul className="hidden md:flex ">

      <li className="cursor-pointer hover:bg-black hover:text-white rounded-full px-3 flex items-center py-1">
          <div className="mr-1">
            <img src={home} alt="global image" style={{ filter: 'grayscale(100%)' }} className="m-auto filter grayscale filter-grayscale-75" />
          </div>
          <div className="mb-1">
            <a href="/">Home</a>
          </div>
        </li>
      

        <li className="cursor-pointer hover:bg-black hover:text-white rounded-full px-3 flex items-center ">
          <div className="mr-1">
            <img src={global} alt="global image" className="m-auto" />
          </div>
          <div className="mb-1">
            <a href="/country-view">Countries</a>
          </div>
        </li>

        <li className="cursor-pointer hover:bg-black hover:text-white rounded-full px-3 flex items-center ">
          <div className="mr-1">
            <img src={newspaper} alt="global image" className="m-auto" />
          </div>
          <div className="mb-1">
            <a href="/newspaper-view">Newspapers</a>
          </div>
        </li>

        <li className="cursor-pointer hover:bg-black hover:text-white rounded-full px-3 flex items-center ">
          <div className="mr-1">
            <img src={bulb} alt="global image" className="m-auto" />
          </div>
          <div className="mb-1">
            <a href="/methodology">Methodology</a>
          </div>
        </li>

        <li className="cursor-pointer hover:bg-black hover:text-white rounded-full px-3 flex items-center ">
          <div className="mr-1">
            <img src={vector} alt="global image" className="m-auto" />
          </div>
          <div className="mb-1">
            <a href="/about">About</a>
          </div>
        </li>
      </ul>
{isLaptop && (
      <div className="flex">
      <button
        onClick={handleTwitterShare}
        className="mx-2"
      >
         <img src={twitter} alt="global image" className="m-auto w-8" />
      </button>

      <button
        onClick={handleLinkedInShare}
        className="mx-2"
      >
         <img src={linkedin} alt="global image" className="m-auto w-8" />
      </button>

      <button
        onClick={handleTwitterShare}
        className="mx-2"
      >
         <img src={youtube} alt="global image" className="m-auto w-8" />
      </button>
      </div>
      )}
      

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900  ease-in-out duration-500 "
            : "ease-in-out duration-500 fixed left-[-100%] "
        }
      >
      <div className="">
        {/* <h1 className='w-full text-3xl font-bold  m-4'>REACT.</h1> */}
        <li className="mt-20 p-4 border-b border-gray-600">
        <a href="/">Home</a></li>
        <li className="p-4 border-b border-gray-600">
        <a href="/country-view">Countries</a></li>
        <li className="p-4 border-b border-gray-600">
        <a href="/newspaper-view">Newspapers</a></li>
        <li className="p-4 border-b border-gray-600">
        <a href="/methodology">Methodology</a></li>
        <li className="p-4 border-b border-gray-600">
        <a href="/about">About</a></li>
        </div>
      </ul>
      
      </div>
  
  );
};

export default Navbar;
