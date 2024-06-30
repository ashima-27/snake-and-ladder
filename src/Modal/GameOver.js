import React from 'react';
import "../Components/Board/Board.css"
const GameOverModal = ({ isOpen, winner,onClose }) => {
    console.log("win",winner)
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen stone-border">
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6" style={{backgroundColor:'#573f354f',border:'4px solid green'}}>
          <h1 className="text-4xl text-center font-bold text-green-900 m-3" style={{
     

     fontFamily: "Oleo Script, system-ui",
  fontWeight: 800,
  fontStyle: "normal"
    }}>
      Snake and Ladder
    </h1>
            <div className="flex justify-between items-center pb-3">
           
              <p className="text-2xl text-center font-bold">Game Over!</p>
              <button className="modal-close cursor-pointer z-50">
                <svg
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  onClick={() => onClose()}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.95 15.536l-6.95-6.95 6.95-6.95-1.414-1.414-6.95 6.95-6.95-6.95L.536 1.622l6.95 6.95-6.95 6.95 1.414 1.414 6.95-6.95 6.95 6.95 1.414-1.414z"
                  ></path>
                </svg>
              </button>
            </div>
            <p className="text-lg">Winner: Player {winner.id}</p>
            <div className="flex items-center mt-4">
              <div
                className={`w-8 h-8 rounded-full mr-2`}
                style={{ backgroundColor: winner.color }}
              ></div>
              <p className="text-lg">{winner.color}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
