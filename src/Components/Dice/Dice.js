import React, { useState, useEffect } from 'react';

const Dice = ({ number, color }) => {
  const [rotation, setRotation] = useState(0);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (rolling) {
      const startTime = Date.now();
      const duration = 1000;

      const animateRolling = () => {
        
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          const randomRotation = Math.floor(Math.random() * 1080) + 360;
          const currentRotation = progress * randomRotation;
          setRotation(currentRotation);
          requestAnimationFrame(animateRolling);
        } else {
          setRotation(0);
          setRolling(false);
        }
      };

      requestAnimationFrame(animateRolling);
    }
  }, [rolling]);

  useEffect(() => {
    if (number !== null) {
      handleRoll();
    }
  }, [number]);

  const handleRoll = () => {
    setRolling(true);
  };

  return (
    <div className="relative w-20 h-20 rounded-md bg-white shadow-md transform rotate-x-12" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transform -rotate-x-12">
        <div className={`relative w-full h-full flex justify-center items-center rounded-md`} style={{backgroundColor:`${color}`}}>
          <div className="text-4xl font-bold text-white">{number}</div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transform rotate-x-12">
        <div className={`relative w-full h-full flex justify-center items-center rounded-md`} style={{backgroundColor:`${color}`}}>
          <div className="text-4xl font-bold text-white">{number}</div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transform rotate-y-12">
        <div className={`relative w-full h-full flex justify-center items-center rounded-md`} style={{backgroundColor:`${color}`}}>
          <div className="text-4xl font-bold text-white">{number}</div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transform -rotate-y-12">
        <div className={`relative w-full h-full flex justify-center items-center rounded-md`} style={{backgroundColor:`${color}`}}>
          <div className="text-4xl font-bold text-white">{number}</div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transform -rotate-12">
        <div className={`relative w-full h-full flex justify-center items-center rounded-md`} style={{backgroundColor:`${color}`}}>
          <div className="text-4xl font-bold text-white">{number}</div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transform rotate-12">
        <div className={`relative w-full h-full flex justify-center items-center rounded-md`} style={{backgroundColor:`${color}`}}>
          <div className="text-4xl font-bold text-white">{number}</div>
        </div>
      </div>
      
    </div>
  );
};

export default Dice;
