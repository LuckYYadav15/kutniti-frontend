import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo from "../assets/Kutniti-logo.png";

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

  return (
    <div className='shadow-2xl z-50 h-auto top-0 left-0 right-0 bg-white m-5 rounded-lg fixed flex justify-between items-center max-w-[1240px] mx-auto px-4 '>
      
      <Link to="/" className='home-link flex'>
      <img
                src={logo}
                alt="logo image"
                className=""
              />
      {/* <h1 className='w-full text-3xl text-black hover:text-purple-600' >Kutniti Watch</h1>
      <p style={{ color: "rgb(121, 0, 255)"}} className='text-sm p-3'>Beta</p> */}
      </Link>
     
      <ul className='hidden md:flex'>
      <Link to="/" className='home-link'><li className='p-4'>Home</li></Link>
        
        <li className='hover:bg-gray-200 rounded p-4 '><a href="/country-view">Countries</a></li>
        <li className='hover:bg-gray-200 rounded p-4 '><a href="/newspaper-view">Newspapers</a></li>
        <li className='hover:bg-gray-200 rounded p-4 '><a href="/about">About</a></li>
        <li className='hover:bg-gray-200 rounded p-4 '><a href="/about">Methadology</a></li>
        <li className="h-10 bg-gray-300 w-px m-2"></li>
        <button onClick={handleTwitterShare} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold m-2 p-2 w-20 rounded h-10">
        <li >Share</li>
    </button>
        
      </ul>
  

      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        {/* <h1 className='w-full text-3xl font-bold  m-4'>REACT.</h1> */}
          <li className='p-4 border-b border-gray-600'>Home</li>
          <li className='p-4 border-b border-gray-600'>Company</li>
          <li className='p-4 border-b border-gray-600'>Resources</li>
          <li className='p-4 border-b border-gray-600'>About</li>
          <li className='p-4'>Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
