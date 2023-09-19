import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import backgroundImage from "../assets/backgroundMain.jpg";


function Page404() {

  const containerStyle = {
    margin: "0 0 0 0",
    padding: "0 0 0 0",
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: "cover", // Adjust background sizing
    backgroundRepeat: "no-repeat", // Prevent repeating of background image
    backgroundColor: "#f2f2f2",
    width: "100vw",
    height: "100%",
    // Add other styles as needed
  };


  return (
    <div id="" style={containerStyle} className="w-full font-custom">
      <Navbar/>
      
      <div className='page-404 h-screen flex flex-col items-center justify-center'>
      <h2 className='error-message text-4xl font-bold text-gray-400 mb-8'>404 Error: Page Not Found</h2>
      <Link to="/" className='home-link'>
        <button className='home-button bg-opacity-0 backdrop-blur-[1px] text-black border border-gray-800 font-bold py-2 px-4 rounded  '>
          Go to Home Page
        </button>
      </Link>
    </div>

    

    </div>
  );
}

export default Page404;
