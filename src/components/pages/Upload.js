import React from 'react'
import '../../App.css'
import FileUpload from '../FileUpload';

export default function Upload() {
    
  // clean './public' when refreshing the page
  window.onload = () => {
    fetch('http://localhost:7000/clean');
  };

    return <FileUpload />
}