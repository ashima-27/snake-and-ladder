import React, { useState ,useEffect } from 'react';
import Board from '../Components/Board/Board';
import Player from '../Components/Player/Player';
import Dice from '../Components/Dice/Dice';
import './Game.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Game = () => {
  const [cells] = useState([...Array(100).keys()].map(n => 100 - n));
  const [snakes, setSnakes] = useState({});
  const [ladders, setLadders] = useState({});
  const [players, setPlayers] = useState([{ id: 1, position: 1, color: 'blue' }, { id: 2, position: 1, color: 'yellow' }]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceResult, setDiceResult] = useState(0);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    setDiceResult(diceRoll);
    movePlayer(diceRoll);

    setTimeout(() => {
      setIsRolling(false);
    }, 2000); 
  };

  useEffect(() => {
    const generatePositions = () => {
      const snakePositions = {};
      const ladderPositions = {};
    
     
      const positions = Array.from({ length: 97 }, (_, index) => index + 4);
    
      const isPositionTaken = (position) => {
        return snakePositions[position] || ladderPositions[position];
      };
    
   
      while (Object.keys(snakePositions).length < 7) {
        const start = Math.floor(Math.random() * 97) + 4;
        if (!isPositionTaken(start)) {
          const end = Math.max(1, start - Math.floor(Math.random() * 6) - 1);
          snakePositions[start] = end;
        }
      }
    
     
      while (Object.keys(ladderPositions).length < 7) {
        const start = Math.floor(Math.random() * 94) + 7;
        if (!isPositionTaken(start)) {
          const end = Math.min(100, start + Math.floor(Math.random() * 10) + 1);
          ladderPositions[start] = end;
        }
      }
    
      return { snakes: snakePositions, ladders: ladderPositions };
    };
    
  
    const { snakes, ladders } = generatePositions();
  
    setSnakes(snakes);
    setLadders(ladders);
  }, []);
  
  useEffect(()=>{
    console.log("jk",snakes,ladders)
  },[])
  
  const movePlayer = (diceRoll) => {
    let newPosition = players[currentPlayer].position + diceRoll;
    let encountered = '';

    if (newPosition > 100) {
      newPosition = 100;
    }
    if (snakes[newPosition]) {
      newPosition = snakes[newPosition];
      encountered = 'snake';
    } else if (ladders[newPosition]) {
      newPosition = ladders[newPosition];
      encountered = 'ladder';
    }

    const newPlayers = players.map((player, index) => {
      if (index === currentPlayer) {
        return { ...player, position: newPosition };
      }
      return player;
    });

    setPlayers(newPlayers);
    if (encountered === 'snake') {
      const snakeStart = snakes[newPosition];
      const snakeEnd = newPosition;
      toast.warn(`Player ${players[currentPlayer].id} got bitten by a snake 🐍 Moved from position ${snakeStart} to ${snakeEnd} !`);
    } else if (encountered === 'ladder') {
      const ladderStart = ladders[newPosition];
      const ladderEnd = newPosition;
      toast.success(`Player ${players[currentPlayer].id} climbed a ladder 🪜 Moved from position ${ladderStart} to ${ladderEnd} !`);
    } else {
      toast.info(`Player ${players[currentPlayer].id} moved to position ${newPosition} 🎲`);
    }
    

    if (newPosition === 100) {
      toast.success(`Player ${players[currentPlayer].id} reached position 100! 🎉 Game Over!`);
      setIsRolling(false); 
      restartGame();
      
    } else {
      setCurrentPlayer((currentPlayer + 1) % players.length);
    }
  };

  const restartGame = () => {
    setPlayers([{ id: 1, position: 1, color: 'blue' }, { id: 2, position: 1, color: 'yellow' }]);
    setCurrentPlayer(0);
    setDiceResult(0);
    setIsRolling(false);
    toast.dismiss(); 
    toast.success('Game Restarted!'); 
  };

  return (
    <>
    
    <div className="flex flex-col items-center m-2 justify-center">
  <ToastContainer
    position="top-right"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />

  <div className="flex flex-col md:flex-row md:items-center justify-between md:justify-around md:w-10/12 mb-4 md:mb-0 mt-3">
    <h1 className="text-4xl text-center font-bold text-blue-600 m-3" style={{
     

     fontFamily: "Oleo Script, system-ui",
  fontWeight: 800,
  fontStyle: "normal"
    }}>
      Snake and Ladder
    </h1>
    
    <div className="flex flex-row items-center mb-2 md:mb-0 md:mr-4">
      {players.map((player) => (
        <Player key={player.id} name={`Player ${player.id}`} color={player.color} />
      ))}
    </div>
    
    <button
      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={rollDice}
      disabled={isRolling}
    >
      Roll Dice
    </button>

    <div className="mt-3 md:mt-0 md:ml-4  flex justify-center">
      <Dice number={diceResult} color={players[currentPlayer].color} />
    </div>

    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 md:mt-0 md:ml-4 rounded"
      onClick={restartGame}
    >
      Restart Game
    </button>
  </div>

  <div className="w-full md:w-10/12 flex items-center justify-center">
    <Board cells={cells} snakes={snakes} ladders={ladders} players={players} />
  </div>
</div>


</>
  
  );
};

export default Game;
