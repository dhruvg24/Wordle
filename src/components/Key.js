// this component is created for keyboard keys having some style involved

import React, { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, disabled }) => {
  // disabled is bool when we need to disable the letters of no use on keyboard
  const {
    // board,
    // setBoard,
    // currAttempt,
    // setCurrAttempt,
    onDelete,
    onEnter,
    onSelectLetter,
  } = useContext(AppContext);
  const selectLetter = () => {
    // now we need to see if the key pressed is enter
    if (keyVal === "ENTER") {
      // instead of writing implementation here we have written in App.js -> by creating the functions
      // since we are using useContext so props handling also becomes easy
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    // have to put some conditional logic for CSS of Enter and delete key in keyboard
    <div className="key" id={bigKey ? "big": disabled && "disabled"} onClick={selectLetter}>
      {keyVal}
    </div>
  );
};

export default Key;
