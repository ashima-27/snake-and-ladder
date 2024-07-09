import React, { useEffect } from 'react';

const Player = ({ name, color }) => {
  useEffect(() => {
    console.log("name", name, color);
  }, [name, color]);


  const playerColorClass = `bg-${color}-500`;

  return (
    <div className={`flex items-center justify-center  w-auto p-3 h-12 `}>
      <div className={`h-8 w-8 p-2`} style={{backgroundColor:`${color}`}}></div>
      <p className="text-black-800 p-2">{name}</p>
    </div>
  );
};

export default Player;
