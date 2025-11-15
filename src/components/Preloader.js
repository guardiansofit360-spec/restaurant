import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../img/loading.json';
import './Preloader.css';

const Preloader = () => {
  return (
    <div className="preloader-container">
      <div className="preloader">
        <Lottie 
          animationData={loadingAnimation} 
          loop={true}
          className="loading-animation"
        />
      </div>
    </div>
  );
};

export default Preloader;
