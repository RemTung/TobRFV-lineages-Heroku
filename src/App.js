import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Tree from './components/pages/Tree';
import MyData from './components/pages/MyData';
import Upload from './components/pages/Upload';
import Docs from './components/pages/Docs';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path ='/tree' element={<Tree/>}/>
          <Route path ='/my-data' element={<MyData/>}/>
          <Route path ='/upload' element={<Upload/>}/>
          <Route path ='/docs' element={<Docs/>}/>

          <Route path='/rolled' element={() => { window.location = 'https://domain.extension/external-without-params'; return null;} }/>

        </Routes>
      </Router>
      
    </>
  );
}

export default App;
