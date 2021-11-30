import React from 'react'
import '../../App.css'

export default function Docs() {

  // clean './public' when refreshing the page
  window.onload = () => {
    fetch('http://localhost:7000/clean');
  };

    return <h1 className='mydata'>Docs</h1>
}