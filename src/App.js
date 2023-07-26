import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { useState } from "react";
import { createContext } from "react";
import { boardDefault } from "./Words";
export const AppContext = createContext();
function App() {
  const [board, setBoard] = useState(boardDefault);
  // for using context API
  // since we need board information in many componenets
  // we also need the attemptNumber and letterPosition
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });

  const onSelectLetter = (keyVal) => {
    // here check at first if the position of letter is reached >=5 then return
    if (currAttempt.letterPos > 4) return;
    // need to see the current instance
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    // the below is to move forward while attempting
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };
  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    //  simply need to move to next attempt
    if (currAttempt.letterPos !== 5) return;
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
  };

  return (
    <div className="App">
      <nav>
        <h1>WORDLE</h1>
      </nav>
      <AppContext.Provider
        value={{ board, setBoard, currAttempt, setCurrAttempt, onDelete, onSelectLetter, onEnter }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
