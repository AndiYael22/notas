
import React, { useEffect } from 'react';
import '../css/snow.css';

const Snowfall = () => {
  useEffect(() => {
    const particlesC = document.getElementById('particles');

    for (let i = 0; i < 100; i++) {
      const snow = document.createElement('div');
      snow.className = 'snow';
      particlesC.appendChild(snow);

      const randomSize = Math.random() * 3 + 2;
      const randomPosition = Math.random() * 100;
      const randomAnimationDuration = Math.random() * 3 + 2;

      snow.style.width = `${randomSize}px`;
      snow.style.height = `${randomSize}px`;
      snow.style.left = `${randomPosition}vw`;
      snow.style.animationDuration = `${randomAnimationDuration}s`;
    }
  }, []);

  return <div id="particles" className="particles" />;
};

export default Snowfall;
