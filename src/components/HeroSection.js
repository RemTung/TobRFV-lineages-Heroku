import React from 'react';
import '../App.css';
import { Button } from './Button';
import { ButtonTwo } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-2.mp4' autoPlay loop muted />
      <h1>VISUALIZE LINEAGE</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          UPLOAD    <i class="fas fa-arrow-circle-up"></i>
        </Button>
        <ButtonTwo
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TUTORIAL <i className='far fa-play-circle' />
        </ButtonTwo>
      </div>
    </div>
  );
}

export default HeroSection;