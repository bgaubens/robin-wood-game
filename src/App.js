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
  
  const [activeCard, setActiveCard] =  useState([]); // Actual returned card
  const [characters, setCharacters] =  useState(shuffle(charactersArray)); // Intial list of cards
  const [activePlayer, setActivePlayer] = useState(Math.floor(Math.random()*2) === 1 ? true : false); // Actual player
  const [history, setHistory] = useState([])
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

  const isWitch = () => {
    return (round.chosenCharacter === "Sorciere") ? true : false
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
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a perdu une vie à cause du traitre"]));
    } else if (round.chosenCharacter === "Adjoint" && !includes(character.id, activeCard)) {
      // Trigger the power of the adjunct
      if (round.clickedCard.length === 0) {
        let roundCopy = JSON.parse(JSON.stringify(round))
        roundCopy.clickedCard = [character.id]
        roundCopy.clickedCharacter = character.name
        setRound(roundCopy)
      } else {
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
    } else if ((round.chosenCharacter === "Robin" || round.chosenCharacter === "Sheriff")) {
      // Trigger the power of Robin or the Sheriff
      if (round.clickedCard.length === 0 || round.clickedCard.length === 1) {
        let roundCopy = JSON.parse(JSON.stringify(round))
        roundCopy.clickedCard.push(character.id)
        roundCopy.clickedCharacter = character.name
        setRound(roundCopy)
      } else if (round.clickedCard.length === 2) {
        let firstColor = characters[characters.map(function(e) { return e.id; }).indexOf(round.clickedCard[0])].color
        let secondColor = characters[characters.map(function(e) { return e.id; }).indexOf(round.clickedCard[1])].color
        let thirdColor = characters[characters.map(function(e) { return e.id; }).indexOf(character.id)].color
        let roundCopy = JSON.parse(JSON.stringify(round))
        roundCopy.clickedCard.push(character.id)
        roundCopy.clickedCharacter = character.name
        setRound(roundCopy)
          if(firstColor === secondColor && secondColor === thirdColor) {
            activeCard.push(round.clickedCard[0], round.clickedCard[1], character.id)
            setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a réussi à démasquer " + (round.chosenCharacter === "Robin" ? "le Shériff et ses adjoints" : "Robin et ses compagnons")]));
            let popupCopy = JSON.parse(JSON.stringify(popupStates))
            popupCopy.popupMessage = players[(activePlayer ? 0 : 1)].name + " a réussi à démasquer " + (round.chosenCharacter === "Robin" ? "le Shériff et ses adjoints" : "Robin et ses compagnons") + " et remporte la partie !";
            popupCopy.hidePopup = false
            popupCopy.buttonMessage = 'Rejouer'
            popupCopy.hideButton = false
            setPopupStates(popupCopy)
          } else {
            let playersCopy = JSON.parse(JSON.stringify(players))
            playersCopy[activePlayer ? 0 : 1].life = players[activePlayer ? 0 : 1].life - 1
            setPlayers(playersCopy)
            resetRound(true)
            setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " n'a pas réussi à démasquer " +
            (round.chosenCharacter === "Robin" ? "le Shériff et ses adjoints" : "Robin et ses compagnons") + " et a perdu une vie"]));
          }
      }
    } else if (round.clickedCard.length === 0 && !includes(character.id, activeCard)) {
      // Flip the chosen card if none has already been flipped
      setActiveCard(prev => ([...prev, character.id]));
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.clickedCard = [character.id]
      roundCopy.clickedCharacter = character.name
      setRound(roundCopy) // Set the chosen card if none has already been flipped chosed
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a retourné une carte"]));
    }

    if (includes(character.id, activeCard) && isWitch() && includes(character.id, round.clickedCard)) {
      // Flip the card back after the witch power
      setActiveCard(activeCard.filter(element => element !== character.id));
      resetRound(true)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a remis une carte face cachée"]));

    } else if (includes(character.id, activeCard) && character.id === 12) {
      // Flip the card back after the traitor power
      setActiveCard(activeCard.filter(element => element !== character.id));
      resetRound(true)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a remis une carte face cachée"]));

    } else if (includes(character.id, activeCard) && includes(character.id, round.clickedCard) ) {
      // Flip the card back if the card is currently flipped
      setActiveCard(activeCard.filter(element => element !== character.id));
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a remis une carte face cachée"]));

    } else if (!includes(character.id, activeCard) && isWitch() && !includes(round.clickedCard[0], activeCard)) {
      setActiveCard(prev => ([...prev, character.id]));
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.clickedCard = [character.id]
      roundCopy.clickedCharacter = character.name
      setRound(roundCopy) // Trigger the power of the witch
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a retourné une carte grâce à la sorcière"]));

    } else if (round.chosenCharacter === "Moine" ) {
      setActiveCard(prev => ([...prev, character.id]));
      resetRound(true) // Trigger the power of the monk
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a retourné une carte grâce au moine"]));
    }
  };

  const handleClickedChoice = (choice) => {
    if (round.chosenCharacter === "" && round.clickedCard.length !== 0 && !includes(round.clickedCard[0], activeCard) && choice.character === "Passe" && round.clickedCard[0] !== 12 && round.clickedCharacter !== "Embobineur") {
      alert("1")
      resetRound(true) // Go to next player if the player skip
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a passé son tour"]));
    } else if (choice.character === "Passe" && (round.chosenCharacter === "Robin" || round.chosenCharacter === "Sheriff") && round.chosenAnswer !== "") {
      alert("2")
      resetRound(true) // Go to next player if the player is Robin or Sheriff and skip
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " a passé son tour"]));
    } else if (round.clickedCharacter !== "Embobineur" && round.chosenCharacter === "" && round.clickedCard.length !== 0 && !includes(round.clickedCard[0], activeCard) ) {
    // Choose a character if none has already been chosen
    // there is no active card and a card has already been clicked
      alert("3")
      let roundCopy = JSON.parse(JSON.stringify(round))
      roundCopy.chosenCharacter = choice.character
      setRound(roundCopy)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " est " + choice.character]));
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
      setHistory(prev => ([...prev, players[(!activePlayer ? 0 : 1)].name + " répond : " + answer]));
    }

    if(round.chosenCharacter !== round.clickedCharacter && round.chosenAnswer === "" && answer === "Je t'accuse" && round.chosenCharacter !== "") {
    // If a player lies and is not believed, he loses a life
      let playersCopy = JSON.parse(JSON.stringify(players))
      playersCopy[activePlayer ? 0 : 1].life = players[activePlayer ? 0 : 1].life - 1
      setPlayers(playersCopy)
      resetRound(true)
      setHistory(prev => ([...prev, players[(activePlayer ? 0 : 1)].name + " perd une vie"]));
    } else if (round.chosenCharacter === round.clickedCharacter && answer === "Je t'accuse") {
      // If a player tells the truth but is not believed,
      // it trigger his character's power and the other player loses a life
        let playersCopy = JSON.parse(JSON.stringify(players))
        playersCopy[activePlayer ? 1 : 0].life = players[activePlayer ? 1 : 0].life - 1
        setPlayers(playersCopy)
        characterPower(round.chosenCharacter)
        setHistory(prev => ([...prev, players[(!activePlayer ? 0 : 1)].name + " perd une vie"]));
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

  const onMenuClick = () => {
    setHideMenu(!hideMenu)
  }

  const onCrossClick = () => {
    let popupCopy = JSON.parse(JSON.stringify(popupStates))
    popupCopy.hidePopup = true
    setPopupStates(popupCopy)
  }

  const onRulesClick = () => {
    let popupCopy = JSON.parse(JSON.stringify(popupStates))
    popupCopy.popupMessage = rules
    popupCopy.hidePopup = false
    popupCopy.hideButton = true
    setPopupStates(popupCopy)
  }

  const onButtonClick = () => {
    if (popupStates.buttonMessage === 'Règles du jeu') {
      onRulesClick()
    } else if (popupStates.buttonMessage === 'Rejouer') {
      onReplayClick()
    }
  }

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

  const onHistoryClick = () => {
    let popupCopy = JSON.parse(JSON.stringify(popupStates))
    popupCopy.popupMessage = history.join("\n")
    popupCopy.hidePopup = false
    popupCopy.hideButton = true
    setPopupStates(popupCopy)
  }

  const onPowersClick = () => {
    let popupCopy = JSON.parse(JSON.stringify(popupStates))
    popupCopy.popupMessage = powers.join("\n")
    popupCopy.hidePopup = false
    popupCopy.hideButton = true
    setPopupStates(popupCopy)
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
