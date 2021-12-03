import React, { useState } from "react";
import characters from "../characters";
import {shuffle} from 'lodash'
import backimage from "../images/robin-wood-back.jpg"
import includes from "../utilities"

function Board( { handleClickedCard, characters, activeCard, round, activePlayer } ) {

    return (
      <div className="board">
        {characters.map((character) => {
          return (
            <div
              className={"card-outer " + (includes(character.id, activeCard) ? "flipped " : "") + (includes(character.id, round.clickedCard) ? "clicked " : "") + (activePlayer ? "one" : "")}
              onClick={() => handleClickedCard(character)}
            >
              <div className="card">
                <div className="front">
                  <img className="character-img" src={character.image}></img>
                </div>  
                <div className="back">
                  {/*<h1>{character.name}</h1> 
                  <br></br>
                  <p>{character.power}</p>*/}
                  <img className="character-img" src={backimage}></img>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  export default Board;