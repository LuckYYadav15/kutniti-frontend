import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Page404() {
  return (
    <div>
      <Navbar/>
      
      <div className='page-404 h-screen flex flex-col items-center justify-center'>
      <h2 className='error-message text-4xl font-bold text-green-400 mb-8'>404 Error: Page Not Found</h2>
      <Link to="/" className='home-link'>
        <button className='home-button bg-blue-500 hover:bg-blue-700   font-bold py-2 px-4 rounded'>
          Go to Home Page
        </button>
      </Link>
    </div>

    
    <Footer/>
    </div>
  );
}

export default Page404;
