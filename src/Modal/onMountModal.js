import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Components/Board/Board.css";
const PlayerModal = ({ isOpen, onClose, onPlayersSelected }) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [selectedColors, setSelectedColors] = useState(['blue', 'red']); 

  const availableColors = ['blue', 'red', 'yellow', 'green'];

  const handleNumPlayersChange = (e) => {
    const num = parseInt(e.target.value);
    setNumPlayers(num);
    setSelectedColors(availableColors.slice(0, num));
  };

  const handleColorSelectChange = (index, color) => {
    const updatedColors = [...selectedColors];
    updatedColors[index] = color;
    setSelectedColors(updatedColors);
  };

  const handleConfirm = () => {
    if (numPlayers < 2) {
      toast.error('Minimum 2 players are required.'); 
      return;
    }
    onPlayersSelected(numPlayers, selectedColors);
    onClose();
  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <ToastContainer /> {/* ToastContainer for displaying toasts */}
      <div className="flex items-center justify-center min-h-screen stone-border">
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          {/* Modal content */}
          <div className="modal-content py-4 text-left px-6" style={{backgroundColor:'#573f354f',border:'4px solid green'}}>
          <h1 className="text-4xl text-center font-bold text-green-900 m-3" style={{
     

     fontFamily: "Oleo Script, system-ui",
  fontWeight: 800,
  fontStyle: "normal"
    }}>
      Snake and Ladder
    </h1>
            <div className="flex justify-between items-center pb-3">
            
              <p className="text-2xl font-bold">Enter Number of Players (2-4)</p>
              {/* <button className="modal-close cursor-pointer z-50" onClick={onClose}>
                <svg
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.95 15.536l-6.95-6.95 6.95-6.95-1.414-1.414-6.95 6.95-6.95-6.95L.536 1.622l6.95 6.95-6.95 6.95 1.414 1.414 6.95-6.95 6.95 6.95 1.414-1.414z"
                  ></path>
                </svg>
              </button> */}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Number of Players:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                min="2"
                max="4"
                value={numPlayers}
                onChange={handleNumPlayersChange}
              />
            </div>
            {Array.from({ length: numPlayers }).map((_, index) => (
              <div key={index} className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Player {index + 1} Color:
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={selectedColors[index]}
                  onChange={(e) => handleColorSelectChange(index, e.target.value)}
                >
                  {availableColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
