import History from '../images/history.png';
import Book from '../images/book.png';
import Replay from '../images/replay.png';
import List from '../images/list.png';

function Menu ({hideMenu, onMenuClick, onRulesClick, onReplayClick, onHistoryClick, onPowersClick}) {

    return (
        <div className={"menu-overlay " + (hideMenu ? "hidden" : "")} onClick={onMenuClick}>
            <div className="main-menu">
                <div className="menu-section rules" onClick={onRulesClick}>
                    <img src={Book} alt="book"></img>
                    <div className="title">Règles</div>
                </div>
                <div className="menu-section history" onClick={onHistoryClick}>
                    <img src={History} alt="history"></img>
                    <div className="title">Historique</div>
                </div>
                <div className="menu-section powers" onClick={onPowersClick}>
                    <img src={List} alt="list"></img>
                    <div className="title">Pouvoirs</div>
                </div>
                <div className="menu-section replay" onClick={onReplayClick}>
                    <img src={Replay} alt="replay"></img>
                    <div className="title">Rejouer</div>
                </div>
            </div>
        </div>
    );
};

export default Menu;