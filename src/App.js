import react, {useState, useEffect} from 'react'; // Importing the React functions
import './App.css'; // Importing the stylesheet
import Board from './components/Board.js'; // Importing the board component
import Players from './components/Players'; // Importing the players component
import Choices from './components/Choices'; // Importing the choices component
import charactersArray from "./characters"; // Importing the characters array
import {shuffle} from 'lodash' // Random mix function of an array
import includes from "./utilities" // Importing utility functions

function App() { // Declaration of the App component
  
  const [activeCard, setActiveCard] =  useState([]); // Actual returned card
  const [characters, setCharacters] =  useState(shuffle(charactersArray)); // Intial list of cards
  const [activePlayer, setActivePlayer] = useState(Math.floor(Math.random()*2) === 1 ? true : false); // Actual player
  const [round, setRound] = useState({ // Taken decisions for the current round
    player: activePlayer,
    clickedCard: [],
    clickedCharacter: "",
    chosenCharacter: "",
    chosenAnswer: "",
  });
  const [players, setPlayers] = useState([{ // Players infos
    name: "Anne", life: 2 },
  { name: "Bastien", life: 2
  }])

  useEffect(() => {
    checkWinner()
  }, [players]);

  const isWitch = () => {
    return (round.chosenCharacter === "Sorciere") ? true : false
  }

  const checkWinner = () => { // Function to check if a player has won the game
    if (players[0].life === 0) {
      return (`${players[1].name} a gagné`)
    }
    if (players[1].life === 0) {
      return (`${players[0].name} a gagné`)
    }
  }

  const handleClickedCard = (character) => {
    if (round.clickedCard.length === 0 && !includes(character.id, activeCard) && character.id === 12 && round.chosenCharacter === "") {
      // Trigger the power of the traitor
      setActiveCard(prev => ([...prev, character.id]));
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.clickedCard = [character.id]
      roundCopy.clickedCharacter = character.name
      setRound(roundCopy)
      let playersCopy = JSON.parse(JSON.stringify(players))
      playersCopy[activePlayer ? 0 : 1].life = players[activePlayer ? 0 : 1].life - 1
      setPlayers(playersCopy)
    
    } else if (round.chosenCharacter === "Adjoint" && !includes(character.id, activeCard)) {
      // Trigger the power of the adjunct
      if (round.clickedCard.length === 0) {
        let roundCopy = JSON.parse(JSON.stringify(round))
        roundCopy.clickedCard = [character.id]
        roundCopy.clickedCharacter = character.name
        setRound(roundCopy)
      } else {
        let charactersCopy = JSON.parse(JSON.stringify(characters))
        let firstPosition = charactersCopy.map(function(e) { return e.id; }).indexOf(round.clickedCard[0]);
        let secondPosition = charactersCopy.map(function(e) { return e.id; }).indexOf(character.id);
        let firstCharacter = charactersCopy[firstPosition]
        let secondCharacter = charactersCopy[secondPosition]
        charactersCopy[firstPosition] = secondCharacter
        charactersCopy[secondPosition] = firstCharacter
        setCharacters(charactersCopy)
        let roundCopy = JSON.parse(JSON.stringify(round))
        roundCopy.clickedCard = [roundCopy.clickedCard[0], character.id]
        setRound(roundCopy)
        resetRound(true)
      }
    } else if ((round.chosenCharacter === "Robin" || round.chosenCharacter === "Sheriff") && !includes(character.id, activeCard)) {
      // Trigger the power of Robin
      if (round.clickedCard.length === 0 || round.clickedCard.length === 1) {
        let roundCopy = JSON.parse(JSON.stringify(round))
        roundCopy.clickedCard.push(character.id)
        roundCopy.clickedCharacter = character.name
        setRound(roundCopy)
      } else if (round.clickedCard.length === 2) {
        let firstColor = characters[characters.map(function(e) { return e.id; }).indexOf(round.clickedCard[0])].color;
        let secondColor = characters[characters.map(function(e) { return e.id; }).indexOf(round.clickedCard[1])].color;
        let thirdColor = characters[characters.map(function(e) { return e.id; }).indexOf(character.id)].color;
        let roundCopy = JSON.parse(JSON.stringify(round))
        roundCopy.clickedCard.push(character.id)
        roundCopy.clickedCharacter = character.name
        setRound(roundCopy)
          if(firstColor === secondColor && secondColor === thirdColor) {
            activeCard.push(round.clickedCard[0], round.clickedCard[1], character.id)
          } else {
            let playersCopy = JSON.parse(JSON.stringify(players))
            playersCopy[activePlayer ? 0 : 1].life = players[activePlayer ? 0 : 1].life - 1
            setPlayers(playersCopy)
            resetRound(true)
          }
      }
    } else if (round.clickedCard.length === 0 && !includes(character.id, activeCard)) {
      // Flip the chosen card if none has already been flipped
      setActiveCard(prev => ([...prev, character.id]));
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.clickedCard = [character.id]
      roundCopy.clickedCharacter = character.name
      setRound(roundCopy) // Set the chosen card if none has already been flipped chosed
    }

    if (includes(character.id, activeCard) && isWitch() && includes(character.id, round.clickedCard)) {
      // Flip the card back after the witch power
      setActiveCard(activeCard.filter(element => element !== character.id));
      resetRound(true)

    } else if (includes(character.id, activeCard) && character.id === 12) {
      // Flip the card back after the traitor power
      setActiveCard(activeCard.filter(element => element !== character.id));
      resetRound(true)

    } else if (includes(character.id, activeCard) && includes(character.id, round.clickedCard) ) {
      // Flip the card back if the card is currently flipped
      setActiveCard(activeCard.filter(element => element !== character.id));

    } else if (!includes(character.id, activeCard) && isWitch() && !includes(round.clickedCard[0], activeCard)) {
      // Flip the card if the card is currently flipped
      setActiveCard(prev => ([...prev, character.id]));
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.clickedCard = [character.id]
      roundCopy.clickedCharacter = character.name
      setRound(roundCopy) // Trigger the power of the witch

    } else if (round.chosenCharacter === "Moine" ) {
      setActiveCard(prev => ([...prev, character.id]));
      resetRound(true) // Trigger the power of the monk
    }
  };

  const handleClickedChoice = (choice) => {
    if (choice.character === "Passe" && round.chosenCharacter === "" && round.clickedCard[0] !== 12) {
      resetRound(true) // Go to next player if the player skip
    } else if (choice.character === "Passe" && (round.chosenCharacter === "Robin" || round.chosenCharacter === "Sheriff") && round.chosenAnswer !== "") {
      resetRound(true) // Go to next player if the player is Robin or Sheriff and skip
    } else if (round.chosenCharacter === "" && round.clickedCard.length !== 0 && !includes(round.clickedCard[0], activeCard) ) {
    // Choose a character if none has already been chosen
    // there is no active card and a card has already been clicked
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.chosenCharacter = choice.character
      setRound(roundCopy)
    }
  }

  const resetRound = (isNewPlayer) => {
    setActivePlayer((isNewPlayer) ? !activePlayer : activePlayer)  
    setRound({ // Function to enable a new round to play
        player: activePlayer,
        clickedCard: [],
        clickedCharacter: "",
        chosenCharacter: "",
        chosenAnswer: "",
      });
  }

  const handleClickedAnswer = (answer) => {
    if (round.chosenAnswer === "" && round.clickedCard !== [] && round.chosenCharacter !== "") {
    // If an answer is clicked and none has already been selected, answer is add to the round
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.chosenAnswer = answer;
      if (round.chosenCharacter === "Adjoint" || round.chosenCharacter === "Robin" || round.chosenCharacter === "Sheriff") {
        roundCopy.clickedCard = []
      }
      setRound(roundCopy)
    }

    if(round.chosenCharacter !== round.clickedCharacter && answer === "Je t'accuse") {
    // If a player lies and is not believed, he loses a life
      let playersCopy = JSON.parse(JSON.stringify(players))
      playersCopy[activePlayer ? 0 : 1].life = players[activePlayer ? 0 : 1].life - 1
      setPlayers(playersCopy)
      resetRound(true)
    } else if (round.chosenCharacter === round.clickedCharacter && answer === "Je t'accuse") {
      // If a player tells the truth but is not believed,
      // it trigger his character's power and the other player loses a life
        let playersCopy = JSON.parse(JSON.stringify(players))
        playersCopy[activePlayer ? 1 : 0].life = players[activePlayer ? 1 : 0].life - 1
        setPlayers(playersCopy)
        characterPower(round.chosenCharacter)
    } else if (answer === "Je te crois") {
      // If the active player is believed, it trigger his character's power
      characterPower(round.chosenCharacter)
    }
  }

  const onNameChange = (e, num) => {
    // Function that enable a player to change his name
    let playersCopy = JSON.parse(JSON.stringify(players))
    playersCopy[num].name = e
    setPlayers(playersCopy)
  }

  const characterPower = (character) => {
    // Trigger a character's power
    switch (character) {
      case 'Paysanne':
        resetRound(true)
        break
      case 'Compagnon':
        resetRound(false)
        break
      case 'Sheriff':
      case 'Robin':
        return
      default:
        return
    }
  }

  return (
    <div className="app">
      <Players
        activePlayer={activePlayer}
        activeCard={activeCard}
        players={players}
        onChange={onNameChange}
        round={round}
      />
      <Board
        handleClickedCard={handleClickedCard}
        characters={characters}
        activeCard={activeCard}
        round={round}
      />
      <Choices
      onChoiceClick={handleClickedChoice}
      onAnswerClick={handleClickedAnswer}
      activePlayer={activePlayer}
      round={round}
      />
    </div>
  );
};

export default App;
