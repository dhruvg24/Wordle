import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { boardDefault,generateWordSet } from "./Words";
import GameOver from "./components/GameOver";
export const AppContext = createContext();
function App() {
  const [board, setBoard] = useState(boardDefault);
  // for using context API
  // since we need board information in many componenets
  // we also need the attemptNumber and letterPosition
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
// to keep randomly generated word for the current game play -> need to have a state
  const [wordSet, setWordSet] = useState(new Set())

  // we keep state of disabled words also which are already used in the current attempt and not present in the correct word
  const [disabledLetters, setDisabledLetters] = useState([]);
  // for trial we add the correct word 

  // we need a state whether game is over
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})

  const [correctWord, setCorrectWord] = useState("");
  // const correctWord = "RIGHT";

  // generating word -> using useEffect only a single time it is to be done

  useEffect(()=>{
    generateWordSet().then((words)=>{
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
  })
  },[])

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

    let currWord = "";
    for(let i = 0;i<5;i++){
      currWord+=board[currAttempt.attempt][i];
    }
    if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    }
    else{
      alert("Word Not Found :(");
    }
    if(currWord===correctWord){
      // alert("Game Ended!")
      setGameOver({gameOver: true, guessedWord: true})
      return;
    }

    if(currAttempt.attempt === 5){
      setGameOver({gameOver: true, guessedWord: false})
    }
  };


  return (
    <div className="App">
      <nav>
        <h1>WORDLE</h1>
      </nav>
      <AppContext.Provider
        value={{ board, setBoard, currAttempt, setCurrAttempt, onDelete, onSelectLetter, onEnter, correctWord, disabledLetters,setDisabledLetters, gameOver, setGameOver}}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
