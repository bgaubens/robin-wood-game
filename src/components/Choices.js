function Choices( {onChoiceClick, onAnswerClick, activePlayer, round} ) {
    const characterChoices = [
        {
            label: "Je suis Robin",
            character: "Robin",
            key: 1
        },
        {
            label: "Je suis un compagnon",
            character: "Compagnon",
            key: 2
        },
        {
            label: "Je suis le Shériff",
            character: "Sheriff",
            key: 3
        },
        {
            label: "Je suis un adjoint",
            character: "Adjoint",
            key: 4
        },
        //{
        //    label: "Je suis l'embobineur",
        //    character: "Embobineur",
        //    key: 5
        //},
        {
            label: "Je suis le moine",
            character: "Moine",
            key: 6
        },
        {
            label: "Je suis une paysanne",
            character: "Paysanne",
            key: 7
        },
        {
            label: "Je suis la sorcière",
            character: "Sorciere",
            key: 8
        },
        {
            label: "Je passe",
            character: "Passe",
            key: 9
        },
    ]

    const answers = ["Je te crois", "Je t'accuse"]

    return (
        <div className="choice-container">
            <div className="choice-buttons player-one">
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
            <div className="choice-buttons player-two">
                {!activePlayer ?
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