import includes from "../utilities"

function Players({activePlayer, activeCard, players, onChange, round}) {

    return (
        <div className="header">
            <div className="player one">
                <div className="player-icon"></div>
                <div className="player-info"> 
                    <div className="player-name"> 
                        <p>Joueur 1 :</p>
                        <input
                            value={players[0].name}
                            onChange={(e) => onChange(e.target.value, 0)}
                        ></input>
                    </div>
                    <p>Vies : {players[0].life}</p>
                </div>
            </div>
            <div className="rules">
                <h1>C'est le tour de {activePlayer ? players[0].name : players[1].name}</h1>
                {(includes(round.clickedCard, activeCard)) ? <h1>Attention ! {!activePlayer ? players[0].name : players[1].name} ne doit pas regarder la carte</h1> : ""}
            </div>
            <div className="player two">
                <div className="player-info"> 
                    <div className="player-name"> 
                        <p>Joueur 2 :</p>
                        <input 
                            value={players[1].name}
                            onChange={(e) => onChange(e.target.value, 1)}
                        ></input>
                    </div>
                    <p>Vies : {players[1].life}</p>
                </div>
                <div className="player-icon"></div>
            </div>
        </div>
    );
};

  export default Players;