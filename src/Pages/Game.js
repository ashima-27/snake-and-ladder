import React, { useState, useEffect } from 'react';
import Board from '../Components/Board/Board';
import Player from '../Components/Player/Player';
import Dice from '../Components/Dice/Dice';
import './Game.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlayerModal from '../Modal/onMountModal';
import GameOverModal from '../Modal/GameOver';

const Game = () => {
  const [cells] = useState([...Array(100).keys()].map(n => 100 - n));
  const [snakes, setSnakes] = useState({});
  const [ladders, setLadders] = useState({});
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceResult, setDiceResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [gameStarted, setGameStarted] = useState([false, false]);
  const [consecutiveSixes, setConsecutiveSixes] = useState([0, 0]);
  const [isGameOver, setIsGameOver] = useState(false); 
  const [winner, setWinner] = useState(null); 

  const [modalOpen, setModalOpen] = useState(true);

  const toastConfig = {
    autoClose: 2000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  };

  const handlePlayersSelected = (numPlayers, colors) => {
    const initialPlayers = Array.from({ length: numPlayers }, (_, index) => ({
      id: index + 1,
      position: 1,
      color: colors[index % colors.length],
    }));
    setPlayers(initialPlayers);
    setGameStarted(new Array(numPlayers).fill(false));
    setConsecutiveSixes(new Array(numPlayers).fill(0));
    setModalOpen(false);
  };

  useEffect(() => {
    setModalOpen(true);
  }, []);

  const rollDice = () => {
    if (isRolling) return;
     toast.dismiss();
    setIsRolling(true);
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    setDiceResult(diceRoll);

    if (players[currentPlayer].position === 1 && !gameStarted[currentPlayer]) {
      if (diceRoll === 1 || diceRoll === 6) {
        toast.success(`Player ${players[currentPlayer].id} rolled a ${diceRoll} 🎉 and the game has started!`, toastConfig);
      
        setGameStarted(prev => {
          const newGameStarted = [...prev];
          newGameStarted[currentPlayer] = true;
          return newGameStarted;
        });
        movePlayer(0);
      } else {
        toast.info(`Player ${players[currentPlayer].id} needs a 1 or 6 to start.`, toastConfig);
        setIsRolling(false);
        setCurrentPlayer((currentPlayer + 1) % players.length);
      }
    } else {
      movePlayer(diceRoll);
    }
    setTimeout(() => {
      setIsRolling(false);
    }, 2000); 
  };

  useEffect(() => {
    const generatePositions = () => {
      const snakePositions = {};
      const ladderPositions = {};

      const positions = Array.from({ length: 97 }, (_, index) => index + 4);
      const isPositionTaken = (position) => snakePositions[position] || ladderPositions[position];

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

  useEffect(() => {
    console.log("Snakes and Ladders positions", snakes, ladders);
  }, [snakes, ladders]);

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
      toast.warn(`Player ${players[currentPlayer].id} got bitten by a snake 🐍 Moved to position ${newPosition}!`, toastConfig);
    } else if (encountered === 'ladder') {
      toast.success(`Player ${players[currentPlayer].id} climbed a ladder 🪜 Moved to position ${newPosition}!`, toastConfig);
    } else {
      toast.info(`Player ${players[currentPlayer].id} moved to position ${newPosition} 🎲`, toastConfig);
    }

    if (newPosition === 100) {
      toast.success(`Player ${players[currentPlayer].id} reached position 100! 🎉 Game Over!`, toastConfig);
      const winnerPlayer = players[currentPlayer];
      setWinner(winnerPlayer);
      setIsGameOver(true);

      setPlayers([]);
      setCurrentPlayer(0);
      setDiceResult(null);
      setIsRolling(false);
      setGameStarted([false, false]);
    } else if (diceRoll === 6 || diceRoll === 0) {
      toast.info(`Player ${players[currentPlayer].id} rolled a 6 and gets another turn! 🎲`, toastConfig);
      setConsecutiveSixes(prev => {
        const newConsecutiveSixes = [...prev];
        newConsecutiveSixes[currentPlayer] += 1;
        return newConsecutiveSixes;
      });
      if (consecutiveSixes[currentPlayer] === 2) {
        toast.warn(`Player ${players[currentPlayer].id} rolled three 6s in a row and returns to their previous position.`, toastConfig);
        setPlayers(prevPlayers => {
          const updatedPlayers = [...prevPlayers];
          if (!gameStarted[currentPlayer]) {
            updatedPlayers[currentPlayer].position = Math.max(1, updatedPlayers[currentPlayer].position - 13);
            setGameStarted(prev => {
              const newGameStarted = [...prev];
              newGameStarted[currentPlayer] = false;
              return newGameStarted;
            });
          } else {
            updatedPlayers[currentPlayer].position = Math.max(1, updatedPlayers[currentPlayer].position - 18);
          }
          return updatedPlayers;
        });
        setConsecutiveSixes(prev => {
          const newConsecutiveSixes = [...prev];
          newConsecutiveSixes[currentPlayer] = 0;
          return newConsecutiveSixes;
        });
        setCurrentPlayer((currentPlayer + 1) % players.length);
      } else {
        setIsRolling(false); 
      }
    } else {
      setConsecutiveSixes(prev => {
        const newConsecutiveSixes = [...prev];
        newConsecutiveSixes[currentPlayer] = 0;
        return newConsecutiveSixes;
      });
      setCurrentPlayer((currentPlayer + 1) % players.length);
      setIsRolling(false); 
    }
  };

  const restartGame = () => {
    setPlayers([]);
    setCurrentPlayer(0);
    setDiceResult(null);
    setIsRolling(false);
    setGameStarted([false, false]);
    setConsecutiveSixes([0, 0]);
    toast.dismiss();
    setIsGameOver(false);
    setModalOpen(true);
    toast.success('Game Restarted!', toastConfig);
  };

  return (
    <>
    
    <div className="flex flex-col items-center m-2 justify-center">
  <ToastContainer stacked
   
  />
 <PlayerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onPlayersSelected={handlePlayersSelected} />
 <GameOverModal isOpen={isGameOver} winner={winner} onClose={() => setIsGameOver(false)} />

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
    {diceResult &&  <Dice number={diceResult} color={players[currentPlayer].color} /> }
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
