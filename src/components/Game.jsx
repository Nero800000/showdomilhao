    import  { useState, useRef } from "react";
    import './Game.css'

        
        const Game = ({verifyLetter,pickedWord,pickedCategory,Letras,guessedLetters,wrongLetters
            ,guesses,score}) => {
            
                const [letter,setLetter] = useState('')
                const LetterInputReff =  useRef(null)

                const handleSubmit  = (e) => {
                    e.preventDefault()

                    verifyLetter(letter)
                    setLetter('')
                    LetterInputReff.current.focus()
                }

        return (
              <div className="game">
                 <p className="points">
                     <span>Pontuação: {score}</span>
                 </p>
                 <h1>Advinhe a palavra:</h1>
                 <h3 className="tip">
                     Dicas sobre a palavra: <span>{pickedCategory}</span>
                 </h3>
                 <p>Voce ainda tem {guesses} tentativas </p>
                 <div className="wordContainer">
                  {Letras.map((letters,i) =>(
                      guessedLetters.includes(letters) ? (
                        <span key={i} className="letter">
                            {letters}</span>
                        

                      ) : (
                          <span key={i} className="blankSquare"></span>
                      )
                  ))}
                 </div>
                 <div className="letterContainer">
                     <p>Tente Adivinhar uma letra da palavra</p>
                     <form onSubmit={handleSubmit} >
                         <input type="text"  name="letter" maxLength="1" 
                         required
                          onChange={(e)=> setLetter(e.target.value)}
                          value={letter}
                          ref={LetterInputReff}
                           />
                         <button>jogar!</button>
                     </form>
                 </div>
                 <div className="wrongLettersContainer">
                     <p>Letras já utilizadas</p>
                     {wrongLetters.map((letter,i)=>(
                         <span key={i}>{letter},</span>
                     ))}

                 </div>
              </div>
        )
    }

    export default Game