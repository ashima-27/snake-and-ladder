import React, { useState, useEffect } from 'react';
import "./Board.css";

const Board = ({ cells, snakes, ladders, players }) => {
  const [randomColors, setRandomColors] = useState({});

  useEffect(() => {
    const getRandomColor = () => {
      const blueRange = { r: [150, 200], g: [200, 255], b: [255, 255] };
      const pinkRange = { r: [255, 255], g: [180, 220], b: [200, 255] };
      const yellowRange = { r: [255, 255], g: [255, 255], b: [150, 200] };
  
      const ranges = [blueRange, pinkRange, yellowRange];
      const chosenRange = ranges[Math.floor(Math.random() * ranges.length)];
  
      const r = Math.floor(Math.random() * (chosenRange.r[1] - chosenRange.r[0] + 1)) + chosenRange.r[0];
      const g = Math.floor(Math.random() * (chosenRange.g[1] - chosenRange.g[0] + 1)) + chosenRange.g[0];
      const b = Math.floor(Math.random() * (chosenRange.b[1] - chosenRange.b[0] + 1)) + chosenRange.b[0];
  
      const toHex = (value) => value.toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };
  
   
    const colors = {};
    cells.forEach(cell => {
      colors[cell] = getRandomColor();
    });

    setRandomColors(colors);
  }, [cells]); 

  const renderCell = (cell) => {
    const snakeTailEntry = Object.entries(snakes).find(([start, end]) => parseInt(start) === cell);
    const ladderBottomEntry = Object.entries(ladders).find(([start, end]) => parseInt(start) === cell);
    const player = players.find(player => player.position === cell);

    return (
      <div
        key={cell}
        className={`relative flex justify-center items-center border border-black h-12 ${
          snakeTailEntry ? 'bg-green-500' : ladderBottomEntry ? 'bg-brown-500' : 'bg-yellow-400'
        }`}
        style={{ backgroundColor: randomColors[cell] || 'transparent' }}
      >
        <div>{cell}</div> 
        {snakeTailEntry && <div className="absolute rounded-lg bottom-0 left-0 text-xs text-white bg-red-600 m-1 p-1 font-bold">{`${snakeTailEntry[1]}`} 🐍</div>}
        {ladderBottomEntry && <div className="absolute top-0 rounded-lg right-0 text-xs text-white bg-green-600 font-bold m-1 p-1">{`${ladderBottomEntry[1]}`} 🪜</div>}
        {player && (
          <div className={`absolute text-white m-2 font-bold bg-white-50 z-10 p-1 ${playerColors[players.indexOf(player)]}`}>
            P{players.indexOf(player) + 1}
          </div>
        )}
      </div>
    );
  };

  const playerColors = [
    "bg-blue-900",
    "bg-yellow-900"
  ];

  return (
    <div className="p-2 bg-yellow-600 stone-border rounded-lg w-full mt-5">
      <div className="grid grid-cols-10 p-3" style={{ backgroundColor: "rgb(233 214 202 / 24%)" }}>
        {cells.map(renderCell)}
      </div>
    </div>
  );
};

export default Board;
