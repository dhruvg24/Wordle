import React, { useCallback, useContext, useEffect } from "react";
import Key from "./Key";
import { AppContext } from "../App";
// need to create a keyboard where user can actually type in
const Keyboard = () => {

  const {onEnter, onDelete, onSelectLetter, disabledLetters} = useContext(AppContext)
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((e) => {
    if(e.key==="Enter"){
      onEnter()
    }
    else if(e.key==="Backspace"){
      onDelete()
    } else {
      keys1.forEach((key)=>{
        if(e.key.toLowerCase()===key.toLowerCase()){
          onSelectLetter(key)
        }
      })
      keys2.forEach((key)=>{
        if(e.key.toLowerCase()===key.toLowerCase()){
          onSelectLetter(key)
        }
      })
      keys3.forEach((key)=>{
        if(e.key.toLowerCase()===key.toLowerCase()){
          onSelectLetter(key)
        }
      })
    }
  });
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)} />;
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return <Key keyVal={key}  disabled = {disabledLetters.includes(key)}/>;
        })}
      </div>
      <div className="line3">
        <Key keyVal="ENTER" bigKey={true} />
        {keys3.map((key) => {
          return <Key keyVal={key} disabled = {disabledLetters.includes(key)}/>;
          // if the key is present in disabledLetters then make it disabled
        })}
        <Key keyVal="DELETE" bigKey={true} />
      </div>
    </div>
  );
};

export default Keyboard;
