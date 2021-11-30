import React from 'react'
import '../../App.css'
import HeroSection from '../HeroSection'


function Home () {

  // clean './public' when refreshing the page
  window.onload = () => {
    fetch('http://localhost:7000/clean');
  };

    return(
        <>
            <HeroSection />
        </>
    );
}

export default Home;