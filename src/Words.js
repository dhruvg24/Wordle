import wordleWords from './wordle-words.txt'

// has the random words to be generated
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];


export const generateWordSet = async () => {
  // since to fetch the words need to use fetch API of JS we create this as async function 
  // here better to keep sets as it would allow to get the word from wordle-words in O(1) time complexity
  let wordSet;
  let todaysWord;
  await fetch(wordleWords).then((response)=>response.text()).then((result)=>{
    const wordArr= result.split("\n")
    // splitting is performed on the basis of new line words
    todaysWord = wordArr[Math.floor(Math.random()*wordArr.length)]
     wordSet = new Set(wordArr)
  })

  return {wordSet, todaysWord}
  // this is JS object returned
  
}