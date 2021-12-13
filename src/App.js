import react, {useState, useEffect} from 'react'; // Importing the React functions
import './App.css'; // Importing the stylesheet
import Board from './components/Board'; // Importing the board component
import Players from './components/Players'; // Importing the players component
import Choices from './components/Choices'; // Importing the choices component
import Menu from './components/Menu'; // Importing the menu component
import Popup from './components/Popup'; // Importing the popup component
import charactersArray from "./characters"; // Importing the characters array
import {shuffle} from 'lodash' // Random mix function of an array
import includes from "./utilities" // Importing utility functions
import rules from './rules' // Importing the game's rules
import powers from './powers' // Importing the characters' powers

function App() { // Declaration of the App component
  
  const [activeCard, setActiveCard] =  useState([]); // Actual visible cards
  const [characters, setCharacters] =  useState(shuffle(charactersArray)); // Intial list of cards randomly mixed
  const [activePlayer, setActivePlayer] = useState(Math.floor(Math.random()*2) === 1 ? true : false); // Actual player
  const [history, setHistory] = useState([]) // List of all movements for the current round
  const [hideMenu, setHideMenu] =  useState(true); // Initial visibility of the menu
  const [round, setRound] = useState({ // Taken decisions for the current round
    player: activePlayer,
    clickedCard: [],
    clickedCharacter: "",
    chosenCharacter: "",
    chosenAnswer: "",
  });
  const [players, setPlayers] = useState([{ // Players infos
    name: "Joueur 1", life: 2 },
  { name: "Joueur 2", life: 2
  }])
  const [popupStates, setPopupStates] = useState({ // Popup infos
    popupMessage: `Bienvenue compagnon ! Prêt à relever les défis de la forêt de Sherwood ?
    \nC'est à ${players[activePlayer ? 0 : 1].name} de commencer !`,
    hidePopup: false,
    buttonMessage: 'Règles du jeu',
    hideButton: false
  })

  useEffect(() => { // Function to check if a player has won the game
    if (players[0].life === 0 || players[1].life === 0) {
      let popupCopy = JSON.parse(JSON.stringify(popupStates))
      popupCopy.popupMessage = `${players[((players[0].life === 0) ? 1 : 0)].name} remporte la partie après que son adversaire ait perdu tous ses points`;
      popupCopy.hidePopup = false
      popupCopy.buttonMessage = 'Rejouer'
      popupCopy.hideButton = false
      setPopupStates(popupCopy)
    }
  }, [players]);

  const handleClickedCard = (character) => {
    
    // Trigger the power of the traitor
    if (round.clickedCard.length === 0 // If no card has been clicked before
      && !includes(character.id, activeCard) // If the clicked card isn't visible
      && character.id === 12 // If the clicked card is the traitor
      && round.chosenCharacter === "") { // If no character has been chosen yet

      setActiveCard(prev => ([...prev, character.id]));
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.clickedCard = [character.id]
      roundCopy.clickedCharacter = character.name
      setRound(roundCopy)
      let playersCopy = JSON.parse(JSON.stringify(players))
      playersCopy[activePlayer ? 0 : 1].life = Math.max(players[activePlayer ? 0 : 1].life - 1, 0)
      setPlayers(playersCopy)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a perdu une vie à cause du traitre"]));
    
      // Trigger the power of the adjunct
    } else if (round.chosenCharacter === "Adjoint" // If the clicked card is the adjunct
    && !includes(character.id, activeCard)) { // If the clicked card isn't visible

      if (round.clickedCard.length === 0) { // If no card has been clicked before
        let roundCopy = JSON.parse(JSON.stringify(round))
        roundCopy.clickedCard = [character.id]
        roundCopy.clickedCharacter = character.name
        setRound(roundCopy)
      } else { // If a card has been clicked before
        let charactersCopy = JSON.parse(JSON.stringify(characters))
        let firstPosition = charactersCopy.map(function(e) { return e.id; }).indexOf(round.clickedCard[0])
        let secondPosition = charactersCopy.map(function(e) { return e.id; }).indexOf(character.id)
        let firstCharacter = charactersCopy[firstPosition]
        let secondCharacter = charactersCopy[secondPosition]
        charactersCopy[firstPosition] = secondCharacter
        charactersCopy[secondPosition] = firstCharacter
        setCharacters(charactersCopy)
        let roundCopy = JSON.parse(JSON.stringify(round))
        roundCopy.clickedCard = [roundCopy.clickedCard[0], character.id]
        setRound(roundCopy)
        resetRound(true)
        setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a échangé deux cartes"]))
      }

    // Trigger the power of Robin or the Sheriff
    } else if ((round.chosenCharacter === "Robin" || round.chosenCharacter === "Sheriff") // If the chosen character is Robin or the Sheriff
    && round.chosenAnswer !== "" ) { // If no answer has been clicked
      
      if (round.clickedCard.length === 0 || round.clickedCard.length === 1) { // If 0 or 1 card has been clicked before
        let roundCopy = JSON.parse(JSON.stringify(round))
        roundCopy.clickedCard.push(character.id)
        roundCopy.clickedCharacter = character.name
        setRound(roundCopy)
      } else if (round.clickedCard.length === 2) { // If 2 cards have already been clicked
        let firstId = characters[characters.map(function(e) { return e.id; }).indexOf(round.clickedCard[0])].id
        let secondId = characters[characters.map(function(e) { return e.id; }).indexOf(round.clickedCard[1])].id
        let thirdId = characters[characters.map(function(e) { return e.id; }).indexOf(character.id)].id
        let roundCopy = JSON.parse(JSON.stringify(round))
        roundCopy.clickedCard.push(character.id)
        roundCopy.clickedCharacter = character.name
        setRound(roundCopy)

          if ((round.chosenCharacter === "Sheriff" // If the chosen character is the Sheriff
          && includes(firstId, [1, 2, 3]) // If the three cards are companion or Robin
          && includes(secondId, [1, 2, 3])
          && includes(thirdId, [1, 2, 3])
          && firstId !== secondId // If the three cards are different
          && firstId !== thirdId
          && secondId !== thirdId)
          || // or
          (round.chosenCharacter === "Robin" // If the chosen character is Robin
          && includes(firstId, [4, 5, 6]) // If the three cards are adjunct or the Sheriff
          && includes(secondId, [4, 5, 6])
          && includes(thirdId, [4, 5, 6])
          && firstId !== secondId // If the three cards are different
          && firstId !== thirdId
          && secondId !== thirdId)) {
            activeCard.push(round.clickedCard[0], round.clickedCard[1], character.id)
            setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name
              + " a réussi à démasquer "
              + (round.chosenCharacter === "Robin" ? "le Shériff et ses adjoints" : "Robin et ses compagnons")]));
            let popupCopy = JSON.parse(JSON.stringify(popupStates))
            popupCopy.popupMessage = players[(activePlayer ? 0 : 1)].name
              + " a réussi à démasquer "
              + (round.chosenCharacter === "Robin" ? "le Shériff et ses adjoints" : "Robin et ses compagnons")
              + " et remporte la partie !";
            popupCopy.hidePopup = false
            popupCopy.buttonMessage = 'Rejouer'
            popupCopy.hideButton = false
            setPopupStates(popupCopy)
          } else { // If the color of the 3 cards is not the same
            let playersCopy = JSON.parse(JSON.stringify(players))
            playersCopy[activePlayer ? 0 : 1].life = Math.max(players[activePlayer ? 0 : 1].life - 1, 0)
            setPlayers(playersCopy)
            resetRound(true)
            setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name
              + " n'a pas réussi à démasquer "
              + (round.chosenCharacter === "Robin" ? "le Shériff et ses adjoints" : "Robin et ses compagnons")
              + " et a perdu une vie"]));
          }
      }

    // Flip the chosen card if none has already been flipped
    } else if (round.clickedCard.length === 0 // If no card has been clicked before
      && !includes(character.id, activeCard)) { // If the clicked card isn't visible
      setActiveCard(prev => ([...prev, character.id]));
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.clickedCard = [character.id]
      roundCopy.clickedCharacter = character.name
      setRound(roundCopy)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a retourné une carte"]));
    }

    // Flip the card back after the witch power
    if (includes(character.id, activeCard) // If the clicked card is visible
    && round.chosenCharacter === "Sorciere" // If the chosen character is the witch
    && includes(character.id, round.clickedCard)) { // If the clicked card has been already clicked
      setActiveCard(activeCard.filter(element => element !== character.id));
      resetRound(true)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a remis une carte face cachée"]));
    
    // Flip the card back after the traitor power
    } else if (includes(character.id, activeCard) // If the clicked card is visible
    && character.id === 12) { // If the clicked card is the traitor
      setActiveCard(activeCard.filter(element => element !== character.id));
      resetRound(true)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a remis une carte face cachée"]));
      
    // Flip the card back if the card is currently flipped
    } else if (includes(character.id, activeCard) // If the clicked card is visible
    && includes(character.id, round.clickedCard) ) { // If the clicked card has been clicked before
      setActiveCard(activeCard.filter(element => element !== character.id));
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a remis une carte face cachée"]));
    
    // Trigger the power of the witch
    } else if (!includes(character.id, activeCard) // If the clicked card isn't visible
    && round.chosenCharacter === "Sorciere" // If the chosen character is the witch
    && !includes(round.clickedCard[0], activeCard)) { // If the clicked card isn't visible
      setActiveCard(prev => ([...prev, character.id]));
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.clickedCard = [character.id]
      roundCopy.clickedCharacter = character.name
      setRound(roundCopy)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name
        + " a retourné une carte grâce à la sorcière"]));

    // Trigger the power of the monk
    } else if (round.chosenCharacter === "Moine" // If the chosen character is the monk
    && !includes(character.id, activeCard)) { // If the clicked card isn't active
      setActiveCard(prev => ([...prev, character.id]));
      resetRound(true)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name
        + " a retourné une carte grâce au moine"]));
    }
  };

  const handleClickedChoice = (choice) => {
    
    // Go to next player if the player skip
    if (round.chosenCharacter === "" // If no character has been chosen before
    && round.clickedCard.length !== 0 // If at least 1 card has been clicked before
    && !includes(round.clickedCard[0], activeCard) // If the clicked card isn't visible
    && choice.character === "Passe" // If the choice is to skip
    && round.clickedCard[0] !== 12 // If the clicked card was not the traitor
    && round.clickedCharacter !== "Embobineur") { // If the clicked card was not the liar
      resetRound(true)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a passé son tour"]));

    // Go to next player if the player is Robin or Sheriff and skip
    } else if (choice.character === "Passe" // If the choice is to skip
    && (round.chosenCharacter === "Robin" || round.chosenCharacter === "Sheriff") // If the chosen character is Robin or the Sheriff
    && round.chosenAnswer !== "") { // If no answer has been clicked
      resetRound(true)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a passé son tour"]));
    
    // Choose a character
    } else if (choice.character !== "Passe" // If the choice isn't to skip
    && round.chosenCharacter === "" // If no character has been chosen before
    && round.clickedCard.length !== 0 // If at least 1 card has been clicked before
    && !includes(round.clickedCard[0], activeCard) ) { // If the clicked card isn't visible
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.chosenCharacter = choice.character
      setRound(roundCopy)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " est " + choice.character]));
    }
  }

  // Function to enable a new round to play
  const resetRound = (isNewPlayer) => {
    setActivePlayer((isNewPlayer) ? !activePlayer : activePlayer)  
    setRound({
        player: activePlayer,
        clickedCard: [],
        clickedCharacter: "",
        chosenCharacter: "",
        chosenAnswer: "",
      });
  }

  const handleClickedAnswer = (answer) => {

    // A player answer to a chosen character
    if (round.chosenAnswer === "" // If no answer has been clicked before
    && round.clickedCard !== [] // If a card has been clicked before
    && round.chosenCharacter !== "") { // If a character has been chosen before
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.chosenAnswer = answer;
      if (round.chosenCharacter === "Adjoint" || round.chosenCharacter === "Robin" || round.chosenCharacter === "Sheriff") {
        roundCopy.clickedCard = []
      }
      setRound(roundCopy)
      setHistory(prev => ([...prev, players[(!activePlayer ? 0 : 1)].name + " répond : " + answer]));
    }

    // If a player lies and is not believed, he loses a life
    if(round.chosenCharacter !== round.clickedCharacter // If the chosen character and the clicked character are different
      && round.chosenAnswer === "" // If no answer has been clicked before
      && answer === "Je t'accuse" // If the answer is Je t'accuse
      && round.chosenCharacter !== "") { // If a character has been chosen before
      let playersCopy = JSON.parse(JSON.stringify(players))
      playersCopy[activePlayer ? 0 : 1].life = Math.max(players[activePlayer ? 0 : 1].life - 1, 0)
      setPlayers(playersCopy)
      resetRound(true)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " perd une vie"]));
    
    // If a player tells the truth but is not believed, it trigger his character's power and the other player loses a life
    } else if (round.chosenCharacter === round.clickedCharacter // If the chosen character and the clicked character are the same
      && round.chosenCharacter !== ""
      && round.chosenAnswer === ""
      && answer === "Je t'accuse") { // If the answer is Je t'accuse
        let playersCopy = JSON.parse(JSON.stringify(players))
        playersCopy[activePlayer ? 1 : 0].life = Math.max(players[activePlayer ? 1 : 0].life - 1, 0)
        setPlayers(playersCopy)
        characterPower(round.chosenCharacter)
        setHistory(prev => ([...prev, players[(!activePlayer ? 0 : 1)].name + " perd une vie"]));
    
    // If the active player is believed, it trigger his character's power
    } else if (answer === "Je te crois") { // If the answer is Je te crois
      characterPower(round.chosenCharacter)
    }
  }

  // Trigger a character's power
  const characterPower = (character) => {
    switch (character) {
      case 'Paysanne':
        resetRound(true)
        break
      case 'Compagnon':
        resetRound(false)
        break
      default:
        return
    }
  }

  // Function that enable a player to change his name
  const onNameChange = (e, num) => {
    let playersCopy = JSON.parse(JSON.stringify(players))
    playersCopy[num].name = e
    setPlayers(playersCopy)
  }

  // Function that hide or unhide the menu
  const onMenuClick = () => {
    setHideMenu(!hideMenu)
  }

  // Function that hide the popup
  const onCrossClick = () => {
    let popupCopy = JSON.parse(JSON.stringify(popupStates))
    popupCopy.hidePopup = true
    setPopupStates(popupCopy)
  }

  // Trigger the popup button function
  const onButtonClick = () => {
    switch (popupStates.buttonMessage) {
      case 'Règles du jeu':
        onRulesClick()
        break
      case 'Rejouer':
        onReplayClick()
        break
      default:
        return
    }
  }

  // Function that reset the game
  const onReplayClick = () => {
    setActiveCard([]);
    setActivePlayer(Math.floor(Math.random()*2) === 1 ? true : false);
    setHistory([])
    setRound({
      player: activePlayer,
      clickedCard: [],
      clickedCharacter: "",
      chosenCharacter: "",
      chosenAnswer: "",
    });
    setPlayers([{
      name: players[0].name, life: 2 },
    { name: players[1].name, life: 2
    }])
    setPopupStates({
      popupMessage: `Bienvenue compagnon ! Prêt à relever les défis de la forêt de Sherwood ?
      \nC'est à ${players[activePlayer ? 0 : 1].name} de commencer !`,
      hidePopup: false,
      buttonMessage: 'Règles du jeu',
      hideButton: false
    })
    setCharacters(shuffle(charactersArray));
  }

  // Function that display the rules popup
  const onRulesClick = () => {
    let popupCopy = JSON.parse(JSON.stringify(popupStates))
    popupCopy.popupMessage = rules
    popupCopy.hidePopup = false
    popupCopy.hideButton = true
    setPopupStates(popupCopy)
  }

  // Function that display the history popup
  const onHistoryClick = () => {
    let popupCopy = JSON.parse(JSON.stringify(popupStates))
    popupCopy.popupMessage = history.join("\n")
    popupCopy.hidePopup = false
    popupCopy.hideButton = true
    setPopupStates(popupCopy)
  }

  // Function that display the powers popup
  const onPowersClick = () => {
    let popupCopy = JSON.parse(JSON.stringify(popupStates))
    popupCopy.popupMessage = powers.join("\n")
    popupCopy.hidePopup = false
    popupCopy.hideButton = true
    setPopupStates(popupCopy)
  }

  return (
    <div className="app">
      <Menu
        hideMenu={hideMenu}
        onMenuClick={onMenuClick}
        onRulesClick={onRulesClick}
        onHistoryClick={onHistoryClick}
        onReplayClick={onReplayClick}
        onPowersClick={onPowersClick}
      />
      <Popup
        popupStates={popupStates}
        onCrossClick={onCrossClick}
        onButtonClick={onButtonClick}
      />
      <Players
        players={players}
        player={true}
        onChange={onNameChange}
        onMenuClick={onMenuClick}
      />
      <Choices
        onChoiceClick={handleClickedChoice}
        onAnswerClick={handleClickedAnswer}
        activePlayer={activePlayer}
        player={true}
        round={round}
      />
      <Board
        handleClickedCard={handleClickedCard}
        characters={characters}
        activeCard={activeCard}
        activePlayer={activePlayer}
        round={round}
      />
      <Choices
        onChoiceClick={handleClickedChoice}
        onAnswerClick={handleClickedAnswer}
        activePlayer={!activePlayer}
        player={false}
        round={round}
      />
      <Players
        players={players}
        player={false}
        onChange={onNameChange}
        onMenuClick={onMenuClick}
      />
    </div>
  );
};

export default App;