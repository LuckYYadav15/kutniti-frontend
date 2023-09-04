import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Background from "../assets/backgroundMain.jpg";

function Home() {


  const containerStyle = {
    margin: "0 0 0 0",
    padding: "0 0 0 0",
    backgroundImage: `url(${Background})`, // Set the background image
    backgroundSize: 'cover', // Adjust background sizing
    backgroundRepeat: 'no-repeat', // Prevent repeating of background image
    backgroundColor: '#f2f2f2',
    width: '100vw',
    height: "100%",
    // Add other styles as needed
  };

  return (
    <div style={containerStyle} className='w-full font-custom'>
 
      <Navbar />
      {/* <WorldMap onCountryClick={handleCountryClick} landColor="green"/> */}
      <Hero />
      {/* <Newsletter /> */}
    

   
     
     
    </div>
  );
}

export default Home;
