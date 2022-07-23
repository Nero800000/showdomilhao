//css

import './App.css';

//react
import {useEffect, useState, useCallback} from 'react';

// data
import {wordsList} from './data/word'
//components 
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver';

const stages = [
  {id:1,name:"start"},
  {id:2,name:"game"},
  {id:3,name:"end"}
]

const guessesQtY = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList)

 const [pickedWord,setPickedWord] = useState("")
 const [pickedCategory,setPickedCategory] = useState()
 const [letters, setLetters] =useState([])

 const [guessedLetters, setGuesseLetters] = useState([])
 const [wrongLetters,setWrongLetters] = useState([])
 const [guesses,setGuesses] = useState(guessesQtY)
 const [score, setScore] = useState(0)
 console.log("My letras",letters)

 const pickWordAndCategory =  useCallback(() => {
   // pick a random category

   const categories = Object.keys(words)
   const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]


   // pick a random word
   const word = words[category][Math.floor(Math.random() * words[category].length)]
   
    return {word, category}
 },[words])




  const startGame = useCallback(() => {
    // clear All letters
    clearLetterStates()
     // pick word and pick category
     const {word,category} = pickWordAndCategory() 
    
    // pegar as letras da palavra
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase())
     console.log('palavra', wordLetters)
    
     setPickedWord(word)
     setPickedCategory(category)
     setLetters(wordLetters)

    setGameStage(stages[1].name)

  },[pickWordAndCategory])
  const verifyLetter = (letter) => {
     const normalizedLetter = letter.toLowerCase()
 

     // check if letter has alreay been utilized
     if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
       return
     }
     // push guessed letter  or remove a chance

     if(letters.includes(normalizedLetter)) {
       setGuesseLetters((actualGuessLetters) => [
          ...actualGuessLetters,
          normalizedLetter

          
       ])


     } else {
      setWrongLetters((actualWrongletters) => [
        ...actualWrongletters,
        normalizedLetter
     ]) ;
        
      setGuesses((actualguess) => actualguess - 1)
    }


  } 


   const  clearLetterStates = () => {
     setGuesseLetters([])
     setWrongLetters([])
   }

  useEffect(() => {
    // reset all states
    clearLetterStates()

    if(guesses <= 0) {
       setGameStage(stages[2].name)
    }

  }, [guesses])

  // check win condition
  useEffect(() => {
    const uniqueletters = [...new Set(letters)]
    console.log("hellow",uniqueletters)
     
     if(guessedLetters.length === uniqueletters.length) {
        // add score
        setScore((actualScore) => (actualScore += 100))

        // restart game with new word
        startGame()
     }

  },[guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
  } 



  return (
    <div className="App">
     {gameStage === "start" && <StartScreen startGame={startGame}/>}
     {gameStage === 'game' && 
     <Game 
     verifyLetter={verifyLetter}
       pickedWord={pickedWord}
        pickedCategory={pickedCategory} 
        Letras={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}

        />}
     {gameStage === "end" &&  <GameOver retry={retry} score={score}/> }
    </div>
  );
}

export default App;
