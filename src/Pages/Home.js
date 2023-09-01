import React from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { WorldMap } from 'world-svg';
import Background from "../assets/backgroundMain.jpg";

function Home() {

  const handleCountryClick = (countryId) => {  
    console.log(countryId); 
  }
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
