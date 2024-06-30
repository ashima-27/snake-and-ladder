import React from 'react';

const SnakeAndLadder = ({ type, start, end, zIndex }) => {
  const isSnake = type === 'snake';
  const isLadder = type === 'ladder';

  // Calculate startX, startY, endX, endY based on 1/12th space assumption
  const cellWidth = 50; // Assuming each cell is 50px wide
  const cellHeight = 50; // Assuming each cell is 50px high
  const spaceFraction = 1 / 12; // Each cell has 1/12th of the available space

  const startX = (start % 10) * cellWidth * spaceFraction;
  const startY = Math.floor(start / 10) * cellHeight * spaceFraction;
  const endX = (end % 10) * cellWidth * spaceFraction;
  const endY = Math.floor(end / 10) * cellHeight * spaceFraction;

  // Calculate length and angle
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

  // Define the colors and dot sizes
  const snakeColor = 'green';
  const ladderColor = '#8B4513'; // Brown color for ladder
  const dotSize = '4px'; // Size of dots
  const dotSpacing = '0px'; // Spacing between dots

  // Generate dots along the length
  const dots = [];
  const numDots = Math.floor(length / (parseInt(dotSize) + parseInt(dotSpacing)));
  for (let i = 0; i < numDots; i++) {
    dots.push(
      <div
        key={i}
        className="absolute"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: isSnake ? snakeColor : ladderColor,
          top: `${i * (parseInt(dotSize) + parseInt(dotSpacing))}px`,
        }}
      />
    );
  }

  // Render the Snake or Ladder component
  return (
    <div
      className="relative"
      style={{
        top: `${startY}px`,
        left: `${startX}px`,
        width: `${length}px`,
        height: '10px', // Thickness of the snake or ladder
        transformOrigin: 'left center',
        transform: `rotate(${angle}deg)`,
        zIndex: zIndex,
      }}
    >
      {dots}
      {isSnake ? '🐍' : '🪜'} 
    </div>
  );
};

export default SnakeAndLadder;
