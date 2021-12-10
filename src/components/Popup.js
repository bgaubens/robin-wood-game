import Cross from "../images/cross.png"

function Popup ({popupMessage, onCrossClick, hidePopup, onRulesClick}) {

    return (
        <div className={"popup " + (hidePopup ? "hidden" : "")}>
            <div className="info-container">
                <img src={Cross} onClick={onCrossClick}/>
                <p>{popupMessage}</p>
                <button className="" onClick={onRulesClick}>Règles du jeu</button>
            </div>
        </div>
    );
};

export default Popup;