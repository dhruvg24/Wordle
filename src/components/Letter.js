// this is what we guess in each individual attempt
import React, {useContext, useEffect} from 'react'

import { AppContext } from '../App';
const Letter = ({letterPos,attemptVal}) => {
    const {board, correctWord, currAttempt, setDisabledLetters} = useContext(AppContext)
    const letter = board[attemptVal][letterPos];

    // to get the id for correct/almost correct/ error
    const correct = (correctWord.toUpperCase()[letterPos] === letter)
    // correct is a boolean value
    const almost= !correct && letter!=="" && correctWord.includes(letter)
    // for almost correct is should not be correct, shd not be "", and correctWord must include letter typed

    // const letterState = correct ? "correct" : almost ? "almost" : "error";
    // here we also need to see that once we move to the next attempt after entering the "ENTER" then only these ids must be set and not immediate colors should be present
    const letterState = currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");
    // we shall pass letterState in id

    // in this componenent we get to know that whether the typed sequence is correct or not
    // but now we need to disable letters which are already used by us and not present in actual sentence
    // we use useEffect that will run every time when we run some different attempt(useEffect hook)
    useEffect(()=>{
      if(letter!=="" && !correct && !almost)
      {
        //  setDisabledLetters([...disabledLetters, letter])
        // here need to use function inside setDisabledLetters so that it gets updated immediately
          setDisabledLetters((prev)=>[...prev, letter])
      }
    }, [currAttempt.attempt])
  return (
    <div className='letter' id = {letterState}>
      {/* here if we want to show that the letter is at right position and it correct -> id = "correct", if letter is correct but not the position -> id = "almost", and if letter is not at all present -> mark it as-> id = "error" */}
      {letter}
      </div>
  )
}

export default Letter