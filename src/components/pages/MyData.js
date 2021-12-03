import React from 'react'
import '../../App.css'
import PlacementStat from '../PlacementStat';

export default function MyData() {

  // clean './public' when refreshing the page
  window.onload = () => {
    fetch('http://localhost:7000/clean');
  };

    return <PlacementStat />
}