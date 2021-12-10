function Choices( {onChoiceClick, onAnswerClick, activePlayer, round, player} ) {

    const characterChoices = [
        {label: "Je suis Robin", character: "Robin"},
        {label: "Je suis un compagnon", character: "Compagnon"},
        {label: "Je suis le Shériff", character: "Sheriff"},
        {label: "Je suis un adjoint", character: "Adjoint"},
        {label: "Je suis le moine", character: "Moine"},
        {label: "Je suis une paysanne", character: "Paysanne"},
        {label: "Je suis la sorcière", character: "Sorciere"},
        {label: "Je passe", character: "Passe"},
    ]

    const answers = ["Je te crois", "Je t'accuse"]

    return (
        <div className={"choice-container " + (player ? "one" : "two")}>
            <div className="choice-buttons">
                {activePlayer ?
                    <>{characterChoices.map(choice => {
                        return (
                            <button
                                className={"choice " + ((round.chosenCharacter === choice.character) ? "clicked" : "")}
                                onClick={() => onChoiceClick(choice)}>
                                    {choice.label}
                            </button>
                        );
                    })}</>
                    : <>{answers.map(answer => {
                        return (
                            <button
                                className={"choice " + ((round.chosenAnswer === answer) ? "clicked" : "")}
                                onClick={() => onAnswerClick(answer)}>
                                    {answer}
                            </button>
                        );
                    })}</>
                }
            </div>
        </div>
    );
};

export default Choices;