function Players({players, player, onChange, onMenuClick}) {
    const heart = "❤️"

    return (
        <div className={`player ${player ? "one" : "two"}`}>
            <div className="player-icon"></div> 
            <input
                value={players[(player ? 0 : 1)].name}
                onChange={(e) => onChange(e.target.value, (player ? 0 : 1))}
            ></input>
            <div className="player-lifes">{heart.repeat(players[(player ? 0 : 1)].life)}</div>
            <div className="menu" onClick={onMenuClick}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </div>
    );
};

  export default Players;