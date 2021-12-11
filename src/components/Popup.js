import Cross from "../images/cross.png"

function Popup ({popupStates, onCrossClick, onButtonClick}) {

    return (
        <div className={"popup " + (popupStates.hidePopup ? "hidden" : "")}>
            <img src={Cross} onClick={onCrossClick}/>
            <div className="info-container">
                <p>{popupStates.popupMessage}</p>
                <button className={popupStates.hideButton ? "hidden" : ""} onClick={onButtonClick}>{popupStates.buttonMessage}</button>
            </div>
        </div>
    );
};

export default Popup;