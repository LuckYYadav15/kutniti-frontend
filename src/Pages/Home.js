import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Background from "../assets/backgroundMain.jpg";
import { useMediaQuery } from "react-responsive";


function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define the mobile breakpoint
  const isLaptop = useMediaQuery({ minWidth: 780 });

let containerStyle;
  if(isMobile){
    containerStyle = {
      margin: "0 0 0 0",
      padding: "0 0 0 0",
      backgroundImage: `url(${Background})`, // Set the background image
      backgroundSize: 'cover', // Adjust background sizing
      backgroundRepeat: 'no-repeat', // Prevent repeating of background image
      backgroundColor: '#f2f2f2',
      width: '99.5vw',
      height: "130vh",
      // Add other styles as needed
    };
  
  }

  if(isLaptop){
    containerStyle = {
      margin: "0 0 0 0",
      padding: "0 0 0 0",
      backgroundImage: `url(${Background})`, // Set the background image
      backgroundSize: 'cover', // Adjust background sizing
      backgroundRepeat: 'no-repeat', // Prevent repeating of background image
      backgroundColor: '#f2f2f2',
      width: '98.5vw',
      height: "130vh",
      // Add other styles as needed
    };
  
  }
 
  return (
    <div style={containerStyle} className=' font-custom'>
 
      <Navbar />
      <Hero />
    </div>
  );
}

export default Home;
